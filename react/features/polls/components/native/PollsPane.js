/* eslint-disable react-native/no-color-literals */
// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import AbstractPollsPane from '../AbstractPollsPane';
import type { AbstractProps } from '../AbstractPollsPane';

import PollCreate from './PollCreate';
import PollsList from './PollsList';

const styles = StyleSheet.create({

    // eslint-disable-next-line react-native/no-color-literals
    createPollButton: {
        padding: 8,
        margin: 4
    },

    // eslint-disable-next-line react-native/no-color-literals
    PollPane: {
        flex: 1,
        padding: 8
    },

    PollPaneContent: {
        justifyContent: 'space-between',
        flex: 1
    }
});

const PollsPane = (props: AbstractProps) => {

    const { createMode, onCreate, setCreateMode, t } = props;

    return (
        <View style = { styles.PollPane }>
            { createMode
                ? <PollCreate setCreateMode = { setCreateMode } />
                : <View style = { styles.PollPaneContent }>
                    {/* <View /> */}
                    <PollsList />
                    <Button
                        color = '#17a0db'
                        mode = 'contained'
                        onPress = { onCreate }
                        style = { styles.createPollButton } >
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
