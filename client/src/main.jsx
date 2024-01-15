import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { ToastContainer } from 'react-toastify'

// import customFetch from './api/customFetch.js'
// s. in vite.config.js, where a sort of proxy-server is defined for this url to avoid cors-errors
// const res = await customFetch.get('test')
// console.log(res.data) // {msg: 'test route'}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
		<ToastContainer position='top-center' />
	</React.StrictMode>
)
