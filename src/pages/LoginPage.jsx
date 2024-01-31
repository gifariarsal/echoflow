import React from 'react';
import LoginInput from '../components/auth/LoginInput';
import AuthLayout from '../components/auth/AuthLayout';
import AuthContent from '../components/auth/AuthContent';

function LoginPage() {
  return (
    <AuthLayout>
      <AuthContent
        img="/login.png"
        name="Login"
        toLink="Register"
        topText="Don't have an account?"
        href="/register"
        input={<LoginInput />}
      />
    </AuthLayout>
  );
}

export default LoginPage;
