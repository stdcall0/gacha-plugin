import { Lottery } from "#gc";

import { Piece } from "./piece.js";
import { PieceData } from "./piecedata.js";

export abstract class Set<PieceType extends Piece<any>> {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public pieceList: Lottery<PieceType>,
        public pieceData: { [name: string]: PieceData }
    ) { }

    rollPiece(): PieceType {
        return this.pieceList.choice().instance(this);
    }
    rollPieceMulti(n: number): PieceType[] {
        let res = [];
        this.pieceList.choiceMulti(n).forEach(x => {
            res.push(x.instance(this));
        });
        return res;
    }
};
