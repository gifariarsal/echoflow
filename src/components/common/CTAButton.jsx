import { Button } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function CTAButton({ action, onClick, width = '100%' }) {
  return (
    <Button
      type="button"
      title={action}
      display="flex"
      justifyContent="center"
      w={width}
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
  width: PropTypes.string,
};

CTAButton.defaultProps = {
  width: '100%',
};

export default CTAButton;
