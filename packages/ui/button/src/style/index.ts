import type {CSSObject} from '@ant-design/cssinjs';

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

const osuiButtonClassPrefix = 'osui-button';
const antPrefix = 'ant';

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

const genButtonTypesStyle = () => {
    const buttonTypes = ['icon', 'strong', 'primary', 'link', 'text'];

    return buttonTypes.map(type => {
        // const Type = type[0].toUpperCase() + type.substring(1);
        const buttonStyle = {
            ...buttonColorMixin(
                `var(--btn-${type}-color)`,
                `var(--btn-${type}-bg)`,
                `var(--btn-${type}-border-color)`,
                `var(--btn-${type}-icon-color)`
            ),

            '&:focus': {
                ...buttonColorMixin(
                    `var(--btn-${type}-focus-color)`,
                    `var(--btn-${type}-focus-bg)`,
                    `var(--btn-${type}-focus-border-color)`,
                    `var(--btn-${type}-focus-color)`
                ),

                boxShadow: 'var(--theme-component-focus-box-shadow)',
            },

            '&:hover':
                buttonColorMixin(
                    `var(--btn-${type}-hover-color)`,
                    `var(--btn-${type}-hover-bg)`,
                    `var(--btn-${type}-hover-border-color)`,
                    `var(--btn-${type}-hover-color)`
                ),


            '&:active': buttonColorMixin(
                `var(--btn-${type}-active-color)`,
                `var(--btn-${type}-active-bg)`,
                `var(--btn-${type}-active-border-color)`,
                `var(--btn-${type}-active-color)`
            ),

            '&[disabled]': buttonColorMixin(
                `var(--btn-${type}-disable-color)`,
                `var(--btn-${type}-disable-bg)`,
                `var(--btn-${type}-disable-border-color)`,
                `var(--btn-${type}-disable-color)`
            ),

            [`&.${osuiButtonClassPrefix}-loading`]: buttonColorMixin(
                `var(--btn-${type}-loading-color)`,
                `var(--btn-${type}-loading-bg)`,
                `var(--btn-${type}-loading-border-color)`,
                `var(--btn-${type}-loading-color)`
            ),

        };

        return {
            [`.${osuiButtonClassPrefix}.${antPrefix}-btn-${type}`]: buttonStyle,
            [`.${osuiButtonClassPrefix} .${antPrefix}-btn-${type}`]: buttonStyle,
        };
    });
};

// antd 移除了default的样式，需要直接应用到ant-btn上，需要放到gengerate上面，确保有type的能覆盖它
const genDefayltButtonStyle = () => {
    const defaultStyle = {
        ...buttonColorMixin(
            'var(--btn-default-color)',
            'var(--btn-default-bg)',
            'var(--btn-default-border-color)',
            'var(--btn-default-icon-color)'
        ),

        '&:focus': {
            ...buttonColorMixin(
                'var(--btn-default-focus-color)',
                'var(--btn-default-focus-bg)',
                'var(--btn-default-focus-border-color)',
                'var(--btn-default-focus-color)'
            ),
            boxShadow: 'var(--theme-component-focus-box-shadow)',
        },

        '&:hover': buttonColorMixin(
            'var(--btn-default-hover-color)',
            'var(--btn-default-hover-bg)',
            'var(--btn-default-hover-border-color)',
            'var(--btn-default-hover-color)'
        ),

        '&:active': buttonColorMixin(
            'var(--btn-default-active-color)',
            'var(--btn-default-active-bg)',
            'var(--btn-default-active-border-color)',
            'var(--btn-default-active-color)'
        ),

        '&[disabled]':
            buttonColorMixin(
                'var(--btn-default-disable-color)',
                'var(--btn-default-disable-bg)',
                'var(--btn-default-disable-border-color)',
                'var(--btn-default-disable-color)'
            ),


        [`&.${osuiButtonClassPrefix}-loading`]: buttonColorMixin(
            'var(--btn-default-loading-color)',
            'var(--btn-default-loading-bg)',
            'var(--btn-default-loading-border-color)',
            'var(--btn-default-loading-color)'
        ),
    };
    return {
        [`.${osuiButtonClassPrefix}.${antPrefix}-btn`]: defaultStyle,
        [`.${osuiButtonClassPrefix} .${antPrefix}-btn`]: defaultStyle,
    };
};

const genButtonFacesStyle = () => {
    const buttonFaces = ['success', 'error', 'warning'];

    return buttonFaces.map(face => ({
        [`.${antPrefix}-btn.${osuiButtonClassPrefix}.${osuiButtonClassPrefix}-face-${face}`]: {
            color: `var(--theme-${face}-color)`,
            borderColor: `var(--theme-${face}-color)`,

            '&:focus': {
                color: `var(--theme-${face}-color)`,
                borderColor: `var(--theme-${face}-color)`,
            },

            '&:hover': {
                color: `var(--theme-${face}-color-hover)`,
                borderColor: `var(--theme-${face}-color-hover)`,
            },

            '&:active': {
                color: `var(--theme-${face}-color-hover)`,
                backgroundColor: `var(--color-${face}-1)`,
                borderColor: `var(--theme-${face}-color-hover)`,
            },

            '&[disabled]': {
                color: `var(--color-${face}-3)`,
                backgroundColor: `var(--color-${face}-1)`,
                borderColor: `var(--color-${face}-2)`,
            },
        },

        [`.${osuiButtonClassPrefix}.${antPrefix}-btn-primary.${osuiButtonClassPrefix}-face-${face}`]: {
            color: 'var(--btn-primary-color)',
            backgroundColor: `var(--theme-${face}-color)`,
            borderColor: `var(--theme-${face}-color)`,

            '&:focus': {
                color: 'var(--btn-primary-color)',
                backgroundColor: `var(--theme-${face}-color)`,
                borderColor: `var(--theme-${face}-color)`,
            },

            '&:hover': {
                color: 'var(--btn-primary-color)',
                backgroundColor: `var(--theme-${face}-color-hover)`,
                borderColor: `var(--theme-${face}-color-hover)`,
            },

            '&:active': {
                color: 'var(--btn-primary-color)',
                backgroundColor: `var(--theme-${face}-color-active)`,
                borderColor: `var(--theme-${face}-color-active)`,
            },

            '&[disabled]': {
                color: 'var(--btn-primary-color)',
                backgroundColor: `var(--color-${face}-2)`,
                borderColor: `var(--color-${face}-2)`,
            },
        },
    }));
};

const genStyle = () => {
    return {
        // 对error text link 的button处理
        [`.${antPrefix}-btn.${antPrefix}-btn-text`]: {
            [`&.${osuiButtonClassPrefix}.${osuiButtonClassPrefix}-face-error`]: {
                background: 'transparent',
            },
        },
        [`.${antPrefix}-btn.${antPrefix}-btn-link`]: {
            [`&.${osuiButtonClassPrefix}.${osuiButtonClassPrefix}-face-error`]: {
                background: 'transparent',
            },
        },

        // ghost
        [`.${antPrefix}-btn.${antPrefix}-btn-background-ghost`]: {
            [`&.${osuiButtonClassPrefix}`]: {
                color: 'var(--theme-component-bg)',
                background: 'transparent',
                borderColor: 'var(--theme-component-bg)',

                '&:focus': {
                    color: 'var(--btn-default-hover-color)',
                    background: 'transparent',
                    borderColor: 'var(--btn-default-hover-border-color)',
                },
                '&:hover': {
                    color: 'var(--btn-default-hover-color)',
                    background: 'transparent',
                    borderColor: 'var(--btn-default-hover-border-color)',
                },

                '&[disabled]': {
                    color: 'var(--btn-default-disable-color)',
                    background: 'transparent',
                    borderColor: 'var(--btn-default-disable-border-color)',
                },
            },
        },

        [`.${osuiButtonClassPrefix}`]: {
            '&-flex-center': {
                display: 'inline-flex',
                alignItems: 'center',
            },
            [`&-flex-center.${antPrefix}-btn`]: {
                display: 'inline-flex',
                alignItems: 'center',
            },
            [`&-flex-center .${antPrefix}-btn`]: {
                display: 'inline-flex',
                alignItems: 'center',
            },

            '& .osui-icon + span': {
                marginLeft: '4px',
            },

            [`&.${antPrefix}-btn`]: {
                transition: 'none',
            },

            // loading的时候隐藏spinner后面的内容，除非强制keep-children
            '&-loading &-icon-spinner:not(&-keep-children) + *': {
                display: 'var(--btn-loading-text-display)',
            },

            [`&.${antPrefix}-btn-link`]: {
                height: 'auto',
                margin: 'var(--btn-link-margin)',
                padding: 'var(--btn-link-padding)',
                border: 0,

                '& span:hover': {
                    textDecoration: 'var(--btn-link-text-decoration)',
                },
            },
            [`&.${antPrefix}-btn-text`]: {
                height: 'auto',
                margin: 'var(--btn-link-margin)',
                padding: 'var(--btn-link-padding)',
                border: 0,

                '& span:hover': {
                    textDecoration: 'var(--btn-link-text-decoration)',
                },
            },

            // 只有icon的时候居中icon
            [`&.${antPrefix}-btn-icon-only`]: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            },

            // 去掉primary的box-shadow
            [`&.${antPrefix}-btn-primary`]: {
                boxShadow: 'none',
            },

            [`&.${antPrefix}-btn::before`]: {
                opacity: 0,
            },
        },

        // 仅icon形式
        [`.${osuiButtonClassPrefix}-btn-icon`]: {
            cursor: 'pointer',

            ...buttonColorMixin(
                'var(--btn-icon-color)',
                'var(--btn-icon-bg)',
                'var(--btn-icon-border-color)',
                'var(--btn-icon-color)'
            ),

            '&:focus': {
                ...buttonColorMixin(
                    'var(--btn-icon-focus-color)',
                    'var(--btn-icon-focus-bg)',
                    'var(--btn-icon-focus-border-color)',
                    'var(--btn-icon-focus-color)'
                ),

                boxShadow: 'var(--theme-component-focus-box-shadow)',
            },

            '&:hover': buttonColorMixin(
                'var(--btn-icon-hover-color)',
                'var(--btn-icon-hover-bg)',
                'var(--btn-icon-hover-border-color)',
                'var(--btn-icon-hover-color)'
            ),

            '&:active': buttonColorMixin(
                'var(--btn-icon-active-color)',
                'var(--btn-icon-active-bg)',
                'var(--btn-icon-active-border-color)',
                'var(--btn-icon-active-color)'
            ),


            '&[disabled]': {
                cursor: 'not-allowed',

                [`&.${osuiButtonClassPrefix}-icon-spinner`]: {
                    color: 'var(--theme-primary-color)',
                },

                ...buttonColorMixin(
                    'var(--btn-icon-disable-color)',
                    'transparent',
                    'var(--btn-icon-disable-border-color)',
                    'var(--btn-icon-disable-color)'
                ),
            },

            [`&.${osuiButtonClassPrefix}-loading`]: buttonColorMixin(
                'var(--btn-icon-loading-color)',
                'var(--btn-icon-loading-bg)',
                'var(--btn-icon-loading-border-color)',
                'var(--btn-icon-loading-color)'
            ),
        },

        // revert antd不太正常的修复 https://github.com/ant-design/ant-design/issues/12978
        [`a.${osuiButtonClassPrefix}`]: {
            [`&.${antPrefix}-btn`]: {
                paddingTop: 0,
                paddingBottom: 0,
            },
        },

        [`.${antPrefix}-btn.${antPrefix}-btn-sm`]: {
            padding: '2px 11px',
        },
    };
};

export const genButtonStyle: (
    prefixCls: string, token: any,
    cssVar: CssVar, clsPrefix: string
) => CSSObject[] =
    () => {
        return [
            genDefayltButtonStyle(),
            ...genButtonTypesStyle(),
            ...genButtonFacesStyle(),
            genStyle(),
        ];
    };
