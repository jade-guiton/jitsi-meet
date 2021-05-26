// @flow

/**
 * Is the poll answered.
 *
 * @param {Object} state - Global state.
 * @param {number} id - Id of the poll.
 * @returns {boolean} Is the poll answered.
 */
export const isPollAnswered = (state, id) => Boolean(state['features/polls']?.polls[id].answered);
