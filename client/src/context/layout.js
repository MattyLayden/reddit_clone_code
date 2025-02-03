
import React from 'react';
import NavBar from '../react_components/navBar';
import SideBar from '../react_components/sideBar'; 
import {useLocation, Outlet } from 'react-router-dom'; 

const Layout = () => {

  const location = useLocation()

  const componentsWithoutLayout = ['/login', '/createpost']

  const isComponentWithoutLayout = componentsWithoutLayout.includes(location.pathname)


  return (
    <div>

      {!isComponentWithoutLayout && <NavBar />}
      {!isComponentWithoutLayout && <SideBar />}
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};


export default Layout;

