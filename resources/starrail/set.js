import lodash from 'lodash';
import { Lottery } from '#gc';
import { StarRail } from '#gc.model';
import { PiecesOuter, PiecesInner } from './piece.js';
import { RelicType } from '#@/model/starrail/relic.js';
const piecesOuter = new Lottery(lodash.values(PiecesOuter));
const piecesInner = new Lottery(lodash.values(PiecesInner));
export let Sets = [];
export function AddOuterSet(name, displayName, aliases, data) {
    const set = new StarRail.Set(name, displayName, aliases, RelicType.Outer, piecesOuter, data);
    Sets.push(set);
    return set;
}
;
export function AddInnerSet(name, displayName, aliases, data) {
    const set = new StarRail.Set(name, displayName, aliases, RelicType.Inner, piecesInner, data);
    Sets.push(set);
    return set;
}
;
