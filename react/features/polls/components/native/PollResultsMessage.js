// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { openDialog } from '../../../base/dialog';

import PollResults from './PollResults';
import PollResultsDialog from './PollResultsDialog';
import { chatStyles } from './styles';

const PollResultsMessage = ({ pollId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const showDetails = useCallback(() => {
        dispatch(openDialog(PollResultsDialog, { pollId }));
    }, [ pollId ]);

    return (<View>
        <PollResults
            detailedVotes = { false }
            displayQuestion = { true }
            pollId = { pollId } />
        <View style = { chatStyles.messageFooter }>
            <Text>
                { t('polls.chat.notice') }
            </Text>
            <Text
                onPress = { showDetails }
                style = { chatStyles.showDetails }>
                { t('polls.chat.details') }
            </Text>
        </View>
    </View>);
};

export default PollResultsMessage;
