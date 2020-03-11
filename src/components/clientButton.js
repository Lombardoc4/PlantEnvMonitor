import React, { Component } from 'react';

export default class clientButton extends Component {

    render(){

        return (
            <div>
                <button type="button" onClick={(e) => this.props.showModal("SignIn", e)} class="btn btn-success btn-lg mx-1">Sign In</button>
                <button type="button" onClick={(e) => this.props.showModal("SignUp", e)} class="btn btn-primary btn-lg mx-1" >Sign Up</button>
            </div>

        )
    }
}
