// @flow

import React from 'react';
import { useSelector } from 'react-redux';

import { PollItem } from './PollItem';

export const PollsList = () => {

    const polls = useSelector(state => state['features/polls'].polls);

    return (
    <>
        <div>
            {Object.keys(polls).map(id => (
                <PollItem
                    key = { id }
                    pollId = { id } />)
            )}
        </div>
    </>
    );
};
