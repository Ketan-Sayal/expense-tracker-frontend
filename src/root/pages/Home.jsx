import React from 'react'
import { useAuthContext } from '../../context';
import {Dashboard, About} from './index';

const Home = () => {
    const {isLoggedIn} = useAuthContext();
    
    return isLoggedIn?(<Dashboard/>): (<About/>)
}

export default Home
