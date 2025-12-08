import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { LoginCredentials } from '../../types/login/login-credentials';
import { authenticateUser } from '../../utils/authentication';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

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
          { error && <Typography variant="body2" color="error" gutterBottom>
            Please enter a valid username and password
          </Typography>}
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
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
