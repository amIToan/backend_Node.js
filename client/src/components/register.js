import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import AlertMessage from './alert';
const Register = () => {
	const Navigate = useNavigate();
	const { userRegister } = useContext(AuthContext);
	const [isRegistered, setRegistered] = useState({
		username: '',
		password: '',
		confirmPassword: ''
	})
	const [alert, setAlert] = useState(false)
	const { username, password, confirmPassword } = isRegistered;
	const onChangeRegister = e => setRegistered({ ...isRegistered, [e.target.name]: e.target.value });
	const onRegisterSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setAlert({
				...alert,
				type: 'danger',
				message: ' The confirmed Password is inaccurate',
			});
			setTimeout(() => {
				setAlert(false) 
			}, 3000);
			return
		}
		try {
			const registerData = await userRegister(isRegistered);
			if (registerData.success) {
				return Navigate('/dashboard');
			} else {
				console.log(registerData.data)
				setAlert({
					...alert,
					type: 'danger',
					message: registerData.data.message,
				})
				setTimeout(() => {
					setAlert(false)
				}, 3000);
				console.log('len chua')
			}
		} catch (error) {
			console.log(error)

		}

	}
	return (
        <>
			<Form className='my-4' onSubmit={onRegisterSubmit}>
				 { alert ? <AlertMessage info={alert} /> : undefined}
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeRegister}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={onChangeRegister}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='confirmPassword'
						required
						value={confirmPassword}
						onChange={onChangeRegister}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Register
				</Button>
			</Form>
			<p>
				Already have an account?
				<Link to='/login'>
					<Button variant='info' size='sm' className='ml-2'>
						Login
					</Button>
				</Link>
			</p>
		</>
    )
}

export default Register;
