import Star5 from "./star5.js";
import Star4 from "./star4.js";
import Star3 from "./star3.js";
import { StarRail } from "#gc.model";
const three = new StarRail.GachaSubPool(Star3);
const four = new StarRail.GachaSubPoolUp(Star4);
const five = new StarRail.GachaSubPoolUp(Star5);
const pool = {
    three,
    four,
    five
};
export default pool;
