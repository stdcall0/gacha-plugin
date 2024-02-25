export class Domain {
    constructor(name, displayName, aliases, setList) {
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.setList = setList;
        setList.objList.forEach(set => {
            this.aliases = this.aliases.concat(set.aliases);
            this.aliases.push(set.displayName);
        });
        this.aliases.push(this.displayName);
    }
    is(s) {
        return this.aliases.includes(s);
    }
    rollPiece() {
        return this.setList.choice().rollPiece();
    }
    rollPieceMulti(n) {
        let res = [];
        this.setList.choiceMulti(n).forEach(x => {
            res.push(x.rollPiece());
        });
        return res;
    }
}
;
