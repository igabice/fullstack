//redux
import  React from  'react';
import  ReactDom from  'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";

import App from "./component/App";

import reducers from './reducers';

const store = createStore(reducers,{}, applyMiddleware() )

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root ')
);