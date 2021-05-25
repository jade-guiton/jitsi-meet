// @flow

import React, { useState } from 'react';

import {
    Container,
    Footer,
    PollCreateButton
} from './styled';

import { PollCreate, PollsList } from '.';


const PollsPane = () => {

    const [ createMode, setCreateMode ] = useState(false);

    const onCreate = () => {
        setCreateMode(true);
    };

    return (
        <div className = 'polls_pane-content'>
            { createMode
                ? <PollCreate setCreateMode = { setCreateMode } />
                : <>
                    <Container>
                        <PollsList />
                    </Container>
                    <Footer>
                        <PollCreateButton
                            aria-label = { 'Create a poll' }
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick = { onCreate } >
                            <span>{'Create a pol'}</span>
                        </PollCreateButton>
                    </Footer>
                </>}
        </div>
    );
};

export default PollsPane;
