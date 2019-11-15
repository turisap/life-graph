import actionCreatorFactory from "typescript-fsa";

const generalActionCreator = actionCreatorFactory("@General");

export const toggleSignIn = generalActionCreator("toggleSignIn");
export const logginAsync = generalActionCreator("logginAsync");
