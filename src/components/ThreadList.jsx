import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadList({
  threads,
}) {
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
  onUpVoteThread: PropTypes.func,
  onDownVoteThread: PropTypes.func,
  onNeutralizeUpVoteThread: PropTypes.func,
  onNeutralizeDownVoteThread: PropTypes.func,
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};

ThreadList.defaultProps = {
  onUpVoteThread: null,
  onDownVoteThread: null,
  onNeutralizeUpVoteThread: null,
  onNeutralizeDownVoteThread: null,
};

export default ThreadList;
