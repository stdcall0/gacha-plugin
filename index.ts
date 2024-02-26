import fs from 'node:fs'

import { Path, Logger } from '#gc';

await (async function loadSRdata() {
    await import('#@/resources/starrail/index.js');

    const files = fs.readdirSync(Path.Resource + '/starrail/relics', {withFileTypes: true})
            .filter(item => !item.isDirectory() && item.name.endsWith(".js"))
            .map(item => item.name);

    let ret = [];

    for (let i = 0; i < files.length; ++i) {
        Logger.info(`[gacha-plugin-SR] loading relic ${files[i]}..`);
        ret.push(import(`${Path.Resource}/starrail/relics/${files[i]}`));
    }

    ret = await Promise.allSettled(ret);

    for (let i = 0; i < files.length; ++i) {
        if (ret[i].status != 'fulfilled') {
            Logger.error(`[gacha-plugin-SR] Failed to load ${files[i]}`);
            Logger.error(ret[i].reason);
        }
    }
})();

const apps = await (async function loadApps() {
    let ret = [];

    const files = fs
        .readdirSync('./plugins/gacha-plugin/apps')
        .filter(file => file.endsWith('.js'));
    
    files.forEach((file) => {
        ret.push(import(`./apps/${file}`));
    });
    
    ret = await Promise.allSettled(ret);
    
    let apps = {};
    for (let i in files) {
        let name = files[i].replace('.js', '');
    
        if (ret[i].status != 'fulfilled') {
            Logger.error(`[gacha-plugin]：Failed to load ${name}`);
            Logger.error(ret[i].reason);
            continue;
        }

        apps[name] = ret[i].value[Object.keys(ret[i].value)[0]];
    }
    return apps;
})();

export { apps };
