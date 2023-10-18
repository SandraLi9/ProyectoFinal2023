

import React from 'react';

import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Header from './components/header';

import New from './components/New';



const Router = () => {

    return(

        <BrowserRouter>

            <Header />

            <Routes>

                <Route exact path='/' element={<New/>} />

                 <Route exact path='/articles' elements = {<articles />} />

            </Routes>

        </BrowserRouter>

        );

}

 

export default Router;

 