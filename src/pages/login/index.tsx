import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Alert,
  Snackbar,
} from '@mui/material';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { LoginCredentials } from '../../types/login/login-credentials';
import { authenticateUser } from '../../utils/authentication';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(false);
    setPassword(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false)

    if (!username.trim() || !password.trim()) {
      setError(true);
      return;
    }

    const credentials: LoginCredentials = {
      username,
      password,
      rememberMe,
    };

    const isValidUser: boolean = authenticateUser(credentials);
    if (!isValidUser) {
      setError(true);
      setUsername('');
      setPassword('');
      return;
    }

    navigate('/books');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
       <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h2" variant="h5" sx={{mb: 6}}>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              error={error}
              helperText={error ? 'Invalid username' : ''}
            />

            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              error={error}
              helperText={error ? 'Invalid password' : ''}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 6, mb: 2, py: 1}}
            >
              Submit
            </Button>
            <Snackbar open={error} anchorOrigin={{ vertical: "top", horizontal: "right" }} >
              <Alert
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
              >
                  Invalid credentials. Please try again.
              </Alert>
            </Snackbar>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
