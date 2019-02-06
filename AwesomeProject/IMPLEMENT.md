# OverView

As we implement mechanism for getting data over API and parse it to use that data here are some process for implement it using 'redux-saga' middleware

# ReduxSaga

It is most popular library for handle asynchronous request in Redux Application
here it is link for redux-saga

* [Redux Saga](https://redux-saga.js.org/) for handle async request more efficiently


Here are some steps for implement it

# step 1:Install redux-saga and other dependencies

Redux is main thing in order to implement saga.so, if you don't want to implement it from start here is starter kit
(https://github.com/futurice/pepperoni-app-kit)
It can clone from here
Or if project is already on saga it doesn't need to clone

redux-saga package is required so here are some commands for that
Install
$ npm install --save redux-saga
or
$ yarn add redux-saga


# step 2:Get API url

Url is key requirement for make async request Here is a way

* [News API](https://newsapi.org/) from this link you can get url as well as API key 


# step 3:Create Service

In service we create functions for fetch
Here is an example,
```js
// ..\src\services\newsService.js
import * as apiEndpoints from '../services/ApiConfig';

export function getnews() {
    return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=22a1f0ba6fae4c339754b3d4d530c2d4')
        .then(response => response.json())
}
```
This is simple function which is responsible for fetch request and convert that response in JSON format.


# step 4:Create Actions And Reducers

acoording to need actions and reducers are created and an state is also required for that like,
## Actions
    ```js
    // ..\src\redux\actionsForSaga.js
        export const GET_NEWS = 'GET_NEWS';
        export const GET_NEWS_SUCCESS = 'GET_NEWS_SUCCESS';
        export const GET_NEWS_FAILURE = 'GET_NEWS_FAILURE';
        export const SET_LOADER = 'SET_LOADER';
        export const getNewsList = () => ({
            type: GET_NEWS,
            // payload: { page: page, pagesize: pagesize, sourceby: sourceby }
        });
        export const getNewsSuccess = (value) => ({
            type: GET_NEWS_SUCCESS,
            payload: value
        })
        export const getNewsFailure = (value) => ({
            type: GET_NEWS_FAILURE,
            payload: value
        })
        export const setLoader = (value) => ({
            type: SET_LOADER,
            payload: value
        })
    ```
## State
    ```js
    // ..\src\redux\actionsForSaga.js
        const initialState = Map({
            newsList: '',
            loader: false
        });
    ```
## Reducer
    ```js
    // ..\src\redux\actionsForSaga.js
        export default function newsReducer(state = initialState, action) {
            switch (action.type) {
                case GET_NEWS:
                    return state
                case GET_NEWS_SUCCESS:
                    return state.set('newsList', action.payload)
                case GET_NEWS_FAILURE:
                    return state
                case SET_LOADER:
                    return state.set('loader', action.payload)
                default:
                    return state
            }
        }
    ```
Above examples are Actions and Reducers for more information about that visit here(https://redux.js.org/basics/actions)


# step 5: Create Sagas
Sagas are functions and it divides in 2 parts 
1. SagaWatcher
2. SagaHandler

SagaWatcher : they watches for a particular action to be dipatched and as that action is dispatch it immediately calls SagaHandler which is second argument of watcher

SagaHandler : they are responsible for Actually handle request and dispatch actions.so that response can store into state via reducer and it can be useful in UI

for example: 
```js
    // ..\src\sagas\NewsSaga.js
    import { takeEvery, takeLatest, put, call } from 'redux-saga/effects'
    import * as Actions from '../../src/redux/actionsForSaga';
    import { getnews } from '../services/newsService';

    export function* getNewsListWatcher() {
        yield takeLatest(Actions.GET_NEWS, getNewsListHandler);
    }

    function* getNewsListHandler() {
        console.log('handler part');
        yield put(Actions.setLoader(true));
        try {
            let result = yield getnews();
            console.log("result is here in normal form", result);

            if (result.status === "ok") {
                yield put(Actions.getNewsSuccess(result));
            } else {
                Alert.alert(result.code, result.message);
                yield put(Actions.getNewsFailure(''));
            }
        } catch (error) {
            yield put(Actions.getNewsFailure(''));
        }
        yield put(Actions.setLoader(false));
    }

    export default getNewsListWatcher;
```

# step 6: Fork Saga

If there is any saga it has to be fork before mount to store and 'fork' effect of 'redux-saga' is useful for that here it works
```js
// ..\src\sagas\index.js
    import { all, fork } from 'redux-saga/effects';
    import { getNewsListWatcher } from './NewsSaga';

    export default function* rootSaga() {
        yield all([
            fork(getNewsListWatcher)
        ])
    }
```

rootSaga function is exported here and it will use for mount saga to store.
In next step it will import in store.

# step 7: mount saga in store 

now in 'store.js' file import 'rootSaga'
In this way
```js
// ..\src\redux\store.js
    import createSagaMiddleware from 'redux-saga'
    import rootSaga from '../sagas/index'
    const sagaMiddleware = createSagaMiddleware()

    const enhancers = [
        applyMiddleware(...middleware, sagaMiddleware),
        reduxLoop.install()
    ];
    const store = createStore(
        reducer,
        null,
        enhancer
    );
    sagaMiddleware.run(rootSaga);
```

# step 8: Use state in UI 

Till now all saga mechanism is set and ready to fetch data now it's time to use that received data in 'presentational component' and use it to update UI.

there are 2 type of component presentational and container.
For more details about that visit here(https://redux.js.org/basics/usagewithreact#implementing-components).

First See Presentational component
```js
// ..\src\modules\news\NewsView.js
    import * as Actions from '../../redux/actionsForSaga';
    import * as CommonFunctions from '../theme/functions/CommonFunctions';
    class NewsView extends Component {
        state = {
            allNews: [],
            loading: false
        }
        componentDidMount() {
            this.setState({ loading: true });
            this.props.dispatch(Actions.getNewsList());
            console.log("props are here", this.props);
            if (CommonFunctions.isJson(this.props.newsList)) {
                let articles = JSON.parse(this.props.newsList).articles;
                this.setState({ allNews: [articles] })
            }
        }
        componentWillReceiveProps(nextProps) {
            if (this.props.newsList !== nextProps.newsList) {
                console.log("check type of list", nextProps.newsList);
                console.log("check type", CommonFunctions.isJson(nextProps.newsList));
                if (CommonFunctions.isJson(nextProps.newsList)) {
                    let articles = JSON.parse(nextProps.newsList).articles;
                    console.log('all articles', articles);
                    this.setState({ allNews: articles });
                }
            }
        }
        render() {
            return (
                <View>
                    <Text>This is NewsView and you can use ListView or Flatlist to show UI and data is in 'this.state.allNews'</Text>
                </View>
            )
        }
    }
    export default connect()(NewsView);
``` 
Here CommonFunctions are some functions for easing.here it is
```js
// ..\src\modules\theme\functions\CommonFunctions.js
    export function isJson(str) {
        try {
            JSON.parse(str)
        } catch (e) {
            return false
        }
        return true
    }

```
this function is use for check whether response is in JSON format or not 

Now the question is 'From where this.props.newsList come?'
It is because of container component.so, In next step we will look at that

```js
// ..\src\modules\news\NewsViewContainer.js
    import { connect } from "react-redux";
    import NewsView from "./NewsView";
    import { bindActionCreators } from 'redux';
    import { NavigationActions } from 'react-navigation';

    export default connect(
        state => ({
            loader: state.getIn(['newsReducer', 'loader']),
            newsList: state.getIn(['newsReducer', 'newsList']),
        }),
        dispatch => {
            return {
                navigate: bindActionCreators(NavigationActions.navigate, dispatch),
            };
        }
    )(NewsView);
```

Here, NewsView is presentational component and connect method is from 'react-redux' package
It's first argument is called 'mapStateToProps' method and it can grab state from store directly and return as props,In this case they are newsList and loader now they can us as props in Presentational Comonent anytime.
