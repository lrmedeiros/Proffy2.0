import React from 'react';

import { useHistory } from 'react-router-dom';

import Button from '../../components/MyButton';

const Home: React.FC = () => {
  const history = useHistory();

  function handleRegister() {
    history.push('/register');
  }

  function handleSuccessRegister() {
    history.push('/success');
  }

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleRegister}>
        Ir pra register
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSuccessRegister}
      >
        Ir pra Success Register
      </Button>
      {/* <Button variant="contained" color="secondary" onClick={handleRegister}>
        Ir pra register
      </Button> */}
    </>
  );
};

export default Home;
