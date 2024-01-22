import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';
import CTAButton from './CTAButton';

function AddThreadInput({ addThread }) {
  const MAX_BODY_LENGTH = 320;

  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBody] = useState('');

  const addThreadHandler = () => {
    if (title.trim() && body.trim() && category.trim()) {
      addThread(title, body, category);
    } else {
      alert('Please fill in all the fields');
    }
  };

  const handleBodyChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= MAX_BODY_LENGTH) {
      setBody(inputValue);
    }
  };

  return (
    <form>
      <FormControl>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          type="text"
          rounded="lg"
          value={title}
          onChange={onTitleChange}
        />
      </FormControl>
      <FormControl mt="4">
        <FormLabel htmlFor="category">Category</FormLabel>
        <Input
          id="category"
          type="text"
          rounded="lg"
          value={category}
          onChange={onCategoryChange}
        />
      </FormControl>
      <FormControl mt="4" mb="2">
        <FormLabel htmlFor="body">Content</FormLabel>
        <Textarea
          id="body"
          rounded="lg"
          value={body}
          onChange={handleBodyChange}
        />
      </FormControl>
      <Text textAlign="right" color="gray">
        {body.length}
        /
        {MAX_BODY_LENGTH}
      </Text>
      <CTAButton action="Add Thread" onClick={addThreadHandler} />
    </form>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default AddThreadInput;
