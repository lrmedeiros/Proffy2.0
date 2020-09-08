import React, { FormEvent, useEffect, useState, ChangeEvent } from 'react';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  Grid,
  Paper,
  makeStyles,
  Theme,
  Link,
  Typography,
  TextField,
} from '@material-ui/core';

import Banner from '../../components/Banner';
import back from '../../assets/images/icons/back.svg';
import Button from '../../components/MyButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  linkBack: {
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(2),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  title: {
    color: 'var(--color-text-title)',
  },
  text: {
    color: 'var(--color-text-base)',
  },
  form: {
    width: '100%',
  },
}));

const ForgotPassword: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [validEmail, setValidEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [notButtonReady, setNotButtonReady] = useState(false);

  useEffect(() => {
    if (validEmail) {
      setNotButtonReady(true);
    } else {
      setNotButtonReady(false);
    }
  }, [email, validEmail]);

  function handleEmail(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setEmail(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    history.push('/success', {
      params: {
        title: 'Redefinição enviada!',
        text: `Boa, agora é só checar o e-mail que foi 
        enviado para você redefinir sua senha e aproveitar os estudos.`,
        button: 'Voltar ao login',
      },
    });
  }

  function handleValidEmail() {
    if (email.includes('@')) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={4} md={7}>
        <Banner />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Grid container component="div" className={classes.paper}>
          <Link component={RouterLink} to="/login" className={classes.linkBack}>
            <img src={back} alt="Voltar" />
          </Link>
          <Grid item className={classes.textContainer}>
            <Typography component="h1" variant="h4" className={classes.title}>
              Eita, esqueceu sua senha?
            </Typography>
            <Typography component="h3" variant="body1" className={classes.text}>
              Não esquenta, vamos dar um jeito nisso.
            </Typography>
          </Grid>
          <Grid
            container
            component="form"
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <TextField
              error={!validEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => handleEmail(event)}
              onBlur={handleValidEmail}
              helperText={validEmail ? '' : 'E-mail ínvalido'}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={notButtonReady}
              color="secondary"
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
