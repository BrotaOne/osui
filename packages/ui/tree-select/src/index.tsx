import React, {useContext} from 'react';
import {TreeSelect as AntdTreeSelect, TreeSelectProps as AntdTreeSelectProps, ConfigProvider} from 'antd';
import classNames from 'classnames';
import {IconDownOutlined} from '@osui/icons';
import hoistNonReactStatics from 'hoist-non-react-statics';
import type {BaseSelectRef} from 'rc-select';
import type {BaseOptionType, DefaultOptionType} from 'antd/es/select';
// import './index.less';
import {useStyle} from './style';

const clsPrefix = 'osui-tree-select';

const InternalTreeSelect = <OptionType extends BaseOptionType | DefaultOptionType = BaseOptionType>(
    {className, popupClassName, ...props}: AntdTreeSelectProps<OptionType>,
    ref: React.Ref<BaseSelectRef>
) => {
    const {getPrefixCls, theme} = useContext(ConfigProvider.ConfigContext);
    const cssVar = theme?.cssVar;
    const prefixCls = getPrefixCls('select-tree', props.prefixCls);
    const wrapSSROsui = useStyle(clsPrefix, prefixCls, cssVar);
    const innerClassName = classNames(className, clsPrefix);
    const innerPopupClassName = classNames(popupClassName, `${clsPrefix}-dropdown`);
    const innerSwitcherIcon = props.switcherIcon ?? (
        <span role="img" aria-label="caret-down">
            <IconDownOutlined className={classNames(`${clsPrefix}-switcherIcon`)} />
        </span>
    );
    return wrapSSROsui(
        <AntdTreeSelect
            ref={ref}
            className={innerClassName}
            popupClassName={innerPopupClassName}
            {...props}
            switcherIcon={innerSwitcherIcon}
        />
    );
};

const TreeSelectRef = React.forwardRef(InternalTreeSelect) as <
    ValueType = any,
    OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>(
    props: React.PropsWithChildren<AntdTreeSelectProps<ValueType, OptionType>> & {
        ref?: React.Ref<BaseSelectRef>;
    },
) => React.ReactElement;

// 提升TreeSelect属性
hoistNonReactStatics(TreeSelectRef, AntdTreeSelect);

// 类型定义
type InternalTreeSelectType = typeof TreeSelectRef;
export interface TreeSelectInterface extends InternalTreeSelectType {
    TreeNode: typeof AntdTreeSelect.TreeNode;
    SHOW_ALL: typeof AntdTreeSelect.SHOW_ALL;
    SHOW_PARENT: typeof AntdTreeSelect.SHOW_PARENT;
    SHOW_CHILD: typeof AntdTreeSelect.SHOW_CHILD;
}
const TreeSelect = TreeSelectRef as TreeSelectInterface;

export type {TreeSelectProps} from 'antd';

export default TreeSelect;

export {highlightMatchText} from './helpers';
