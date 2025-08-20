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
    Object.keys(token.Timeline || {}).forEach(k => {
        ret[k] = token?.Timeline?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;

export const genTimelineStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
}) => CSSObject[] =
    ({clsPrefix, prefixCls, token}) => {
        return [{
            [`.${clsPrefix}`]: {
                [`&.${prefixCls}`]: {
                    [`.${prefixCls}-item-head`]: {
                        'border': '2px solid transparent',
                        'border-color': token['themePrimaryColor'],
                    },

                    [`.${prefixCls}-item-tail`]: {
                        'inset-inline-start': '4px',
                        'border-inline-start': `1px solid  ${token['themeBorderColorBase']}`,
                    },
                },

                [`.${prefixCls}-item-content`]: {
                    'margin-left': token['timelineItemContentMarginLeft'],

                    // 里面是link时，颜色默认为文字色
                    '> a': {
                        'color': token['themeTextColor'],

                        '&:hover': {
                            'color': token['linkHoverColor'],
                        },

                        '&:active': {
                            'color': token['linkActiveColor'],
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
            genTimelineStyle({
                clsPrefix, prefixCls, token, cssVar: finalCssVar,
            }),
        ]
    );
    return wrapSSROsui;
};
