import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Playlists from './Playlists';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<Playlists />
	</div>, document.getElementById('root'));

registerServiceWorker();
