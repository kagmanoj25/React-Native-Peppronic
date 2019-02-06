import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import * as CommonFunctions from '../theme/functions/CommonFunctions'
export default class NewsView extends Component {
  static navigationOptions = {
    title: 'Colors',
    tabBarIcon: (props) => (
      <Icon name='web' size={24} color={props.tintColor} />
    ),
    // TODO: move this into global config?
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#39babd'
    }
  }

  static propTypes = {
    // loading: PropTypes.bool.isRequired,
    newsActions: PropTypes.shape({
      getNews: PropTypes.func.isRequired
    }).isRequired,
    navigate: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { newsActions: { getNews } } = this.props;
    getNews();
  }

  getNewsList = () => {
    const { newsActions: { getNews } } = this.props;
    getNews();
  };

  render() {
    // let articles = JSON.parse(this.props.news);
    console.log('what is the news data******>', this.props.news);

    if (CommonFunctions.isJson(this.props.news)) {
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.linkButton}
          accessible={true}
          accessibilityLabel={'News API'}
          onPress={this.getNewsList}>
          <Text>
            News API
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  linkButton: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5,
    height: 50,
    width: 100,
    backgroundColor: '#349d4a',
  }
});