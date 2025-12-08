import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid2,
  TextField,
  Alert,
  Chip,
  Divider,
  Card,
  CardMedia,
  Stack,
  CardContent,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@mui/material';
import { Save, Delete } from '@mui/icons-material';
import { addOrUpdateReview, removeReview, selectReviewByBookId } from '../../store/reviews-slice';
import { getBookById } from '../../services/books-service';
import StarRating from '../../components/star-rating';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Header from '../../components/header';
import SingleTypography from '../../components/single-typography';
import PageLoader from '../../components/page-loader';
import type { Review } from '../../types/books/review';

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const dispatch = useAppDispatch();

  // Get existing review from Redux
  const existingReview: Review | undefined = useAppSelector((state) =>
    selectReviewByBookId(state, bookId || '')
  );

  const [rating, setRating] = useState<number>(existingReview?.rating || 0);
  const [reviewText, setReviewText] = useState<string>(existingReview?.reviewText || '');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);

  const maximumReviewLength: number = 400;

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId!),
    enabled: !!bookId, // Only run if bookId exists
  });

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setSaveSuccess(false);
  }

  // Save review to Redux store.
  const handleSaveReview = () => {
    if (!book || !bookId) return;

    dispatch(
      addOrUpdateReview({
        bookId,
        rating,
        reviewText: reviewText.trim(),
      })
    );

    setSaveSuccess(true);
  };

  const handleDeleteReview = () => {
    if (!bookId) return;
    setOpenDialog(true);
  };

  const deleteReview = () => {
      dispatch(removeReview(bookId || ''));
      setRating(0);
      setReviewText('');
      handleDialogClose();
  }

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setSaveSuccess(false);
  };

  const handleReviewTextChange = (text: string) => {
    setReviewText(text);
    setSaveSuccess(false);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !book) {
    return (
      <Box>
        <Header  showBackButton />
        <Alert severity="error" sx={{ my: 1 }}>
          {error instanceof Error ? error.message : 'Failed to load book details'}
        </Alert>
      </Box>
    );
  }

  // Render book details
  return (
    <Box>
      <Header  showBackButton />
      {saveSuccess && (
        <Snackbar
          open={saveSuccess}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={1500}
          onClose={handleSnackbarClose}>
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
           Review saved successfully!
        </Alert>
      </Snackbar>
      )}
      <Dialog
        open={openDialog}
        onClose={handleDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to delete the review?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" onClick={handleDialogClose}>No</Button>
          <Button variant="contained" size="small" onClick={deleteReview} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Grid2 container spacing={1} my={1} py={1}>
        <Grid2 size={4}>
          <Stack spacing={2}>
            <Card>
            {book.imageLinks?.thumbnail ? (
              <CardMedia
                component="img"
                image={book.imageLinks.thumbnail}
                alt={book.title}
                sx={{ height: 400, objectFit: 'contain', p: 1 }}
              />
            ) : (
              <Box
                sx={{
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f5f5f5',
                }}
              >
              <Typography variant="h6" color="text.secondary">
                  No Image Available
                </Typography>
              </Box>
            )}
          </Card>
          <Card>
            <CardContent>
              <SingleTypography property='Published On' value={book.publishedDate?.split('T')[0]} />
              <SingleTypography property={'Publisher'} value={book.publisher} />
              { book.pageCount && <SingleTypography property={'Pages'} value={String(book.pageCount)} />}
              { book.averageRating && <SingleTypography property={"Average Rating ⭐"} value={String(book.averageRating)}/> }
            </CardContent>
          </Card>
          </Stack>
        </Grid2>
        <Grid2 size={8}>
          <Stack spacing={2}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="body2" p={1}color="text.secondary" textAlign="center" gutterBottom>
                <i>by</i> {book.authors?.join(', ') || 'Unknown Author'}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                { book.categories?.map((category) => (
                  <Chip key={category} label={category} size="small" color='primary'/>
                )) }
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Description
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {book.description || 'No description available.'}
              </Typography>
            </Paper>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {existingReview ? 'Your Review' : 'Rate & Review This Book'}
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', mb: 1}}>
                <Typography variant="subtitle1" gutterBottom>
                  Your Rating
                </Typography>
                <StarRating
                  value={rating}
                  onChange={handleRatingChange}
                  size="medium"
                  showLabel={true}
                />
              </Box>

              <Box mb={1}>
                <TextField
                  fullWidth
                  error={reviewText.length > maximumReviewLength}
                  multiline
                  rows={5}
                  placeholder={`Share your thoughts about this book... (maximum ${maximumReviewLength} characters)`}
                  value={reviewText}
                  onChange={(e) => handleReviewTextChange(e.target.value)}
                  variant="outlined"
                  helperText={`${reviewText.length} ${reviewText.length <2 ?
                     'character' : 'characters' } ${reviewText.length > maximumReviewLength ? `(Exceeds maximum limit of ${maximumReviewLength} characters)` : ''}`}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: "end",  gap: 2 }}>
                {existingReview && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={handleDeleteReview}
                    title='Delete Review'
                  >Delete</Button>
                )}

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveReview}
                  disabled={rating === 0 &&
                    (reviewText.trim().length === 0 ||
                    reviewText.trim().length > maximumReviewLength)}
                  title={existingReview ? 'Update Review' : 'Save Review'}
                >
                  {existingReview ? 'Update' : 'Save'}
                </Button>
              </Box>
            </Paper>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BookDetails;
