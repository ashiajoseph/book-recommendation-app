import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { ArrowBack, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/authentication';
import { useAppDispatch } from '../hooks';
import { update } from '../store/search-key-slice';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showBackButton}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(update(''));
    logout();
    navigate('/login');
  }

 return (
  <AppBar position="static" enableColorOnDark>
    <Toolbar color="black">
      { showBackButton && <Button
          color="inherit"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          title='Back'
        >
        </Button>}
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          title='Logout'
        />
      </Box>
    </Toolbar>
  </AppBar>
 )
}

export default Header;
