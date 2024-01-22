import {
  Avatar, Box, Button, Flex, Icon, Image, Text
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoBarChartOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

function Navbar({ authUser, onLogOut }) {
  const navigate = useNavigate();
  const onLogIn = () => {
    navigate('/login');
  };
  return (
    <Box>
      <Flex
        w="full"
        zIndex={10}
        bg="white"
        color="#1c1c1c"
        minH="60px"
        borderBottom={1}
        borderStyle="solid"
        borderColor="#F6B3CF"
        align="center"
        justifyContent="space-between"
        cursor="pointer"
        px={{ base: 4, md: 8 }}
      >
        <Box display="flex" alignItems="center">
          <Link to="/">
            <Image
              mr={6}
              src="/echoflow_logo.png"
              alt="logo"
              h="28px"
              _hover={{ filter: 'brightness(70%)', transition: '300ms' }}
            />
          </Link>
          <Link to="/leaderboards">
            <Button variant="ghost" color="dark" _hover={{ bg: 'gray.100' }}>
              <Icon as={IoBarChartOutline} mr={2} />
              Leaderboards
            </Button>
          </Link>
        </Box>
        <Box display="flex" gap={2}>
          {authUser && (
            <Box display="flex" gap={2} alignItems="center">
              <Avatar name={authUser?.name} src={authUser?.avatar} size="sm" />
              <Text>
                Hi,
                {authUser?.name}
              </Text>
            </Box>
          )}
          <Button
            onClick={authUser ? onLogOut : onLogIn}
            variant="ghost"
            color="dark"
            _hover={{ bg: 'gray.100' }}
            _active={{ bg: 'gray.300' }}
          >
            {authUser ? 'Logout' : 'Login'}
          </Button>
        </Box>
      </Flex>
    </Box>
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
