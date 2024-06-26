import React from 'react';
import BrandProvider from '@osui/brand-provider';
import Spin from '@osui/spin';

export default {
    title: '反馈/Spin 加载中',
    component: Spin,
};

export const Demo = () => {
    return (
        <>
            <Spin size="small" />
            <br />
            <br />
            <Spin />
            <br />
            <br />
            <Spin size="large" />
        </>
    );
};

export const Api = () => {
    return (
        <BrandProvider>
            <a target="_blank" rel="noreferrer" href="https://ant.design/components/spin-cn/">Antd Spin API</a>
        </BrandProvider>
    );
};

