// @flow

import { getCurrentConference } from '../base/conference';
import { StateListenerRegistry } from '../base/redux';

import { receiveAnswer, receivePoll } from './actions';
import { COMMAND_NEW_POLL, COMMAND_ANSWER_POLL, COMMAND_OLD_POLLS } from './constants';
import type { Answer } from './types';


const parsePollData = pollData => {
    if (typeof pollData !== 'object' || pollData === null) {
        return null;
    }
    const { senderId, question, answers } = pollData;

    if (typeof senderId !== 'string' || typeof question !== 'string' || !(answers instanceof Array)) {
        return null;
    }

    const answers2 = [];

    for (const answer of answers) {
        const voters = new Map();

        for (const [ voterId, voter ] of Object.entries(answer.voters)) {
            if (typeof voter !== 'string') {
                return null;
            }
            voters.set(voterId, voter);
        }

        answers2.push({
            name: answer.name,
            voters
        });
    }

    return {
        senderId,
        question,
        answered: true,
        answers: answers2
    };
};

StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, store, previousConference) => {
        if (conference && conference !== previousConference) {
            conference.room.addListener('xmmp.json_message_received', (senderJid, data) => {
                if (data.type === COMMAND_NEW_POLL) {
                    const { question, answers, pollId, senderId } = data;

                    const poll = {
                        senderId,
                        answered: false,
                        question,
                        answers: answers.map(answer => {
                            return {
                                name: answer,
                                voters: new Map()
                            };
                        })
                    };

                    const dialogComponent = store.getState()['features/base/dialog'].component;
                    const queue = dialogComponent !== undefined;

                    store.dispatch(receivePoll(pollId, poll, queue));

                } else if (data.type === COMMAND_ANSWER_POLL) {
                    const { pollId, answers, senderId, voterName } = data;

                    const receivedAnswer: Answer = {
                        senderId,
                        voterName,
                        pollId,
                        answers
                    };

                    store.dispatch(receiveAnswer(pollId, receivedAnswer));

                } else if (data.type === COMMAND_OLD_POLLS) {
                    const { polls } = data;

                    for (const [ pollId, pollData ] of Object.entries(polls)) {
                        const poll = parsePollData(pollData);

                        if (poll === null) {
                            console.warn('[features/polls] Invalid old poll data');
                        } else {
                            store.dispatch(receivePoll(pollId, poll, false));
                        }
                    }
                }
            });
        }
    }
);
