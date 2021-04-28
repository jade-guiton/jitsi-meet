// @flow

import { Checkbox } from '@atlaskit/checkbox';
import * as React from 'react';
import { useState } from 'react';

import { Dialog } from '../../../base/dialog';
import { getLocalParticipant } from '../../../base/participants';
import { connect } from '../../../base/redux';
import { COMMAND_ANSWER_POLL } from '../../constants';
import type { Poll } from '../../types';


type Props = {
    conference: any,
    pollId: number,
    poll: Poll,
    localId: String,
}

function AnswerPoll(props: Props): React.Node {

    const { poll, pollId, localId, conference } = props;

    const [ checkBoxStates, setCheckBoxState ] = useState(poll ? new Array(poll.answers.length).fill(false) : []);

    // if the poll is null, show a spinner, else, show the poll
    return (

        <Dialog
            width = 'small'
            className = 'poll-answers default-scrollbar'
            cancelKey = { 'dialog.close' }
            submitDisabled = { false }
            titleKey = 'Poll'
            onSubmit = { () => {

                const answer_data = {
                    attributes: {
                        pollId: pollId,
                        senderId: localId
                    },
                    children: checkBoxStates.map(
                checkBoxState => {
                    return {
                        tagName: 'answer',
                        attributes: { checked: checkBoxState
                        } };
                })
                };


                conference.sendCommandOnce(
                    COMMAND_ANSWER_POLL,
                    answer_data
                );

                return true;
            } }>


            <div>
                <h1 className = 'poll-answers'>{poll.question}</h1>
                {
                    poll.answers.map((answer, index) => (
                        <Checkbox
                            key = { index }
                            label = {
                                <label className = 'poll-answers'> {answer.name}</label>
                            }
                            size = 'xlarge'
                            name = 'checkbox-poll-answer'
                            onChange = { () => {
                                // we toggle the matching checkBox State
                                const newCheckBoxStates = [ ...checkBoxStates ];

                                newCheckBoxStates[index] = !newCheckBoxStates[index];
                                setCheckBoxState(newCheckBoxStates);
                            }
                            } />
                    ))
                }
            </div>
        </Dialog>
    );
}

function _mapStateToProps(state: Object, previousProp: Props) {
    const { conference } = state['features/base/conference'];
    const { polls } = state['features/polls'];
    const { pollId } = previousProp;

    return {
        // if the pollId is not null, we fetch the corresponding poll in the state
        poll: polls[pollId],
        conference,
        localId: getLocalParticipant(state).id
    };
}

export default connect(_mapStateToProps)(AnswerPoll);
