import { Button } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function CTAButton({ action, onClick }) {
  return (
    <Button
      type="button"
      title={action}
      display="flex"
      justifyContent="center"
      w="100%"
      mt="6"
      rounded="lg"
      color="white"
      bgColor="brand.main"
      _hover={{ bgColor: 'brand.hover' }}
      _active={{ bgColor: 'brand.active' }}
      onClick={onClick}
    >
      {action}
    </Button>
  );
}

CTAButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};

export default CTAButton;
