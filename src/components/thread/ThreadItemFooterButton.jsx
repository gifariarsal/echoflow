import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function ThreadItemFooterButton({
  icon, title, value, onClick
}) {
  return (
    <Button
      type="button"
      title={title}
      variant="ghost"
      display="flex"
      alignItems="center"
      rounded="full"
      fontWeight="normal"
      p={1}
      onClick={onClick}
      leftIcon={icon}
    >
      {value}
    </Button>
  );
}

ThreadItemFooterButton.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ThreadItemFooterButton;
