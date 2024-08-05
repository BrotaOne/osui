import React, {
    useContext, useState, useEffect,
    useRef, useCallback, FC,
} from 'react';
import {ConfigProvider, ThemeConfig, App} from 'antd';
import Empty from '@osui/empty';
import zhCN from 'antd/locale/zh_CN';
import {ConfigProviderProps} from 'antd/es/config-provider';
import tokens from '@osui/icloud-theme/dist/theme/tokens';
import {acud} from './overwriteAntdToken';
import {mergeTheme} from './mergeTheme';
import {components} from './themeComponents';
import {
    config, SetStaticMethodStyle, type Config,
} from './SetStaticMethodStyle';
// const {useToken} = theme;
// 目前只支持一个主题
type Brand = 'icloud';

export interface BrandContextValue {
    brand: Brand | undefined;
    designToken?: ThemeConfig;
    setTheme: ((theme: ThemeConfig) => ThemeConfig)
    | ((theme: ThemeConfig) => void);
    // hashId: string;
    // setHashId: (v: string) => void;
}

export const BrandContext = React.createContext<BrandContextValue>({
    brand: undefined,
    designToken: undefined,
    setTheme: () => {
        console.warn('空函数');
        return {};
    },
    // hashId: 'osui-not-get-antd-hashId',
    // setHashId: () => {
    //     console.error('do nothing');
    // }
});

const defaultTheme: ThemeConfig = {
    token: {
        ...acud,
        ...tokens,
    },
    components,
};

const iCloudConfigs: ConfigProviderProps = {
    autoInsertSpaceInButton: false,
    renderEmpty(componentName) {
        switch (componentName) {
            case 'Select':
            case 'TreeSelect':
            case 'Cascader':
            case 'Mentions':
                return <div style={{display: 'flex', justifyContent: 'center'}}>未查到任何结果</div>;
            case 'Table':
            case 'List':
                return (<Empty />);
            default:
                return <Empty />;
        }
    },
    locale: zhCN,
};

export const useBrandContext = () => useContext(BrandContext);

// const SetHashIdNullDom = memo(
//     () => {
//         const {setHashId, hashId: OsuiHashId } = useBrandContext() || {};
//         const { hashId } = useToken();
//         useEffect(
//             () => {
//                 if (hashId && OsuiHashId !== hashId) {
//                     setHashId(hashId);
//                 }
//             }, [hashId, setHashId]
//         )
//         return <></>;
//     }
// );

const BrandProvider: FC<{
    brand?: Brand;
    theme?: Partial<ThemeConfig>;
} & ConfigProviderProps> & {
    config: Config;
} = (
    {brand, theme: outerTheme, children, ...ConfigProviderProps}
) => {
    const themeFromHook = useRef<ThemeConfig>({});
    const [finalTheme, setTheme] = useState(defaultTheme);
    // const [hashId, setHashId] = useState<string>('osui-not-get-antd-hashId');

    useEffect(
        () => {
            const newTheme = mergeTheme(
                themeFromHook.current,
                mergeTheme(
                    outerTheme,
                    defaultTheme
                )
            );
            // 合并优先级
            setTheme(newTheme);
        },
        [outerTheme]
    );

    const setThemeOutside = useCallback(
        (outTheme: ((outTheme: ThemeConfig) => ThemeConfig) | ThemeConfig) => {
            if (typeof outTheme === 'function') {
                themeFromHook.current = outTheme(themeFromHook.current);
            } else {
                themeFromHook.current = mergeTheme(
                    outTheme,
                    themeFromHook.current
                );
            }
            setTheme(oldThme => mergeTheme(
                themeFromHook.current,
                oldThme
            ));
        },
        []
    );

    const context: BrandContextValue = {
        brand,
        designToken: finalTheme,
        setTheme: setThemeOutside,
        // hashId,
        // setHashId,
    };

    return (
        <BrandContext.Provider value={context}>
            <ConfigProvider {...iCloudConfigs} {...ConfigProviderProps} theme={finalTheme}>
                <App>
                    {/* <SetHashIdNullDom /> */}
                    <SetStaticMethodStyle />
                    {children}
                </App>
            </ConfigProvider>
        </BrandContext.Provider>
    );
};

BrandProvider.config = config;

export default BrandProvider;

export const osuiThemeConfig = defaultTheme;
