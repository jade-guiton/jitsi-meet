// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import { getParticipantDisplayName, getParticipants } from '../../../base/participants';

type Poll = {

    /**
     * Answers of the poll (including name and id of voters for each answer)
     */
    answers: Array<{name: string, voters: Set<string>}>,

    /**
     * Index of the message in the chat
     */
    messageIdx?: number,

    /**
     * Id of the poll creator
     */
    sender: string,

    /**
     * Title (question) of the poll
     */
    title: string,
};

type Props = {

    /**
     * Display or not detailed votes
     */
    detailedVotes: boolean,

    /**
     * Display or not the poll title
     */
    displayTitle: boolean,

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
function PollResults({ detailedVotes, displayTitle, pollDetails }: Props) {

    const title = displayTitle ? <strong>{ pollDetails.title }</strong> : null;

    const totalVoters = pollDetails.answers.reduce((accumulator, answer) => accumulator + answer.voters.size, 0);

    const participants = useSelector(state => getParticipants(state));

    console.log(participants);

    const answers = pollDetails.answers.map(answer => {

        const answerPercent = (answer.voters.size / totalVoters * 100).toFixed(0);

        const detailedAnswer = detailedVotes
            ? [ ...answer.voters ].map(voterId => {
                const name = useSelector(state => getParticipantDisplayName(state, voterId));

                console.log(name);

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