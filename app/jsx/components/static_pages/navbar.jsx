let translate = require('counterpart');
import * as constant from './../../constant'
import axios from 'axios'
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', is_signed: false,
      user_id: ''
    };

  }

  componentWillMount() {
    if (localStorage.grUser != null) {
      let gr_user = JSON.parse(localStorage.grUser);
      this.setState({
        email: gr_user.email,
        is_signed: true,
        user_id: gr_user.user_id,
      });
    }
    else {
      this.setState({is_signed: false});
    }
  }

  homeClick() {
    window.location = constant.BASE_URL
  }

  signOut() {
    axios.delete(constant.API_SIGN_OUT_URL, constant.headers)
      .then((response) => {
        localStorage.removeItem('grUser');
        window.location = constant.SIGN_IN_URL;
      })
      .catch(function (error) {
        alert(error)
      });
  }

  settingBtnClick() {
    window.location = constant.CURRENT_USER_INFO_URL;
  }

  createReviewCLick() {
    window.location = constant.CREATE_LOCATION_URL
  }

  usersImport() {
    window.location = constant.USERS_IMPORT
  }

  signUpClick() {
    window.location = constant.SIGN_UP_URL
  }

  loginClick() {
    window.location = constant.SIGN_IN_URL
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">{translate('app.static_pages.app_name')}</a>
          </div>
          <ul className="nav navbar-nav">
            {this.props.current_page === 1 ? <li onClick={this.homeClick.bind(this)} className="active"><a
              >{translate('app.static_pages.home')}</a></li> : <li onClick={this.homeClick.bind(this)}><a
              >{translate('app.static_pages.home')}</a></li>}
            {this.props.current_page === 2 ? <li onClick={this.createReviewCLick.bind(this)} className="active"><a
              >{translate('app.static_pages.createReview')}</a></li> :
              <li onClick={this.createReviewCLick.bind(this)}><a
              >{translate('app.static_pages.createReview')}</a></li>}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {!this.state.is_signed ?
              [<li key={0} onClick={this.signUpClick.bind(this)}><a ><span className="glyphicon glyphicon-user"></span>
                {translate('app.static_pages.signUp')}</a>
              </li>,
                <li key={1} onClick={this.loginClick.bind(this)}><a ><span
                  className="glyphicon glyphicon-log-in"></span>{translate('app.static_pages.login')}</a>
                </li>]
              : (<li className='dropdown'>
                <a className='dropdown-toggle' data-toggle='dropdown'
                   role='button' aria-haspopup='true' aria-expanded='false'>
                  {this.state.email}
                  <span className='caret'></span>
                </a>
                <ul className='dropdown-menu'>
                  <li onClick={this.settingBtnClick.bind(this)}>
                    <a>{translate('app.static_pages.setting')}</a>
                  </li>
                  <li role='separator' className='divider'></li>
                  <li onClick={this.signOut.bind(this)}>
                    <a>{translate('app.static_pages.log_out')}</a>
                  </li>
                </ul>
              </li>)}
          </ul>
        </div>
      </nav>
    )
  }
}
