import React from 'react'
import routes  from './routes'

import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { MdAdminPanelSettings } from 'react-icons/md'

const links = [
	{ text: 'add job', path: routes.addjob, icon: <FaWpforms /> },
	{ text: 'all jobs', path: routes.alljobs , icon: <MdQueryStats /> },
	{ text: 'stats', path: routes.stats, icon: <IoBarChartSharp /> },
	{ text: 'profile', path: routes.profile, icon: <ImProfile /> },
	{ text: 'admin', path: routes.admin, icon: <MdAdminPanelSettings /> }
]

export default links
