import {
  Box, Button, Image, Text, VStack
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function AuthContent({
  img, name, toLink, topText, href, input
}) {
  return (
    <>
      <Box
        w="40%"
        display={{ base: 'none', md: 'flex' }}
        rounded="xl"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={img} alt={name} w={{ md: '80%', lg: '50%' }} />
      </Box>
      <Box w={{ base: 'full', md: '60%' }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          gap={2}
          p={{ base: '10px 20px', md: '20px 40px' }}
        >
          <Text>{topText}</Text>
          <Button
            as="a"
            fontSize="md"
            fontWeight={400}
            variant="link"
            href={href}
            color="brand.main"
          >
            {toLink}
          </Button>
        </Box>
        <VStack
          spacing="4"
          py="20px"
          px={{ base: '40px', md: '60px', lg: '140px' }}
        >
          <Text
            w="100%"
            fontSize="xx-large"
            display="flex"
            justifyContent="flex-start"
            fontWeight="bold"
          >
            {name}
          </Text>
          <Box w="full">{input}</Box>
        </VStack>
      </Box>
    </>
  );
}

AuthContent.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toLink: PropTypes.string.isRequired,
  topText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  input: PropTypes.node.isRequired,
};

export default AuthContent;
