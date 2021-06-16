import React, { useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useLogin from "hooks/useLogin";
import { useHistory } from "react-router-dom";
import logo from "assets/img/logo2.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Cooagropas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  notchedOutline: {
    borderColor: "green !important",
  },
}));

export default function Login() {
  const document = useRef();
  const password = useRef();
  const history = useHistory();
  const { login, isLogged, user } = useLogin();

  useEffect(() => {
    console.log("isLog:", isLogged);
    console.log("isuser:", user);
    if (isLogged) {
      if (user) {
        //history.push("/admin/maps");
      }
    }
  }, [isLogged]);
  const classes = useStyles();

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        boxShadow: "1px 1px 2px 2px rgba(0, 0, 0, 0.5)",
        borderRadius: 10,
      }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar variant="square" className={classes.avatar} src={logo} />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Documento"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            inputRef={document}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: "green" }}
            className={classes.submit}
            onClick={() => {
              login({
                email: document.current.value,
                password: password.current.value,
              });
            }}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Olvidate tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
