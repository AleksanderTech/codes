import { Resource } from "./model/Resource";


export function isNext(link: string | null): Resource {
    if(!link) return new Resource(false, '');
    let links = link.split(',')
    for (let i = 0; i < links.length; i++) {
        let url = extractUrl(links[i]);
        let rel = extractRel(links[i]);
        if (rel === 'next') {
            return new Resource(true, url);
        }
    }
    return new Resource(false, '');
}

function extractUrl(link: string): string {
    let linkElements = link.trim().split(';');
    let url = linkElements[0].trim();
    return url.substring(1, url.length - 1);
}

function extractRel(link: string): string {
    let linkElements = link.trim().split(';');
    return linkElements[1].trim().split('=')[1].replace(/"/g, '');
}

export function lastPage(link: string): number | null{
    let links = link.split(',')
    for (let i = 0; i < links.length; i++) {
        let url = extractUrl(links[i]);
        let rel = extractRel(links[i]);
        if (rel === 'last') {
            const page = new URL(url).searchParams.get('page');
            return page ? parseInt(page) : null;
        }
    }
    return null;
}