import React from 'react';
import ReactDOM from 'react-dom';
import { polyfill } from 'es6-promise'; polyfill();

import SearchComponent from './components/searchComponent/searchComponent';
import '../scss/app.scss';

ReactDOM.render(<SearchComponent />, document.getElementById('booking-app'));
