import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actions from './store/action/index';
//reset css
import styleReset from './assets/style/reset.css';
//global css, placed after reset css so it overrides reset css
import style from './App.module.scss';
import Navbar from './Nav';
import { renderRoutes } from 'react-router-config';
import routes from './routes';
class App extends Component {
  //一進來app進check是否需登出或登入
  componentDidMount() {
    this.props.authCheckState()
  }
  render() {
    return (
      <div >
       <Navbar />
       <div className={style.center}>
        {renderRoutes(routes)}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch( actions.authCheckState() )
  }
}
export default connect(null, mapDispatchToProps)(App);
