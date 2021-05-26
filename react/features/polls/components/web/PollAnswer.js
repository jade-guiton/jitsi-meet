// @flow

import { Checkbox } from '@atlaskit/checkbox';
import React, { useEffect } from 'react';

import AbstractPollAnswer from '../AbstractPollAnswer';
import type { AbstractProps } from '../AbstractPollAnswer';


const PollAnswer = (props: AbstractProps) => {

    const {
        checkBoxStates,
        poll,
        pollId,
        setCheckbox,
        setCheckBoxState,
        submitAnswer,
        t
    } = props;

    // Reset state if pollId changes
    // Useful in case of two successive answer dialogs
    useEffect(() => {
        setCheckBoxState(new Array(poll.answers.length).fill(false));
    }, [ pollId ]);

    return (
        <div className = 'poll-answer'>
            <div className = 'poll-header'>
                <div className = 'poll-question'>
                    <strong>{ poll.question }</strong>
                </div>
            </div>
            <ol className = 'poll-answer-list'>
                {
                    poll.answers.map((answer, index) => (
                        <li key = { index }>
                            <Checkbox
                                isChecked = { checkBoxStates[index] }
                                key = { index }
                                label = { <span>{ answer.name }</span> }
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange = { ev => setCheckbox(index, ev.target.checked) }
                                size = 'large' />
                        </li>
                    ))
                }
            </ol>
            <button
                aria-label = { t('polls.answer.submit') }
                className = { 'poll-primary-button' }
                onClick = { submitAnswer }>
                <span>{t('polls.answer.submit') }</span>
            </button>
        </div>
    );
};

/*
 * We apply AbstractPollAnswer to fill in the AbstractProps common
 * to both the web and native implementations.
 */
// eslint-disable-next-line new-cap
export default AbstractPollAnswer(PollAnswer);
