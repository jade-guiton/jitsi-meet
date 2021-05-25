// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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

    const { t } = useTranslation();

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
                            aria-label = { t('polls.create.button') }
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick = { onCreate } >
                            <span>{t('polls.create.button')}</span>
                        </PollCreateButton>
                    </Footer>
                </>}
        </div>
    );
};

export default PollsPane;
