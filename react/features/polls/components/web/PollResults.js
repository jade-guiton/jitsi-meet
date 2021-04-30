// @flow

import React from 'react';

import AbstractPollResults from '../AbstractPollResults';
import type { AbstractProps } from '../AbstractPollResults';


/**
 * Component that renders the poll results.
 *
 * @param {Props} props - The passed props.
 * @returns {React.Node}
 */
const PollResults = (props: AbstractProps) => {
    const {
        answers,
        detailedVotes,
        displayQuestion,
        question
    } = props;

    return (
        <div>
            {displayQuestion &&
                <div className = 'poll-question'>
                    <strong>{ question }</strong>
                </div>}
            <ol className = 'poll-answer-list'>
                { detailedVotes
                    ? answers.map(({ name, percentage, voters }, index) => {
                        return <li key = { index }>
                            { name } ({ percentage } %)
                            <ul className = 'poll-answer-details'>
                                {voters.map(voter =>
                                    <li key = { voter.id }>{ voter.name }</li>
                                )}
                            </ul>
                        </li>;
                    }) : answers.map(({ name, percentage }, index) => {
                        return <li key = { index }>
                            { name } ({ percentage } %)
                        </li>;
                    })
                }
            </ol>
        </div>
    );

};

export default AbstractPollResults(PollResults);
