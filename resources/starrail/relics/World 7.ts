import { AddInnerSet } from '../set.js';
import { AddDomain } from '../domain.js';

import * as Scorer from '../scorers/index.js';

AddDomain(
    "World 7", "第七世界",
    ["第七宇宙"],
    [
        AddInnerSet(
            "Rutilant Arena", "繁星竞技场",
            ["繁星", "繁星套"],
            [
                Scorer.Seele,
                Scorer.Jingliu
            ],
            {
                "Planar Sphere": {
                    name: "Taikiyan Laser Stadium",
                    displayName: "泰科铵的镭射球场",
                    image: "繁星竞技场/arti-5.webp",
                },
                "Link Rope": {
                    name: "Taikiyan's Arclight Race Track",
                    displayName: "泰科铵的弧光赛道",
                    image: "繁星竞技场/arti-6.webp",
                },
            },
        ),
        AddInnerSet(
            "Broken Keel", "折断的龙骨",
            ["龙骨", "龙骨套"],
            [
                Scorer.Gepard,
                Scorer.Luocha,
                Scorer.FuXuan
            ],
            {
                "Planar Sphere": {
                    name: "Insumousu's Whalefall Ship",
                    displayName: "伊须磨洲的残船鲸落",
                    image: "折断的龙骨/arti-5.webp",
                },
                "Link Rope": {
                    name: "Insumousu's Frayed Hawser",
                    displayName: "伊须磨洲的坼裂缆索",
                    image: "折断的龙骨/arti-6.webp",
                },
            },
        ),
    ],
);
