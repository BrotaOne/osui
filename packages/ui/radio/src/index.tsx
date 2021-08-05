import React from 'react';
import { Radio as AntdRadio } from 'antd';
import { RadioProps as AntdRadioProps, RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio';
import classNames from 'classnames';
import './index.less';

const AntdRadioGroup = AntdRadio.Group;

const clsPrefix = 'osui-radio';

export type RadioProps = AntdRadioProps;
export type RadioGroupProps = AntdRadioGroupProps;

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(({ className, ...restProps }, ref) => {
    return <AntdRadioGroup ref={ref} className={classNames(`${clsPrefix}-group`, className)} {...restProps} />;
});

interface RadioInterface extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
    Group: typeof RadioGroup;
    Button: typeof AntdRadio.Button;
}

const RefRadio: React.ForwardRefRenderFunction<HTMLElement, AntdRadioProps> = ({ className, ...restProps }, ref) => {
    return <AntdRadio ref={ref} className={classNames(clsPrefix, className)} {...restProps} />;
};

const Radio = React.forwardRef(RefRadio) as RadioInterface;

Radio.Group = RadioGroup;
Radio.Button = AntdRadio.Button;

export default Radio;
