import { Button, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function ThreadItemFooterButton({ icon, value, onClick }) {
  return (
    <Button
      type="button"
      variant="ghost"
      rounded="full"
      fontWeight="normal"
      p={1}
      onClick={onClick}
    >
      <Text display="flex" alignItems="center" gap={1}>
        {icon}
        {value}
      </Text>
    </Button>
  );
}

ThreadItemFooterButton.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ThreadItemFooterButton;
