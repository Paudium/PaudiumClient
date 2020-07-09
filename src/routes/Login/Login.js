import React from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GoogleIcon from "./GoogleIcon";
import SignUp from "../SignUp";

const LoginButton = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom:theme.spacing(2),
    backgroundColor: "#FFF",
    borderRadius:"4px",
  },
}))((props) => <Button disableRipple {...props} />);

const LoginTextField = withStyles((theme) => ({
  root: {
    borderColor: "#FFF",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: "4px",
    marginTop: theme.spacing(2),
  },
}))((props) => <TextField {...props} />);

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
  },
}));

export default function Login() {
  const classes = useStyles();
  return (
    <Box mt={6} px={2}>
      <Grid container justify="space-evenly" spacing={3} direction="column">
        <Button variant="outlined" color="secondary" startIcon={<GoogleIcon />}>
          {" "}
          Continue with Google
        </Button>
        <form className={classes.form}>
          <LoginTextField
            variant="outlined"
            placeholder="Enter your email"
            fullWidth
            name="email"
            color="secondary"
            // label="Your email"
          />
          <LoginTextField
            placeholder="Enter your password"
            fullWidth
            name="password"
            variant="outlined"
            color="secondary"
            // label="You Password"
          />
          <LoginButton variant="contained" fullWidth>
            Login
          </LoginButton>
        </form>

        <Typography color="secondary" align = "center">
          Don't have an account? <Link to="./signup">Sign up</Link> for free
        </Typography>
      </Grid>
    </Box>
  );
}
