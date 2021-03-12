import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "REACT_APP_FIREBASE_API_KEY",
    authDomain: "REACT_APP_FIREBASE_AUTH_DOMAIN",
    projectId: "REACT_APP_FIREBASE_PROJECT_ID",
    storageBucket: "REACT_APP_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
    appId: "REACT_APP_FIREBASE_APP_ID"
};


class Firebase {
    constructor() {
        app.initializeApp(config);

        this.serverValue = app.database.ServerValue;
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();
                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }
                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    // *** Message API ***

    message = uid => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // *** Settings API ***

    setting = uid => this.db.ref(`settings/${uid}`)

    settings = () => this.db.ref('settings');

}
export default Firebase;