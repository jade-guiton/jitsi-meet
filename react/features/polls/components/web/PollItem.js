// @flow

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { openDialog } from '../../../base/dialog';
import { PollResults, PollResultsDialog } from '../index';


type Props = {

    /**
     * Id of the poll
     */
    pollId: number,

}

export const PollItem = ({
    pollId
}: Props) => {

    const dispatch = useDispatch();
    const showDetails = useCallback(() => {
        dispatch(openDialog(PollResultsDialog, { pollId }));
    }, [ pollId ]);

    return (
        <>
            <PollResults
                key = { pollId }
                pollId = { pollId }
                showDetails = { false } />
            <button
                className = 'poll-show-details'
                onClick = { showDetails }
                type = 'button'>
                See detailed results
            </button>
        </>
    );
};
