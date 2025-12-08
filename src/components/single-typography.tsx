import { Typography, Box } from "@mui/material";

interface SingleTypographyProps {
  property: string;
  value?: string;
}
const SingleTypography: React.FC<SingleTypographyProps> = ({property, value}) => {
  return(
  <Typography variant="body1" sx={{textAlign: 'left', fontWeight: 'light'}}>
    <Box component="span" sx={{
        fontWeight: 'bold',
        color: 'text.secondary',
        marginRight: 0.5,
    }}>
      {property} :
    </Box>
    {value || 'Unknown'}
  </Typography>)
};

export default SingleTypography;
