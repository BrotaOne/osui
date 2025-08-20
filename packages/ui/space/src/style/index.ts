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
    Object.keys(token.Space || {}).forEach(k => {
        ret[k] = token?.Space?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;

export const genSpaceStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
}) => CSSObject[] =
    ({clsPrefix, prefixCls, token}) => {
        return [{
            [`.${clsPrefix}`]: {
                '&-small': {
                    'gap': '0 !important',
                },
                '&-middle': {
                    'gap': '0 !important',
                },
                '&-large': {
                    'gap': '0 !important',
                },

                [`&.${clsPrefix}-use-gap`]: {
                    [`&.${clsPrefix}-small`]: {
                        'gap': `${token['spaceSmall']} !important`,
                    },
                    [`&.${clsPrefix}-middle`]: {
                        'gap': `${token['spaceMiddle']} !important`,
                    },
                    [`&.${clsPrefix}-large`]: {
                        'gap': `${token['spaceLarge']} !important`,
                    },
                },
            },

            // 这个不支持 垂直 + 水平 + 垂直这种
            [`.${clsPrefix}:not(.${clsPrefix}-use-gap)`]: {
                [`&.${clsPrefix}-small.${prefixCls}-horizontal`]: {
                    [`.${prefixCls}-item:not(:last-child)`]: {
                        'margin-right': `${token['spaceSmall']} !important`,
                    },

                    // 水平里面的垂直不要margin-right
                    [`.${prefixCls}-vertical`]: {
                        [`.${prefixCls}-item`]: {
                            'margin-right': '0 !important',
                        },
                    },
                },

                [`&.${clsPrefix}-middle.${prefixCls}-horizontal`]: {
                    [`.${prefixCls}-item:not(:last-child)`]: {
                        'margin-right': `${token['spaceMiddle']} !important`,
                    },

                    [`.${prefixCls}-vertical`]: {
                        [`.${prefixCls}-item`]: {
                            'margin-right': '0 !important',
                        },
                    },
                },

                [`&.${clsPrefix}-large.${prefixCls}-horizontal`]: {
                    [`.${prefixCls}-item:not(:last-child)`]: {
                        'margin-right': `${token['spaceLarge']} !important`,
                    },

                    [`.${prefixCls}-vertical`]: {
                        [`.${prefixCls}-item`]: {
                            'margin-right': '0 !important',
                        },
                    },
                },

                [`&.${clsPrefix}-small.${prefixCls}-vertical`]: {
                    [`.${prefixCls}-item:not(:last-child)`]: {
                        'margin-bottom': `${token['spaceSmall']} !important`,
                    },

                    // 垂直里面的水平不要margin-bottom
                    [`.${prefixCls}-horizontal`]: {
                        [`.${prefixCls}-item`]: {
                            'margin-bottom': '0 !important',
                        },
                    },
                },

                [`&.${clsPrefix}-middle.${prefixCls}-vertical`]: {
                    [`.${prefixCls}-item:not(:last-child)`]: {
                        'margin-bottom': `${token['spaceMiddle']} !important`,
                    },

                    [`.${prefixCls}-horizontal`]: {
                        [`.${prefixCls}-item`]: {
                            'margin-bottom': '0 !important',
                        },
                    },
                },

                [`&.${clsPrefix}-large.${prefixCls}-vertical`]: {
                    [`.${prefixCls}-item:not(:last-child)`]: {
                        'margin-bottom': `${token['spaceLarge']} !important`,
                    },
                    [`.${prefixCls}-horizontal`]: {
                        [`.${prefixCls}-item`]: {
                            'margin-bottom': '0 !important',
                        },
                    },
                },
            },
        }];
    };

export const useStyle = (
    clsPrefix: string,
    prefixCls: string,
    cssVar: ThemeConfig['cssVar'],
    antPrefix: string
) => {
    const outTheme = useBrandContext();
    const hashed = outTheme.designToken?.hashed;
    const {token: outerToken, theme, hashId} = useToken();
    const finalCssVar = cssVar
        ? typeof cssVar === 'boolean'
            ? {
                prefix: `osui-${version}-${antPrefix}`,
                key: `osui-${version}-antd-${antdVersion}`,
            }
            : {
                prefix: cssVar.prefix || antPrefix,
                key: cssVar.key,
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
            genSpaceStyle({
                clsPrefix, prefixCls, token, cssVar: finalCssVar,
            }),
        ]
    );
    return wrapSSROsui;
};
