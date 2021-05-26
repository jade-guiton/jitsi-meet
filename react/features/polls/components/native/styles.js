// @flow

import { schemeColor } from '../../../base/color-scheme';
import { ColorPalette, createStyleSheet } from '../../../base/styles';

export const answerStyles = createStyleSheet({
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 6
    },
    answer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3
    },
    option: {
        flexShrink: 1
    }
});

export const dialogStyles = createStyleSheet({
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 4
    },

    optionContainer: {
        flexDirection: 'row'
    },

    field: {
        borderBottomWidth: 1,
        borderColor: ColorPalette.blue,
        fontSize: 14,
        flexGrow: 1,
        paddingBottom: 0,
        flexShrink: 1
    },

    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    icon: {
        color: ColorPalette.white,
        backgroundColor: ColorPalette.blue,
        borderRadius: 5,
        margin: 0
    },

    plusButton: {
        marginTop: 8
    }
});

export const resultsStyles = createStyleSheet({
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    barContainer: {
        backgroundColor: '#ccc',
        borderRadius: 3,
        width: 200,
        height: 6
    },

    bar: {
        backgroundColor: ColorPalette.blue,
        borderRadius: 3,
        height: 6
    },

    voters: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 2,
        marginHorizontal: 8,
        marginVertical: 4
    },

    answerContainer: {
        marginVertical: 2,
        maxWidth: '100%'
    },

    answerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    answer: {
        flexShrink: 1
    },

    answerVoteCount: {
        paddingLeft: 10
    },

    chatQuestion: {
        fontWeight: 'bold'
    }
});

export const chatStyles = createStyleSheet({
    messageFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 11,
        marginTop: 6
    },

    showDetails: {
        fontWeight: 'bold'
    },

    noPollText: {
        flex: 1,
        color: schemeColor('displayName'),
        textAlign: 'center',
        paddingTop: '10%'
    },

    pollItemContainer: {
        borderRadius: 4,
        borderColor: '#2183ad',
        borderWidth: 2,
        padding: 4,
        marginBottom: 8
    },

    pollCreateContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },

    pollCreateButton: {
        flex: 1,
        marginHorizontal: 8
    },

    buttonRow: {
        flexDirection: 'row'
    },

    pollCreateAddButton: {
        margin: 8
    }

});


