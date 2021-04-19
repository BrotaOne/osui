import React from 'react';
import ConfigProvider from '../src';

export default {
    title: 'FE/ConfigProvider',
    component: ConfigProvider,
};

export const Demo = () => {
    return (
        <ConfigProvider />
    );
};

export const Api = () => {
    return (
        <>
            <a href="https://ant.design/components/config-provider-cn/">Antd ConfigProvider API</a>
        </>
    );
};

