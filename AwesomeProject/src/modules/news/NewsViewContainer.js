import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import NewsView from './NewsView';
import NewsActions from '../../redux/news'
export default connect(
  state => ({
    news: state.getIn(['news', 'newsList']),
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      newsActions: bindActionCreators(NewsActions, dispatch)
    }
  })(NewsView);