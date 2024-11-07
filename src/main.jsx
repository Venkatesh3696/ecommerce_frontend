import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/store.js';
import { Toaster } from './components/ui/toaster.jsx';

createRoot(document.getElementById('root')).render(
	<Router>
		<Provider store={store}>
			<App />
			<Toaster />
		</Provider>
	</Router>,
);
