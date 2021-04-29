// @flow

// import { FieldTextStateless } from '@atlaskit/field-text';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';

import CustomSubmitDialog from '../../../base/dialog/components/native/CustomSubmitDialog';
import { translate } from '../../../base/i18n';
import { Icon, IconAdd, IconClose } from '../../../base/icons';

import AbstractPollCreateDialog from '../AbstractPollCreateDialog';
import type { AbstractProps } from '../AbstractPollCreateDialog';

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

    /*
     * This ref stores the Array of answer input fields, allowing us to focus on them.
     * This array is maintained by registerfieldRef and the useEffect below.
     */
    const answerInputs = useRef([]);
    const registerFieldRef = useCallback((i, input) => {
        if (input === null) {
            return;
        }
        answerInputs.current[i] = input;
    },
    [ answerInputs ]
    );

    useEffect(() => {
        answerInputs.current = answerInputs.current.slice(0, answers.length);
    }, [ answers ]);

    /*
     * This state allows us to requestFocus asynchronously, without having to worry
     * about whether a newly created input field has been rendered yet or not.
     */
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


    const onQuestionKeyDown = useCallback(() => {
        answerInputs.current[0].focus();
    });

    const onAnswerSubmit = useCallback(index => {
        addAnswer(index + 1);
        requestFocus(index + 1);
    }, [ answers ]);

    // Called on keypress in answer fields
    const onAnswerKeyDown = useCallback((index, ev) => {
        const { key } = ev.nativeEvent;
        const currentText = answers[index];

        if (key === 'Enter') {
            onAnswerSubmit((index, ev));
        } else if (key === 'Backspace' && currentText === '' && answers.length > 1) {
            removeAnswer(index);
            requestFocus(index > 0 ? index - 1 : 0);
        }
    }, [ answers, addAnswer, removeAnswer, requestFocus ]);


    const renderListItem = ({ index }) =>

    // padding to take into account the two default options

        (
            <View
                style = {{ flexDirection: 'row' }}>
                <TextInput
                    blurOnSubmit = { false }
                    onChangeText = { text => setAnswer(index, text) }
                    onKeyPress = { ev => onAnswerKeyDown(index, ev) }
                    onSubmitEditing = { ev => onAnswerSubmit(index) }
                    placeholder = { t('polls.create.answerPlaceholder', { index: index + 1 }) }
                    ref = { input => registerFieldRef(index, input) }
                    value = { answers[index] } />

                {answers.length > 1
                    ? <Button
                        onPress = { () => removeAnswer(index) }
                        title = "X" />
                    : null
                }
            </View>
        );


    return (
        <CustomSubmitDialog
            okKey = { 'polls.create.send' }
            onSubmit = { onSubmit }
            titleKey = 'polls.create.dialogTitle'
            width = 'small'>

            <Text> {t('polls.create.dialogTitle')}</Text>


            <TextInput
                autoFocus = { true }
                blurOnSubmit = { false }
                onChangeText = { setQuestion }
                onSubmitEditing = { onQuestionKeyDown }
                placeholder = { t('polls.create.questionPlaceholder') }
                value = { question } />

            <FlatList
                blurOnSubmit = { true }
                data = { answers }
                keyExtractor = { (item, index) => index.toString() }
                renderItem = { renderListItem } />


            <Button
                onPress = { () => addAnswer(answers.length) }
                title = "+" />
        </CustomSubmitDialog>
    );
};


/*
 * We apply AbstractPollCreateDialog to fill in the AbstractProps common
 * to both the web and native implementations.
 */
// eslint-disable-next-line new-cap
export default translate(AbstractPollCreateDialog(PollCreateDialog));
