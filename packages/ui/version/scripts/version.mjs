import fs from 'fs';
import packageJson from '../package.json' with {type: 'json'};

const srcPath = 'src/index.tsx'

fs.writeFileSync(srcPath, `export default '${packageJson.version}';\n`);
