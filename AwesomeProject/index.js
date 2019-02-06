/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux';
import store from './src/redux/store'

import { AppRegistry } from 'react-native';
import AppViewContainer from './src/modules/AppViewContainer';
import { name as appName } from './app.json';

class MJTemplate extends Component {
  // static navigationOptions = {
  //   header: null
  // }

  render() {
    return (
      <Provider store={store}>
        <AppViewContainer />
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => MJTemplate);
// AppRegistry.registerComponent(appName, () => App);
