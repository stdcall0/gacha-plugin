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
        await import(`./${dirs[i]}/index.js`);
    }
    catch (e) {
        // @ts-ignore
        logger.warn(`Failed to load ${dirs[i]}: ${e}`);
    }
export * from './set.js';
export * from './domain.js';
