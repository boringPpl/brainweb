import React, { Component, PropTypes } from 'react'
import { switchLocale } from '../lib/react-intl-redux'
import RouteCSSTransitionGroup from './RouteCSSTransitionGroup'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './Header'
import Nav from './Nav'

import { addLocaleData } from 'react-intl'
import vi from 'react-intl/locale-data/vi'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

// add vietnamese data
addLocaleData(vi)

const setDefaultLocale = locale => target => {
  target.needs = [
    switchLocale.bind(null, {
      locale,
      dataUrl: `http://localhost:3000/locale-data/${locale}.json`
    })
  ]
}

const muiTheme = getMuiTheme(null, {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36'
})

@setDefaultLocale('vi')
class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object
  };
  static childContextTypes = {
    location: PropTypes.object,
    isInit: PropTypes.bool
  };
  state = {
    isInit: true,
    openNav: false
  };

  getChildContext () {
    return {
      location: this.props.location,
      isInit: this.state.isInit
    }
  }

  componentWillReceiveProps () {
    this.setState({ isInit: false })
  }

  _handleTouchTapMenuIcon = () => this.setState({ openNav: !this.state.openNav });

  _handleNavRequestChange = openNav => this.setState({ openNav });

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Header
            onMenuIconTouchTap={this._handleTouchTapMenuIcon}
          />

          <Nav
            open={this.state.openNav}
            onRequestChange={this._handleNavRequestChange}
          />

          <RouteCSSTransitionGroup
            component='div' transitionName='page'
            transitionEnterTimeout={500} transitionLeaveTimeout={250}
          >
            {this.props.children}
          </RouteCSSTransitionGroup>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
