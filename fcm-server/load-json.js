import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const loadJSON = (path) => require(path);
