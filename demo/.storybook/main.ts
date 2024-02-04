import {join, dirname} from 'path';
import genConfig from '../../storybookbase/main';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, 'package.json')));
}
const config = {
    ...genConfig(getAbsolutePath, process.cwd()),
    stories: [
        '../stories/**/*.stories.[tj]s{,x}',
        '../stories/**/*.stories.mdx',
    ],
};
export default config;
