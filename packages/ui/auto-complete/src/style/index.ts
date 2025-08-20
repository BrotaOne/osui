import type {CSSObject} from '@ant-design/cssinjs';
import {useBrandContext} from '@osui/brand-provider';
import version from '@osui/version';
import {useStyleRegister, useCacheToken} from '@ant-design/cssinjs';
import {theme, ThemeConfig, version as antdVersion} from 'antd';
import {genSelectStyle} from '@osui/select/es/style';

const {useToken} = theme;

export const prepareComponentToken: (token: any) => any = token => {
    const ret: any = {};
    Object.keys(token).forEach(k => {
        ret[k] = token[k];
    });
    Object.keys(token.AutoComplete || {}).forEach(k => {
        ret[k] = token?.AutoComplete?.[k];
    });
    return ret;
};

type CssVar = boolean | {
    prefix?: string | undefined;
    key?: string | undefined;
} | undefined;

export const genAutoCompleteStyle: (props: {
    clsPrefix: string;
    prefixCls: string;
    token: Record<string, string>;
    cssVar: CssVar;
    selectAntdprefixCls: string;
}) => CSSObject[] =
    ({selectAntdprefixCls, token, cssVar}) => {
        const selectStyle = genSelectStyle({clsPrefix: 'osui-select', prefixCls: selectAntdprefixCls, token, cssVar});
        return selectStyle;
    };

export const useStyle = (
    clsPrefix: string,
    prefixCls: string,
    cssVar: ThemeConfig['cssVar'],
    antPrefix: string,
    selectAntdprefixCls: string
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
            genAutoCompleteStyle({
                clsPrefix, prefixCls, token, cssVar: finalCssVar, selectAntdprefixCls,
            }),
        ]
    );
    return wrapSSROsui;
};
