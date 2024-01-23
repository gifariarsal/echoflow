import {
  Avatar, Box, Button, Flex, Image, Text
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoBarChartOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoHomeOutline,
} from 'react-icons/io5';
import PropTypes from 'prop-types';

function Navbar({ authUser, onLogOut }) {
  return (
    <header>
      <Flex
        w="full"
        zIndex={10}
        bg="white"
        color="#1c1c1c"
        h="60px"
        borderBottom={1}
        borderStyle="solid"
        borderColor="#F6B3CF"
        align="center"
        justifyContent="space-between"
        cursor="pointer"
        px={{ base: 4, md: 8 }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Link to="/">
            <Image
              src="/echoflow_logo.png"
              alt="logo"
              h="28px"
              _hover={{ filter: 'brightness(70%)', transition: '300ms' }}
            />
          </Link>
          <Link to="/">
            <Button variant="ghost" leftIcon={<IoHomeOutline />}>
              Home
            </Button>
          </Link>
          <Link to="/leaderboards">
            <Button variant="ghost" leftIcon={<IoBarChartOutline />}>
              Leaderboards
            </Button>
          </Link>
        </Box>
        {authUser ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar name={authUser?.name} src={authUser?.avatar} size="sm" />
            <Text>
              Hi,
              {' '}
              {authUser?.name}
            </Text>
            <Button
              onClick={onLogOut}
              variant="ghost"
              leftIcon={<IoLogOutOutline />}
              colorScheme="red"
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Link to="/login">
            <Button
              color="white"
              bg="brand.main"
              leftIcon={<IoLogInOutline />}
              _hover={{ bg: 'brand.hover' }}
              _active={{ bg: 'brand.active' }}
            >
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </header>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

Navbar.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  onLogOut: PropTypes.func,
};

Navbar.defaultProps = {
  authUser: null,
  onLogOut: () => {},
};

export default Navbar;
