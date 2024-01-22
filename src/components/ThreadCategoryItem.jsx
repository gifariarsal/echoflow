import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

function ThreadCategoryItem({ category, selected, selectCategory }) {
  return (
    <Button
      type="button"
      rounded="full"
      bg={category === selected ? 'bg.primary' : 'bg.secondary'}
      color="brand.main"
      fontWeight={400}
      value={category}
      onClick={selectCategory}
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
