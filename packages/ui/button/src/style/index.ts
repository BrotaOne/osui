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
    Object.keys(token.Button || {}).forEach(k => {
        ret[k] = token?.Button?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;


const buttonColorMixin: any = (
    color: string,
    background: string,
    borderColor: string,
    iconColor: string
) => ({
    color,
    background,
    borderColor,

    svg: {
        color: iconColor,
    },
});

// const tokoneName2VarName = (tokenName: string) => {
//     const reg = new RegExp(/([aZ])([AZ])/g);
//     const name = tokenName.replace(reg, function rename(match, one, two) {
//         return one + '_' + two.toLowerCase()
//     });

//     return name;
// }

const genButtonTypesStyle = (
    clsPrefix: string,
    prefixCls: string,
    token: Record<string, string>
) => {
    const buttonTypes = ['icon', 'strong', 'primary', 'link', 'text'];

    return buttonTypes.map(type => {
        const Type = type[0].toUpperCase() + type.substring(1);
        const buttonStyle = {
            ...buttonColorMixin(
                token[`btn${Type}Color`],
                token[`btn${Type}Bg`],
                token[`btn${Type}BorderColor`],
                token[`btn${Type}IconColor`]
            ),

            '&:focus': {
                ...buttonColorMixin(
                    token[`btn${Type}FocusColor`],
                    token[`btn${Type}FocusBg`],
                    token[`btn${Type}FocusBorderColor`],
                    token[`btn${Type}FocusColor`]
                ),

                boxShadow: token['themeComponentFocusBoxShadow'],
            },

            '&:hover':
                buttonColorMixin(
                    token[`btn${Type}HoverColor`],
                    token[`btn${Type}HoverBg`],
                    token[`btn${Type}HoverBorderColor`],
                    token[`btn${Type}HoverColor`]
                ),


            '&:active': buttonColorMixin(
                token[`btn${Type}ActiveColor`],
                token[`btn${Type}ActiveBg`],
                token[`btn${Type}ActiveBorderColor`],
                token[`btn${Type}ActiveColor`]
            ),

            '&[disabled]': buttonColorMixin(
                token[`btn${Type}DisableColor`],
                token[`btn${Type}DisableBg`],
                token[`btn${Type}DisableBorderColor`],
                token[`btn${Type}DisableColor`]
            ),

            [`&.${clsPrefix}-loading`]: buttonColorMixin(
                token[`btn${Type}LoadingColor`],
                token[`btn${Type}LoadingBg`],
                token[`btn${Type}LoadingBorderColor`],
                token[`btn${Type}LoadingColor`]
            ),

        };

        return {
            [`.${clsPrefix}.${prefixCls}-${type}`]: buttonStyle,
            [`.${clsPrefix} .${prefixCls}-${type}`]: buttonStyle,
        };
    });
};

// antd 移除了default的样式，需要直接应用到antBtn上，需要放到gengerate上面，确保有type的能覆盖它
const genDefayltButtonStyle = (
    clsPrefix: string,
    prefixCls: string,
    token: Record<string, string>
) => {
    const defaultStyle = {
        ...buttonColorMixin(
            token['btnDefaultColor'],
            token['btnDefaultBg'],
            token['btnDefaultBorderColor'],
            token['btnDefaultIconColor']
        ),

        '&:focus': {
            ...buttonColorMixin(
                token['btnDefaultFocusColor'],
                token['btnDefaultFocusBg'],
                token['btnDefaultFocusBorderColor'],
                token['btnDefaultFocusColor']
            ),
            boxShadow: token['themeComponentFocusBoxShadow'],
        },

        '&:hover': buttonColorMixin(
            token['btnDefaultHoverColor'],
            token['btnDefaultHoverBg'],
            token['btnDefaultHoverBorderColor'],
            token['btnDefaultHoverColor']
        ),

        '&:active': buttonColorMixin(
            token['btnDefaultActiveColor'],
            token['btnDefaultActiveBg'],
            token['btnDefaultActiveBorderColor'],
            token['btnDefaultActiveColor']
        ),

        '&[disabled]':
            buttonColorMixin(
                token['btnDefaultDisableColor'],
                token['btnDefaultDisableBg'],
                token['btnDefaultDisableBorderColor'],
                token['btnDefaultDisableColor']
            ),


        [`&.${clsPrefix}-loading`]: buttonColorMixin(
            token['btnDefaultLoadingColor'],
            token['btnDefaultLoadingBg'],
            token['btnDefaultLoadingBorderColor'],
            token['btnDefaultLoadingColor']
        ),
    };
    return {
        [`.${clsPrefix}.${prefixCls}`]: defaultStyle,
        [`.${clsPrefix} .${prefixCls}`]: defaultStyle,
    };
};

const genButtonFacesStyle = (
    clsPrefix: string,
    prefixCls: string,
    token: Record<string, string>
) => {
    const buttonFaces = ['Success', 'Error', 'Warning'];

    return buttonFaces.map(face => ({
        [`.${prefixCls}.${clsPrefix}.${clsPrefix}-face-${face}`]: {
            color: token[`theme${face}Color`],
            borderColor: token[`theme${face}Color`],

            '&:focus': {
                color: token[`theme${face}Color`],
                borderColor: token[`theme${face}Color`],
            },

            '&:hover': {
                color: token[`theme${face}ColorHover`],
                borderColor: token[`theme${face}ColorHover`],
            },

            '&:active': {
                color: token[`theme${face}ColorHover`],
                backgroundColor: token[`color${face}1`],
                borderColor: token[`theme${face}ColorHover`],
            },

            '&[disabled]': {
                color: token[`color${face}3`],
                backgroundColor: token[`color${face}1`],
                borderColor: token[`color${face}2`],
            },
        },

        [`.${clsPrefix}.${prefixCls}-primary.${clsPrefix}-face-${face}`]: {
            color: token['btnPrimaryColor'],
            backgroundColor: token[`theme${face}Color`],
            borderColor: token[`theme${face}Color`],

            '&:focus': {
                color: token['btnPrimaryColor'],
                backgroundColor: token[`theme${face}Color`],
                borderColor: token[`theme${face}Color`],
            },

            '&:hover': {
                color: token['btnPrimaryColor'],
                backgroundColor: token[`theme${face}ColorHover`],
                borderColor: token[`theme${face}ColorHover`],
            },

            '&:active': {
                color: token['btnPrimaryColor'],
                backgroundColor: token[`theme${face}ColorActive`],
                borderColor: token[`theme${face}ColorActive`],
            },

            '&[disabled]': {
                color: token['btnPrimaryColor'],
                backgroundColor: token[`color${face}2`],
                borderColor: token[`color${face}2`],
            },
        },
    }));
};

const genStyle = (
    clsPrefix: string,
    prefixCls: string,
    token: Record<string, string>
) => {
    return {
        // 对error text link 的button处理
        [`.${prefixCls}.${prefixCls}-text`]: {
            [`&.${clsPrefix}.${clsPrefix}-faceError`]: {
                background: 'transparent',
            },
        },
        [`.${prefixCls}.${prefixCls}-link`]: {
            [`&.${clsPrefix}.${clsPrefix}-faceError`]: {
                background: 'transparent',
            },
        },

        // ghost
        [`.${prefixCls}.${prefixCls}-backgroundGhost`]: {
            [`&.${clsPrefix}`]: {
                color: token['themeComponentBg'],
                background: 'transparent',
                borderColor: token['themeComponentBg'],

                '&:focus': {
                    color: token['btnDefaultHoverColor'],
                    background: 'transparent',
                    borderColor: token['btnDefaultHoverBorderColor'],
                },
                '&:hover': {
                    color: token['btnDefaultHoverColor'],
                    background: 'transparent',
                    borderColor: token['btnDefaultHoverBorderColor'],
                },

                '&[disabled]': {
                    color: token['btnDefaultDisableColor'],
                    background: 'transparent',
                    borderColor: token['btnDefaultDisableBorderColor'],
                },
            },
        },

        [`.${clsPrefix}`]: {
            '&-flexCenter': {
                display: 'inlineFlex',
                alignItems: 'center',
            },
            [`&-flexCenter.${prefixCls}`]: {
                display: 'inlineFlex',
                alignItems: 'center',
            },
            [`&-flexCenter .${prefixCls}`]: {
                display: 'inlineFlex',
                alignItems: 'center',
            },

            '& .osuiIcon + span': {
                marginLeft: '4px',
            },

            [`&.${prefixCls}`]: {
                transition: 'none',
            },

            // loading的时候隐藏spinner后面的内容，除非强制keepChildren
            '&-loading &-iconSpinner:not(&-keepChildren) + *': {
                display: token['btnLoadingTextDisplay'],
            },

            [`&.${prefixCls}-link`]: {
                height: 'auto',
                margin: token['btnLinkMargin'],
                padding: token['btnLinkPadding'],
                border: 0,

                '& span:hover': {
                    textDecoration: token['btnLinkTextDecoration'],
                },
            },
            [`&.${prefixCls}-text`]: {
                height: 'auto',
                margin: token['btnLinkMargin'],
                padding: token['btnLinkPadding'],
                border: 0,

                '& span:hover': {
                    textDecoration: token['btnLinkTextDecoration'],
                },
            },

            // 只有icon的时候居中icon
            [`&.${prefixCls}-iconOnly`]: {
                display: 'inlineFlex',
                alignItems: 'center',
                justifyContent: 'center',
            },

            // 去掉primary的boxShadow
            [`&.${prefixCls}-primary`]: {
                boxShadow: 'none',
            },

            [`&.${prefixCls}::before`]: {
                opacity: 0,
            },
        },

        // 仅icon形式
        [`.${clsPrefix}-btnIcon`]: {
            cursor: 'pointer',

            ...buttonColorMixin(
                token['btnIconColor'],
                token['btnIconBg'],
                token['btnIconBorderColor'],
                token['btnIconColor']
            ),

            '&:focus': {
                ...buttonColorMixin(
                    token['btnIconFocusColor'],
                    token['btnIconFocusBg'],
                    token['btnIconFocusBorderColor'],
                    token['btnIconFocusColor']
                ),

                boxShadow: token['themeComponentFocusBoxShadow'],
            },

            '&:hover': buttonColorMixin(
                token['btnIconHoverColor'],
                token['btnIconHoverBg'],
                token['btnIconHoverBorderColor'],
                token['btnIconHoverColor']
            ),

            '&:active': buttonColorMixin(
                token['btnIconActiveColor'],
                token['btnIconActiveBg'],
                token['btnIconActiveBorderColor'],
                token['btnIconActiveColor']
            ),


            '&[disabled]': {
                cursor: 'notAllowed',

                [`&.${clsPrefix}-iconSpinner`]: {
                    color: token['themePrimaryColor'],
                },

                ...buttonColorMixin(
                    token['btnIconDisableColor'],
                    'transparent',
                    token['btnIconDisableBorderColor'],
                    token['btnIconDisableColor']
                ),
            },

            [`&.${clsPrefix}-loading`]: buttonColorMixin(
                token['btnIconLoadingColor'],
                token['btnIconLoadingBg'],
                token['btnIconLoadingBorderColor'],
                token['btnIconLoadingColor']
            ),
        },

        // revert antd不太正常的修复 https://github.com/antDesign/antDesign/issues/12978
        [`a.${clsPrefix}`]: {
            [`&.${prefixCls}`]: {
                paddingTop: 0,
                paddingBottom: 0,
            },
        },

        [`.${prefixCls}.${prefixCls}-sm`]: {
            padding: '2px 11px',
        },
    };
};

export const genButtonStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
}) => CSSObject[] =
    ({clsPrefix, prefixCls, token}) => {
        return [
            genDefayltButtonStyle(clsPrefix, prefixCls, token),
            ...genButtonTypesStyle(clsPrefix, prefixCls, token),
            ...genButtonFacesStyle(clsPrefix, prefixCls, token),
            genStyle(clsPrefix, prefixCls, token),
        ];
    };

export const useStyle = (
    clsPrefix: string,
    prefixCls: string,
    cssVar: ThemeConfig['cssVar']
) => {
    const outTheme = useBrandContext();
    // const cssVarIn = outTheme.designToken?.cssVar;
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
            genButtonStyle({
                clsPrefix, prefixCls, token, cssVar,
            }),
        ]
    );
    return wrapSSROsui;
};
