
/**
 * Generates a class attribute value.
 *
 * @param {Iterable<string>} args - String iterable.
 * @returns {string} Class attribute value.
 */
export const classList = (...args) => args.filter(Boolean).join(' ');


/**
 * Find the first styled ancestor component of an element.
 *
 * @param {Element} target - Element to look up.
 * @param {StyledComponentClass} component - Styled component reference.
 * @returns {Element|null} Ancestor.
 */
export const findStyledAncestor = (target, component) => {
    if (!target || target.matches(`.${component.styledComponentId}`)) {
        return target;
    }

    return findStyledAncestor(target.parentElement, component);
};

/**
 * Get a style property from a style declaration as a float.
 *
 * @param {CSSStyleDeclaration} styles - Style declaration.
 * @param {string} name - Property name.
 * @returns {number} Float value.
 */
export const getFloatStyleProperty = (styles, name) =>
    parseFloat(styles.getPropertyValue(name));

/**
 * Gets the outer height of an element, including margins.
 *
 * @param {Element} element - Target element.
 * @returns {number} Computed height.
 */
export const getComputedOuterHeight = element => {
    const computedStyle = getComputedStyle(element);

    return element.offsetHeight
    + getFloatStyleProperty(computedStyle, 'margin-top')
    + getFloatStyleProperty(computedStyle, 'margin-bottom');
};

/**
 * Returns this feature's root state.
 *
 * @param {Object} state - Global state.
 * @returns {Object} Feature state.
 */
const getState = state => state['features/polls'];

/**
 * Is the polls pane open.
 *
 * @param {Object} state - Global state.
 * @returns {boolean} Is the polls pane open.
 */
export const getPollsPaneOpen = state => Boolean(getState(state)?.isPaneOpen);

/**
 * Is the poll answered.
 *
 * @param {Object} state - Global state.
 * @param {number} id - Id of the poll.
 * @returns {boolean} Is the poll answered.
 */
export const isPollAnswered = (state, id) => Boolean(getState(state)?.polls[id].answered);
