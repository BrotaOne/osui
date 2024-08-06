import type {CSSObject} from '@ant-design/cssinjs';
import {useBrandContext} from '@osui/brand-provider';
import {useStyleRegister, useCacheToken} from '@ant-design/cssinjs';
import {theme, ThemeConfig} from 'antd';

const {useToken} = theme;

export const prepareComponentToken: (token: any) => any = token => {
    const ret: any = {};
    Object.keys(token).forEach(k => {
        ret[k] = token[k];
    });
    Object.keys(token.Menu || {}).forEach(k => {
        ret[k] = token?.Menu?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;

export const genMenuStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
}) => CSSObject[] =
    ({clsPrefix, prefixCls, token}) => {
        // return [];
        return [{
            [`.${prefixCls}-vertical.${prefixCls}-sub`]: {
                'max-height': 'calc(100vh - 100px)',
            },
            [`.${prefixCls}-vertical-left.${prefixCls}-sub`]: {
                'max-height': 'calc(100vh - 100px)',
            },
            [`.${prefixCls}-vertical-right.${prefixCls}-sub`]: {
                'max-height': 'calc(100vh - 100px)',
            },

            [`.${clsPrefix}`]: {
                [`.${prefixCls}`]: {
                    [`.${prefixCls}-item`]: {
                        '&:hover': {
                            'background-color': token['itemHoverBg'],
                        },

                        [`.${prefixCls}-submenu-expand-icon`]: {
                            'width': '16px !important',
                        },
                    },

                    [`.${prefixCls}-submenu-title`]: {
                        '&:hover': {
                            'background-color': token['itemHoverBg'],
                        },

                        [`.${prefixCls}-submenu-expand-icon`]: {
                            'width': '16px !important',
                        },
                    },
                },

                [`.${prefixCls}-item-group-list .${prefixCls}-item`]: {
                    'padding': '0 16px 0 16px',
                },
                [`.${prefixCls}-item-group-list .${prefixCls}-submenu-title`]: {
                    'padding': '0 16px 0 16px',
                },

                [`.${prefixCls}-item-group-title`]: {
                    'height': 28,
                    'padding-top': 0,
                    'padding-bottom': 0,
                    'line-height': '34px',
                },
            },

            [`.${clsPrefix}-class-prefix-submenu`]: {
                [`.${prefixCls}-vertical.${prefixCls}-sub`]: {
                    'max-height': 'calc(100vh - 100px)',
                },
                [`.${prefixCls}-vertical-left.${prefixCls}-sub`]: {
                    'max-height': 'calc(100vh - 100px)',
                },
                [`.${prefixCls}-vertical-right.${prefixCls}-sub`]: {
                    'max-height': 'calc(100vh - 100px)',
                },

                [`.${prefixCls}-item`]: {
                    '&:hover': {
                        'background-color': token['itemHoverBg'],
                    },
                },
                [`.${prefixCls}-submenu-title`]: {
                    '&:hover': {
                        'background-color': token['itemHoverBg'],
                    },
                },

                [`.${prefixCls}-item-group-list .${prefixCls}-item`]: {
                    'padding': '0 16px 0 16px',
                },
                [`.${prefixCls}-item-group-list .${prefixCls}-submenu-title`]: {
                    'padding': '0 16px 0 16px',
                },

                [`.${prefixCls}-item-group-title`]: {
                    'height': 28,
                    'padding-top': 0,
                    'padding-bottom': 0,
                    'line-height': '34px',
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

    const [token] = useCacheToken(
        theme as any,
        [
            prepareComponentToken(outerToken),
        ],
        {
            salt: typeof hashed === 'string'
                ? hashed
                : Math.random().toString(36).slice(-8),
            cssVar: cssVar
                ? {
                    prefix: (typeof cssVar === 'object'
                        && cssVar.prefix)
                        || 'ant',
                }
                : undefined,
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
            genMenuStyle({
                clsPrefix, prefixCls, token, cssVar,
            }),
        ]
    );
    return wrapSSROsui;
};
