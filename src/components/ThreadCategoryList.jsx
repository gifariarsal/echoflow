import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../redux/shared/action';
import useInput from '../hooks/useInput';
import ThreadCategoryItem from './ThreadCategoryItem';

function ThreadCategoryList({ onCategoryChange }) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useInput('');
  const threads = useSelector((state) => state.threads);

  const threadCategory = threads.map(({ category }) => category);
  const uniqueCategory = [...new Set(threadCategory)];

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const selectCategory = (e) => {
    onCategoryChange(e);
    setSelected(e);
  };

  return (
    <>
      {uniqueCategory.map((category) => (
        <ThreadCategoryItem
          key={category}
          category={category}
          selected={selected}
          selectCategory={selectCategory}
        />
      ))}
    </>
  );
}

ThreadCategoryList.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default ThreadCategoryList;
