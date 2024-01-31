import {Layout as AntdLayout, type SiderProps as AntdSiderProps} from 'antd';
export type {LayoutProps} from 'antd';
import React, {useState} from 'react';
import {IconCaretDownOutlined} from '@osui/icons';
import './index.less';

type SiderProps = AntdSiderProps & {
    newCollapseStyle: boolean;
};

const clsPrefix = 'osui-sider';

function Sider({newCollapseStyle = false, ...props}: SiderProps) {
    const {
        collapsible,
        trigger: triggerIn,
        collapsed: collapsedIn,
        ...restProps
    } = props;
    const [collapsed, setCollapsed] = useState(false);
    const toggle = () => setCollapsed(v => !v);

    if (!newCollapseStyle) {
        return <AntdLayout.Sider {...props} />;
    }

    const collapse = collapsedIn || collapsed;
    const trigger = triggerIn
        ? <div onClick={toggle}>{triggerIn}</div>
        : (
            collapsible ? (
                <div
                    onClick={toggle}
                    className={
                        (clsPrefix + '-trapezoid')
                        + (collapse
                            ? ` ${clsPrefix}-trapezoid-collapse`
                            : '')
                    }
                >
                    <IconCaretDownOutlined />
                </div>
            )
                : <></>
        );

    return (
        <div className={clsPrefix + '-custom'}>
            <div className={
                `${clsPrefix}-container${collapse ? '-collapse' : ''}`
            }
            >
                <AntdLayout.Sider {...restProps} />
            </div>
            {trigger}
        </div>
    );
}

const Layout = {
    ...AntdLayout,
    Sider: Sider,
};

export default Layout;

