import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
    passwordConfirm: ''
};

const passwordConfirm = ()

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;
        this.props.firebase.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { passwordOne, passwordTwo, error, passwordConfirm } = this.state;
    
        

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="New Password"
                /> <input
                    name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm New Password"
                />
                <button disabled={isInvalid} type="submit">
                    Change My Password
                </button>
                {error && <p>{error.message}</p>}
                {passwordConfirm && <p>{passwordConfirm}</p>}
            </form>
        );
    }
}

export default withFirebase(PasswordChangeForm);