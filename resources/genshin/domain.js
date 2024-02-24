import { Lottery } from '#gc';
import { Genshin } from '#gc.model';
import { Sets, SetsAlt } from './set.js';
export const Domains = [
    new Genshin.Domain("Momiji-Dyed Court", "椛染之庭", ["绝缘本"], new Lottery([
        Sets.EmblemOfSeveredFate,
        Sets.ShimenawasReminiscence,
    ])),
    new Genshin.Domain("Spire of Solitary Enlightenment", "缘觉塔", ["草本"], new Lottery([
        Sets.DeepwoodMemories,
        Sets.GildedDreams,
    ])),
    new Genshin.Domain("Denouement of Sin", "罪祸的终末", ["猎人本"], new Lottery([
        Sets.MarechausseeHunter,
        Sets.GoldenTroupe,
    ])),
    new Genshin.Domain("Midsummer Courtyard", "仲夏庭园", ["如雷本", "雷本", "平雷本"], new Lottery([
        Sets.ThunderingFury,
        Sets.Thundersoother,
    ])),
];
export const DomainsAlt = [
    new Genshin.Domain("Momiji-Dyed Court", "椛染之庭", ["绝缘本"], new Lottery([
        SetsAlt.EmblemOfSeveredFate,
        SetsAlt.ShimenawasReminiscence,
    ])),
    new Genshin.Domain("Spire of Solitary Enlightenment", "缘觉塔", ["草本"], new Lottery([
        SetsAlt.DeepwoodMemories,
        SetsAlt.GildedDreams,
    ])),
    new Genshin.Domain("Denouement of Sin", "罪祸的终末", ["猎人本"], new Lottery([
        SetsAlt.MarechausseeHunter,
        SetsAlt.GoldenTroupe,
    ])),
    new Genshin.Domain("Midsummer Courtyard", "仲夏庭园", ["如雷本", "雷本", "平雷本"], new Lottery([
        SetsAlt.ThunderingFury,
        SetsAlt.Thundersoother,
    ])),
];
