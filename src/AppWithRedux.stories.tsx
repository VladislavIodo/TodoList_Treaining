import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <Provider store={store}><AppWithRedux /></Provider>

export const BaseExample = Template.bind({})
BaseExample.args = {}




