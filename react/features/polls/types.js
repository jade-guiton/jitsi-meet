// @flow

export type Answer = {

    /**
     * ID of the sender of this poll
     */
    senderId: string,

    /**
     * Name of the sender
     */
    senderName: string,

    /**
     * ID of the parent Poll of this answer
     */
    pollId: number,

    /**
     * An array of boolean: true if the answer was chosen by the responder, else false
     */
    answers: Array<boolean>
};

export type Poll = {

    /**
     * ID of the sender of this poll
     */
    senderId: string,

    /**
     * The question asked by this poll
     */
    question: string,

    /**
     * An array of answers:
     * the name of the answer name and a map of ids and names of voters voting for this option
     */
    answers: Array<{ name: string, voters: Map<string, string> }>,
};
