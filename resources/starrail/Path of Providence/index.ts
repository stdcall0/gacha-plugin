import { AddOuterSet } from '../set.js';
import { AddDomain } from '../domain.js';

import { Scorer } from '../scorers/scorer.js';

AddDomain(
    "Path of Providence", "睿治之径",
    ["量子本"],
    [
        AddOuterSet(
            "Genius of Brilliant Stars", "繁星璀璨的天才",
            ["量子", "量子套"],
            [
                Scorer.SeeleScorer
            ],
            {
                "Head": {
                    name: "Genius's Ultraremote Sensing Visor",
                    displayName: "天才的超距遥感",
                    image: "Path of Providence/108_0.png",
                },
                "Hands": {
                    name: "Genius's Frequency Catcher",
                    displayName: "天才的频变捕手",
                    image: "Path of Providence/108_1.png",
                },
                "Body": {
                    name: "Genius's Metafield Suit",
                    displayName: "天才的元域深潜",
                    image: "Path of Providence/108_2.png",
                },
                "Feet": {
                    name: "Genius's Gravity Walker",
                    displayName: "天才的引力漫步",
                    image: "Path of Providence/108_3.png",
                },
            },
        ),
    ],
);
