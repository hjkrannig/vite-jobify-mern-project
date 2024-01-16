import 'express-async-errors'
import * as dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'

// Prepare to include Public Folder
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))

// Routers
import jobRouter from './routers/jobRouter.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'

// Error-Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'

// Environment
dotenv.config()
const node_env = process.env.NODE_ENV

// Create Server
const app = express()

// MORGAN MW adds logs to server-output
if (node_env === 'development') {
	app.use(morgan('dev'))
}

// Configure Cloudanary
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET
})

// Include Public Folder
app.use(express.static(path.resolve(__dirname, './client/dist')))

// Cookie-Parser
app.use(cookieParser())

// JSON MW allows using json out of the box
app.use(express.json())

// Testroute
app.get('/api/v1/test', (req, res) => {
	res.json({ msg: 'test route' })
})

// Rourter-Middleware uses custom Router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/job', authenticateUser, jobRouter)
app.use('/api/v1/user', authenticateUser, userRouter)

// main-index.html in public after copying client dist
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

// NOT FOUND MW Not Found
app.use('*', (req, res) => {
	// will be triggered when route is not found
	res.status(404).json({ msg: 'not found' })
})

// ERROR MW Server Error or undefined Error
app.use(
	// will be triggered from correct route when an error occures
	errorHandlerMiddleware
)

// main server-loop
try {
	const port = process.env.PORT || 5100
	// connect to mongo.db
	await mongoose.connect(process.env.MONGO_URL)
	// start server
	app.listen(port, () => {
		console.log(`Server up and listening on port ${port}...`)
	})
} catch (error) {
	console.log(error)
	exit(1)
}
