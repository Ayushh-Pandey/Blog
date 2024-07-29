import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './components/account/Login';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';

import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import { getAccessToken } from './utils/common-utils';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = getAccessToken();
  return isAuthenticated && token ?
    <>
      <Header />
      <Outlet />
    </>
    : <Navigate to='/login' replace={true} />
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  
  return (
    <DataProvider>
      <BrowserRouter>

        <div style={{ marginTop: 64 }}>
          
          <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/create' element={<CreatePost />} />
            </Route>

              <Route path='/details/:id' element={<DetailView />} />

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path='/update/:id' element={<Update />} />
            </Route>

              <Route path='/about' element={<About />} />

              <Route path='/contact' element={<Contact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider >


  );
}

export default App;
