import lodash from 'lodash';

import { Lottery } from '#gc';
import { Base, StarRail } from '#gc.model';

import { PiecesOuter, PiecesInner } from './piece.js';
import { RelicType } from '#@/model/starrail/relic.js';

const piecesOuter = new Lottery(lodash.values(PiecesOuter));
const piecesInner = new Lottery(lodash.values(PiecesInner));

type OuterData = {
    "Head": Base.PieceData,
    "Hands": Base.PieceData,
    "Body": Base.PieceData,
    "Feet": Base.PieceData
};

type InnerData = {
    "Planar Sphere": Base.PieceData,
    "Link Rope": Base.PieceData
};

export let Sets: StarRail.Set[] = [];

export function AddOuterSet(
        name: string, 
        displayName: string,
        aliases: string[],
        scorers: StarRail.Scorer[],
        data: OuterData): StarRail.Set {
    const set = new StarRail.Set(
        name, displayName, aliases,
        RelicType.Outer, scorers, piecesOuter, data
    );
    Sets.push(set);
    return set;
};

export function AddInnerSet(
        name: string, 
        displayName: string,
        aliases: string[],
        scorers: StarRail.Scorer[],
        data: InnerData): StarRail.Set {
    const set = new StarRail.Set(
        name, displayName, aliases,
        RelicType.Inner, scorers, piecesInner, data
    );
    Sets.push(set);
    return set;
};
