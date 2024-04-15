import { StarRail } from "#gc.model";
const lightCones = [
    "蕃息",
    "物穰",
    "嘉果",
    "调和",
    "齐颂",
    "轮契",
    "琥珀",
    "戍御",
    "开疆",
    "锋镝",
    "离弦",
    "相抗",
    "智库",
    "灵钥",
    "睿见",
    "俱殁",
    "乐圮",
    "天倾",
    "匿影",
    "渊环",
    "幽邃",
];
export default [
    ...lightCones.map((c) => new StarRail.Star3Weapon(c, c)),
];
