import React, {useContext} from 'react';
import {message as AntdMessage, ConfigProvider, theme as AntdTheme} from 'antd';
import {
    // MessageType,
    MessageInstance as AntdMessageInstance,
    ArgsProps as AntdMessageArgsProps,
    ConfigOptions,
} from 'antd/es/message/interface';
import {useStyle} from './style';
import {genMessage, genOpenMessage} from './genMessage';
const clsPrefix = 'osui-message';
const {useToken} = AntdTheme;

export type MessageInstance = AntdMessageInstance;
export interface MessageArgsProps extends AntdMessageArgsProps {
    original?: boolean;
    showCountDown?: boolean;
    showClose?: boolean;
    title?: string | React.ReactNode;
}

const keys = ['info', 'success', 'warning', 'error', 'loading'] as const;

const useMessage = (props: ConfigOptions) => {
    const {getPrefixCls, theme} = useContext(ConfigProvider.ConfigContext);
    const cssVar = theme?.cssVar;
    const prefixCls = getPrefixCls('message');
    const wrapSSROsui = useStyle(clsPrefix, prefixCls, cssVar);
    const {hashId} = useToken();
    const [originApi, holder] = AntdMessage.useMessage(props);
    const api = {
        ...originApi,
    };

    api.open = genOpenMessage(
        'open',
        hashId,
        wrapSSROsui,
        originApi
    );

    keys.forEach(type => {
        api[type] = genMessage(
            type,
            hashId,
            wrapSSROsui,
            originApi
        );
    });

    return [api, holder];
};

export default useMessage;
