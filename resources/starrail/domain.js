import { Lottery } from '#gc';
import { StarRail } from '#gc.model';
import { Sets } from './set.js';
export const Domains = [
    new StarRail.Domain("Path of Providence", "睿治之径", ["量子本"], new Lottery([
        Sets.GeniusOfBrilliantStars,
    ])),
    new StarRail.Domain("World 7", "第七世界", [""], new Lottery([
        Sets.RutilantArena,
    ])),
];
