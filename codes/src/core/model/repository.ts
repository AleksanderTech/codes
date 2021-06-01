export class Repository {
    
    constructor(
        public fullName: string,
        public openPR: number,
        public stars: number,
        public openIssues: number,
        public closedIssues: number,
        public prIssueRatio: number,
        public lastCommit: Date
    ) { }
}