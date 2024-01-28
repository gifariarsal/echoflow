import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../../redux/shared/action';
import ThreadCategoryItem from './ThreadCategoryItem';

function ThreadCategoryList({ onCategoryChange }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const threads = useSelector((state) => state.threads);

  const threadCategory = threads.map(({ category }) => category);
  const uniqueCategory = [...new Set(threadCategory)];

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const selectCategory = (categoryValue) => {
    if (selected === categoryValue) {
      onCategoryChange('');
      setSelected('');
    } else {
      onCategoryChange(categoryValue);
      setSelected(categoryValue);
    }
  };

  return (
    <>
      {uniqueCategory.map((category) => (
        <ThreadCategoryItem
          key={category}
          category={category}
          selected={selected}
          selectCategory={() => selectCategory(category)}
        />
      ))}
    </>
  );
}

ThreadCategoryList.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default ThreadCategoryList;
