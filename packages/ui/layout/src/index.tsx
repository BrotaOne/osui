import {
    Layout as AntdLayout,
    type SiderProps as AntdSiderProps,
    ConfigProvider,
} from 'antd';
export {type LayoutProps} from 'antd';
import {type CollapseType} from 'antd/es/layout/Sider';
import {theme} from 'antd';
import InternalLayout from 'antd/es/layout/layout';
import React, {useState, useContext} from 'react';
import {IconCaretDownOutlined} from '@osui/icons';
import {useBrandContext} from '@osui/brand-provider';
import {useStyleRegister, useCacheToken} from '@ant-design/cssinjs';
import {genStyle, prepareComponentToken} from './style';
// import './index.less';

const {useToken} = theme;

type SiderProps = AntdSiderProps & {
    newCollapseStyle: boolean;
};

type SiderType = React.ForwardRefExoticComponent<
    SiderProps
    & React.RefAttributes<HTMLDivElement>
>;

const clsPrefix = 'osui-sider';

const Sider: SiderType = React.forwardRef<HTMLDivElement, SiderProps>((
    {newCollapseStyle = false, className, trigger: triggerIn, onCollapse, ...props},
    ref
) => {
    const {getPrefixCls} = useContext(ConfigProvider.ConfigContext);
    const prefixCls = getPrefixCls('layout-sider', props.prefixCls);
    const outTheme = useBrandContext();
    const cssVar = outTheme.designToken?.cssVar;
    const {token: outerToken, theme, hashId} = useToken();
    const [token] = useCacheToken(
        theme,
        [prepareComponentToken(outerToken)],
        {
            cssVar: !cssVar
                ? undefined
                : cssVar === true
                    ? {prefix: 'ant'}
                    : cssVar,
        }
    );
    const wrapCSSVar = useStyleRegister(
        {theme, token, hashId, path: [prefixCls]},
        () => [
            genStyle(prefixCls, token, cssVar, clsPrefix),
        ]
    );
    const [collapsed, setCollapsed] = useState(
        'collapsed' in props ? props.collapsed : props.defaultCollapsed
    );
    const finaleClassName = [
        className ? className : '',
        newCollapseStyle && ! triggerIn ? ` ${clsPrefix}-new-collapse-style` : '',
        hashId,
    ].filter(v => v).join(' ');

    const collapsedWidth = newCollapseStyle
        ? {collapsedWidth: 0}
        : ('collapsedWidth' in props
            ? {collapsedWidth: props.collapsedWidth}
            : {}
        );

    const triggerInnerClassName = `${clsPrefix}-item`
        + (collapsed ? ` ${clsPrefix}-item-collapse` : '');

    const trigger = triggerIn ? {trigger: triggerIn}
        : newCollapseStyle
            ? {
                trigger: <IconCaretDownOutlined className={triggerInnerClassName} />,
            }
            : {};

    const handleSetCollapsed = (value: boolean, type: CollapseType) => {
        setCollapsed(value);
        onCollapse?.(value, type);
    };

    return wrapCSSVar(
        <AntdLayout.Sider
            {...props}
            ref={ref}
            className={finaleClassName}
            {...collapsedWidth}
            {...trigger}
            onCollapse={handleSetCollapsed}
        />
    );
});

const Layout: typeof InternalLayout & Omit<typeof AntdLayout, 'Sider'> & {
    Sider: SiderType;
} = Object.assign({}, AntdLayout, {Sider});

export default Layout;
