// @flow

import { openDialog } from '../base/dialog';
import { getLocalParticipant } from '../base/participants';
import { MiddlewareRegistry } from '../base/redux';

import { RECEIVE_POLL, RECEIVE_ANSWER } from './actionTypes';
import { receiveAnswer, receivePoll } from './actions';
import PollAnswerDialog from './components/web/PollAnswerDialog';


MiddlewareRegistry.register(({ dispatch, getState }) => next => action => {
    const result = next(action);

    switch (action.type) {
    case RECEIVE_POLL:
        const { pollId } = action;
        dispatch(openDialog(PollAnswerDialog, {pollId: pollId}));
    }

    return result;
});

