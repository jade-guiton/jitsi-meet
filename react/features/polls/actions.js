// @flow

import {
    CLOSE_POLL_TAB,
    RECEIVE_ANSWER,
    RECEIVE_POLL,
    REGISTER_VOTE,
    RETRACT_VOTE
} from './actionTypes';
import type { Answer, Poll } from './types';

/**
 * Action to signal that a new poll was received.
 *
 * @param {string} pollId - The id of the incoming poll.
 * @param {Poll} poll - The incoming Poll object.
 * @param {boolean} notify - Whether to send or not a notification.
 * @returns {{
 *     type: RECEIVE_POLL,
 *     poll: Poll,
 *     pollId: string,
 *     notify: boolean
 * }}
 */
export const receivePoll = (pollId: string, poll: Poll, notify: boolean) => {
    return {
        type: RECEIVE_POLL,
        poll,
        pollId,
        notify
    };
};

/**
 * Action to signal that a new answer was received.
 *
 * @param {string} pollId - The id of the incoming poll.
 * @param {Answer} answer - The incoming Answer object.
 * @returns {{
 *     type: RECEIVE_ANSWER,
 *     answer: Answer,
 *     pollId: string
 * }}
 */
export const receiveAnswer = (pollId: string, answer: Answer) => {
    return {
        type: RECEIVE_ANSWER,
        answer,
        pollId
    };
};

/**
 * Action to register a vote on a poll.
 *
 * @param {string} pollId - The id of the poll.
 * @param {?Array<boolean>} answers - The new answers.
 * @returns {{
 *     type: REGISTER_VOTE,
 *     answers: ?Array<boolean>,
 *     pollId: string
 * }}
 */
export const registerVote = (pollId: string, answers: Array<boolean> | null) => {
    return {
        type: REGISTER_VOTE,
        answers,
        pollId
    };
};

/**
 * Action to retract a vote on a poll.
 *
 * @param {string} pollId - The id of the poll.
 * @returns {{
 *     type: RETRACT_VOTE,
 *     pollId: string
 * }}
 */
export const retractVote = (pollId: string) => {
    return {
        type: RETRACT_VOTE,
        pollId
    };
};

/**
 * Action to signal the closing of the chat dialog.
 *
 * @returns {{
 *     type: CLOSE_CHAT
 * }}
 */
export function closePollTab() {
    return {
        type: CLOSE_POLL_TAB
    };
}