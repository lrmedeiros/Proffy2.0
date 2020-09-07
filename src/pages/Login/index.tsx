import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { 
    makeStyles, 
    Button, 
    Grid, 
    Theme, 
    Typography, 
    Link, 
    TextField, 
    WithWidth, 
    Hidden, 
    FormControlLabel, 
    Checkbox, 
    Paper, 
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput
} from '@material-ui/core';
import clsx from 'clsx';
import { CheckBoxOutlineBlank, CheckBox, Visibility, VisibilityOff } from '@material-ui/icons';

import api from '../../services/api';
// import background from '../../assets/Version2.0/Background.svg';
// import intro from '../../assets/Version2.0/Intro.svg';
import purpleHeart from '../../assets/images/icons/purple-heart.svg';
import Banner from '../../components/Banner';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh'
    },
    // background: {
    //     backgroundColor: theme.palette.primary.main,
    // },
    // backgroundImage: {
    //     height: '90%',
    //     width: '90%',
    //     backgroundImage: `url(${background})`,
    //     backgroundSize: 'contain',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    image: {
        height: '50%',
        width: '50%'
    },
    mainContent: {
        margin: theme.spacing(2, 3),
        flexDirection: 'column',
    },
    titleContainer: {
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
    footer: {
    },
    spaceBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    submit: {
        width: '100%',
        height: '5.6rem',
        border: 0,
        borderRadius: '0.8rem',
        font: '700 1.6rem Archivo',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        transition: 'background-color 0.2s',
        margin: '1rem 0'
    },
    submitActive: {
        background: 'var(--color-secundary)',
        color: 'var(--color-button-text)'
    },
    submitDesactive: {
        background: 'var(--color-disabled)',
        color: 'var(--color-text-complement)'
    }
}));

interface State {
  email: string;
  password: string;
  isChecked: boolean;
  showPassword: boolean;
}

interface PropsSignIn {
    width: WithWidth;
}

const Login:React.FC<PropsSignIn> = ({width}) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        isChecked: false,
        showPassword: false,
    });
    const [validEmail, setValidEmail] = useState(true);
    const [buttonNotReady, setButtonNotReady] = useState(true);
    const [isButtonActive, setIsButtonActive] = useState(classes.submitDesactive);
    const history = useHistory(); 

    if(localStorage.getItem('@token')){
        history.push('/');
    }
    
    useEffect(() => {
        if(values.email.includes('@') && values.password) {
            return setButtonNotReady(false);
        }
        setButtonNotReady(true);
    },[values.email,values.password]);

    useEffect(()=> {
        if(buttonNotReady) {
            return setIsButtonActive(classes.submitDesactive);
        }
        return setIsButtonActive(classes.submitActive)
    },[buttonNotReady]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if(handlecheckValidEmail()) {
            try{
                const response = await api.post('login',{
                    email: values.email,
                    password: values.password,
                });
                if(values.isChecked){
                    localStorage.setItem('@token',response.data.token);
                }
            } catch(err) {
                alert('Não foi possivel conectar ao servidor');
            }
        }
    }

    const handleChanges = (props: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [props]: event.target.value });
    }

    function handleCheck(event: ChangeEvent<HTMLInputElement>) {
        setValues({...values, isChecked: event.target.checked});
    }

    function handleShowPassword() {
        setValues({...values, showPassword: !values.showPassword})
    }

    function handlecheckValidEmail() {
        if(!values.email.includes('@')){
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
                <div className={classes.mainContent}>
                    <Grid container className={classes.titleContainer}>
                        <Typography component="h1" variant="h2" className={classes.title}>
                            Fazer login
                        </Typography>
                        <Hidden smUp>
                            <Link component={RouterLink} variant='h2' to='/register' >Criar uma conta</Link>
                        </Hidden>
                    </Grid>
                    
                    <form className={classes.form} onSubmit={handleSubmit}>
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
                            helperText={handlecheckValidEmail ? '' : 'E-mail ínvalido' }
                        />
                        <FormControl className={classes.textField} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChanges('password')}
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
                            labelWidth={30}
                            />
                        </FormControl>
                        <Grid container className={classes.spaceBetween}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    icon={<CheckBoxOutlineBlank fontSize="large" />}
                                    checkedIcon={<CheckBox fontSize="large" />}
                                    name="checked"
                                    checked={values.isChecked}
                                    onChange={(event) => handleCheck(event)}
                                />
                                }
                                label="Lembre-me"
                            />
                            <Link component={RouterLink} variant="h6" to='/forgot-password'>
                                Esqueceu sua senha?
                            </Link>
                        </Grid>
                        <Button
                            disabled={buttonNotReady}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={clsx(classes.submit, isButtonActive)}
                        >
                            Entrar
                        </Button>
                    </form>
                    <Hidden xsDown>
                        <Grid container className={classes.footer} >
                            <Grid container className={classes.spaceBetween}>
                                <Grid item>
                                    <Typography component='h4' variant='h6'>
                                        Não tem uma conta?                      
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component='h4' variant='h6'>
                                        É de graça <img src={purpleHeart} alt='coração roxo'/>
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Link component={RouterLink} variant="h6" to='/register'>    
                                <strong>Cadastre-se</strong>
                            </Link>
                        </Grid>
                    </Hidden>
                </div>
            </Grid>
        </Grid>
    );
}

export default Login;