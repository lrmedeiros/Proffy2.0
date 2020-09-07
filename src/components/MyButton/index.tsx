import React from 'react';
import { Theme, makeStyles } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    height: '4rem',
    color: 'var(--color-button-text)',
    border: 0,
    borderRadius: '0.8rem',
    font: '700 Archivo',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
    margin: theme.spacing(1, 0),
  },
}));

const MyButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Button fullWidth {...rest} className={classes.button}>
      {children}
    </Button>
  );
};

export default MyButton;
