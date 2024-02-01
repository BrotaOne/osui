import {Layout as AntdLayout, type SiderProps as AntdSiderProps} from 'antd';
export type {LayoutProps} from 'antd';
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
    {newCollapseStyle = false, ...props},
    ref
) => {
    const {
        onCollapse,
        collapsible,
        defaultCollapsed,
        trigger: triggerIn,
        collapsed: collapsedIn,
        ...restProps
    } = props;
    const [collapsed, setCollapsed] = useState(defaultCollapsed || false);
    const toggle = () => {
        setCollapsed(!collapsed);
        onCollapse && onCollapse(!collapsed, 'clickTrigger');
    };

    const siderProps = newCollapseStyle ? restProps : props;
    const siderDom = <AntdLayout.Sider {...siderProps} ref={ref} />;

    if (!newCollapseStyle) {
        return siderDom;
    }

    const collapse = collapsedIn || collapsed;
    const triggerClassName = (clsPrefix + '-trapezoid')
        + (collapse
            ? ` ${clsPrefix}-trapezoid-collapse`
            : '');
    const triggerInnerClassName = `${clsPrefix}-collapse-item`;
    const trigger = collapsible ? (
        <div
            onClick={toggle}
            className={triggerClassName}
        >
            {triggerIn
                ? <div className={triggerInnerClassName}>{triggerIn}</div>
                : <IconCaretDownOutlined className={triggerInnerClassName} />
            }
        </div>
    )
        : <></>;
    return (
        <div className={clsPrefix + '-custom'}>
            <div className={`${clsPrefix}-container${collapse ? '-collapse' : ''}`}>
                {siderDom}
            </div>
            {trigger}
        </div>
    );
});

const Layout: typeof InternalLayout & Omit<typeof AntdLayout, 'Sider'> & {
    Sider: SiderType;
} = Object.assign({}, AntdLayout, {Sider});

export default Layout;
