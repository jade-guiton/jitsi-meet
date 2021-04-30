// @flow

import React, { useMemo, Component } from 'react';
import { useSelector } from 'react-redux';

import { getParticipants } from '../../base/participants';
import type { Poll } from '../types';


type InputProps = {

    /**
     * Display or not detailed votes
     */
    detailedVotes: boolean,

    /**
     * Display or not the poll question
     */
    displayQuestion: boolean,

    /**
     * ID of the poll to display
     */
    pollId: number,
};

export type AbstractProps = {
    answers: Array<{ name: string, percentage: number, voters?: Array<string>, voterCount: number }>,
    detailedVotes: boolean,
    displayQuestion: boolean,
    question: string
}

/**
 * Higher Order Component taking in a concrete PollResult component and
 * augmenting it with state/behavior common to both web and native implementations.
 *
 * @param {Props} props - The passed props.
 * @returns {React.Node}
 */
const AbstractPollResults = (Component: Component<InputProps>) => (props: InputProps) => {
    const { pollId, detailedVotes, displayQuestion } = props;

    const pollDetails = useSelector(state => state['features/polls'].polls[pollId]);

    const participants = useSelector(state => getParticipants(state));

    const answers = useMemo(() => {
        const voterSet = new Set();

        for (const answer of pollDetails.answers) {
            for (const voter of answer.voters) {
                voterSet.add(voter);
            }
        }

        const totalVoters = voterSet.size;
        
        return pollDetails.answers.map((answer, index) => {
            const percentage = totalVoters === 0 ? 0 : Math.round(answer.voters.size / totalVoters * 100);

            let voters = null;
            if(detailedVotes) {
                voters = [ ...answer.voters ].map(voterId => {
                    const participant = participants.find(part => part.id === voterId);
                    return {
                        id: voterId,
                        name: participant
                            ? participant.name
                            : 'Absent Jitster'
                    };
                });
            }
            
            return {
                name: answer.name,
                percentage,
                voters,
                voterCount: answer.voters.size,
            }
        });
    }, [ pollDetails.answers ]);

    return (<Component
        answers = { answers }
        detailedVotes = { detailedVotes }
        displayQuestion = { displayQuestion }
        question = { pollDetails.question } />);
};

export default AbstractPollResults;
