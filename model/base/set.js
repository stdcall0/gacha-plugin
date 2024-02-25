export class Set {
    constructor(name, displayName, aliases, pieceList, pieceData) {
        this.name = name;
        this.displayName = displayName;
        this.aliases = aliases;
        this.pieceList = pieceList;
        this.pieceData = pieceData;
    }
    rollPiece() {
        return this.pieceList.choice().instance(this);
    }
    rollPieceMulti(n) {
        let res = [];
        this.pieceList.choiceMulti(n).forEach(x => {
            res.push(x.instance(this));
        });
        return res;
    }
}
;
