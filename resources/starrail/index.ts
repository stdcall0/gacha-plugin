import fs from 'fs';

export * from './stat.js';
export * from './piece.js';

export * from './scorer.js';

import { Sets as sets } from './set.js';
import { Domains as domains } from './domain.js';

const Sets = sets;
const Domains = domains;

// @ts-ignore
logger.info(`[gacha-plugin-SR] Sets: ${Sets}`);
// @ts-ignore
logger.info(`[gacha-plugin-SR] Domains: ${Domains}`);

export { Sets, Domains };
