import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../redux/authUser/action';
import LoginInput from '../components/auth/LoginInput';
import AuthLayout from '../components/auth/AuthLayout';
import AuthContent from '../components/auth/AuthContent';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <AuthLayout>
      <AuthContent
        img="/login.png"
        name="Login"
        toLink="Register"
        topText="Don't have an account?"
        href="/register"
        input={<LoginInput onLogin={onLogin} />}
      />
    </AuthLayout>
  );
}

export default LoginPage;
