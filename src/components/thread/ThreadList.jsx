import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';
import { detailThreadShape } from '../../utils/propShape';

function ThreadList({ threads }) {
  return (
    <>
      {threads.map((thread, index) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          isLastItem={index === threads.length - 1}
        />
      ))}
    </>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(detailThreadShape)).isRequired,
};

export default ThreadList;
