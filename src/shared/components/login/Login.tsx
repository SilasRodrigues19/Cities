import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../../contexts";
import Background from '../../../images/build_background.avif';
import * as val from 'yup'
import { useTitle } from "../../hooks";

const loginSchema = val.object().shape({
  email: val.string().email().required(),
  password: val.string().required().min(5),
})

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {

  useTitle('Login');

  const { isAuthencicated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema.validate({email, password}, { abortEarly: false})
    .then(validateData => {
      login(validateData.email, validateData.password)
      .then(() => {
        setIsLoading(false);
      })
    })
    .catch((errors: val.ValidationError) => {
      setIsLoading(false);
      errors.inner.forEach(error => {
        if (error.path === 'email') {
          setEmailError(error.message);
          return
        }
        if(error.path === 'password')
        setPasswordError(error.message);
      })
    });
  }

  if(isAuthencicated) return (
    <>{children}</>
  )

  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center"
    sx={{
        "&::before": {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: `url(${Background}) no-repeat center / cover`,
          opacity: '.03',
          pointerEvents: 'none',
        }
      }}
    >
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2} width={250}>
              <Typography variant="h6" align="center">Cities - Log in</Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onKeyDown={()  => setEmailError('')}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onKeyDown={()  => setPasswordError('')}
                onChange={e => setPassword(e.target.value)}
              />
            </Box>
          </CardContent>
          <CardActions>
            <Box width="100%" display="flex" justifyContent="center">
              <Button
                disabled={isLoading}
                variant="contained"
                onClick={handleSubmit}
                endIcon={isLoading ? <CircularProgress variant="indeterminate" color="inherit" size={20} /> : undefined}
              >
                Sign in
              </Button>
            </Box>
          </CardActions>
        </Card>
    </Box>
  );
}