// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import { isPollAnswered } from '../../functions';
import { PollAnswer, PollResults } from '../index';


type Props = {

    /**
     * Id of the poll
     */
    pollId: string,

}

export const PollItem = ({
    pollId
}: Props) => {

    const answered = useSelector(state => isPollAnswered(state, pollId));

    return (
        <>

            { answered
                ? <PollResults
                    key = { pollId }
                    pollId = { pollId }
                    showDetails = { false } />
                : <PollAnswer
                    pollId = { pollId } />
            }

        </>
    );
};
