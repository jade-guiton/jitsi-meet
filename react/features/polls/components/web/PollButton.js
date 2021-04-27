// @flow

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { IconPoll } from '../../../base/icons';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

export type Props = AbstractButtonProps & {
    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function,

    /**
     * The i18n translate function.
     */
    t: Function
};

/**
 * A button for creating polls
 */
class PollButton<P: Props> extends AbstractButton<P, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.poll';
    icon = IconPoll;
    label = 'toolbar.poll';
    tooltip = 'toolbar.poll';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const { dispatch } = this.props;
        
        console.log('Click!');
    }
}

export default translate(connect()(PollButton));