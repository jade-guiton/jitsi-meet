// @flow

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { openDialog } from '../../../base/dialog';
import { Icon, IconEdit } from '../../../base/icons';

import { ParticipantInviteButton } from './styled';

import { PollCreateDialog } from '.';


export const CreatePollButton = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onCreate = useCallback(() => {
        dispatch(openDialog(PollCreateDialog));
    }, [ dispatch ]);

    return (
        <ParticipantInviteButton
            aria-label = { t('toolbar.accessibilityLabel.poll') }
            onClick = { onCreate }>
            <Icon
                size = { 20 }
                src = { IconEdit } />
            <span>{ t('toolbar.poll') }</span>
        </ParticipantInviteButton>
    );
};
