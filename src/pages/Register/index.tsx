import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import clsx from 'clsx';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
  Grid,
  Theme,
  Paper,
  Typography,
  Hidden,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  makeStyles,
  Link,
} from '@material-ui/core';

import api from '../../services/api';

import Button from '../../components/MyButton';
import Banner from '../../components/Banner';

import back from '../../assets/images/icons/back.svg';

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
  form: {
    width: '100%',
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  title: {
    color: 'var(--color-text-title)',
    alignSelf: 'flex-start',
    fontWeight: 600,
  },
  marginTitle: {
    margin: theme.spacing(1, 0),
  },
  text: {
    color: 'var(--color-text-base)',
    marginBottom: theme.spacing(3),
    alignSelf: 'flex-start',
  },
}));

interface States {
  name: string;
  lastName: string;
  email: string;
  password: string;
  showPassword: boolean;
  validEmail: boolean;
}

const Register: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
    validEmail: true,
  });
  const [NotReadyButton, setNotReadyButton] = useState(true);

  useEffect(() => {
    setNotReadyButton(true);
    if (
      values.validEmail &&
      values.password &&
      values.name &&
      values.lastName
    ) {
      setNotReadyButton(false);
    }
  }, [values.validEmail, values.password, values.name, values.lastName]);

  const handleChanges = (props: keyof States) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [props]: event.target.value });
  };

  function handleValidEmail() {
    if (values.email.includes('@')) {
      setValues({ ...values, validEmail: true });
      return true;
    }
    setValues({ ...values, validEmail: false });
    return false;
  }

  function handleShowPassword() {
    setValues({ ...values, showPassword: !values.showPassword });
  }

  function handleMouseDownPassword(event: FormEvent) {
    event.preventDefault();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, lastName, email, password } = values;

    await api
      .post('register', {
        name,
        lastName,
        email,
        password,
      })
      .then(() => {
        history.push('/success', {
          params: {
            title: 'Cadastro concluído!',
            text: 'Agora você faz parte da plataforma da Proffy',
            button: 'Fazer login',
          },
        });
      })
      .catch(() => {
        alert('Erro no cadastro');
      });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Grid container component="div" className={classes.paper}>
          <Link component={RouterLink} to="/login" className={classes.linkBack}>
            <img src={back} alt="Voltar" />
          </Link>
          <Typography component="h1" variant="h4" className={classes.title}>
            Crie sua conta gratuíta
          </Typography>
          <Typography component="h2" variant="body1" className={classes.text}>
            Basta preencher esses dados e você estará conosco.
          </Typography>
          <Grid
            container
            component="form"
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Hidden smUp>
              <Typography
                component="h1"
                variant="h4"
                className={clsx(classes.marginTitle, classes.title)}
              >
                01. Quem é você?
              </Typography>
            </Hidden>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="given-name"
              value={values.name}
              onChange={handleChanges('name')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="additional-name last-name"
              label="Sobrenome"
              id="additional-name last-name"
              autoComplete={clsx('additional-name', 'family-name')}
              value={values.lastName}
              onChange={handleChanges('lastName')}
            />
            <Hidden smUp>
              {/* <Button variant="contained" color="primary" href="#email">
                Próximo
              </Button> */}
              <Typography
                component="h1"
                variant="h4"
                className={clsx(classes.marginTitle, classes.title)}
              >
                02. Email e Senha
              </Typography>
            </Hidden>
            <TextField
              error={!values.validEmail}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChanges('email')}
              onBlur={handleValidEmail}
              helperText={values.validEmail ? '' : 'E-mail ínvalido'}
            />
            <FormControl className={classes.textField} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Senha *
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChanges('password')}
                autoComplete="new-password"
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      color="primary"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
            <Button
              type="submit"
              disabled={NotReadyButton}
              variant="contained"
              color="secondary"
            >
              Concluir cadastro
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid item xs={false} sm={4} md={7}>
          <Banner />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Register;
