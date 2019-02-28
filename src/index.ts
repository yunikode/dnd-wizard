import * as React from 'react';
import {render} from 'react-dom';
import './index.scss';
import {App} from './App';
import * as serviceWorker from './serviceWorker';

render(React.createElement(App, {}, null), document.getElementById('root'));

serviceWorker.unregister();
