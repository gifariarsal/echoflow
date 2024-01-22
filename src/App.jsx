import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { asyncPreloadProcess } from './redux/isPreload/action';
import { asyncUnsetAuthUser } from './redux/authUser/action';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <Navbar authUser={authUser} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
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
          <Route path="/" element={<HomePage authUser={authUser} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
