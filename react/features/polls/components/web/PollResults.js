// @flow

import React from 'react';

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
function PollResults({ displayTitle, pollDetails }: Props) {

    const renderTitle = () => {
        if (displayTitle) {
            return <strong>{ pollDetails.title }</strong>;
        }

        return null;
    };

    const renderAnswers = () => {
        const totalVoters = pollDetails.answers.reduce((accumulator, answer) => accumulator + answer.voters.size, 0);

        return pollDetails.answers.map(answer => (
            <li key = { answer.name }>
                { answer.name } ({ (answer.voters.size / totalVoters * 100).toFixed(0)} %)
            </li>
        ));
    };

    return (
        <div>
            { renderTitle() }
            { renderAnswers() }
        </div>
    );
}

export default PollResults;
