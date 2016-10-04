import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import { login } from '../actions/UserActions';
import LoginForm from '../components/LoginForm';
import WindowUtil from '../util/WindowUtil';

class LoginPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  
  componentDidMount() {
    WindowUtil.setProperties({
      resizable: process.env.ENV === 'development',
      resizable: true,
      width: 320,
      height: 420,
    });
  }

  handleFormSubmit = (account, password, host) => {
    const { dispatch } = this.props;
    return dispatch(login(account, password, host));
  }

  render() {
    return (
      <div className="login-page title-bar">
        <div className="logo" >
          <img src="images/leanote-icon-en.png" alt="leanote" />
        </div>
        <LoginForm onSubmit={this.handleFormSubmit}/>
      </div>
    );
  }
}

// Add dispatch to LoginPage.props
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
