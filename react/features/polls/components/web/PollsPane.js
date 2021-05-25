// @flow

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PollCreate, PollsList } from '.';


const PollsPane = () => {

    const [ createMode, setCreateMode ] = useState(false);

    const onCreate = () => {
        setCreateMode(true);
    };

    const { t } = useTranslation();

    return (
        <div className = 'polls-pane-content'>
            { createMode
                ? <PollCreate setCreateMode = { setCreateMode } />
                : <>
                    <div className = { 'poll-container' } >
                        <PollsList />
                    </div>
                    <div className = { 'poll-footer' }>
                        <button
                            aria-label = { t('polls.create.button') }
                            className = { 'poll-primary-button ' }
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick = { onCreate } >
                            <span>{t('polls.create.button')}</span>
                        </button>
                    </div>
                </>}
        </div>
    );
};

export default PollsPane;
