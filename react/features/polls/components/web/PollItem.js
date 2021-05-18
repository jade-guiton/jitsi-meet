// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { openDialog } from '../../../base/dialog';
import { isPollAnswered } from '../../functions';
import { PollAnswerDialog, PollResults, PollResultsDialog } from '../index';


type Props = {

    /**
     * Id of the poll
     */
    pollId: number,

}

export const PollItem = ({
    pollId
}: Props) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const showDetails = useCallback(() => {
        dispatch(openDialog(PollResultsDialog, { pollId }));
    }, [ pollId ]);
    const answerPoll = useCallback(() => {
        dispatch(openDialog(PollAnswerDialog, { pollId }));
    }, [ pollId ]);

    const answered = useSelector(state => isPollAnswered(state, pollId));

    return (
        <>
            <PollResults
                key = { pollId }
                pollId = { pollId }
                showDetails = { false } />

            { answered
                ? <button
                    className = 'poll-show-details'
                    onClick = { showDetails }
                    type = 'button'>
                    { t('polls.chat.details') }
                </button>
                : <button
                    className = 'poll-show-details'
                    onClick = { answerPoll }
                    type = 'button'>
                    { t('polls.chat.answer') }
                </button>
            }

        </>
    );
};
