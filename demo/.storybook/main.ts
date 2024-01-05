import genConfig from '../../packages/storybookbase/main';
import {join, dirname} from 'path';

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
        // '../stories/**/*.stories.[tj]s{,x}',
        // '../stories/**/*.stories.mdx',
        '../stories/**/index.stories.[tj]s{,x}',
        '../stories/**/index.stories.mdx',
    ],
};
export default config;
