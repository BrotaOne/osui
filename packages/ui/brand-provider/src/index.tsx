import React, {
    useContext, useState, useEffect,
    useRef, useCallback,
} from 'react';
import {ConfigProvider, ThemeConfig, App} from 'antd';
import Empty from '@osui/empty';
import zhCN from 'antd/locale/zh_CN';
import {ConfigProviderProps} from 'antd/es/config-provider';
import {acud} from './overwriteAntdToken';
import {mergeTheme} from './mergeTheme';
import {components} from './themeComponents';

// 目前只支持一个主题
type Brand = 'icloud';

export interface BrandContextValue {
    brand: Brand | undefined;
    designToken?: ThemeConfig;
    setTheme: ((theme: ThemeConfig) => ThemeConfig)
    | ((theme: ThemeConfig) => void);
}

export const BrandContext = React.createContext<BrandContextValue>({
    brand: undefined,
    designToken: undefined,
    setTheme: () => {
        console.warn('空函数');
        return {};
    },
});

const theme: ThemeConfig = {
    token: acud,
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

const BrandProvider: React.FC<React.PropsWithChildren<{
    brand?: Brand;
    theme?: Partial<ThemeConfig>;
} & ConfigProviderProps>> = (
    {brand, theme: outerTheme, children, ...ConfigProviderProps}
) => {
    const themeFromHook = useRef<ThemeConfig>({});
    const [finalTheme, setTheme] = useState(theme);

    useEffect(
        () => {
            const newTheme = mergeTheme(
                themeFromHook.current,
                mergeTheme(
                    outerTheme,
                    theme
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
    };
    return (
        <BrandContext.Provider value={context}>
            <ConfigProvider {...iCloudConfigs} {...ConfigProviderProps} theme={finalTheme}>
                <App>
                    {children}
                </App>
            </ConfigProvider>
        </BrandContext.Provider>
    );
};

export const useBrandContext = () => useContext(BrandContext);

export default BrandProvider;

export const osuiThemeConfig = theme;
