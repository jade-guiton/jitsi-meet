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
                console.log('JSON_MESSAGE_RECEIVED', data);
                
                if(data.type === COMMAND_NEW_POLL) {
                    const { question, answers, pollId, senderId } = data;
                    
                    const poll = {
                        senderId,
                        question: question,
                        answers: answers.map(answer => {
                            return {
                                name: answer,
                                voters: new Set()
                            };
                        })
                    };

                    store.dispatch(receivePoll(pollId, poll));
                    
                } else if(data.type === COMMAND_ANSWER_POLL) {
                    const { pollId, answers, senderId } = data;

                    const receivedAnswer: Answer = {
                        senderId,
                        pollId,
                        answers,
                    };

                    store.dispatch(receiveAnswer(pollId, receivedAnswer));
                }
            });
        }
    }
);
