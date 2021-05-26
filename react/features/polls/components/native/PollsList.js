// @flow

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { chatStyles } from './styles';

import { PollItem } from '.';


const PollsList = () => {

    const polls = useSelector(state => state['features/polls'].polls);
    const { t } = useTranslation();
    const listPolls = Object.keys(polls);

    return (
    <>
        {listPolls.length === 0
            ? <Text style = { chatStyles.noPollText } >
                {t('polls.chat.empty')}
            </Text>
            : <ScrollView>
                {listPolls.map(id => (
                    <PollItem
                        key = { id }
                        pollId = { id } />
                )
                )}
            </ScrollView>
        }
    </>
    );
};

export default PollsList;
