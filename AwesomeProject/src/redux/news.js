import { createReducer, createActions } from 'reduxsauce';
import { Map } from 'immutable'

const INITIAL_STATE = {
  newsList: [],
  loader: false,
};

const { Types, Creators } = createActions({
  newsSuccessful: ['payload'],
  newsFailure: null,
  getNews: ['payload']
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEWS_SUCCESSFUL]: newsSuccessfulReducer,
  [Types.NEWS_FAILURE]: newFailureReducer,
});

function newsSuccessfulReducer(state, { payload }) {
  return {
    ...state,
    newsList: state.set('newsList', payload)
  };
}
function newFailureReducer(state) {
  return {
    ...state,
    newsList: []
  };
}

export const NewsTypes = Types;
export default Creators;


