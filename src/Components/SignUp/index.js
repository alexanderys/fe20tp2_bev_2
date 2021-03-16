import React, { Component } from 'react'; 
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (<div>
    <h1>SignUp</h1>
    <SignUpForm />
</div>);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isAdmin: false
};

let usersList = [];
let usernamesList = [];

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    async componentDidMount() {
        await this.props.firebase.users().once('value', snapshot => {
            const usersObject = snapshot.val();
            usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
        });

        console.log(usersList);

        usernamesList = usersList.map(user => {
            return user.username;
        })

        console.log(usernamesList);
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = {};
        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }

        if (!usernamesList.includes(username)) {
            this.props.firebase
                .doCreateUserWithEmailAndPassword(email, passwordOne)
                .then(authUser => {
                    // Create a user in your Firebase realtime database
                    return this.props.firebase
                        .user(authUser.user.uid)
                        .set({
                            username,
                            email,
                            roles
                        });
                })
                .then(() => {
                    this.setState({ ...INITIAL_STATE });
                    this.props.history.push(ROUTES.HOME);
                })
                .catch(error => {
                    this.setState({ error });
                });
        } else {
            this.setState({
                error: 'Username already taken.',
                /* username: '' */
            })
        }

        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
              
            
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                    />
                    <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name" 
                    />
                 <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                /> <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <button disabled={isInvalid} type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
                {error && <p>{error}</p>}
            </form>);
    }
}

const SignUpLink = () => (
<p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
