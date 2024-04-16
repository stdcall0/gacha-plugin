import { StarRail } from "#gc.model";

const charactersUp = [
    /*"黄泉",
    "花火",
    "黑天鹅",
    "真理医生",
    "阮•梅",
    "银枝",
    "藿藿",
    "托帕&账账",*/
    "镜流",/*
    "符玄",
    "丹恒•饮月",
    "卡芙卡",
    "刃",
    "罗刹",
    "银狼",
    "景元",
    "希儿",
    "砂金",*/
    // "开拓者•存护",
    // "开拓者•毁灭",
];
const charactersPerm = [
    "彦卿",
    "白露",
    "姬子",
    "杰帕德",
    "克拉拉",
    "瓦尔特",
    "布洛妮娅",
];

export default [
    ...charactersUp.map((c) => new StarRail.Star5Character(c, c, true)),

// 常驻五星
    ...charactersPerm.map((c) => new StarRail.Star5Character(c, c, false)),
];

