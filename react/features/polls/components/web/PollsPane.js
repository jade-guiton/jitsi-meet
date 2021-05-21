// @flow

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { closePollsPane } from '../../actions';
import { classList, getPollsPaneOpen } from '../../functions';
import theme from '../../theme.json';

import {
    AntiCollapse,
    Close,
    Container,
    Footer,
    Header
} from './styled';

import { CreatePollButton, PollsList } from '.';


const PollsPane = () => {
    const dispatch = useDispatch();
    const paneOpen = useSelector(getPollsPaneOpen);

    const closePane = useCallback(() => dispatch(closePollsPane(), [ dispatch ]));

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
                    <Container>
                        <AntiCollapse />
                        <PollsList />
                    </Container>
                    <Footer>
                        <CreatePollButton />
                    </Footer>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default PollsPane;
