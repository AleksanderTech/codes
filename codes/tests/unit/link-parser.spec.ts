import {  isNext,lastPage } from "@/core/link-parser"

describe('link-parser', () => {

    const isNextLinks = [
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="next", <https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=3>; rel="last"`, 
        `https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2`,true],
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="prev", <https://api.github.com/organizations/6121207/repos?per_page=50&sort=updated&page=3>; rel="next"`, 
        `https://api.github.com/organizations/6121207/repos?per_page=50&sort=updated&page=3`, true],
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="prev", <https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=3>; rel="first"`, 
        ``, false],
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="first", <https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=3>; rel="last"`, 
        ``, false],
        [null, '', false],
    ]

    for (let [link, url, isAvailable] of isNextLinks) {
        it(`should return: Resource: ${JSON.stringify({ url, isAvailable })} given arguments: link: ${link}`, () => {
            expect(isNext(link as string | null).url).toBe(url);
            expect(isNext(link as string | null).isAvailable).toBe(isAvailable);
        })
    }
    
    const lastPageLinks = [
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="next", <https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=3>; rel="last"`, 3],
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="prev", <https://api.github.com/organizations/6121207/repos?per_page=50&sort=updated&page=4>; rel="last"`, 4],
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="prev", <https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=4>; rel="first"`, null],
        [`<https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=2>; rel="first", <https://api.github.com/organizations/6128107/repos?per_page=50&sort=updated&page=3>; rel="next"`, null] 
    ]

    for (let [link, page] of lastPageLinks) {
        it(`should return: ${page} given arguments: link: ${link}`, () => {
            expect(lastPage(link as string)).toBe(page);
        })
    }
})
