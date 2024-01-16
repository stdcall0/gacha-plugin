import { GenshinArtifactSets } from "./genshin_artifact_data.js";

let t = GenshinArtifactSets.EmblemOfSeveredFate;
let p = t.rollPiece()

console.log(p)
console.log(p.name, p.displayName)
console.log(t.getPieceDisplayName(p))
console.log(p.mainStat)
console.log(p.mainStat.name, p.mainStat.displayName, p.mainStat.displayValue)
console.log(p.subStats)
console.log(p.subStats[0].name, p.subStats[0].displayName, p.subStats[0].displayValue)
