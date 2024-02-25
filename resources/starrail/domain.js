import { Lottery } from '#gc';
import { StarRail } from '#gc.model';
export let Domains = [];
export function AddDomain(name, displayName, aliases, sets) {
    const domain = new StarRail.Domain(name, displayName, aliases, new Lottery(sets));
    Domains.push(domain);
    return domain;
}
;
