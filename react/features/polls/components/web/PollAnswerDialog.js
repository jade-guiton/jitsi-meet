// @flow


import { Checkbox } from '@atlaskit/checkbox';
import * as React from 'react';
import { useState } from 'react';

import { Dialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { getLocalParticipant } from '../../../base/participants';
import { connect } from '../../../base/redux';
import { COMMAND_ANSWER_POLL } from '../../constants';
import type { Poll } from '../../types';

/**
 * The type of the React {@code Component} props of {@code AnswerPoll}.
 */
type Props = {

    /**
     * A conference object used to send a command to other participants
     */
    conference: any,

    /**
     * The id of the poll to be displayed
     */
    pollId: number,

    /**
     * The poll, a {@code Poll} object, to be displayed
     */
    poll: Poll,

    /**
     * The id of the participant
     */
    localId: String,

    /**
     * The i18n translate function.
     */
    t: Function
}

/**
 * A modal component to answer polls.
 *
 * @param {Props} props - The passed props.
 * @returns {React.Node}
 */
function AnswerPoll(props: Props): React.Node {

    const { conference, localId, poll, pollId, t } = props;

    const [ checkBoxStates, setCheckBoxState ] = useState(poll ? new Array(poll.answers.length).fill(false) : []);

    // if the poll is null, show a spinner, else, show the poll
    return (

        <Dialog
            cancelKey = { 'dialog.close' }
            className = 'poll-answers default-scrollbar'
            onSubmit = { () => {

                const answerData = {
                    attributes: {
                        pollId,
                        senderId: localId
                    },
                    children: checkBoxStates.map(
                checkBoxState => {
                    return {
                        attributes: { checked: checkBoxState
                        },
                        tagName: 'answer'
                    };
                })
                };


                conference.sendCommandOnce(
                    COMMAND_ANSWER_POLL,
                    answerData
                );

                return true;
            } }

            submitDisabled = { false }
            titleKey = { t('polls.answer.title') }
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
                            }
                            }
                            size = 'xlarge' />
                    ))
                }
            </div>
        </Dialog>
    );
}

/**
 * A function to bind props to state and fetch received poll thanks to pollID.
 *
 * @param {Object} state - The redux state.
 * @param {Props} previousProp - The previous Prps.
 * @returns {Props}
 */
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

export default translate(connect(_mapStateToProps)(AnswerPoll));
