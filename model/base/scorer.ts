import { Piece } from "./piece.js";

export interface Scorer {
    (piece: Piece<any>): number
};

export interface ScoreRule { [stat: string]: number };
