import {
    messageGlobalHolderRender,
    useGetMessageWrapSSROsui,
} from '@osui/message';
import {
    modalGlobalHolderRender,
    useGetModalWrapSSROsui,
} from '@osui/modal';
import {ConfigProvider} from 'antd';
import React, {useLayoutEffect} from 'react';

type HolderRender = (children: React.ReactNode) => React.ReactNode;

let globalHolderRender: HolderRender | undefined = p => p;

export type Config = (props: Parameters<typeof ConfigProvider.config>, overide: boolean) => void;

export const config: Config = (props, overide) => {
    const holderRender = props?.[0]?.holderRender;
    if (overide || !holderRender || !globalHolderRender) {
        ConfigProvider.config(...props);
        globalHolderRender = holderRender;
        return;
    }
    ConfigProvider.config({
        ...props,
        holderRender: children => (globalHolderRender
            ? globalHolderRender(holderRender(children))
            : holderRender(children)),
    });
};

export const SetStaticMethodStyle = () => {
    const {wrapSSROsui: messageWrapSSROsui, hashId: messageHashId} = useGetMessageWrapSSROsui();
    const {wrapSSROsui: modalWrapSSROsui, hashId: modalHashId} = useGetModalWrapSSROsui();

    useLayoutEffect(
        () => {
            globalHolderRender = children => {
                const afterMessageChildren = messageGlobalHolderRender({
                    wrapSSROsui: messageWrapSSROsui,
                    hashId: messageHashId,
                })(children);
                const afterModalChildren = modalGlobalHolderRender({
                    wrapSSROsui: modalWrapSSROsui,
                    hashId: modalHashId,
                })(afterMessageChildren);
                return afterModalChildren;
            };
            ConfigProvider.config({
                holderRender: globalHolderRender,
            });
        }
    );
    return <></>;
};

