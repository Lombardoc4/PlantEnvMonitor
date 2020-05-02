import React from 'react';
import { useAuth0 } from "../react-auth0-spa";


const ClientButton = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

            {/* <button type="button" onClick={(e) => this.props.showModal("SignIn", e)} className="btn btn-success btn-lg mx-1">Sign In</button> */}
            <button type="button" onClick={(e) => this.props.showModal("SignUp", e)} class="btn btn-primary btn-lg mx-1" >Sign Up</button>
        </div>

    )
}
export default ClientButton;
