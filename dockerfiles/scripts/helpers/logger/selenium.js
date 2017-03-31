import fs from 'fs';
import path from 'path';
import {ensureLogsDirSync} from './utils';

const dirPath = ensureLogsDirSync();
const fd = fs.openSync(path.resolve(dirPath, 'selenium.log'), 'a');

export default {fd};
