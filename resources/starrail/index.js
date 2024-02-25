import fs from 'fs';
import { Path } from '#gc';
export * from './stat.js';
export * from './piece.js';
export * from './scorer.js';
const dirs = fs.readdirSync(Path.Resource + '/starrail', { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(item => item.name);
for (let i = 0; i < dirs.length; ++i)
    try {
        // @ts-ignore
        logger.info(`[gacha-plugin-SR] loading ${dirs[i]}..`);
        await import(`./${dirs[i]}/index.js`);
    }
    catch (e) {
        // @ts-ignore
        logger.warn(`[gacha-plugin-SR] Failed to load ${dirs[i]}: ${e}`);
    }
import { Sets as sets } from './set.js';
import { Domains as domains } from './domain.js';
const Sets = sets;
const Domains = domains;
// @ts-ignore
logger.info(`[gacha-plugin-SR] Sets: ${Sets}`);
// @ts-ignore
logger.info(`[gacha-plugin-SR] Domains: ${Domains}`);
export { Sets, Domains };
