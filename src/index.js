import React from 'react';
import ReactDOM from 'react-dom';

import store from './redux'
import {Provider} from "react-redux";
import PublicForm from "./pages/public/sign-in";

ReactDOM.render(
      <Provider store={store}>
          <div>
              <PublicForm/>
          </div>
      </Provider>,
  document.getElementById('root')
);
