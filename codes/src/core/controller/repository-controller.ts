import { RepoEndpoints } from "../model/repo-endpoints";
import { Requests } from "../request/requests";
import { PromiseResponse, RepoDataPage } from "../types";
import { Response } from '../model/response';
import { DataPage } from "../model/data-page";
import { Repository } from "../model/repository";
import { lastPage, isNext } from "../link-parser";
import { RepositoryResponse } from "../model/repository-response";
import { Errors } from "../error/errors";

export class RepositoryController {

    constructor(
        private readonly endpoints: RepoEndpoints,
        private readonly requests: Requests
    ) { }

    nextRepositories(username: string, perPage: number, url?: string): PromiseResponse<RepoDataPage> {
        return this.requests.get<RepositoryResponse[]>(url ? url : `${this.endpoints.userRepositories(username)}?per_page=${perPage}&sort=pushed`).then((r => {
            if (r.areErrors()) {
                return Response.errors<RepoDataPage>(r.errors).toPromise();
            }
            if (r.value) {
                const repoPage = DataPage.fromResource<Repository>(isNext(r.headers.get("link")));
                const repoPromises = r.value.map(repo => this.getRepoByFullName(repo.full_name));
                return this.promiseAllRepos(repoPromises, repoPage);
            }
            return Response.success<RepoDataPage>().toPromise();
        }));
    }

    private async getRepoByFullName(fullName: string): Promise<Response<Repository>> {
        const repoRes = await this.requests.get<RepositoryResponse>(`${this.endpoints.repos}/${fullName}`);
        const repoIssuesRes = await this.requests.get<any>(`${this.endpoints.reposIssues(fullName)}?state=closed&per_page=1`);
        const closedPrRes = await this.requests.get<any>(`${this.endpoints.reposPulls(fullName)}?state=closed&per_page=1`);
        const openPrRes = await this.requests.get<any>(`${this.endpoints.reposPulls(fullName)}?state=open&per_page=1`);
        if (repoRes.areErrors() || repoIssuesRes.areErrors() || closedPrRes.areErrors() || openPrRes.areErrors()) {
            return Response.errors<Repository>(repoRes.errors.concat(repoIssuesRes.errors, closedPrRes.errors, openPrRes.errors));
        }
        if (repoRes.value) {
            const issuesLink = repoIssuesRes.headers.get("link");
            const closedPrLink = closedPrRes.headers.get("link");
            const openPrLink = openPrRes.headers.get("link");
            const closedIssues = this.resolveHowMany(issuesLink);
            const closedPRs = this.resolveHowMany(closedPrLink);
            const openPRs = this.resolveHowMany(openPrLink);
            const repo = new Repository(
                repoRes.value.full_name,
                openPRs,
                repoRes.value.watchers_count,
                repoRes.value.open_issues_count,
                closedIssues,
                (closedPRs + openPRs) / (repoRes.value.open_issues_count + closedIssues),
                new Date(repoRes.value.pushed_at)
            );
            return Response.successOf<Repository>(repo).toPromise();
        }
        return Response.errors<Repository>([Errors.REPOSITORY_NOT_FOUND]).toPromise();
    }

    private promiseAllRepos(promises: PromiseResponse<Repository>[], repoPage: RepoDataPage): PromiseResponse<RepoDataPage> {
        return Promise.all(promises).then(r => {
            const errors = [] as string[]
            r.filter(r => r.areErrors()).forEach(r => errors.concat(r.errors))
            if (errors.length > 0) {
                return Response.errors<RepoDataPage>(errors).toPromise();
            }
            repoPage.data = r.filter(r => r.value).map(r => r.value as Repository)
            return Response.successOf<RepoDataPage>(repoPage).toPromise();
        });
    }

    private resolveHowMany(link:string | null): number{
        const howMany = link ? lastPage(link) : 0;
        return howMany || 0;
    }
}
