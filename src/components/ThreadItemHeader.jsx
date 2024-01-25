import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItemHeader({
  id, category, title, user, createdAt
}) {
  return (
    <header>
      <Text color="brand.main" mb={2}>{`#${category}`}</Text>
      <Heading
        as="h2"
        fontSize="xl"
        mb={2}
        noOfLines={1}
        _hover={{ textDecoration: 'underline' }}
      >
        <Link to={`/threads/${id}`}>{title}</Link>
      </Heading>
      <Text fontSize="sm" color="gray" mb={4}>
        {'by '}
        <Text as="strong" fontWeight="bold">
          {user.name}
        </Text>
        {' • '}
        <Text as="time" dateTime={createdAt}>
          {postedAt(createdAt)}
        </Text>
      </Text>
    </header>
  );
}

ThreadItemHeader.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default ThreadItemHeader;
