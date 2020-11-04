import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'Example/Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove callback was cliked')
const changeStatusCallback = action('Change Status callback was cliked')
const changeTitleCallback = action('Change Title callback was cliked')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />

export const IsNotCompletedTask = Template.bind({})

const baseArgs = {
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
    removeTask: removeCallback
}

IsNotCompletedTask.args = {
    todolistId: "todolistId1",
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'CSS'}
}

export const CompletedTask = Template.bind({})

CompletedTask.args = {
    todolistId: "todolistId1",
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'}
}


