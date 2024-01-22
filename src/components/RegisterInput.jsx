import React from 'react';
import PropTypes from 'prop-types';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';

function RegisterInput({ onRegister }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          type="text"
          rounded="lg"
          value={name}
          onChange={onNameChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          rounded="lg"
          value={email}
          onChange={onEmailChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="password" mt="4">
          <Flex alignItems="baseline" justifyContent="space-between">
            Password
          </Flex>
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
        onClick={() => onRegister({ name, email, password })}
      >
        Log In
      </Button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
