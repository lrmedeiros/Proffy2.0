import React from 'react';
import { makeStyles, Theme, Grid, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import BackgroundSuccess from '../../assets/images/BackgroundSuccess.svg';
import BackgroundSuccessRotate from '../../assets/images/BackgroundSuccessRotate.svg';
import successCheckIcon from '../../assets/images/icons/success-check-icon.svg';
import MyButton from '../../components/MyButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    background: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '90%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundImage: `url(${BackgroundSuccessRotate})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.up('sm')]: {
      backgroundImage: `url(${BackgroundSuccess})`,
    },
  },
  textTitle: {
    font: '700 Archivo',
    color: 'var(--color-title-in-primary)',
  },
  text: {
    color: 'var(--color-text-in-primary)',
  },
  containerButton: {
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
  },
}));

const SuccessRegister: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { slug } = useParams();

  function handleButtonLogin() {
    history.push('/login');
  }

  function handleButtonHome() {
    history.push('/');
  }

  return (
    <Grid
      xs={12}
      md={12}
      sm={12}
      container
      component="main"
      className={classes.root}
    >
      <Grid item className={classes.background}>
        <Grid item>
          <img src={successCheckIcon} alt="ícone de sucesso." />
          <Typography component="h1" variant="h2" className={classes.textTitle}>
            {slug ? slug.title : 'Você não deveria estar aqui!'}
          </Typography>
          <Typography component="h2" variant="h6" className={classes.text}>
            {slug && slug.text}
          </Typography>
        </Grid>
        <Grid item className={classes.containerButton}>
          <MyButton
            onClick={slug ? handleButtonLogin : handleButtonHome}
            color="secondary"
            variant="contained"
          >
            {slug ? slug.button : 'Voltar para Home'}
          </MyButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuccessRegister;
