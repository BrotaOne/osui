/**
 * @file 新手引导组件
 * 内置了restart的逻辑，内置使用受控Joyride
 * @author zhanglili，huoyuxuan
 */

import * as React from 'react';
import classNames from 'classnames';
import Joyride, {
    Props as DefaultJoyrideProps,
    TooltipRenderProps,
} from 'react-joyride';
import Button from '@osui/button';
import {IconCloseOutlined} from '@osui/icons';
import merge from 'lodash.merge';
// import './index.less';
import {ConfigProvider, theme} from 'antd';
import {useStyle} from './style';

const clsPrefix = 'osui-joyride';
const {useToken} = theme;

const stepDefaults = {
    disableBeacon: true,
    offset: 0,
};

const floater = {
    styles: {
        arrow: {
            length: 8,
            spread: 12,
        },
    },
};

interface TooltipProps extends TooltipRenderProps {
    close: () => any;
    hideStepsSize?: boolean;
}

const JoyrideTooltip: React.FC<TooltipProps> = props => {
    const {
        isLastStep,
        hideStepsSize,
        size,
        index,
        step,
        backProps,
        skipProps,
        closeProps,
        primaryProps,
        tooltipProps,
        close,
    } = props;
    const {getPrefixCls, theme} = React.useContext(ConfigProvider.ConfigContext);
    const cssVar = theme?.cssVar;
    const prefixCls = getPrefixCls('joyride');
    const antPrefix = getPrefixCls('');
    const wrapSSROsui = useStyle(clsPrefix, prefixCls, cssVar, antPrefix);
    const {hashId} = useToken();

    const handlePrimaryClick = React.useCallback(
        (args: any) => {
            if (isLastStep) {
                close();
            }
            else {
                primaryProps.onClick(args);
            }
        },
        [isLastStep, close, primaryProps]
    );

    return wrapSSROsui(
        <div className={`${clsPrefix}-tooltip ${hashId}`} {...tooltipProps}>
            <h4 className={`${clsPrefix}-header`}>
                {step.title || <span />}
                <IconCloseOutlined className={`${clsPrefix}-close`} {...closeProps} onClick={close} />
            </h4>
            <div className={`${clsPrefix}-content`}>{step.content}</div>
            <footer className={`${clsPrefix}-footer`}>
                <span
                    className={classNames({[`${clsPrefix}-hideStepsSize`]: hideStepsSize})}
                >
                    {`${index + 1}/${size}`}
                </span>
                <div>
                    {
                        (
                            <a className={`${clsPrefix}-back-link`} {...(index === 0 ? skipProps : backProps)}>
                                {index === 0 ? '' : '上一个'}
                            </a>
                        )
                    }
                    <Button className={`${clsPrefix}-next-button`} onClick={handlePrimaryClick}>
                        {isLastStep ? '知道啦' : '下一个' }
                    </Button>
                </div>
            </footer>
        </div>
    );
};

const defaultStyles = {
    options: {
        arrowColor: 'var(--theme-primary-color)',
    },
};

export interface JoyrideProps extends DefaultJoyrideProps {
    shouldRestart?: boolean;
    onFinish?: () => any;
    hideStepsSize?: boolean;
    prefixCls: string;
}

/**
 * @deprecated 推荐使用 Tour 组件，antd 原生
 */
const OSUIJoyride: React.FC<JoyrideProps> = props => {
    const {shouldRestart, run, onFinish, getHelpers, disableOverlayClose, hideStepsSize} = props;
    const [helpers, setHelpers] = React.useState<any>();
    // props的一些调整
    const steps = props.steps.map(step => ({...stepDefaults, ...step}));
    const innerFloaterProps = merge({}, floater, props.floaterProps);
    const innerStyles = merge({}, defaultStyles, props.styles);
    const close = React.useCallback(
        () => {
            onFinish && onFinish();
            // 使用内部helpers来处理
            if (shouldRestart) {
                helpers.reset(true);
            }
            else {
                helpers.close();
            }
        },
        [shouldRestart, onFinish, helpers]
    );

    const Tooltip = React.useMemo(
        () => {
            return (props: TooltipProps) => (<JoyrideTooltip {...props} close={close} hideStepsSize={hideStepsSize} />);
        },
        [close, hideStepsSize]
    ) as React.ElementType<TooltipRenderProps>;

    const handleGetHelpers = React.useCallback(
        helpers => {
            getHelpers && getHelpers(helpers);
            setHelpers(helpers);
        },
        [getHelpers]
    );

    if (process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.warn('Joyride 组件已弃用，请使用 @osui/ui 的 Tour 组件');
    }

    return (
        <Joyride
            {...props}
            disableOverlayClose={disableOverlayClose ?? true}
            tooltipComponent={Tooltip}
            floaterProps={innerFloaterProps}
            styles={innerStyles}
            steps={steps}
            run={run}
            getHelpers={handleGetHelpers}
        />
    );
};

export default OSUIJoyride;
