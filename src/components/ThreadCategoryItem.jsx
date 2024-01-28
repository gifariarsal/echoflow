import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function ThreadCategoryItem({ category, selected, selectCategory }) {
  return (
    <Button
      type="button"
      bg={category === selected ? 'brand.bg' : 'bg.secondary'}
      color="brand.main"
      fontWeight={400}
      p={2}
      mr={2}
      value={category}
      onClick={selectCategory}
      _hover={{ bg: 'brand.bg' }}
    >
      {`#${category}`}
    </Button>
  );
}

ThreadCategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  selected: PropTypes.string,
  selectCategory: PropTypes.func.isRequired,
};

ThreadCategoryItem.defaultProps = {
  selected: '',
};

export default ThreadCategoryItem;
