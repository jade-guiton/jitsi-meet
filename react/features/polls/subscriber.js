// @flow

import { getCurrentConference } from '../base/conference';
import { StateListenerRegistry } from '../base/redux';

import { receiveAnswer, receivePoll } from './actions';
import { COMMAND_NEW_POLL, COMMAND_ANSWER_POLL } from './constants';
import type { Answer } from './types';

StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, store, previousConference) => {
        if (conference && conference !== previousConference) {
            conference.room.addListener('xmmp.json_message_received', (senderJid, data) => {
                if(data.type === COMMAND_NEW_POLL) {
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
                    
                } else if(data.type === COMMAND_ANSWER_POLL) {
                    const { pollId, answers, senderId, voterName } = data;

                    const receivedAnswer: Answer = {
                        senderId,
                        voterName,
                        pollId,
                        answers,
                    };

                    store.dispatch(receiveAnswer(pollId, receivedAnswer));
                    
                } else if(data.type === 'old-polls') {
                    const { polls } = data;
                    
                    for(const pollId in polls) {
                        const { senderId, question, answers } = polls[pollId];
                        const poll = {
                            senderId,
                            answered: true,
                            question,
                            answers: answers.map(answer => {
                                const voters = new Map();
                                for(const voterId in answer.voters) {
                                    voters.set(voterId, answer.voters[voterId]);
                                }
                                return {
                                    name: answer.name,
                                    voters
                                };
                            })
                        };
                        store.dispatch(receivePoll(pollId, poll, false));
                    }
                }
            });
        }
    }
);
