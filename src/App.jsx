import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { asyncPreloadProcess } from './redux/isPreload/action';
import { asyncUnsetAuthUser } from './redux/authUser/action';
import {
  AddThreadPage,
  HomePage,
  LeaderboardsPage,
  LoginPage,
  RegisterPage,
  ThreadDetailPage,
} from './pages';
import Navbar from './components/common/Navbar';
import Loading from './components/common/Loading';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogOut = async () => {
    await dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  if (isPreload) {
    return null;
  }

  if (!authUser) {
    return (
      <>
        <Loading />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/threads/:id" element={<ThreadDetailPage />} />
          </Routes>
        </main>
      </>
    );
  }
  return (
    <>
      <Loading />
      <Navbar authUser={authUser} onLogOut={onLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
          <Route path="/add-thread" element={<AddThreadPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
