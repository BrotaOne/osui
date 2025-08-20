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
    Object.keys(token.BackTop || {}).forEach(k => {
        ret[k] = token?.BackTop?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;

export const genBackTopStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
}) => CSSObject[] =
    ({clsPrefix, token}) => {
        return [{
            [`.${clsPrefix}`]: {
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'width': token['backTopSize'],
                'height': token['backTopSize'],
                'background': token['backTopBg'],
                'border-radius': token['btnBorderRadiusBase'],

                '&:hover': {
                    'background': token['backTopHoverBg'],
                },

                '&:active': {
                    'background': token['backTopActiveBg'],
                },

                'svg': {
                    'width': token['backTopIconSize'],
                    'height': token['backTopIconSize'],
                    'color': token['colorGray1'],
                },

                '&-circle': {
                    'overflow': 'hidden',
                    'border-radius': '50%',
                },

                '.fade-enter.fade-enter-active': {
                    'animation-name': 'none',
                    'animation-play-state': 'none',
                },

                '.fade-appear.fade-appear-active': {
                    'animation-name': 'none',
                    'animation-play-state': 'none',
                },

                '&-transparent': {
                    'background': token['backTopTransparentBg'],

                    '&:hover': {
                        'background': token[' vvvv'],
                    },

                    '&:active': {
                        'background': token['backTopTransparentActiveBg'],
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
            genBackTopStyle({
                clsPrefix, prefixCls, token, cssVar: finalCssVar,
            }),
        ]
    );
    return wrapSSROsui;
};
