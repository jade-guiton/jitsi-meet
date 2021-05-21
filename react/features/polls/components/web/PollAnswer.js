// @flow

import { Checkbox } from '@atlaskit/checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLocalParticipant, getParticipantById } from '../../../base/participants';
import { setAnsweredStatus } from '../../actions';
import { COMMAND_ANSWER_POLL } from '../../constants';
import type { Poll } from '../../types';

import { PollSubmitAnswerButton } from './styled';

type Props = {
    pollId: string
}

const PollAnswer = (props: Props) => {
    const { pollId } = props;

    const conference: Object = useSelector(state => state['features/base/conference'].conference);

    const poll: Poll = useSelector(state => state['features/polls'].polls[pollId]);

    const localId: string = useSelector(state => getLocalParticipant(state).id);

    const [ checkBoxStates, setCheckBoxState ] = useState(new Array(poll.answers.length).fill(false));

    const setCheckbox = useCallback((index, state) => {
        const newCheckBoxStates = [ ...checkBoxStates ];

        newCheckBoxStates[index] = state;
        setCheckBoxState(newCheckBoxStates);
    }, [ checkBoxStates ]);

    // Reset state if pollId changes
    // Useful in case of two successive answer dialogs
    useEffect(() => {
        setCheckBoxState(new Array(poll.answers.length).fill(false));
    }, [ pollId ]);

    const dispatch = useDispatch();

    const localParticipant = useSelector(state => getParticipantById(state, localId));
    const localName: string = localParticipant.name ? localParticipant.name : 'Fellow Jitster';

    const submitAnswer = useCallback(() => {
        conference.sendMessage({
            type: COMMAND_ANSWER_POLL,
            pollId,
            voterId: localId,
            voterName: localName,
            answers: checkBoxStates
        });

        dispatch(setAnsweredStatus(pollId, true));

        return false;
    }, [ pollId, localId, localName, checkBoxStates, conference ]);

    return (
        <div className = 'poll-dialog'>
            <h1 className = 'poll-question'>{poll.question}</h1>
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
            <PollSubmitAnswerButton
                aria-label = { 'Submit' }
                onClick = { submitAnswer }>
                <span>{ 'Submit' }</span>
            </PollSubmitAnswerButton>
        </div>
    );
};

export default PollAnswer;
