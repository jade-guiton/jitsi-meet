// @flow

import { FieldTextStateless } from '@atlaskit/field-text';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { AbstractPollCreateDialog, AbstractProps } from '../AbstractPollCreateDialog';

type Props = AbstractProps & {

    /**
     * The i18n translate function.
     */
    t: Function
};

const PollCreateDialog = (props: Props) => {
    const {
        question, setQuestion,
        answers, setAnswer, addAnswer, removeAnswer,
        onSubmit,
        t
    } = props;

    const answerInputs = useRef([]);
    const registerFieldRef = useCallback((i, r) => {
        if (r === null) {
            return;
        }
        answerInputs.current[i] = r.input;
    }, [ answerInputs ]);

    useEffect(() => {
        answerInputs.current = answerInputs.current.slice(0, answers.length);
    }, [ answers ]);

    const [ lastFocus, requestFocus ] = useState(null);

    useEffect(() => {
        if (lastFocus === null) {
            return;
        }
        const input = answerInputs.current[lastFocus];

        if (input === undefined) {
            return;
        }
        input.focus();
    }, [ lastFocus ]);

    const onAnswerKeyDown = useCallback((i, ev) => {
        if (ev.key === 'Enter') {
            addAnswer(i + 1);
            requestFocus(i + 1);
            ev.preventDefault();
        } else if (ev.key === 'Backspace' && ev.target.value === '') {
            removeAnswer(i);
            requestFocus(i - 1);
            ev.preventDefault();
        } else if (ev.key === 'ArrowDown') {
            requestFocus(i + 1);
        } else if (ev.key === 'ArrowUp') {
            requestFocus(i - 1);
        }
    }, [ addAnswer, removeAnswer ]);

    return (<Dialog
        okKey = { t('polls.create.Send') }
        onSubmit = { onSubmit }
        titleKey = 'polls.create.dialogTitle'
        width = 'small'>
        <div className = 'poll-question-field'>
            <FieldTextStateless
                autoFocus = { true }
                compact = { true }
                isLabelHidden = { true }
                // eslint-disable-next-line react/jsx-no-bind
                onChange = { ev => setQuestion(ev.target.value) }
                placeholder = { t('polls.create.questionPlaceholder') }
                shouldFitContainer = { true }
                type = 'text'
                value = { question } />
        </div>
        <ol className = 'poll-answer-fields'>
            {answers.map((answer, i) => (<li key = { i }>
                /* eslint-disable react/jsx-no-bind */
                <FieldTextStateless
                    compact = { true }
                    isLabelHidden = { true }
                    onChange = { ev => setAnswer(i, ev.target.value) }
                    onKeyDown = { ev => onAnswerKeyDown(i, ev) }
                    placeholder = { t('polls.create.answerPlaceholder', { index: i + 1 }) }
                    ref = { r => registerFieldRef(i, r) }
                    shouldFitContainer = { true }
                    type = 'text'
                    value = { answer } />
                /* eslint-enable react/jsx-no-bind */
            </li>))}
        </ol>
    </Dialog>);
};

// eslint-disable-next-line new-cap
export default translate(AbstractPollCreateDialog(PollCreateDialog));
