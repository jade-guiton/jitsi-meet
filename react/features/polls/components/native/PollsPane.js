// @flow

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import AbstractPollsPane from '../AbstractPollsPane';
import type { AbstractProps } from '../AbstractPollsPane';

import PollCreate from './PollCreate';
import PollsList from './PollsList';


const PollsPane = (props: AbstractProps) => {

    const { createMode, onCreate, setCreateMode, t } = props;

    return (
        <View>
            { createMode
                ? <PollCreate setCreateMode = { setCreateMode } />
                : <View>
                    <PollsList />
                    <Button
                        color = '#17a0db'
                        mode = 'contained'
                        onPress = { onCreate } >
                        {t('polls.create.button')}
                    </Button>
                </View>}
        </View>
    );
};

/*
 * We apply AbstractPollsPane to fill in the AbstractProps common
 * to both the web and native implementations.
 */
// eslint-disable-next-line new-cap
export default AbstractPollsPane(PollsPane);
