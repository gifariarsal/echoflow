import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../redux/users/action';
import RegisterInput from '../components/auth/RegisterInput';
import AuthLayout from '../components/auth/AuthLayout';
import AuthContent from '../components/auth/AuthContent';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <AuthLayout>
      <AuthContent
        img="/register.png"
        name="Register"
        toLink="Login"
        topText="Already have an account?"
        href="/login"
        input={<RegisterInput onRegister={onRegister} />}
      />
    </AuthLayout>
  );
}

export default RegisterPage;
