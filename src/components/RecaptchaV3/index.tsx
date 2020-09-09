import React, { useEffect, FormEvent } from 'react';

import { Grid } from '@material-ui/core';

import Button from '../../components/MyButton';

interface PropsRecaptcha {
  action: string;
  buttonNotReady: boolean;
}

declare var grecaptcha: any;

const RecaptchaV3: React.FC<PropsRecaptcha> = ({ action, buttonNotReady }) => {
  function onClick(e: FormEvent) {
    e.preventDefault();
    grecaptcha.ready(function () {
      grecaptcha
        .execute('6LdErMkZAAAAAAVeAVAHYF9INnxpKcLtPnSl4mnj', { action })
        .then(function (token: string) {
          if (!token) {
            buttonNotReady = false;
          }
          if (buttonNotReady) {
            console.log(buttonNotReady);
          }
        });
    });
  }

  useEffect(() => {
    // Add reCaptcha
    const script = document.createElement('script');
    script.src =
      'https://www.google.com/recaptcha/api.js?render=6LdErMkZAAAAAAVeAVAHYF9INnxpKcLtPnSl4mnj';
    document.body.appendChild(script);
  }, []);

  return (
    <Grid container>
      <Grid
        component="div"
        item
        className="g-recaptcha"
        data-sitekey="6LdErMkZAAAAAAVeAVAHYF9INnxpKcLtPnSl4mnj"
        data-callback="onSubmit"
        data-size="invisible"
        data-action="submit"
        onClick={onClick}
      />
      <Button
        disabled={buttonNotReady}
        type="submit"
        variant="contained"
        color="secondary"
      >
        Entrar
      </Button>
    </Grid>
  );
};

export default RecaptchaV3;
