// @flow

import React from 'react';
import { View, SectionList, Text, FlatList } from 'react-native';

import AbstractPollResults from '../AbstractPollResults';
import type { AbstractProps } from '../AbstractPollResults';
import _DialogStyles from './styles';
import { useTranslation } from 'react-i18next';
import { ColorPalette } from '../../../base/styles';

/**
 * Render a header summing up answer information
 *
 * @param {string} answerName - the name of the answer
 * @param {number} percent - the percentage of voters
 * @param {number} nbVotes - the number of collected votes
 * @returns 
 */
const renderHeader = (answerName: string, percent: number, nbVotes: number, t: Function) => {
    return (
        <View style={{flexDirection:"row", flexGrow:1,  'justifyContent':"space-between"}}>
            <Text> { answerName } -  { percent }%</Text>
            <Text> { t('polls.answer.vote', {count: nbVotes}) } </Text>
        </View>
    )
}

/**
 * Render voters of and answer
 * @param { name: string, voters: Set<string> } answer - the answer 
 * @param {*} participants - A list of participants (to fetch names)
 * @param {number} totalVoters - Total number of voters for this poll
 * @param {boolean} detailed - if true, display all voters, if false, display percent bars
 * @param {Function} t - translation function
 * @returns 
 */
const renderRow = (answer: { name: string, voters: Set<string> }, participants, totalVoters: number, detailed: boolean, t: Function) => {
    
    const answerPercent = totalVoters === 0 ? 0 : Math.round(answer.voters.size / totalVoters * 100);

    // the list of voters name
    const votersName = [ ...answer.voters ].map(voterId => {

        const participant = participants.find(part => part.id === voterId);

        const name: string = participant ? participant.name : 'Fellow Jitster';

        return name;
    });

    if ( detailed ) {
        return(
            <View style={{paddingBottom: 4}}>
                {renderHeader(answer.name, answerPercent, answer.voters.size, t)}

                {
                votersName.length > 0
                ?
                <View style={{borderRadius: 5, borderWidth: 1, borderColor: "gray", padding: 2, marginHorizontal: 8}}>
                    {
                        votersName.map((voterName: string) => 
                        <Text>
                            {voterName}
                        </Text>
                        )
                    }
                </View>
                :
                null
            }
            </View>
        );
    }

    // else, we display a simple list
    // We add a progress bar by creating an empty view of width equal to percentage.
    return (
        <View style={{ padding:8, flexGrow:1}}>
            {renderHeader(answer.name, answerPercent, answer.voters.size, t)}

            <View style={[_DialogStyles.bar, {width: answerPercent + "%"}]}>
                <Text></Text>
            </View>
        </View>
    );
}

/**
 * Component that renders the poll results.
 *
 * @param {Props} props - The passed props.
 * @returns {React.Node}
 */
const PollResults = (props: AbstractProps) => {
    const {
        detailedVotes,
        displayQuestion,
        participants,
        pollDetails,
        totalVoters
    } = props;

    const {t} = useTranslation();

    return (
        <View>
            {displayQuestion
                && <View>
                    <Text style = { _DialogStyles.question } > { pollDetails.question } </Text>
                </View>}
            <View>

            <FlatList
                data = { pollDetails.answers }
                keyExtractor={(item, index) => index.toString()}
                renderItem = { (answer) => renderRow(answer.item, participants, totalVoters, detailedVotes, t) }
            />
            </View>

        </View>
    );

};

export default AbstractPollResults(PollResults);
