export interface RepoEndpoints {
    
    repos: string,
    userRepositories: (input: string) => string,
    reposPulls: (input: string) => string,
    reposIssues: (input: string) => string,
}