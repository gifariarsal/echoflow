import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, FormLabel, Input, Textarea
} from '@chakra-ui/react';
import useInput from '../../hooks/useInput';
import CTAButton from '../common/CTAButton';

function AddThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const addThreadHandler = () => {
    if (title.trim() && body.trim() && category.trim()) {
      addThread(title, body, category);
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <form>
      <FormControl isRequired>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          type="text"
          rounded="lg"
          value={title}
          onChange={onTitleChange}
        />
      </FormControl>
      <FormControl isRequired mt="4">
        <FormLabel htmlFor="category">Category</FormLabel>
        <Input
          id="category"
          type="text"
          rounded="lg"
          value={category}
          onChange={onCategoryChange}
        />
      </FormControl>
      <FormControl isRequired mt="4" mb="2">
        <FormLabel htmlFor="body">Content</FormLabel>
        <Textarea id="body" rounded="lg" minH="100px" value={body} onChange={onBodyChange} />
      </FormControl>
      <CTAButton action="Add Thread" onClick={addThreadHandler} />
    </form>
  );
}

AddThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default AddThreadInput;
