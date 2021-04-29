// @flow


import { Checkbox } from '@atlaskit/checkbox';
import * as React from 'react';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from '../../../base/dialog';
import { getLocalParticipant } from '../../../base/participants';
import { addMessage, MESSAGE_TYPE_LOCAL, MESSAGE_TYPE_REMOTE } from '../../../chat';
import { COMMAND_ANSWER_POLL } from '../../constants';
import type { Poll } from '../../types';

import PollResults from './PollResults';

/**
 * The type of the React {@code Component} props of {@code AnswerPoll}.
 */
type Props = {

    /**
     * The id of the poll to be displayed
     */
    pollId: number,
}

/**
 * A modal component to answer polls.
 *
 * @param {Props} props - The passed props.
 * @returns {React.Node}
 */
function AnswerPoll(props: Props): React.Node {

    const { pollId } = props;

    /**
     * A conference object used to send a command to other participants
     */
    const conference: Object = useSelector(state => state['features/base/conference'].conference);

    /**
     * The poll to be displayed
     */
    const poll: Poll = useSelector(state => state['features/polls'].polls[pollId]);

    const localParticipant = useSelector(state => getLocalParticipant(state));

    /**
    * The id of the participant
    */
    const localId: string = localParticipant.id;

    const [ checkBoxStates, setCheckBoxState ] = useState(new Array(poll.answers.length).fill(false));
    const [ shouldDisplayResult, setShouldDisplayResult ] = useState(false);

    const dispatch = useDispatch();
    const localName: string = localParticipant.name;

    const displayInChat = useCallback(() => {
        dispatch(addMessage({
            displayName: localName,
            hasRead: false,
            id: localId,
            messageType: poll.senderId === localId ? MESSAGE_TYPE_LOCAL : MESSAGE_TYPE_REMOTE,
            message: poll.question,
            pollId,
            privateMessage: false,
            recipient: localName,
            timestamp: Date.now()
        }));
    }, [ localName, localId, poll, pollId ]);

    const submitAnswer = useCallback(() => {
        const answerData = {
            attributes: {
                pollId,
                senderId: localId
            },
            children: checkBoxStates.map(
                checkBoxState => {
                    return {
                        attributes: {
                            checked: checkBoxState
                        },
                        tagName: 'answer'
                    };
                })
        };

        conference.sendCommandOnce(
            COMMAND_ANSWER_POLL,
            answerData
        );

        displayInChat();

        setShouldDisplayResult(true);

        return false;
    },
    [ pollId, localId, checkBoxStates, conference ]
    );

    const cancelAnswer = useCallback(() => {
        displayInChat();
        setShouldDisplayResult(true);

        return false;
    },
    []
    );

    return (

        shouldDisplayResult
            ? <Dialog
                cancelDisabled = { true }
                okKey = { 'polls.answer.close' }
                titleKey = 'polls.answer.results'
                width = 'small'>
                <PollResults
                    detailedVotes = { true }
                    displayQuestion = { true }
                    pollId = { pollId } />

            </Dialog>
            : <Dialog
                cancelKey = { 'polls.answer.skip' }
                className = 'poll-answers default-scrollbar'
                okKey = { 'polls.answer.submit' }
                onCancel = { cancelAnswer }
                onSubmit = { submitAnswer }
                titleKey = 'polls.answer.title'
                width = 'small'>


                <div>
                    <h1 className = 'poll-answers'>{poll.question}</h1>
                    {
                        poll.answers.map((answer, index) => (
                            <Checkbox
                                key = { index }
                                label = {
                                    <label className = 'poll-answers'> {answer.name}</label>
                                }

                                name = 'checkbox-poll-answer'
                                onChange = { () => {
                                // we toggle the matching checkBox State
                                    const newCheckBoxStates = [ ...checkBoxStates ];

                                    newCheckBoxStates[index] = !newCheckBoxStates[index];
                                    setCheckBoxState(newCheckBoxStates);
                                } }
                                size = 'xlarge' />
                        ))
                    }
                </div>
            </Dialog>
    );


}


export default AnswerPoll;
