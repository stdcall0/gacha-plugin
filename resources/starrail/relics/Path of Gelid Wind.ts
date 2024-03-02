import { AddOuterSet } from '../set.js';
import { AddDomain } from '../domain.js';

import * as Scorer from '../scorers/index.js';

AddDomain(
    "Path of Gelid Wind", "睿治之径",
    ["冰本", "风本"],
    [
        AddOuterSet(
            "Hunter of Glacial Forest", "密林卧雪的猎人",
            ["冰", "冰套"],
            [
                Scorer.Jingliu
            ],
            {
                "Head": {
                    name: "Hunter's Artaius Hood",
                    displayName: "雪猎的荒神兜帽",
                    image: "密林卧雪的猎人/arti-1.webp",
                },
                "Hands": {
                    name: "Hunter's Lizard Gloves",
                    displayName: "雪猎的巨蜥手套",
                    image: "密林卧雪的猎人/arti-2.webp",
                },
                "Body": {
                    name: "Hunter's Ice Dragon Cloak",
                    displayName: "雪猎的冰龙披风",
                    image: "密林卧雪的猎人/arti-3.webp",
                },
                "Feet": {
                    name: "Hunter's Soft Elkskin Boots",
                    displayName: "雪猎的鹿皮软靴",
                    image: "密林卧雪的猎人/arti-4.webp",
                },
            },
        ),
        AddOuterSet(
            "Eagle of Twilight Line", "晨昏交界的翔鹰",
            ["风", "风套"],
            [
            ],
            {
                "Head": {
                    name: "Eagle's Beaked Helmet",
                    displayName: "翔鹰的长喙头盔",
                    image: "晨昏交界的翔鹰/arti-1.webp",
                },
                "Hands": {
                    name: "Eagle's Soaring Ring",
                    displayName: "翔鹰的鹰击指环",
                    image: "晨昏交界的翔鹰/arti-2.webp",
                },
                "Body": {
                    name: "Eagle's Winged Suit Harness",
                    displayName: "翔鹰的翼装束带",
                    image: "晨昏交界的翔鹰/arti-3.webp",
                },
                "Feet": {
                    name: "Eagle's Quilted Puttees",
                    displayName: "翔鹰的绒羽绑带",
                    image: "晨昏交界的翔鹰/arti-4.webp",
                },
            },
        ),
    ],
);
