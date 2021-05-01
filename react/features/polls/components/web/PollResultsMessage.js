// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { openDialog } from '../../../base/dialog';

import PollResults from './PollResults';
import PollResultsDialog from './PollResultsDialog';

const PollResultsMessage = ({ pollId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const showDetails = useCallback(() => {
        dispatch(openDialog(PollResultsDialog, { pollId }));
    }, [ pollId ]);

    return <>
        <PollResults
            detailedVotes = { false }
            displayQuestion = { true }
            pollId = { pollId } />
        <div className = 'poll-message-footer'>
            <div className = 'poll-notice'>
                { t('polls.chat.notice') }
            </div>
            <button
                className = 'poll-show-details'
                onClick = { showDetails }
                type = 'button'>
                { t('polls.chat.details') }
            </button>
        </div>
    </>;
};

export default PollResultsMessage;
