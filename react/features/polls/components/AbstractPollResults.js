// @flow

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getParticipants } from '../../base/participants';


type InputProps = {

    /**
     * Whether to display vote details
     */
    showDetails: boolean,

    /**
     * ID of the poll to display
     */
    pollId: number,
};

export type AnswerInfo = {
    name: string,
    percentage: number,
    voters?: Array<{ id: number, name: string }>,
    voterCount: number
};

export type AbstractProps = {
    answers: Array<AnswerInfo>,
    showDetails: boolean,
    question: string,
    t: Function
};

/**
 * Higher Order Component taking in a concrete PollResult component and
 * augmenting it with state/behavior common to both web and native implementations.
 *
 * @param {React.Component} Component - The concrete component.
 * @returns {React.Node}
 */
const AbstractPollResults = (Component: React.Component<InputProps>) => (props: InputProps) => {
    const { pollId, showDetails } = props;

    const pollDetails = useSelector(state => state['features/polls'].polls[pollId]);

    const participants = useSelector(state => getParticipants(state));

    const answers = useMemo(() => {
        const voterSet = new Set();

        for (const answer of pollDetails.answers) { // eslint-disable-line no-unused-vars
            for (const voter of answer.voters) { // eslint-disable-line no-unused-vars
                voterSet.add(voter);
            }
        }

        const totalVoters = voterSet.size;

        return pollDetails.answers.map(answer => {
            const percentage = totalVoters === 0 ? 0 : Math.round(answer.voters.size / totalVoters * 100);

            let voters = null;

            if (showDetails) {
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
                voterCount: answer.voters.size
            };
        });
    }, [ pollDetails.answers ]);

    const { t } = useTranslation();

    return (<Component
        answers = { answers }
        question = { pollDetails.question }
        showDetails = { showDetails }
        t = { t } />);
};

export default AbstractPollResults;
