// @flow

import React, { useCallback, useState } from 'react';
<<<<<<< HEAD
import type { AbstractComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


import { getParticipantDisplayName } from '../../base/participants';
=======
import { useSelector } from 'react-redux';

>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
import { COMMAND_NEW_POLL } from '../constants';

/*
 * Props that will be passed by the AbstractPollCreateDialog to its
 * concrete implementations (web/native).
 **/
export type AbstractProps = {
    question: string, setQuestion: string => void,
    answers: Array<string>,
    setAnswer: (number, string) => void,
    addAnswer: ?number => void,
<<<<<<< HEAD
    moveAnswer: (number, number) => void,
    removeAnswer: number => void,
    onSubmit: Function,
    t: Function,
=======
    removeAnswer: number => void,
    onSubmit: Function,
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
};

/*
 * Higher Order Component taking in a concrete PollCreateDialog component and
 * augmenting it with state/behavior common to both web and native implementations.
 */
<<<<<<< HEAD
const AbstractPollCreateDialog = (Component: AbstractComponent<AbstractProps>) => (props: any) => {
    const [ question, setQuestion ] = useState('');

    const [ answers, setAnswers ] = useState([ '' ]);

=======
export const AbstractPollCreateDialog = Component => props => {
    const [ question, setQuestion ] = useState('');

    const [ answers, setAnswers ] = useState([ '' ]);
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
    const setAnswer = useCallback((i, answer) => {
        const newAnswers = [ ...answers ];

        newAnswers[i] = answer;
        setAnswers(newAnswers);
    });
<<<<<<< HEAD

=======
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
    const addAnswer = useCallback(i => {
        const newAnswers = [ ...answers ];

        newAnswers.splice(i === undefined ? answers.length : i, 0, '');
        setAnswers(newAnswers);
    });
<<<<<<< HEAD

    const moveAnswer = useCallback((i, j) => {
        const newAnswers = [ ...answers ];

        const answer = answers[i];

        newAnswers.splice(i, 1);
        newAnswers.splice(j, 0, answer);
        setAnswers(newAnswers);
    });

=======
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
    const removeAnswer = useCallback(i => {
        if (answers.length === 1) {
            return;
        }
        const newAnswers = [ ...answers ];

        newAnswers.splice(i, 1);
        setAnswers(newAnswers);
    });

    const conference = useSelector(state => state['features/base/conference'].conference);
<<<<<<< HEAD
    const myId = conference.myUserId();
    const myName = useSelector(state => getParticipantDisplayName(state, myId));


    const onSubmit = useCallback(() => {
        const filteredAnswers = answers.filter(answer => answer.trim().length > 0);

        if (filteredAnswers.length === 0) {
            return false;
        }

        conference.sendMessage({
            type: COMMAND_NEW_POLL,
            pollId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36),
            senderId: myId,
            senderName: myName,
            question,
            answers: filteredAnswers
=======
    const onSubmit = useCallback(() => {
        conference.sendCommandOnce(COMMAND_NEW_POLL, {
            attributes: {
                pollId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                senderId: conference.myUserId(),
                question
            },
            children: answers
                .filter(answer => answer.trim().length > 0)
                .map(answer => {
                    return { tagName: 'answer',
                        value: answer };
                })
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
        });

        return true;
    }, [ conference, question, answers ]);

<<<<<<< HEAD
    const { t } = useTranslation();

=======
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
    return (<Component
        { ...props }
        addAnswer = { addAnswer }
        answers = { answers }
<<<<<<< HEAD
        moveAnswer = { moveAnswer }
=======
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
        onSubmit = { onSubmit }
        question = { question }
        removeAnswer = { removeAnswer }
        setAnswer = { setAnswer }
<<<<<<< HEAD
        setQuestion = { setQuestion }
        t = { t } />);
};

export default AbstractPollCreateDialog;
=======
        setQuestion = { setQuestion } />);
};
>>>>>>> 8f7dd614b (feat(polls) Implemented simple poll creation and answer modals in web app)
