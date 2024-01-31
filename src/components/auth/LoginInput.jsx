import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import CTAButton from '../common/CTAButton';
import { asyncSetAuthUser } from '../../redux/authUser/action';
import useTogglePassword from '../../hooks/useTooglePassword';

function LoginInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [show, handleTogglePassword] = useTogglePassword();

  const onLogin = async () => {
    await dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <form>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="text"
          rounded="lg"
          value={email}
          onChange={onEmailChange}
        />
      </FormControl>
      <FormControl isRequired mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            id="password"
            name="password"
            type={show ? 'text' : 'password'}
            rounded="lg"
            value={password}
            onChange={onPasswordChange}
          />
          <InputRightElement width="3.5rem">
            <Button
              h="1.75rem"
              size="sm"
              title="Show/Hide Password"
              onClick={handleTogglePassword}
            >
              {show ? (
                <IoEyeOffOutline size="20px" />
              ) : (
                <IoEyeOutline size="20px" />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <CTAButton action="Login" onClick={onLogin} />
    </form>
  );
}

export default LoginInput;
