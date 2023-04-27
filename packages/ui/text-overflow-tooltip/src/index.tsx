import React, {useRef, useState} from 'react';
import Tooltip from '@osui/tooltip';
import type {TooltipProps} from 'antd/es/tooltip';
import './index.less';

const clsPrefix = 'osui-text-overflow-tooltip';

const isNodeOverflow = (node: HTMLElement) => {
    return node.scrollWidth > node.offsetWidth;
};

interface ChildStyleProps {
    width?: number;
    maxWidth?: number;
    style?: any;
}

export const TextOverflowTooltip = React.forwardRef<any, TooltipProps & ChildStyleProps>(
    ({width, maxWidth, style, ...props}, ref) => {
        const textRef = useRef(null);
        // 控制展示
        const [visible, setVisible] = useState(false);

        let child = props.children;
        if (typeof props.children === 'string') {
            const textNode = (<span ref={textRef} className={`${clsPrefix}-span`}>{child}</span>);
            // trigger为hover或click时，增加根据overflow展示tooltip
            let patchedEvent = {};
            if (!props.trigger || props.trigger.includes('hover')) {
                patchedEvent = {
                    ...patchedEvent,
                    onMouseEnter() {
                        if (isNodeOverflow(textRef.current!)) {
                            setVisible(true);
                        }
                    },
                    onMouseLeave() {
                        setVisible(false);
                    },
                };
            }
            if (props.trigger && props.trigger.includes('click')) {
                patchedEvent = {
                    ...patchedEvent,
                    onClick() {
                        if (isNodeOverflow(textRef.current!)) {
                            setVisible((visible: boolean) => !visible);
                        }
                    },
                };
            }

            child = React.cloneElement(
                textNode,
                {
                    style: {width, maxWidth, ...style},
                    ...patchedEvent,
                }
            );
        }

        return (
            <Tooltip ref={ref} {...props} visible={visible}>
                {child}
            </Tooltip>
        );
    }
);

export default TextOverflowTooltip;
