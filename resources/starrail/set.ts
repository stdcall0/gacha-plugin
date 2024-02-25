import lodash from 'lodash';

import { Lottery } from '#gc';
import { StarRail } from '#gc.model';

import { PiecesOuter, PiecesInner } from './piece.js';


const piecesOuter = new Lottery(lodash.values(PiecesOuter));
const piecesInner = new Lottery(lodash.values(PiecesInner));

export const Sets = {
    GeniusOfBrilliantStars: new StarRail.Set(
        "Genius of Brilliant Stars", "繁星璀璨的天才",
        ["量子", "量子套"],
        StarRail.RelicType.Outer,
        piecesOuter,
        {
            "Head": {
                name: "Genius's Ultraremote Sensing Visor",
                displayName: "天才的超距遥感",
                image: "量子/108_0.png",
            },
            "Hands": {
                name: "Genius's Frequency Catcher",
                displayName: "天才的频变捕手",
                image: "量子/108_1.png",
            },
            "Body": {
                name: "Genius's Metafield Suit",
                displayName: "天才的元域深潜",
                image: "量子/108_2.png",
            },
            "Feet": {
                name: "Genius's Gravity Walker",
                displayName: "天才的引力漫步",
                image: "量子/108_3.png",
            },
        },
    ),
    RutilantArena: new StarRail.Set(
        "Rutilant Arena", "繁星竞技场",
        ["繁星", "繁星套"],
        StarRail.RelicType.Inner,
        piecesInner,
        {
            "Planar Sphere": {
                name: "Taikiyan Laser Stadium",
                displayName: "泰科铵的镭射球场",
                image: "繁星/309_0.png",
            },
            "Link Rope": {
                name: "Taikiyan's Arclight Race Track",
                displayName: "泰科铵的弧光赛道",
                image: "繁星/309_1.png",
            },
        },
    )
};