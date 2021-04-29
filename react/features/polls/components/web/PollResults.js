// @flow

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getParticipants } from '../../../base/participants';
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
     * ID of the poll to display
     */
    pollId: number,
};

/**
 * Component that renders the poll results.
 *
 * @returns {React$Element<any>}
 */
function PollResults({ detailedVotes, displayQuestion, pollId }: Props) {
    const pollDetails = useSelector(state => state['features/polls'].polls[pollId]);

    const participants = useSelector(state => getParticipants(state));

    const totalVoters = useMemo(() => {
        const voterSet = new Set();

        for (const answer of pollDetails.answers) {
            for (const voter of answer.voters) {
                voterSet.add(voter);
            }
        }

        return voterSet.size;
    }, [ pollDetails.answers ]);

    const answers = pollDetails.answers.map((answer, index) => {

        const answerPercent = totalVoters == 0 ? 0 : Math.round(answer.voters.size / totalVoters * 100);

        const detailedAnswer
            = detailedVotes
                ? [ ...answer.voters ].map(voterId => {
                    const participant = participants.find(part => part.id === voterId);

                    const name: string = participant ? participant.name : 'Fellow Jitster';

                    return <li key = { voterId }>{ name }</li>;
                })

                : null;

        return (
            <li key = { index }>
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
            {displayQuestion
                && <div className = 'poll-question-field'>
                    <strong>{ pollDetails.question }</strong>
                </div>}
            <div>
                <ol className = 'poll-answer-fields'>
                    { answers }
                </ol>
            </div>

        </div>
    );
}


export default PollResults;
