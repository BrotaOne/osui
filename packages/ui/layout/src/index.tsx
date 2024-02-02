import {Layout as AntdLayout, type SiderProps as AntdSiderProps} from 'antd';
export type {LayoutProps} from 'antd';
import {type CollapseType} from 'antd/es/layout/Sider';
import InternalLayout from 'antd/es/layout/layout';
import React, {useState} from 'react';
import {IconCaretDownOutlined} from '@osui/icons';
import './index.less';

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
    const [collapsed, setCollapsed] = useState(
        'collapsed' in props ? props.collapsed : props.defaultCollapsed
    );
    const finaleClassName = [
        className ? className : '',
        newCollapseStyle ? ` ${clsPrefix}-new-collapse-style` : '',
    ].filter(v => v).join(' ');

    const collapsedWidth = newCollapseStyle
        ? {collapsedWidth: 0}
        : ('collapsedWidth' in props
            ? {collapsedWidth: props.collapsedWidth}
            : {}
        );

    const triggerInnerClassName = `${clsPrefix}-sider-item`
        + (collapsed ? ` ${clsPrefix}-sider-item-collapse` : '');

    const trigger = triggerIn ? {trigger: triggerIn}
        : newCollapseStyle
            ? {
                trigger:
                <IconCaretDownOutlined className={triggerInnerClassName} />,
            }
            : {};

    const handleSetCollapsed = (value: boolean, type: CollapseType) => {
        setCollapsed(value);
        onCollapse?.(value, type);
    };

    return (
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
