import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';
import NewsViewContainer from '../news/NewsViewContainer'

const headerColor = '#39babd';
const activeColor = 'white';

//STEP-3
export const MainScreenNavigator = createBottomTabNavigator({
  Counter: { screen: CounterViewContainer },
  Color: { screen: ColorViewContainer },
  News: { screen: NewsViewContainer }
}, {
    tabBarOptions: {
      ...Platform.select({
        android: {
          activeTintColor: activeColor,
          indicatorStyle: { backgroundColor: activeColor },
          style: { backgroundColor: headerColor }
        }
      })
    }
  });


const AppNavigator = createStackNavigator({
  Home: {
    screen: MainScreenNavigator, navigationOptions: {
      title: 'Counter',
      headerTitleStyle: { color: 'white' },
      headerStyle: {
        backgroundColor: headerColor,
        elevation: 0 // disable header elevation when TabNavigator visible
      }
    }
  },
  News: {
    screen: NewsViewContainer
  },
  InfiniteColorStack: {
    screen: ColorViewContainer, navigationOptions: {
      title: 'Color',
      headerTitleStyle: { color: 'white' },
      headerStyle: {
        backgroundColor: headerColor,
        elevation: 0 // disable header elevation when TabNavigator visible
      }
    }
  }
}
);
export default createAppContainer(AppNavigator);

// export default AppNavigator;
