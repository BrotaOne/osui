import React from 'react';
import Button from '@osui/button';
import notification from '@osui/notification';

export default {
    title: '未实现/Notification',
    component: Notification,
};


export const Demo = () => {
    const openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                `
                This is the content of the notification.
                This is the content of the notification.
                This is the content of the notification.
                `,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    return (
        <Button type="primary" onClick={openNotification}>
            Open the notification box
        </Button>
    );
};