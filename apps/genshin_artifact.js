// Genshin Artifact Generation
import plugin from '../../../lib/plugins/plugin.js';
import { GenshinArtifactSets } from '../model/genshin_artifact_data.js';
let throttle = false;
let lastArtifact = {};
export class GenshinArtifactPlugin extends plugin {
    constructor() {
        super({
            name: '刷原神圣遗物',
            dsc: '刷原神圣遗物 (gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '^#*新版刷圣遗物.*$',
                    fnc: 'generateArtifact'
                },
                {
                    reg: '^#*新版强化圣遗物(4|8|16|20)?$',
                    fnc: 'upgradeArtifact'
                }
            ]
        });
    }
    async generateArtifact() {
        if (throttle)
            return;
        throttle = true;
        const artifactSet = GenshinArtifactSets.EmblemOfSeveredFate; // consider adding set reference to piece
        let artifactPiece = artifactSet.rollPiece();
        const artifactName = artifactSet.getPieceDisplayName(artifactPiece);
        let msg = `${artifactName} ${artifactSet.displayName}\n`;
        msg += `[M] ${artifactPiece.mainStat.displayName}+${artifactPiece.mainStat.displayValue}`;
        artifactPiece.subStats.forEach(x => {
            msg += `\n[m] ${x.displayName}+${x.displayValue}`;
        });
        lastArtifact[this.user_id] = artifactPiece;
        await this.reply(msg, false, { at: false, recallMsg: 0 });
        throttle = false;
    }
    async upgradeArtifact() {
        if (throttle)
            return;
        if (!(this.user_id in lastArtifact))
            return;
        throttle = true;
        const artifactSet = GenshinArtifactSets.EmblemOfSeveredFate;
        let artifactPiece = lastArtifact[this.user_id];
        artifactPiece.rollUpgrade();
        const artifactName = artifactSet.getPieceDisplayName(artifactPiece);
        let msg = `${artifactName} ${artifactSet.displayName}\n`;
        msg += `[M] ${artifactPiece.mainStat.displayName}+${artifactPiece.mainStat.displayValue}`;
        artifactPiece.subStats.forEach(x => {
            msg += `\n[m] ${x.displayName}+${x.displayValue}`;
        });
        lastArtifact[this.user_id] = artifactPiece;
        await this.reply(msg, false, { at: false, recallMsg: 0 });
        throttle = false;
    }
}
;
