import fs from 'node:fs'

import { Path } from '#gc';

await (async function loadSRmeta() {
    await import('#@/resources/starrail/index.js');

    const dirs = fs.readdirSync(Path.Resource + '/starrail', {withFileTypes: true})
            .filter(item => item.isDirectory())
            .map(item => item.name);

    let ret = [];

    for (let i = 0; i < dirs.length; ++i) {
        // @ts-ignore
        logger.info(`[gacha-plugin-SR] loading ${dirs[i]}..`);
        ret.push(import(`${Path.Resource}/starrail/${dirs[i]}/index.js`));
    }

    ret = await Promise.allSettled(ret);

    for (let i = 0; i < dirs.length; ++i) {
        if (ret[i].status != 'fulfilled') {
            // @ts-ignore
            logger.error(`[gacha-plugin-SR] Failed to load ${dirs[i]}`);
            // @ts-ignore
            logger.error(ret[i].reason)
            continue
        }
    }
})();

let ret = []

const files = fs.readdirSync('./plugins/gacha-plugin/apps').filter(file => file.endsWith('.js'))

files.forEach((file) => {
    ret.push(import(`./apps/${file}`))
})

if (!global.segment) {
    try {
        // @ts-ignore
        global.segment = (await import('oicq')).segment
    } catch (err) {
        // @ts-ignore
        global.segment = (await import('icqq')).segment
    }
}

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
    let name = files[i].replace('.js', '')

    if (ret[i].status != 'fulfilled') {
        // @ts-ignore
        logger.error(`载入插件错误：${logger.red(name)}`)
        // @ts-ignore
        logger.error(ret[i].reason)
        continue
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}

export { apps }
