import React from 'react';
import colorScheme from '../constants/colors';

export default class Header extends React.Component{

  render() {
    const user = window.MC.userProfile
    const colors = colorScheme[this.props.colors] || colorScheme[user.colors];

    return (
      <div className="header">
        <div className="home-menu pure-menu pure-menu-horizontal"
          style={{whiteSpace:"normal", backgroundColor: colors.mastery3}}>
          <a className="pure-menu-heading" href="/">Mission Control</a>
          <ul className="pure-menu-list">
            {user.is_authenticated ? this.renderUser() : this.renderLogin()}
          </ul>
        </div>
      </div>
    )
  }

  renderLogin(){
    return (
      <li className="pure-menu-item">
        <a href="/khan/authorize" className="pure-menu-link">Login</a>
      </li>
    )
  }

  renderUser(){
    const user = window.MC.userProfile
    return (
      <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
        <a href="#" className="pure-menu-link">
          {user.nickname}
        </a>
        <ul className="pure-menu-children">
          <li className="pure-menu-item">
            <a href="/" className="pure-menu-link">Home</a>
          </li>
          <li className="pure-menu-item">
            <a href="/profile" className="pure-menu-link">Profile</a>
          </li>
          <li className="pure-menu-item">
            <a href="/logout" className="pure-menu-link">Logout</a>
          </li>
        </ul>
      </li>
    );
  }
}
