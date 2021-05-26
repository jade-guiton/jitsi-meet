// @flow

import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { isPollAnswered } from '../../functions';

import { PollAnswer, PollResults } from '.';

type Props = {

    /**
     * Id of the poll
     */
    pollId: string,

}

const PollItem = ({ pollId }: Props) => {
    const answered = useSelector(state => isPollAnswered(state, pollId));

    return (
        <View>
            { answered
                ? <PollResults
                    key = { pollId }
                    pollId = { pollId }
                    showDetails = { false } />
                : <PollAnswer
                    pollId = { pollId } />
            }

        </View>
    );
};

export default PollItem;
