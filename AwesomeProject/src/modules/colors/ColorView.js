import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

const color = () => Math.floor(255 * Math.random());

class ColorView extends Component {
  static navigationOptions = {
    title: 'Colors',
    tabBarIcon: (props) => (
      <Icon name='color-lens' size={24} color={props.tintColor} />
    ),
    // TODO: move this into global config?
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#39babd'
    }
  }
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      background: `rgba(${color()},${color()},${color()}, 1)`
    };
  }

  open = () => {
    this.props.navigation.navigate('InfiniteColorStack')
  };

  render() {
    const buttonText = 'Open in Stack Navigator';
    return (
      <View style={[styles.container, { backgroundColor: this.state.background }]}>
        <Button color='#ee7f06' title={buttonText} onPress={this.open} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
})
export default ColorView;
