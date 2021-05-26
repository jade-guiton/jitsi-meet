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

export const PollItem = React.forwardRef<Props, HTMLElement>(({ pollId }, ref) => {
    const answered = useSelector(state => isPollAnswered(state, pollId));

    return (
        <div ref = { ref }>
            { answered
                ? <PollResults
                    key = { pollId }
                    pollId = { pollId }
                    showDetails = { false } />
                : <PollAnswer
                    pollId = { pollId } />
            }

        </div>
    );
});
