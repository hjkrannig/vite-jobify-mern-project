/* eslint-disable react/prop-types */
const FormRowSelect = ({
	name,
	labelText,
	list,
	defaultValue = '',
	onChange
}) => {
	return (
		<div className='form-row'>
			<label htmlFor={name} className='form-label'>
				{labelText || name}
			</label>
			<select
				name={name}
				id={name}
				className='form-select'
				defaultValue={defaultValue}
				onChange={onChange}>
				{list.map((elt) => {
					return (
						<option key={elt} value={elt}>
							{elt}
						</option>
					)
				})}
			</select>
		</div>
	)
}
export default FormRowSelect
