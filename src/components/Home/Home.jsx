import React, {useContext} from 'react';
import AuthContext from '../../context/authContext'
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Home.module.css';

const Home = () => {
const ctx = useContext(AuthContext)
  
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}> Log Out</Button>
    </Card>
  );
};

export default Home;
