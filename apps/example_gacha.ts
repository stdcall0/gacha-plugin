import { Lottery } from "#gc";
import { StarRail } from "#gc.model";

const three1 = new StarRail.ThreeStarItem("three1", "Three Star 1", "three1.png");
const three2 = new StarRail.ThreeStarItem("three2", "Three Star 2", "three2.png");
const three3 = new StarRail.ThreeStarItem("three3", "Three Star 3", "three3.png");

const threeLottery = new Lottery([three1, three2, three3]);

const four1 = new StarRail.FourStarItem("four1", "桂乃芬", "four1.png");
const four2 = new StarRail.FourStarItem("four2", "黑塔", "four2.png");
const four3 = new StarRail.FourStarItem("four3", "王俊超", "four3.png"); // probility of this item is much bigger than other 4*

const fourLottery = new Lottery([four1, four2, four3], [1, 1, 3]);

const fivePerm1 = new StarRail.FiveStarItem("fivePerm1", "彦卿", "fivePerm1.png");

// 彦卿专武
const fivePerm2 = new StarRail.FiveStarItem("fivePerm2", "如泥酣眠", "fivePerm2.png");
const fivePerm3 = new StarRail.FiveStarItem("fivePerm3", "鸭鸭", "fivePerm3.png");

const fiveUp1 = new StarRail.FiveStarItem("fiveUp1", "黄泉", "fiveUp1.png");
const fiveUp2 = new StarRail.FiveStarItem("fiveUp2", "知更鸟", "fiveUp2.png");

const fiveUpLottery = new Lottery([fiveUp1, fiveUp2]);
const fivePermLottery = new Lottery([fivePerm1, fivePerm2, fivePerm3]);

const pool = new StarRail.GachaPool(fiveUpLottery, fivePermLottery, fourLottery, threeLottery);
const state = new StarRail.GachaState(pool);

const result = state.nextMulti(500);

// print result line by line (#{No.} {result}), and count the number of each item
const count = new Map<string, number>();
result.forEach((x, i) => {
    console.log(`${i + 1}: ${x.name}`);
    count.set(x.name, (count.get(x.name) || 0) + 1);
});

// print the count of each item
count.forEach((v, k) => {
    console.log(`${k}: ${v}`);
});

// print the count of each star
const starCount = new Map<number, number>();
result.forEach(x => {
    starCount.set(x.star, (starCount.get(x.star) || 0) + 1);
});
starCount.forEach((v, k) => {
    console.log(`${k} star: ${v}`);
});
