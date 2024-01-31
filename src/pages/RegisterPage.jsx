import React from 'react';
import RegisterInput from '../components/auth/RegisterInput';
import AuthLayout from '../components/auth/AuthLayout';
import AuthContent from '../components/auth/AuthContent';

function RegisterPage() {
  return (
    <AuthLayout>
      <AuthContent
        img="/register.png"
        name="Register"
        toLink="Login"
        topText="Already have an account?"
        href="/login"
        input={<RegisterInput />}
      />
    </AuthLayout>
  );
}

export default RegisterPage;
