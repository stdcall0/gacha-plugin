const enabled_group = [679169029];
const filter_prefix = "我是王俊超";
const extra_filter_uid = [2318422439];
const extra_filter_prefix = "我是";
// Enable filter in enabled_group
// Recall a message if starts with filter_prefix
// For person in extra_filter_uin, apply the extra filter as well
import { Plugin } from '#gc';
export class ChatFilterPlugin extends Plugin {
    constructor() {
        super({
            name: '撤回特定消息',
            dsc: '(gacha_plugin)',
            event: 'message',
            priority: '999999',
            rule: [
                {
                    reg: '',
                    fnc: 'checkMessage',
                    log: false
                }
            ]
        });
    }
    async checkMessage() {
        const group_id = this.e.group_id;
        // check group enable
        if (!enabled_group.includes(group_id)) {
            return;
        }
        const message = this.e.raw_message;
        if (message.trimStart().startsWith(filter_prefix)) {
            await this.e.recall();
            return;
        }
        const sender_uid = this.e.sender.user_id;
        // check extra filter
        if (extra_filter_uid.includes(sender_uid) &&
            message.trimStart().startsWith(extra_filter_prefix)) {
            await this.e.recall();
            return;
        }
    }
}
// here are some API docs for gpt
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
