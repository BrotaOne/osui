import type {CSSObject} from '@ant-design/cssinjs';
import {useBrandContext} from '@osui/brand-provider';
import version from '@osui/version';
import {useStyleRegister, useCacheToken} from '@ant-design/cssinjs';
import {theme, ThemeConfig, version as antdVersion} from 'antd';

const {useToken} = theme;

export const prepareComponentToken: (token: any) => any = token => {
    const ret: any = {};
    Object.keys(token).forEach(k => {
        ret[k] = token[k];
    });
    Object.keys(token.Drawer || {}).forEach(k => {
        ret[k] = token?.Drawer?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;

export const genDrawerStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
}) => CSSObject[] =
    ({clsPrefix, prefixCls, token}) => {
        return [{
            [`.${clsPrefix}`]: {
                [`.${clsPrefix}-extra-with-close`]: {
                    [`.${prefixCls}-header`]: {
                        [`.${prefixCls}-extra`]: {
                            'margin-right': '24px',
                        },
                    },
                },
                [`.${prefixCls}-header`]: {
                    [`.${prefixCls}-header-title`]: {
                        [`.${prefixCls}-close`]: {
                            'position': 'absolute',
                            'right': 0,
                        },
                    },
                },
                [`.${prefixCls}-footer`]: {
                    'border-top': `1px solid ${token['drawerFooterBorderTopColor']}`,
                },
                [`.${prefixCls}-close`]: {
                    'margin-right': '14px',
                    'color': token['themeIconColor'],
                    'line-height': token['drawerCloseIconLineHeight'],
                },
            },
        }];
    };

export const useStyle = (
    clsPrefix: string,
    prefixCls: string,
    cssVar: ThemeConfig['cssVar']
) => {
    const outTheme = useBrandContext();
    const hashed = outTheme.designToken?.hashed;
    const {token: outerToken, theme, hashId} = useToken();
    const finalCssVar = cssVar
        ? typeof cssVar === 'boolean'
            ? {
                prefix: 'osui-antd',
                key: 'osui-antd',
            }
            : {
                prefix: cssVar.prefix || 'osui-antd',
                key: cssVar.key || 'osui-antd',
            }
        : undefined;
    const salt = `${antdVersion}-${version}-${hashed || ''}`;
    const [token] = useCacheToken(
        theme as any,
        [
            prepareComponentToken(outerToken),
        ],
        {
            salt,
            cssVar: finalCssVar,
        }
    );
    const wrapSSROsui = useStyleRegister(
        {
            theme: theme as any,
            token,
            hashId,
            path: [prefixCls],
        },
        () => [
            genDrawerStyle({
                clsPrefix, prefixCls, token, cssVar: finalCssVar,
            }),
        ]
    );
    return wrapSSROsui;
};
