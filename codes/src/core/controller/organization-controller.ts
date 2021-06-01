import { Requests } from "../request/requests";
import { Response } from '../model/response';
import { Login, OrgDataPage, PromiseResponse } from "../types";
import { OrganizationResponse as OrgResponse } from "../model/organization-response";
import { isNext } from "../link-parser";
import { DataPage } from "../model/data-page";
import { Organization as Org } from "../model/organization";
import { Errors } from "../error/errors";


export class OrganizationController {

    constructor(
        private readonly organizationsEndpoint: string,
        private readonly orgsEndpoint: string,
        private readonly requests: Requests
    ) { }

    nextOrganizations(perPage: number, url?: string): PromiseResponse<OrgDataPage> {
        return this.requests.get<Login[]>(url ? url : `${this.organizationsEndpoint}?per_page=${perPage}`).then((r => {
            if (r.areErrors()) {
                return Response.errors<OrgDataPage>(r.errors).toPromise();
            }
            if (r.value) {
                const orgPage = DataPage.fromResource<Org>(isNext(r.headers.get("link")));
                const orgPromises = r.value.map((org) => this.getOrgByLogin(org.login));
                return this.promiseAllOrgs(orgPromises, orgPage);
            }
            return Response.success<OrgDataPage>().toPromise();
        }));
    }

    private getOrgByLogin(login: string): PromiseResponse<Org> {
        return this.requests.get<OrgResponse>(`${this.orgsEndpoint}/${login}`).then(r => {
            if (r.areErrors()) {
                return Response.errors<Org>(r.errors).toPromise();
            }
            if (r.value) {
                return Response.successOf<Org>(Org.fromOrganizationResponse(r.value)).toPromise();
            }
            return Response.errors<Org>([Errors.ORGANIZATION_NOT_FOUND]).toPromise();
        })
    }

    private promiseAllOrgs(promises: PromiseResponse<Org>[], orgPage: OrgDataPage): PromiseResponse<OrgDataPage> {
        return Promise.all(promises).then(r => {
            const errors = [] as string[]
            r.filter(r => r.areErrors()).forEach(r => errors.concat(r.errors))
            if (errors.length > 0) {
                return Response.errors<OrgDataPage>(errors).toPromise();
            }
            orgPage.data = r.filter(r => r.value).map(r => r.value as Org)
            return Response.successOf<OrgDataPage>(orgPage).toPromise();
        });
    }
}