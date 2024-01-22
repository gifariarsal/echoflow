import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import useInput from '../hooks/useInput';

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="text"
          rounded="lg"
          value={email}
          onChange={onEmailChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password" mt="4">
          Password
        </FormLabel>
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
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? (
                <IoEyeOffOutline size="20px" />
              ) : (
                <IoEyeOutline size="20px" />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        type="button"
        display="flex"
        justifyContent="center"
        w="100%"
        mt="6"
        rounded="lg"
        color="white"
        bgColor="brand.main"
        _hover={{ bgColor: 'brand.hover' }}
        _active={{ bgColor: 'brand.active' }}
        onClick={() => onLogin({ email, password })}
      >
        Log In
      </Button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
