
export interface GachaItem {
    constructor: CallableFunction;

    name: string;
    displayName: string;

    star: number;
    image: string;

    get imagePath(): string;
};

export class ThreeStarItem implements GachaItem {
    star: number;

    constructor(
        public name: string,
        public displayName: string,
        public image: string
    ) {
        this.star = 3;
    }
    
    get imagePath(): string {
        return `./resources/sr-gacha/3/${this.image}`;
    }
};

export class FourStarItem implements GachaItem {
    star: number;

    constructor(
        public name: string,
        public displayName: string,
        public image: string
    ) {
        this.star = 4;
    }
    
    get imagePath(): string {
        return `./resources/sr-gacha/4/${this.image}`;
    }
};

export class FiveStarItem implements GachaItem {
    star: number;

    constructor(
        public name: string,
        public displayName: string,
        public image: string
    ) {
        this.star = 5;
    }
    
    get imagePath(): string {
        return `./resources/sr-gacha/5/${this.image}`;
    }
};

