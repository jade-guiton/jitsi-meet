// @flow

import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { chatStyles } from './styles';

import { PollItem } from '.';


const PollsList = () => {

    const polls = useSelector(state => state['features/polls'].polls);

    const listPolls = Object.keys(polls);

    return (
    <>
        {listPolls.length === 0
            ? <Text style = { chatStyles.noPollText } >
                The are no polls in the meeting yet. Start a poll here!
            </Text>
            : <ScrollView>
                {listPolls.map(id => (
                    <PollItem
                        key = { id }
                        pollId = { id } />
                )
                )}
            </ScrollView>
        }
    </>
    );
};

export default PollsList;
