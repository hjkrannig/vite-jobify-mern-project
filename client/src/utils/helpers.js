const checkDarkTheme = () => {
	const isDarkTheme = localStorage.getItem('IsDarkTheme') === 'true'
	document.body.classList.toggle('dark-theme', isDarkTheme)
	return isDarkTheme
}

export {checkDarkTheme, }