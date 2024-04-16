
export enum GachaItemType {
    Weapon,
    Character
};

export abstract class GachaItem {
    star: number;
    type: GachaItemType;
    constructor(
        public name: string,
        public displayName: string,
        public up: boolean = false
    ) { }

    get imagePath(): string {
        return `/resources/sr-gacha/${this.star}/${this.name}.png`;
    }
};

export abstract class Weapon extends GachaItem {
    type = GachaItemType.Weapon;
};

export abstract class Character extends GachaItem {
    type = GachaItemType.Character;
};

export class Star3Weapon extends Weapon {
    star = 3;
}
export class Star4Weapon extends Weapon {
    star = 4;
}
export class Star5Weapon extends Weapon {
    star = 5;
}

export class Star4Character extends Character {
    star = 4;
}
export class Star5Character extends Character {
    star = 5;
}
