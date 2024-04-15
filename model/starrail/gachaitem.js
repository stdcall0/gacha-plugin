export class GachaItem {
    constructor(name, displayName, up = false) {
        this.name = name;
        this.displayName = displayName;
        this.up = up;
    }
    get imagePath() {
        return `/resources/sr-gacha/${this.star}/${this.name}.png`;
    }
}
;
export class Weapon extends GachaItem {
}
;
export class Character extends GachaItem {
}
;
// add more star items here
// Star3Weapon, Star4Weapon & Character, Star5Weapon & Character
export class Star3Weapon extends Weapon {
    constructor() {
        super(...arguments);
        this.star = 3;
    }
}
export class Star4Weapon extends Weapon {
    constructor() {
        super(...arguments);
        this.star = 4;
    }
}
export class Star5Weapon extends Weapon {
    constructor() {
        super(...arguments);
        this.star = 5;
    }
}
export class Star4Character extends Character {
    constructor() {
        super(...arguments);
        this.star = 4;
    }
}
export class Star5Character extends Character {
    constructor() {
        super(...arguments);
        this.star = 5;
    }
}
