import React from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import CTAButton from '../common/CTAButton';
import { asyncRegisterUser } from '../../redux/users/action';
import useTogglePassword from '../../hooks/useTooglePassword';

function RegisterInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [show, handleTogglePassword] = useTogglePassword();

  const onRegister = () => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <form>
      <FormControl isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          type="text"
          rounded="lg"
          value={name}
          onChange={onNameChange}
        />
      </FormControl>
      <FormControl isRequired mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
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
            <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
              {show ? (
                <IoEyeOffOutline size="20px" />
              ) : (
                <IoEyeOutline size="20px" />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <CTAButton
        action="Register"
        onClick={() => onRegister({ name, email, password })}
      />
    </form>
  );
}

export default RegisterInput;
