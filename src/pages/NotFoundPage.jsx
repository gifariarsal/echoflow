import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import NotFound from '../components/common/NotFound';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Layout>
      <NotFound navigate={navigate} />
    </Layout>
  );
}

export default NotFoundPage;
