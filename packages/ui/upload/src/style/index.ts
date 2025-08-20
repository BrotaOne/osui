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
    Object.keys(token.Upload || {}).forEach(k => {
        ret[k] = token?.Upload?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;

export const genUploadStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
}) => CSSObject[] =
    ({clsPrefix, prefixCls, token}) => {
        const dupliStyle = {
            'background-color': token['themeComponentBg'],
            'border': `1px solid ${token['themeBorderColorBase']}`,

            '&:hover': {
                'border-color': token['themePrimaryColorHover'],

                [`span.${prefixCls}`]: {
                    'color': token['themePrimaryColorHover'],
                },
            },

            '&:active': {
                'border-color': token['themePrimaryColorActive'],

                [`span.${prefixCls}`]: {
                    'color': token['themePrimaryColorActive'],
                },
            },
        };

        return [{
            [`.${clsPrefix}`]: {
                [`&.${prefixCls}-wrapper`]: {
                    [`&.${prefixCls}-picture-card-wrapper .${prefixCls}.${prefixCls}-select`]: {
                        'border': `1px solid ${token['themeBorderColorBase']}`,
                    },
                },

                [`.${prefixCls}.${prefixCls}-drag`]: dupliStyle,
                [`.${prefixCls}-list-picture-card .${prefixCls}-list-item-uploading.${prefixCls}-list-item`]:
                    dupliStyle,
                [`.${prefixCls}.${prefixCls}-select-picture-card`]: dupliStyle,
                [`&.${prefixCls}-picture-card-wrapper .${prefixCls}.${prefixCls}-select`]: dupliStyle,

                '&-dashedBorder': {
                    [`&.${prefixCls}.${prefixCls}-drag`]: {
                        'border': `1px dashed  ${token['themeBorderColorBase']}`,
                    },

                    [`.${prefixCls}-list-picture-card.${prefixCls}-list-item-uploading.${prefixCls}-list-item`]: {
                        'border': `1px dashed  ${token['themeBorderColorBase']}`,
                    },

                    [`.${prefixCls}.@ant-prefix-upload-select-picture-card`]: {
                        'border': `1px dashed  ${token['themeBorderColorBase']}`,
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
            genUploadStyle({
                clsPrefix, prefixCls, token, cssVar: finalCssVar,
            }),
        ]
    );
    return wrapSSROsui;
};
