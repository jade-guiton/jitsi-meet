// @flow

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { PollItem } from './PollItem';

const PollsList = () => {

    const polls = useSelector(state => state['features/polls'].polls);
    const pollListEndRef = useRef(null);

    const scrollToBottom = () => {
        if (pollListEndRef.current) {
            pollListEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [ polls ]);

    const listPolls = Object.keys(polls);

    return (
    <>
        <div>
            {listPolls.map((id, index) => (
                <PollItem
                    key = { id }
                    pollId = { id }
                    ref = { listPolls.length - 1 === index ? pollListEndRef : null } />
            )
            )}
        </div>
    </>
    );
};

export default PollsList;
