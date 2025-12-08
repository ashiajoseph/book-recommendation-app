import { Container, Box, CircularProgress } from "@mui/material";

const PageLoader = () => (
  <Container sx={{ my: 3 }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
      <CircularProgress size={30} />
    </Box>
  </Container>);

export default PageLoader;
