import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import classes from './loginPage.module.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useEffect } from 'react';
import Title from '../../components/Title/Title.jsx';
import Input from '../../components/Input/Input.jsx';
import Button from '../../components/Button/Button.jsx';
import { EMAIL } from '../../constants/patterns.js';

function LoginPage() {

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [params] = useSearchParams(); // obtiene todo lo que viene luego de ?, que son las query
    const returnUrl = params.get('returnUrl'); // obtiene la url de la ubicacion antes de ir a login

    useEffect(() => {
        if (!user) return;

        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user]);

    const submit = async ({ email, password }) => {
        await login(email, password);
    }


    return (
        <div className={classes.container}>
            <div className={classes.details}>
                <Title title='Login' />
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input
                        type='email'
                        label='Email'
                        {...register('email', {
                            required: true,
                            pattern: EMAIL
                        })}
                        error={errors.email}
                    />

                    <Input
                        type='password'
                        label='Password'
                        {...register('password', {
                            required: true
                        })}
                        error={errors.password}
                    />

                    <Button type='submit' text='Login' />

                    <div className={classes.register}>
                        New user? &nbsp;
                        <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage