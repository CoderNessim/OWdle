import { useQuery } from '@tanstack/react-query';
import Header from '../ui/Header';
import { Outlet } from 'react-router-dom';
import { getUser } from '../services/apiAuth';

function AppLayout() {
  const {
    data: userData,
    isPending,
    isError,
  } = useQuery({ queryKey: ['user'], queryFn: getUser });
  console.log(userData);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
