import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'
/**
 * Populates 100 jobs from mockdata => mockaroo.com to the
 * mongo.db. It has to be called once for every user you
 * wish to has had created those jobs. In my case these 
 * are the testuser and the admin john. 
 */

try {
	mongoose.connect(process.env.MONGO_URL)
  const users=['test@test.com', 'john@mail.com']
	const user = await User.findOne({ email: users[1] })
	const jsonJobs = JSON.parse(
		await readFile(new URL('mockJobs.json', import.meta.url))
	)
	const jobs = jsonJobs.map((job) => {
		return { ...job, createdBy: user._id }
	})
	await Job.deleteMany({ createdBy: user._id })
	await Job.create(jobs)
	console.log('Successfully populated all 100 jobs!!!')
	process.exit(0)
} catch (error) {}
