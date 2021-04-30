// @flow

import * as React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';

import { ConfirmDialog, CustomSubmitDialog, brandedDialog } from '../../../base/dialog';

import AbstractPollAnswerDialog from '../AbstractPollAnswerDialog';
import type { AbstractProps } from '../AbstractPollAnswerDialog';
// import PollResults from './PollResults';


/**
 * A modal component to answer polls.
 *
 * @param {Props} props - The passed props.
 * @returns {React.Node}
 */
const PollAnswerDialog = (props: AbstractProps): React.Node => {
    const {
        pollId, poll,
        shouldDisplayResult,
        submitAnswer, skipAnswer,
        checkBoxStates, setCheckbox
    } = props;

    return shouldDisplayResult
        ? <CustomSubmitDialog>
            {/*<PollResults
                detailedVotes = { true }
                displayQuestion = { true }
                pollId = { pollId } />*/}
        </CustomSubmitDialog>
        : <ConfirmDialog
            cancelKey = 'polls.answer.skip'
            okKey = 'polls.answer.submit'
            onCancel = { skipAnswer }
            onSubmit = { submitAnswer }>
            <View>
                <Text>{poll.question}</Text>
                <View>
                {poll.answers.map((answer, index) => (
                    <View key = { index } style = {{ flexDirection: 'row' }}>
                        <Switch
                            value = { checkBoxStates[index] }
                            onValueChange = { state => setCheckbox(index, state) }/>
                        <Text>{answer.name}</Text>
                    </View>
                ))}
                </View>
            </View>
        </ConfirmDialog>;
}

/*
 * We apply AbstractPollAnswerDialog to fill in the AbstractProps common
 * to both the web and native implementations.
 */
// eslint-disable-next-line new-cap
export default AbstractPollAnswerDialog(PollAnswerDialog);
