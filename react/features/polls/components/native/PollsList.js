// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import { PollItem } from '.';

const PollsList = () => {

    const polls = useSelector(state => state['features/polls'].polls);

    const listPolls = Object.keys(polls);

    return (
    <>
        {listPolls.map(id => (
            <PollItem
                key = { id }
                pollId = { id } />
        )
        )}
    </>
    );
};

export default PollsList;
