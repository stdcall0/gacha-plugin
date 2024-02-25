import { Lottery } from "#gc";

import { Piece } from "./piece.js";
import { Set } from "./set.js";

export abstract class Domain<
    PieceType extends Piece<SetType>,
    SetType extends Set<PieceType> > {

    constructor(
        public name: string,
        public displayName: string,
        public aliases: string[],
        public setList: Lottery<SetType>
    ) {
        setList.objList.forEach(set => {
            this.aliases = this.aliases.concat(set.aliases);
            this.aliases.push(set.displayName);
        });
        this.aliases.push(this.displayName);
    }

    is(s: string): boolean {
        return this.aliases.includes(s);
    }

    rollPiece(): PieceType {
        return this.setList.choice().rollPiece();
    }
    rollPieceMulti(n: number): PieceType[] {
        let res = [];
        this.setList.choiceMulti(n).forEach(x => {
            res.push(x.rollPiece());
        });
        return res;
    }
};
