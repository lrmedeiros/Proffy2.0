import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Theme,
  Typography,
  Link,
  TextField,
  Hidden,
  FormControlLabel,
  Checkbox,
  Paper,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core';
import {
  CheckBoxOutlineBlank,
  CheckBox,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

import api from '../../services/api';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import Banner from '../../components/Banner';
import Button from '../../components/MyButton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    height: '50%',
    width: '50%',
  },
  mainContent: {
    margin: theme.spacing(2, 3),
    flexDirection: 'column',
  },
  titleContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    font: `600 2rem Poppins`,
    color: 'var(--color-text-title)',
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  link: {
    textDecoration: 'none',
  },
  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
}));

interface State {
  email: string;
  password: string;
  isChecked: boolean;
  showPassword: boolean;
}

const Login: React.FC = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    isChecked: false,
    showPassword: false,
  });
  const [validEmail, setValidEmail] = useState(true);
  const [buttonNotReady, setButtonNotReady] = useState(true);
  const history = useHistory();

  if (localStorage.getItem('@token')) {
    history.push('/');
  }

  useEffect(() => {
    if (values.email.includes('@') && values.password) {
      return setButtonNotReady(false);
    }
    setButtonNotReady(true);
  }, [values.email, values.password]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (handlecheckValidEmail()) {
      try {
        const response = await api.post('login', {
          email: values.email,
          password: values.password,
        });
        if (values.isChecked) {
          localStorage.setItem('@token', response.data.token);
        }
      } catch (err) {
        alert('Não foi possivel conectar ao servidor');
      }
    }
  }

  const handleChanges = (props: keyof State) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [props]: event.target.value });
  };

  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, isChecked: event.target.checked });
  }

  function handleShowPassword() {
    setValues({ ...values, showPassword: !values.showPassword });
  }

  function handlecheckValidEmail() {
    if (!values.email.includes('@')) {
      setValidEmail(false);
      return false;
    }
    setValidEmail(true);
    return true;
  }

  function handleMouseDownPassword(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={4} md={7}>
        <Banner />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Grid item component="div" className={classes.mainContent}>
          <Grid item className={classes.titleContainer}>
            <Typography component="h1" variant="h4" className={classes.title}>
              Fazer login
            </Typography>
            <Hidden smUp>
              <Link
                component={RouterLink}
                variant="body2"
                to="/register"
                className={classes.link}
              >
                Criar uma conta
              </Link>
            </Hidden>
          </Grid>

          <Grid
            item
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
              autoFocus
              value={values.email}
              onChange={handleChanges('email')}
              onBlur={handlecheckValidEmail}
              helperText={validEmail ? '' : 'E-mail ínvalido'}
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
                labelWidth={65}
              />
            </FormControl>
            <Grid container className={classes.spaceBetween}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlank fontSize="small" />}
                    checkedIcon={<CheckBox fontSize="large" />}
                    name="checked"
                    checked={values.isChecked}
                    onChange={(event) => handleCheck(event)}
                  />
                }
                label="Lembre-me"
              />
              <Link
                component={RouterLink}
                variant="body2"
                to="/forgot-password"
              >
                Esqueceu sua senha?
              </Link>
            </Grid>
            <Button
              disabled={buttonNotReady}
              type="submit"
              variant="contained"
              color="secondary"
            >
              Entrar
            </Button>
          </Grid>
          <Hidden xsDown>
            <Grid container>
              <Grid container className={classes.spaceBetween}>
                <Grid item>
                  <Typography component="h4" variant="h6">
                    Não tem uma conta?
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography component="h4" variant="h6">
                    É de graça <img src={purpleHeart} alt="coração roxo" />
                  </Typography>
                </Grid>
              </Grid>
              <Link
                component={RouterLink}
                variant="h6"
                to="/register"
                className={classes.link}
              >
                <strong>Cadastre-se</strong>
              </Link>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
