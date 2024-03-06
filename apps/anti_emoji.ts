// Genshin Artifact Generation

import { Plugin, Common, DisplayModes, StrReplace } from '#gc';

export class AntiEmojiPlugin extends Plugin {
    constructor() {
        super({
            name: '阻止表情包',
            dsc: '(gacha_plugin)',
            event: 'message',
            priority: '98',
            rule: [
                {
                    reg: '',
                    fnc: 'checkEmoji'
                }
            ]
        });
    }
/*
export type MessageElem = TextElem | AtElem | FaceElem | BfaceElem | MfaceElem |
    ImgPttElem | LocationElem | MusicElem | ShareElem | JsonElem | XmlElem |
    AnonymousElem | ReplyElem | NodeElem | ShakeElem | PokeElem | FileElem | VideoElem | MiraiElem;

export interface TextElem {
    type: "text",
    data: {
        text: string
    }
}

export interface AtElem {
    type: "at",
    data: {
        qq: number | "all",
        text?: string, //at失败时显示的文本
        dummy?: boolean, //假at
    }
}

export interface FaceElem {
    type: "face" | "sface",
    data: {
        id: number,
        text?: string
    }
}
interface CommonMessageEventData extends CommonEventData {
    post_type: "message",
    message: MessageElem[], //消息链
    raw_message: string, //字符串格式的消息
    message_id: string,
    user_id: number,
    font: string,
    reply: (message: MessageElem | Iterable<MessageElem> | string, auto_escape?: boolean) => Promise<Ret<{ message_id: string }>>,
}
export interface GroupMessageEventData extends CommonMessageEventData {
    message_type: "group", //群消息
    sub_type: "normal" | "anonymous",
    group_id: number,
    group_name: string,
    anonymous: Anonymous | null, //匿名消息
    sender: MemberBaseInfo,
    atme: boolean,
}
*/
    async checkEmoji() {
        if (this.e.sender.user_id != 1033034074) return;
        if (this.e.group_id != 679169029 && this.e.group_id != 737237707) return;

        const message = this.e.message; // MessageElem[]

        let emoji = true;
        message.forEach(x => {
            if (x.type != "face" && x.type != "sface" && !(x.type == "text" && /\p{Emoji}/u.test(x.text)))
                emoji = false;
        });
        if (emoji) {
            await this.e.recall();
        }
    }
};
