// @flow

import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { closePollsPane } from '../../actions';
import { classList, getPollsPaneOpen } from '../../functions';
import theme from '../../theme.json';

import {
    Close,
    Container,
    Footer,
    Header,
    PollCreateButton
} from './styled';

import { PollCreate, PollsList } from '.';


const PollsPane = () => {
    const dispatch = useDispatch();
    const paneOpen = useSelector(getPollsPaneOpen);

    const closePane = useCallback(() => dispatch(closePollsPane(), [ dispatch ]));

    const [ createMode, setCreateMode ] = useState(false);

    const onCreate = () => {
        setCreateMode(true);
    };

    return (
        <ThemeProvider theme = { theme }>
            <div
                className = { classList(
          'polls_pane',
          !paneOpen && 'polls_pane--closed'
                ) }>
                <div className = 'polls_pane-content'>
                    <Header>
                        <Close onClick = { closePane } />
                    </Header>
                    { createMode
                        ? <PollCreate setCreateMode = { setCreateMode } />
                        : <>
                            <Container>
                                <PollsList />
                            </Container>
                            <Footer>
                                <PollCreateButton
                                    aria-label = { 'Create a Poll' }
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onClick = { onCreate } >
                                    <span>{'Create a poll'}</span>
                                </PollCreateButton>
                            </Footer>
                        </>}

                </div>
            </div>
        </ThemeProvider>
    );
};

export default PollsPane;
