;
export class ThreeStarItem {
    constructor(name, displayName, image) {
        this.name = name;
        this.displayName = displayName;
        this.image = image;
        this.star = 3;
    }
    get imagePath() {
        return `./resources/sr-gacha/3/${this.image}`;
    }
}
;
export class FourStarItem {
    constructor(name, displayName, image) {
        this.name = name;
        this.displayName = displayName;
        this.image = image;
        this.star = 4;
    }
    get imagePath() {
        return `./resources/sr-gacha/4/${this.image}`;
    }
}
;
export class FiveStarItem {
    constructor(name, displayName, image) {
        this.name = name;
        this.displayName = displayName;
        this.image = image;
        this.star = 5;
    }
    get imagePath() {
        return `./resources/sr-gacha/5/${this.image}`;
    }
}
;
