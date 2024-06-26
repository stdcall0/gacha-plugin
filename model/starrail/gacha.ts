import { Lottery } from "#gc";
import { GachaItem, GachaItemType } from "./gachaitem.js";

export interface GachaResult {
    item: GachaItem;
    count: number;
    count5?: number;
    isGuaranteed: boolean;
};

export class GachaSubPool {
    protected lot: Lottery<GachaItem>;

    constructor(
        public items: GachaItem[]
    ) {
        this.lot = new Lottery(items);
    }

    next(): GachaResult {
        const item = this.lot.choice();
        return {
            item,
            count: 0,
            isGuaranteed: false
        };
    }
};

// FIXME: This implementaion is way too complicated. It can be de-integrated and simplified.
export class GachaSubPoolUp {
    private lot: Lottery<GachaItem>;
    private lotPerm: Lottery<GachaItem>;
    private lotPermWeap: Lottery<GachaItem>;
    private lotPermChar: Lottery<GachaItem>;
    private lotUp: Lottery<GachaItem>;

    constructor(
        public items: GachaItem[]
    ) {
        this.lot = new Lottery(items);
        this.lotPerm = this.lot.filter(i => !i.up);
        this.lotPermWeap = this.lotPerm.filter(i => i.type == GachaItemType.Weapon);
        this.lotPermChar = this.lotPerm.filter(i => i.type == GachaItemType.Character);
        this.lotUp = this.lot.filter(i => i.up);
    }

    next(upGuaranteed: boolean): GachaResult {
        if (upGuaranteed) {
            const item = this.lotUp.choice();
            return {
                item,
                count: 0,
                isGuaranteed: true
            };
        } else {
            // 50 50
            const isUp = new Lottery([true, false]).choice();
            if (isUp) {
                const item = this.lotUp.choice();
                return {
                    item,
                    count: 0,
                    isGuaranteed: false
                };
            } else {
                if (!this.lotPermChar.length || !this.lotPermWeap.length) {
                    const item = this.lotPerm.choice();
                    return {
                        item,
                        count: 0,
                        isGuaranteed: false
                    };
                } else {
                    // 50 50 for weap or char
                    const isWeap = new Lottery([true, false]).choice();
                    const item = isWeap ? this.lotPermWeap.choice() : this.lotPermChar.choice();
                    return {
                        item,
                        count: 0,
                        isGuaranteed: false
                    };
                }
            }
        }
    }
};

export interface GachaPool {
    five: GachaSubPoolUp;
    four: GachaSubPoolUp;
    three: GachaSubPool;
}

export interface GachaState {
    last5: number;
    last4: number;

    up5Guaranteed: boolean;
    up4Guaranteed: boolean;
};

export const defaultGachaState: GachaState = {
    last5: 0,
    last4: 0,
    up5Guaranteed: false,
    up4Guaranteed: false
};

export class Gacha {
    private s: GachaState;

    constructor(s: GachaState = defaultGachaState) {
        this.s = s;
    }
    state(): GachaState {
        return this.s;
    }

    get weight(): number[] {
        const five = this.s.last5 <= 72 ? 60 : 60 + 600 * (this.s.last5 - 72);
        const four = this.s.last4 <= 7 ? 510 : 510 + 5100 * (this.s.last4 - 7);
        return [
            five, // 5*
            four, // 4*
            9430 // 3*
        ];
    }

    next(pool: GachaPool): GachaResult {
        const lot = new Lottery([5, 4, 3], this.weight, 10000);
        const sub = lot.choice();
        
        if (sub == 5) {
            let res = pool.five.next(this.s.up5Guaranteed);
            if (res.isGuaranteed) {
                this.s.up5Guaranteed = false;
            } else {
                this.s.up5Guaranteed = !res.item.up;
            }

            res = {
                ...res,
                count5: this.s.last5 + 1,
                count: this.s.last5 + 1
            };

            this.s.last5 = 0;
            this.s.last4++;

            return res;
        } else if (sub == 4) {
            let res = pool.four.next(this.s.up4Guaranteed);
            if (res.isGuaranteed) {
                this.s.up4Guaranteed = false;
            } else {
                this.s.up4Guaranteed = !res.item.up;
            }

            res = {
                ...res,
                count5: this.s.last5 + 1,
                count: this.s.last4 + 1
            };

            this.s.last5++;
            this.s.last4 = 0;

            return res;
        } else {
            this.s.last5++;
            this.s.last4++;

            return {
                ...pool.three.next(),
                count5: this.s.last5
            };
        }
    }

    nextMulti(pool: GachaPool, n: number): GachaResult[] {
        return Array.from({length: n}, this.next.bind(this, pool));
    }
};
