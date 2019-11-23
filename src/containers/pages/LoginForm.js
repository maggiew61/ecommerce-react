import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN_USER } from '../../store/action/user';
class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogin = () => {
        let email = this.state.email
        let password = this.state.password
        // console.log('email:',email,' password:',password)
        let token = this.props.userLogin(email, password)
        // console.log('token:', token)
        // console.log('this.props.user',this.props.user)
        this.props.user.isPass?  alert('OK PASS') : alert('cant login;wrong id or pass')

    };

    render() {
        let data = this.props.user
        console.log('data:',data)
        // data.isPass
        // ? alert('correct login info')
        // : alert('wrong login info')
            return (
            <div>
                <h3>User Login</h3>
                <header>信箱</header>
                <input type="email" name="email" placeholder="Enter email"
                    defaultValue={this.state.email}
                    onChange={this.handleInputChange} />
                <p>We well never share your email with anyone else.</p>
                <header>密碼</header>
                <input type="email" name="password" placeholder="Enter password"
                    defaultValue={this.state.password}
                    onChange={this.handleInputChange} />
                <button variant="primary" type="button" onClick={this.handleLogin}>
                    登入
                </button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
          userLogin: (email,password) => dispatch({type:LOGIN_USER,email,password}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
