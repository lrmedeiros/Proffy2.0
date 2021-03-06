import React from 'react';

import { useHistory } from 'react-router-dom';

import Button from '../../components/MyButton';

const Home: React.FC = () => {
  const history = useHistory();

  function handleRegister() {
    history.push('/register');
  }

  function handleSuccess() {
    history.push('/success');
  }

  function handleLogin() {
    history.push('/login');
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleRegister}>
        Ir pra register
      </Button>
      <Button variant="contained" color="secondary" onClick={handleSuccess}>
        Ir pra Success Register
      </Button>
      <Button variant="contained" color="secondary" onClick={handleLogin}>
        Ir pra Fazer Login
      </Button>
    </>
  );
};

export default Home;
