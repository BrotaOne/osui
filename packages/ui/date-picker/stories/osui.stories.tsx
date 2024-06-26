import React from 'react';
import {Row} from 'antd';
import dayjs from 'dayjs';
import DatePicker from '../src';
const {RangePicker} = DatePicker;

export default {
    title: 'DatePicker',
};

export const Demo = () => {
    return (
        <div style={{padding: 20}}>
            <h4>日期选择</h4>
            <Row style={{marginBottom: 20}}>
                <DatePicker />
            </Row>
            <h4>日期范围选择</h4>
            <Row style={{marginBottom: 20}}>
                <RangePicker />
            </Row>
            <h4>日期禁用选择</h4>
            <Row style={{marginBottom: 20}}>
                <DatePicker defaultValue={dayjs('2015-06-06')} disabled />
            </Row>
            <h4>选择月份</h4>
            <Row style={{marginBottom: 20}}>
                <DatePicker picker="month" />
            </Row>
            <h4>选择季度</h4>
            <Row style={{marginBottom: 20}}>
                <DatePicker picker="quarter" />
            </Row>
            <h4>选择年</h4>
            <Row style={{marginBottom: 20}}>
                <DatePicker picker="year" />
            </Row>
        </div>
    );
};
