import { StarRail } from "#gc.model";
const lightCones = [
    "铭记于心的约定",
    "何物为真",
    "美梦小镇大冒险",
    "织造命运之线",
    "最后的赢家",
    "银河沦陷日",
    "在火的远处",
    "好戏开演",
    "嘿，我在这儿",
    "新手任务开始前",
    "同一种心情",
    "一场术后对话",
    "此时恰好",
    "记忆中的模样",
    "舞！舞！舞！",
    "与行星相会",
    "宇宙市场趋势",
    "朗道的选择",
    "余生的第一天",
    "点个关注吧！",
    "论剑",
    "唯有沉默",
    "天才们的休憩",
    "「我」的诞生",
    "别让世界静下来",
    "秘密誓心",
    "在蓝天下",
    "鼹鼠党欢迎你",
    "猎物的视线",
    "晚安与睡颜",
    "决心如汗珠般闪耀",
    "我们是地火",
    "春水初生",
    "等价交换",
    // "暖夜不会漫长",
    // "镂月裁云之意",
    // "这就是我啦！",
    // "重返幽冥",
    // "今日亦是和平的一日",
    // "无处可逃",
    // "后会有期",
    // "早餐的仪式感",
    // "过往未来",
    // "汪！散步时间！",
    // "延长记号"
];
const characters = [
    // "加拉赫",
    "米沙",
    "雪衣",
    "寒鸦",
    "桂乃芬",
    "玲可",
    "卢卡",
    "驭空",
    "停云",
    "青雀",
    "黑塔",
    "阿兰",
    "素裳",
    "娜塔莎",
    "希露瓦",
    "桑博",
    // "佩拉",
    "虎克",
    "三月七",
    "艾丝妲",
    // "丹恒",
];
export default [
    new StarRail.Star4Character("Gallagher", "加拉赫", true),
    new StarRail.Star4Character("Pela", "佩拉", true),
    new StarRail.Star4Character("Danheng", "丹恒", true),
    // 常驻四星
    ...characters.map(x => new StarRail.Star4Character(x, x, false)),
    ...lightCones.map(x => new StarRail.Star4Weapon(x, x, false)),
];
