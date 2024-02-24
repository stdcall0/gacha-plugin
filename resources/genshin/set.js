import lodash from 'lodash';
import { Lottery } from '#gc';
import { Genshin } from '#gc.model';
import { Pieces, PiecesAlt } from './piece.js';
const pieces = new Lottery(lodash.values(Pieces));
const piecesAlt = new Lottery(lodash.values(PiecesAlt));
export const Sets = {
    EmblemOfSeveredFate: new Genshin.Set("Emblem of Severed Fate", "绝缘之旗印", ["绝缘"], pieces, {
        "Flower of Life": {
            name: "Magnificent Tsuba",
            displayName: "明威之镡",
            image: "绝缘之旗印/1.webp",
        },
        "Plume of Death": {
            name: "Sundered Feather",
            displayName: "切落之羽",
            image: "绝缘之旗印/2.webp",
        },
        "Sands of Eon": {
            name: "Storm Cage",
            displayName: "雷云之笼",
            image: "绝缘之旗印/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Scarlet Vessel",
            displayName: "绯花之壶",
            image: "绝缘之旗印/4.webp",
        },
        "Circlet of Logos": {
            name: "Ornate Kabuto",
            displayName: "华饰之兜",
            image: "绝缘之旗印/5.webp",
        },
    }),
    ShimenawasReminiscence: new Genshin.Set("Shimenawa's Reminiscence", "追忆之注连", ["追忆"], pieces, {
        "Flower of Life": {
            name: "Entangling Bloom",
            displayName: "羁缠之花",
            image: "追忆之注连/1.webp",
        },
        "Plume of Death": {
            name: "Shaft of Remembrance",
            displayName: "思忆之矢",
            image: "追忆之注连/2.webp",
        },
        "Sands of Eon": {
            name: "Morning Dew's Moment",
            displayName: "朝露之时",
            image: "追忆之注连/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Hopeful Heart",
            displayName: "祈望之心",
            image: "追忆之注连/4.webp",
        },
        "Circlet of Logos": {
            name: "Capricious Visage",
            displayName: "无常之面",
            image: "追忆之注连/5.webp",
        },
    }),
    DeepwoodMemories: new Genshin.Set("Deepwood Memories", "深林的记忆", ["草套", "深林"], pieces, {
        "Flower of Life": {
            name: "Labyrinth Wayfarer",
            displayName: "迷宫的游人",
            image: "深林的记忆/1.webp",
        },
        "Plume of Death": {
            name: "Scholar of Vines",
            displayName: "翠蔓的智者",
            image: "深林的记忆/2.webp",
        },
        "Sands of Eon": {
            name: "A Time of Insight",
            displayName: "贤智的定期",
            image: "深林的记忆/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Lamp of the Lost",
            displayName: "迷误者之灯",
            image: "深林的记忆/4.webp",
        },
        "Circlet of Logos": {
            name: "Laurel Coronet",
            displayName: "月桂的宝冠",
            image: "深林的记忆/5.webp",
        },
    }),
    GildedDreams: new Genshin.Set("Gilded Dreams", "饰金之梦", ["饰金"], pieces, {
        "Flower of Life": {
            name: "Dreaming Steelbloom",
            displayName: "梦中的铁花",
            image: "饰金之梦/1.webp",
        },
        "Plume of Death": {
            name: "Feather of Judgment",
            displayName: "裁断的翎羽",
            image: "饰金之梦/2.webp",
        },
        "Sands of Eon": {
            name: "The Sunken Years",
            displayName: "沉金的岁月",
            image: "饰金之梦/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Honeyed Final Feast",
            displayName: "如蜜的终宴",
            image: "饰金之梦/4.webp",
        },
        "Circlet of Logos": {
            name: "Shadow of the Sand King",
            displayName: "沙王的投影",
            image: "饰金之梦/5.webp",
        },
    }),
    MarechausseeHunter: new Genshin.Set("Marechaussee Hunter", "逐影猎人", ["猎人", "逐影"], pieces, {
        "Flower of Life": {
            name: "Hunter's Brooch",
            displayName: "猎人的胸花",
            image: "逐影猎人/1.webp",
        },
        "Plume of Death": {
            name: "Masterpiece's Overture",
            displayName: "杰作的序曲",
            image: "逐影猎人/2.webp",
        },
        "Sands of Eon": {
            name: "Moment of Judgment",
            displayName: "裁判的时刻",
            image: "逐影猎人/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Forgotten Vessel",
            displayName: "遗忘的容器",
            image: "逐影猎人/4.webp",
        },
        "Circlet of Logos": {
            name: "Veteran's Visage",
            displayName: "老兵的容颜",
            image: "逐影猎人/5.webp",
        },
    }),
    GoldenTroupe: new Genshin.Set("Golden Troupe", "黄金剧团", ["黄金", "剧团"], pieces, {
        "Flower of Life": {
            name: "Golden Song's Variation",
            displayName: "黄金乐曲的变奏",
            image: "黄金剧团/1.webp",
        },
        "Plume of Death": {
            name: "Golden Bird's Shedding",
            displayName: "黄金飞鸟的落羽",
            image: "黄金剧团/2.webp",
        },
        "Sands of Eon": {
            name: "Golden Era's Prelude",
            displayName: "黄金时代的先声",
            image: "黄金剧团/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Golden Night's Bustle",
            displayName: "黄金之夜的喧嚣",
            image: "黄金剧团/4.webp",
        },
        "Circlet of Logos": {
            name: "Golden Troupe's Reward",
            displayName: "黄金剧团的奖赏",
            image: "黄金剧团/5.webp",
        },
    }),
    ThunderingFury: new Genshin.Set("Thundering Fury", "如雷的盛怒", ["如雷", "如雷套", "雷套"], pieces, {
        "Flower of Life": {
            name: "Thunderbird's Mercy",
            displayName: "雷鸟的怜悯",
            image: "如雷的盛怒/1.webp",
        },
        "Plume of Death": {
            name: "Survivor of Catastrophe",
            displayName: "雷灾的孑遗",
            image: "如雷的盛怒/2.webp",
        },
        "Sands of Eon": {
            name: "Hourglass of Thunder",
            displayName: "雷霆的时计",
            image: "如雷的盛怒/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Omen of Thunderstorm",
            displayName: "降雷的凶兆",
            image: "如雷的盛怒/4.webp",
        },
        "Circlet of Logos": {
            name: "Thunder Summoner's Crown",
            displayName: "唤雷的头冠",
            image: "如雷的盛怒/5.webp",
        },
    }),
    Thundersoother: new Genshin.Set("Thundersoother", "平息鸣雷的尊者", ["平雷", "平雷套"], pieces, {
        "Flower of Life": {
            name: "Thundersoother's Heart",
            displayName: "平雷之心",
            image: "平息鸣雷的尊者/1.webp",
        },
        "Plume of Death": {
            name: "Thundersoother's Plume",
            displayName: "平雷之羽",
            image: "平息鸣雷的尊者/2.webp",
        },
        "Sands of Eon": {
            name: "Hour of Soothing Thunder",
            displayName: "平雷之刻",
            image: "平息鸣雷的尊者/3.webp",
        },
        "Goblet of Eonothem": {
            name: "Thundersoother's Goblet",
            displayName: "平雷之器",
            image: "平息鸣雷的尊者/4.webp",
        },
        "Circlet of Logos": {
            name: "Thundersoother's Diadem",
            displayName: "平雷之冠",
            image: "平息鸣雷的尊者/5.webp",
        },
    })
};
let setsAlt_ = lodash.clone(Sets);
Object.keys(Sets).forEach(x => {
    let y = Object.create(Sets[x]);
    y.pieceList = piecesAlt;
    setsAlt_[x] = y;
});
export const SetsAlt = setsAlt_;
