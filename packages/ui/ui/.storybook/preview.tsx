import React, {useState} from 'react';
import type {Preview} from '@storybook/react-vite';
import '../../../ui-theme/icloud-theme/es/vars.css';
import BrandProvider from '@osui/brand-provider';
import '../../../storybookbase/global.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        docs: {
            codePanel: true,
        },
    },
    decorators: [
        (Story) => {
            const [cssVar, setCssVar] = useState(false);
            const onClick = () => setCssVar(v => !v);
            return (
                <BrandProvider brand="icloud" theme={{cssVar}}>
                    <div style={{marginBottom: 10}}>
                        <button onClick={onClick}>
                            {cssVar ? '关闭' : '开启'}cssVar
                        </button>
                    </div>
                    <Story />
                </BrandProvider>
            );
        },
    ],
};

export default preview;
