/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {version as antdVersion} from 'antd';
import version from '../src';

export default {
    title: 'FE/version',
};

export const Demo = () => {
    return (
        <>
            <h1>Antd Version: {antdVersion}</h1>
            <h1>OSUI Version: {version}</h1>
        </>
    );
};

export const Api = () => {
    return (
        <>
            <a target="_blank" rel="noreferrer" href="https://ant.design/components/version-cn/">Antd Version API</a>
        </>
    );
};
