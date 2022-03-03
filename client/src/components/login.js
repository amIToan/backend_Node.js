import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import AlertMessage from './alert';
const Login = () => {
    const Navigate = useNavigate(); 
    const { userLogin} = useContext(AuthContext);
    const [stateLogin, setStateLogin] = useState({
        username : '',
        password : ''
    })
    const [alert, setAlert] = useState(false)
    const {username, password} = stateLogin;
    const onChangeLoginForm = e => setStateLogin({...stateLogin, [e.target.name] : e.target.value});
    const onLogin = async(e) => {
        e.preventDefault();
        try {
            const loginData = await userLogin(stateLogin);
            if (loginData.success ){
                Navigate('/dashboard');
            }else{
                console.log(loginData.data)
                setAlert({
                    ...alert,
                    type: 'danger',
                    message : loginData.data.message,
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
        <Form className='my-4' onSubmit={onLogin}>
            { alert ? <AlertMessage info={alert} /> : undefined}
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='Username'
                    name='username'
                    required
                    value={username}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='password'
                    placeholder='Password'
                    name='password'
                    required
                    value={password}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>
            <Button variant='success' type='submit'>
                Login
            </Button>
        </Form>
        <p>
            Don't have an account?
            <Link to='/commonForm/register'>
                <Button variant='info' size='sm' className='ml-2'>
                    Register
                </Button>
            </Link>
        </p>
    </>
    )
}

export default Login;
