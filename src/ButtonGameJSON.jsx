import { useCallback, useRef, useEffect } from 'react'
import { CodeBracketSquareIcon } from '@heroicons/react/24/solid'

export default function ButtonGameJSON({ value, onSubmit }) {
	const r = useRef()

	useEffect(() => {
		r.current.value = JSON.stringify(value, null, 2)
	}, [value])

	const handleOk = useCallback((e) => {
		try {
			onSubmit(JSON.parse(r.current.value))
		} catch (e) {
			e.preventDefault()
		}
	}, [])

	return (
		<>
			<button className='btn btn-sm btn-accent' onClick={() => document.getElementById('my_modal_1').showModal()}>
				<CodeBracketSquareIcon className='size-6' />
				JSON
			</button>
			<dialog id='my_modal_1' className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Edit Game JSON </h3>

					<textarea className='py-4 textarea w-full h-128' defaultValue={JSON.stringify(value, null, 2)} ref={r}></textarea>

					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn'>Close</button>
							<button className='btn btn-primary' onClick={handleOk}>
								Ok
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	)
}
