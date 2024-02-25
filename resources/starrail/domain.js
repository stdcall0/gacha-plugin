import { Lottery } from '#gc';
import { StarRail } from '#gc.model';
export let Domains = [];
export function AddDomain(name, displayName, aliases, sets) {
    return new StarRail.Domain(name, displayName, aliases, new Lottery(sets));
}
;
