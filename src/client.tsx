import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App/App";

ReactDOM.render(
        <Provider store={store()}>
            <Router>
                <App/>
            </Router>
        </Provider>,
    document.getElementById('root')
);
//
// // Hot Module Replacement API
// if (module["hot"]) {
//     module["hot"].accept('./App/App', () => {
//         const NextApp = require('./App/App');
//         ReactDOM.render(
//             <AppContainer>
//                 <NextApp/>
//             </AppContainer>,
//             document.getElementById('root')
//         );
//     });
// }