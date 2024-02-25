import { AddInnerSet } from '../set.js';
import { AddDomain } from '../domain.js';

AddDomain(
    "World 7", "第七世界",
    [],
    [
        AddInnerSet(
            "Rutilant Arena", "繁星竞技场",
            ["繁星", "繁星套"],
            {
                "Planar Sphere": {
                    name: "Taikiyan Laser Stadium",
                    displayName: "泰科铵的镭射球场",
                    image: "World 7/309_0.png",
                },
                "Link Rope": {
                    name: "Taikiyan's Arclight Race Track",
                    displayName: "泰科铵的弧光赛道",
                    image: "World 7/309_1.png",
                },
            },
        ),
    ],
);
