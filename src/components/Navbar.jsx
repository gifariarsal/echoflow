import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useMediaQuery,
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
import { userShape } from '../utils/propShape';

function Navbar({ authUser, onLogOut }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
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
        <Box display="flex" alignItems="center" gap={4}>
          <Box display={isMobile ? 'none' : 'block'}>
            <Link to="/">
              <Image
                src="/echoflow_logo.png"
                alt="logo"
                h="28px"
                _hover={{ filter: 'brightness(70%)', transition: '300ms' }}
              />
            </Link>
          </Box>
          <Link to="/">
            <Button
              variant="ghost"
              title="Home"
              rounded={isMobile ? 'full' : 'md'}
              gap={2}
              p={isMobile ? 0 : 2}
            >
              <IoHomeOutline />
              {isMobile ? '' : 'Home'}
            </Button>
          </Link>
          <Link to="/leaderboards">
            <Button
              variant="ghost"
              title="Leaderboards"
              rounded={isMobile ? 'full' : 'md'}
              gap={2}
              p={isMobile ? 0 : 2}
            >
              <IoBarChartOutline />
              {isMobile ? '' : 'Leaderboards'}
            </Button>
          </Link>
        </Box>
        <Box display={isMobile ? 'block' : 'none'}>
          <Link to="/">
            <Image
              src="/echoflow_icon.png"
              alt="logo"
              h="28px"
              _hover={{ filter: 'brightness(70%)', transition: '300ms' }}
            />
          </Link>
        </Box>
        {authUser ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar name={authUser?.name} src={authUser?.avatar} size="sm" />
            <Text>
              Hi,
              {authUser?.name}
            </Text>
            <Button
              gap={2}
              p={isMobile ? 0 : 2}
              onClick={onLogOut}
              title="Logout"
              variant="ghost"
              rounded={isMobile ? 'full' : 'md'}
              colorScheme="red"
            >
              <IoLogOutOutline />
              {isMobile ? '' : 'Logout'}
            </Button>
          </Box>
        ) : (
          <Link to="/login">
            <Button
              gap={2}
              p={2}
              title="Login"
              color="white"
              bg="brand.main"
              _hover={{ bg: 'brand.hover' }}
              _active={{ bg: 'brand.active' }}
            >
              <IoLogInOutline />
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </header>
  );
}

Navbar.propTypes = {
  authUser: PropTypes.shape(userShape),
  onLogOut: PropTypes.func,
};

Navbar.defaultProps = {
  authUser: null,
  onLogOut: () => {},
};

export default Navbar;
