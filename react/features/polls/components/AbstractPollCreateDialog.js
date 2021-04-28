// @flow

import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { COMMAND_NEW_POLL } from '../constants';

export type AbstractProps = {
    question: string, setQuestion: string => void,
    answers: Array<string>,
    setAnswer: (number, string) => void,
    addAnswer: ?number => void,
    removeAnswer: number => void,
    onSubmit: Function,
};

export const AbstractPollCreateDialog = Component => props => {
    const [ question, setQuestion ] = useState('');

    const [ answers, setAnswers ] = useState([ '' ]);
    const setAnswer = useCallback((index, answer) => {
        const newAnswers = [ ...answers ];

        newAnswers[index] = answer;
        setAnswers(newAnswers);
    });
    const addAnswer = useCallback(i => {
        const newAnswers = [ ...answers ];

        newAnswers.splice(i, 0, '');
        setAnswers(newAnswers);
    });
    const removeAnswer = useCallback(i => {
        if (answers.length === 1) {
            return;
        }
        const newAnswers = [ ...answers ];

        newAnswers.splice(i, 1);
        setAnswers(newAnswers);
    });

    const conference = useSelector(state => state['features/base/conference'].conference);
    const onSubmit = useCallback(() => {
        conference.sendCommandOnce(COMMAND_NEW_POLL, {
            attributes: {
                pollId: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                sender: conference.myUserId(),
                title: question
            },
            children: answers.filter(answer => answer.length > 0).map(answer => {
                return { tagName: 'answer',
                    value: answer };
            })
        });

        return true;
    }, [ conference, question, answers ]);

    return (<Component
        { ...props }
        addAnswer = { addAnswer }
        answers = { answers }
        onSubmit = { onSubmit }
        question = { question }
        removeAnswer = { removeAnswer }
        setAnswer = { setAnswer }
        setQuestion = { setQuestion } />);
};
