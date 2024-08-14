import React, {useContext} from 'react';
import {Radio as AntdRadio, CheckboxRef, ConfigProvider} from 'antd';
import {RadioProps as AntdRadioProps, RadioGroupProps as AntdRadioGroupProps} from 'antd/es/radio';
import classNames from 'classnames';
// import './index.less';
import {useStyle} from './style';

const AntdRadioGroup = AntdRadio.Group;

const clsPrefix = 'osui-radio';

export type RadioProps = AntdRadioProps;
export type RadioGroupProps = AntdRadioGroupProps;

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({className, ...restProps}, ref) => {
    const {getPrefixCls, theme} = useContext(ConfigProvider.ConfigContext);
    const cssVar = theme?.cssVar;
    const prefixCls = getPrefixCls('radio', restProps.prefixCls);
    const antPrefix = getPrefixCls('');
    const wrapSSROsui = useStyle(clsPrefix, prefixCls, cssVar, antPrefix);
    return wrapSSROsui(
        <AntdRadioGroup
            ref={ref}
            className={classNames(`${clsPrefix}-group`, className)}
            {...restProps}
        />
    );
});

export interface RadioInterface extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
    Group: typeof RadioGroup;
    Button: typeof AntdRadio.Button;
}

const RefRadio: React.ForwardRefRenderFunction<CheckboxRef, AntdRadioProps> = ({className, ...restProps}, ref) => {
    const {getPrefixCls, theme} = useContext(ConfigProvider.ConfigContext);
    const cssVar = theme?.cssVar;
    const prefixCls = getPrefixCls('alert', restProps.prefixCls);
    const wrapSSROsui = useStyle(clsPrefix, prefixCls, cssVar);
    return wrapSSROsui(
        <AntdRadio
            ref={ref}
            className={classNames(clsPrefix, className)}
            {...restProps}
        />
    );
};

const Radio = React.forwardRef(RefRadio) as RadioInterface;

Radio.Group = RadioGroup;
Radio.Button = AntdRadio.Button;

export type {RadioChangeEvent} from 'antd';
export default Radio;
