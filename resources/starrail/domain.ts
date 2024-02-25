import { Lottery } from '#gc';
import { StarRail } from '#gc.model';

export let Domains: StarRail.Domain[] = [];

export function AddDomain(name: string, displayName: string, aliases: string[], sets: StarRail.Set[]) {
    return new StarRail.Domain(
        name, displayName, aliases,
        new Lottery(sets)
    );
};
