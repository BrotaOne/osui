import {createElement, CSSProperties, FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    inline?: boolean;
    vertical?: boolean;
    horizontal?: boolean;
}
/**
 * @deprecated 推荐使用 Flex 组件，antd 原生
 */
const FlexCentered: FC<Props> = ({inline = false, vertical = true, horizontal = false, style, ...props}) => {
    const baseStyle: CSSProperties = {
        display: inline ? 'inline-flex' : 'flex',
        alignItems: vertical ? 'center' : undefined,
        justifyContent: horizontal ? 'center' : undefined,
    };

    if (process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.warn('FlexCentered 组件已弃用，请使用 @osui/ui 的 Flex 组件');
    }

    return createElement(
        inline ? 'span' : 'div',
        {
            style: {...baseStyle, ...style},
            ...props,
        }
    );
};

export default FlexCentered;
