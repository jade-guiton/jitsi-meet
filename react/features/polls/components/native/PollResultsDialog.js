// @flow

import React from 'react';

import { CustomSubmitDialog } from '../../../base/dialog';

import PollResults from './PollResults';

type Props = {
    pollId: number,
};

const PollResultsDialog = (props: Props) => {
    const { pollId } = props;

    return (
        <CustomSubmitDialog
            okKey = 'polls.answer.close'
            titleKey = 'polls.answer.results'>
            <PollResults
                pollId = { pollId }
                showDetails = { true } />
        </CustomSubmitDialog>
    );
};

export default PollResultsDialog;
