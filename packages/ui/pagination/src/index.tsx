import {Pagination as AntdPagination, ConfigProvider, theme} from 'antd';
import type {PaginationProps} from 'antd/es/Pagination';
import React, {FC, useContext} from 'react';
import classNames from 'classnames';
// import './index.less';
import {useStyle} from './style';
const {useToken} = theme;
const clsPrefix = 'osui-pagination';

const icloudLocale = {'jump_to': '跳转至', 'page': '', 'jump_to_confirm': 'Go'};
// eslint-disable-next-line complexity
const Pagination: FC<PaginationProps> = props => {
    const {getPrefixCls, theme} = useContext(ConfigProvider.ConfigContext);
    const cssVar = theme?.cssVar;
    const prefixCls = getPrefixCls('pagination', props.prefixCls);
    const antPrefix = getPrefixCls('', props.prefixCls);
    const wrapSSROsui = useStyle(clsPrefix, prefixCls, cssVar, antPrefix);
    const {hashId} = useToken();
    const showQuickJumper = (props.showQuickJumper === true || props.showQuickJumper === undefined)
        ? {goButton: true}
        : props.showQuickJumper;

    const showSizeChanger = !props.simple
        && props.showSizeChanger !== false
        && ((props?.total && props?.total > (props.totalBoundaryShowSizeChanger || 50))
        );

    const className = classNames(
        hashId,
        clsPrefix,
        showQuickJumper
            ? props.simple
                ? 'simple-showQuickJumper'
                : 'showQuickJumper' : '',
        showSizeChanger ? 'showSizeChanger' : ''
    );

    return wrapSSROsui(
        <div className={className}>
            <AntdPagination
                {...props}
                locale={{...icloudLocale, ...props.locale}}
                showQuickJumper={showQuickJumper}
            />
        </div>
    );
};

export default Pagination;

