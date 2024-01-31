import React from 'react';
import { Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncAddTread } from '../redux/threads/action';
import AddThreadInput from '../components/thread/AddThreadInput';
import Layout from '../components/common/Layout';

function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAddThread = (title, body, category) => {
    dispatch(asyncAddTread({ title, body, category }));
    navigate('/');
  };

  return (
    <Layout>
      <Heading as="h2" size="lg" mb={4}>
        Add New Thread
      </Heading>
      <AddThreadInput addThread={onAddThread} />
    </Layout>
  );
}

export default AddThreadPage;
