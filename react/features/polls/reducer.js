// @flow

import { ReducerRegistry } from '../base/redux';

import { RECEIVE_POLL, RECEIVE_ANSWER } from './actionTypes';
import type { Poll, Answer } from './types';

const INITIAL_STATE = {
    polls: {}
};

ReducerRegistry.register('features/polls', (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case RECEIVE_POLL:
        console.log('Received poll', action.pollId,' :',  action.poll);

        return {
            ...state,
            polls: {
                ...state.polls,
                [action.pollId]: action.poll
            }
        };

    case RECEIVE_ANSWER:
        console.log('Reducer Received answer for poll', action.pollId, ': ', action.answer);


        // TODO add here logic to add answer to existing poll
        return {
            ...state,
            polls: {
                ...state.polls
            }
        };

    default:
        return state;
    }
});
