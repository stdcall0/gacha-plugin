import { AddOuterSet } from '../set.js';
import { AddDomain } from '../domain.js';
import { Scorer } from '../scorers/scorer.js';
AddDomain("Path of Providence", "睿治之径", ["量子本", "铁卫本"], [
    AddOuterSet("Genius of Brilliant Stars", "繁星璀璨的天才", ["量子", "量子套"], [
        Scorer.JingliuScorer,
        Scorer.JingYuanScorer,
        Scorer.QingqueScorer,
        Scorer.SeeleScorer
    ], {
        "Head": {
            name: "Genius's Ultraremote Sensing Visor",
            displayName: "天才的超距遥感",
            image: "繁星璀璨的天才/arti-1.webp",
        },
        "Hands": {
            name: "Genius's Frequency Catcher",
            displayName: "天才的频变捕手",
            image: "繁星璀璨的天才/arti-2.webp",
        },
        "Body": {
            name: "Genius's Metafield Suit",
            displayName: "天才的元域深潜",
            image: "繁星璀璨的天才/arti-3.webp",
        },
        "Feet": {
            name: "Genius's Gravity Walker",
            displayName: "天才的引力漫步",
            image: "繁星璀璨的天才/arti-4.webp",
        },
    }),
    AddOuterSet("Guard of Wuthering Snow", "戍卫风雪的铁卫", ["铁卫", "铁卫套"], [
        Scorer.TrailblazerFireScorer,
        Scorer.FuXuanScorer,
        Scorer.ArlanScorer,
        Scorer.TingyunScorer,
        Scorer.PelaScorer
    ], {
        "Head": {
            name: "Guard's Cast Iron Helmet",
            displayName: "铁卫的铸铁面盔",
            image: "戍卫风雪的铁卫/arti-1.webp",
        },
        "Hands": {
            name: "Guard's Shining Gauntlets",
            displayName: "铁卫的银鳞手甲",
            image: "戍卫风雪的铁卫/arti-2.webp",
        },
        "Body": {
            name: "Guard's Uniform of Old",
            displayName: "铁卫的旧制军服",
            image: "戍卫风雪的铁卫/arti-3.webp",
        },
        "Feet": {
            name: "Guard's Silver Greaves",
            displayName: "铁卫的白银护胫",
            image: "戍卫风雪的铁卫/arti-4.webp",
        },
    }),
]);
