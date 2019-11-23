import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/action/index'
import userName from '../../../assets/others/user_name.png';
import password from '../../../assets/others/password.png';
import leftBackground from '../../../assets/others/italy-1587287_1280.jpg';
import css from './Auth.module.scss';
import translationJson from '../../../Static/translation.json';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import Button from '../../../Components/UI/Button/Button';
class Auth extends Component {
    state = {
        translationJson,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: '請輸入您的email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: '請輸入您的密碼'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: false,
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    
    /**
     * password input的提示顯示
     * @param {string} controlName
     */
    displayHintText = controlName => {
        let hintElement = document.getElementsByClassName('hintText')
        //先清空
        for (let i = 0; i < hintElement.length; i++){
            hintElement[i].innerHTML = ''
        }
        if(controlName === 'password') hintElement[1].innerHTML='需含至少6個字母'        
    }

    //section352-937
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    /**
     * 手機尺寸時(<420px)隱藏input裡的icon
     */
    onClearInputIcon = () =>{
        let width = window.screen.width
        let imgElement = document.getElementsByClassName('imgElement')
        if(width <= 420) {
            for (let i = 0; i < imgElement.length; i++){
                imgElement[i].style.display = 'none'
            }
        }
    }

    // #353 adding actions-5:35
    submitHandler = event => {
        event.preventDefault(); //prevent reloading of the page
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    /**
     * switch btw signin & signup
     */
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    componentDidMount = () =>{
        // 頁面載入時清空redux的error message
        this.props.onClearErrorMessage()

        //頁面載入時跑出圖片
        this.imagesInInputs()

        //手機尺寸時(<420px)隱藏input裡的icon
        this.onClearInputIcon()
    }

    /**
     * 跑出inputs的兩張不同icon圖, (bug的workaround->)因暫時無法在render的formElementsArray的迴圈裡放不同的圖片
     */
    imagesInInputs = () =>{
        let imgElement = document.getElementsByClassName('imgElement')
        imgElement[0].src=userName
        imgElement[1].src=password
    }

    /**
     * 
     * @param {*} prevState
     * @param {*} prevProps 
     */
    componentDidUpdate = (prevProps, prevState) => {
        // user點選註冊/登入清空以下
        if (this.state.isSignup != prevState.isSignup) {
            // redux的error message
            this.props.onClearErrorMessage()
            // input的提示
            this.displayHintText()

            //手機尺寸時(<420px)隱藏input裡的icon
            this.onClearInputIcon()   
        }

        // 因為有error時會重新render而不會跑出圖, 所以去偵測props.error有改變時重新帶入圖片
        if (this.props.error != prevProps.error) {
            this.imagesInInputs()
            this.onClearInputIcon()
        }
    }

    render() {
    const FontAwesome = require('react-fontawesome')

    //convert state.controls to an aray to be looped
    const formElementsArray = [];
    let key
    for (key in this.state.controls) {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }
    let form = formElementsArray.map(i => (
        <div style={{position:'relative'}}
            onClick={() => this.displayHintText(i.id)}
            onKeyUp={() => this.displayHintText(i.id)}>
            <Input
            key={i.id}
            elementType={i.config.elementType}
            elementConfig={i.config.elementConfig}
            value={i.config.value}
            invalid={!i.config.valid}
            shouldValidate={i.config.validation}
            touched={i.config.touched}
            changed={(event) => this.inputChangedHandler(event, i.id)} />
            <div class='hintText' style={{margin: '0px 0px 20px 0px',
                color: 'black',
                fontWeight: '100',
                fontSize: '20px'}} />
            <img class='imgElement' 
                style={{position: 'absolute',
                top: '13px',
                left: '356px',
                width: '40px'
            }}  />
        </div>
    ));

    //submit之後把input區換成spinner
    if (this.props.loading) form = <Spinner />

    //即時反應this.props.error的對應錯誤訊息
    let errorMessage
    //預設為null,有error msg則會進入if判斷式
    if (this.props.error != undefined) {
        let found = false;
        //檢查是否有在translation的mapping裡面
        let i
        for (i in translationJson) {
            if (translationJson[i].en === this.props.error.message) {
                found = true
                break
            }
        }
        errorMessage = found
            //有則給出對應中文
            ? translationJson.find(i => i.en === this.props.error.message).ch
            //沒有則單純顯示錯誤
            : 'email或密碼格式有錯，請再試一次'
    }

    // 有error message的時候顯示對應畫面
    let errorMessageContent
    if(errorMessage) errorMessageContent = (
        <div style={{ position: 'relative' }} 
            className={`${css.bullhorn} ${css.generalText}`}>
            <FontAwesome name="bullhorn" />
            {errorMessage}
        </div>
    )


    let redirect
    // checkout之後要導入到原產品頁面
    if (this.props.isAuthenticated && this.props.openCartAfterAuth) {
        redirect = (<Redirect to={"/product-page/" + this.props.productSelected.id} />)
    }
    //一般登入, 登入完後到homepage
    if (this.props.isAuthenticated && !this.props.openCartAfterAuth) {
        redirect = (<Redirect to="/" />)
    }
        return (
            <div className={css.wrap} >
                {redirect}
                <aside>
                    <img src={leftBackground} />
                </aside>
                <aside>
                    <div>
                        <div className={css.generalExtraLarge}>
                            <form onSubmit={this.submitHandler}>
                            <header style={{ textAlign: 'center' }}>{this.state.isSignup ? '註冊' : '登入'}
                        </header>
                                {errorMessageContent}
                                {form}
                                <Button
                                ><div style={{
                                    color: 'white',
                                    fontSize: '20px',
                                    fontWweight: 'bold',
                                    margin: 'auto',
                                }}>送出</div></Button>

                            </form>
                            <div style={{color: 'darkblue',
                                textAlign: 'center',
                                fontSize: '16px',
                                marginTop: '10px',
                                textDecoration: 'underline',
                                cursor: 'pointer'}} onClick={this.switchAuthModeHandler}>我要{this.state.isSignup ? '登入' : '註冊'}</div>
                        </div>
                    </div>
                </aside>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        openCartAfterAuth: state.cart.openCartAfterAuth,
        productSelected: state.product.productDetail
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onClearErrorMessage: () => dispatch(actions.clearErrorMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
