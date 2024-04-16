export enum Rarity {
    Blue='蓝', Purple='紫', Pink='粉', Red='红', Gold='金'
};
export enum StatTrak {
    Normal='普通', StatTrak='暗金'
};
export enum Float {
    FN='崭新出厂', MW='略有磨损', FT='久经沙场', WW='破损不堪', BS='战痕累累'
};

export type rarityTable = { [rarity in Rarity]: number };
export type itemTable = { [rarity in Rarity]: Item[] };
export type priceTable = { [float in Float]: { [st in StatTrak]: number } };

export interface Item {
    name: string;
    minFloat: number;
    maxFloat: number;
    prices: priceTable;
};
export interface Case {
    name: string;
    price: number;
    items: itemTable;
    rarity: rarityTable;
};
