// I will add my auth action creators to the index.js
// file where I bundle all my exports from that actions folder.
export {
    alert,
} from './message-action';
export {
    auth,
    logout,
    authCheckState,
    clearErrorMessage,
} from './auth-action'