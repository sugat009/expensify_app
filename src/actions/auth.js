import { firebase } from '../firebase/firebase';
import googleAuthProvider from '../firebase/firebase';

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});