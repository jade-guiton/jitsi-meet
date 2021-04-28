// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import { getParticipantDisplayName } from '../../../base/participants';
import type { Poll } from '../../types';


type Props = {

    /**
     * Display or not detailed votes
     */
    detailedVotes: boolean,

    /**
     * Display or not the poll question
     */
    displayQuestion: boolean,

    /**
     * Details of the poll to display
     */
    pollDetails: Poll,
};

/**
 * Component that renders the poll results.
 *
 * @returns {React$Element<any>}
 */
function PollResults({ detailedVotes, displayQuestion, pollDetails }: Props) {

    const title = displayQuestion ? <strong>{ pollDetails.question }</strong> : null;

    const totalVoters = pollDetails.answers.reduce((accumulator, answer) => accumulator + answer.voters.size, 0);

    const answers = pollDetails.answers.map(answer => {

        const answerPercent = (answer.voters.size / totalVoters * 100).toFixed(0);

        const detailedAnswer = detailedVotes
            ? [ ...answer.voters ].map(voterId => {
                const name = useSelector(state => getParticipantDisplayName(state, voterId));

                return <li key = { voterId }>{ name }</li>;
            })
            : null;

        return (
            <li key = { answer.name }>
                { answer.name } ({ answerPercent } %)
                <div>
                    <ul>
                        { detailedAnswer }
                    </ul>
                </div>
            </li>
        );
    });

    return (
        <div>
            <div>
                { title }
            </div>
            <div>
                { answers }
            </div>
        </div>
    );
}

export default PollResults;
