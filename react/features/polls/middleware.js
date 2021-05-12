// @flow

import { openDialog } from '../base/dialog';
import { MiddlewareRegistry } from '../base/redux';
import { addMessage, MESSAGE_TYPE_LOCAL, MESSAGE_TYPE_REMOTE } from '../chat';

import { RECEIVE_POLL } from './actionTypes';
import { PollAnswerDialog } from './components';


MiddlewareRegistry.register(store => next => action => {
    const result = next(action);

    switch (action.type) {

    // Middleware triggered when a poll is received
    case RECEIVE_POLL: {
        const { poll, pollId } = action;

        const participants = store.getState()['features/base/participants'];
        const senderParticipant = participants.find(p => p.id === poll.senderId);
        const senderName = senderParticipant.name ? senderParticipant.name : 'Fellow Jitster';
        const localParticipant = participants.find(p => p.local);
        const localName = localParticipant.name ? localParticipant.name : 'Fellow Jitster';
        const isLocal = senderParticipant.id === localParticipant.id;
        const isChatOpen: boolean = store.getState()['features/chat'].isOpen;

        store.dispatch(openDialog(PollAnswerDialog, { pollId }));
        store.dispatch(addMessage({
            displayName: senderName,
            hasRead: isChatOpen,
            id: poll.senderId,
            messageType: isLocal ? MESSAGE_TYPE_LOCAL : MESSAGE_TYPE_REMOTE,
            message: '[Poll]',
            pollId,
            privateMessage: false,
            recipient: localName,
            timestamp: Date.now()
        }));
        break;
    }
    }

    return result;
});

