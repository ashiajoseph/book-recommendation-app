import { useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, CellDoubleClickedEvent, ValueGetterParams, IDatasource, IGetRowsParams, ITooltipParams } from 'ag-grid-community';
import {
  Container,
  Box,
  TextField,
  Paper,
  InputAdornment,
  Alert,
  CircularProgress,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Button,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { getBooks } from '../../services/books-service';
import type { Book } from '../../types/books/book';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import Header from '../../components/header';
import PageLoader from '../../components/page-loader';
import { useAppDispatch, useAppSelector, useDebounce } from '../../hooks';
import { getSearchKey, update } from '../../store/search-key-slice';

const BookList = () => {
  const prevSearchKeyword: string = useAppSelector(getSearchKey);
  const dispatch = useAppDispatch();
  const gridRef = useRef<AgGridReact<Book>>(null);
  const navigate: NavigateFunction = useNavigate();

  // Get existing review from Redux
  const [searchQuery, setSearchQuery] = useState<string>(prevSearchKeyword);
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchType, setSearchType] = useState<string>("intitle:");

  const columnDefs: ColDef<Book>[] = useMemo(
    () => [
      {
        headerName: 'Title',
        field: 'title',
        cellDataType: "text",
        cellStyle: { textAlign: 'left', fontWeight: '500' },
        wrapText: true,
        flex: 1.2,
        headerTooltip: "The title of the book",
        sortable: false,
        tooltipField: 'title',
      },
      {
        headerName: 'Authors',
        valueGetter: (params: ValueGetterParams) => {
          if (params?.data?.authors == undefined) return "";
          return params.data?.authors ? params.data.authors.join(', ') : 'Unknown';
        },
        cellStyle: { textAlign: 'left', fontWeight: 'normal'},
        flex : 0.8,
        headerTooltip: "The authors of the book",
        wrapText: true,
        sortable: false,
        tooltipValueGetter: (p: ITooltipParams) => p.value
      },
      {
        headerName: 'Genre',
        valueGetter: (params: ValueGetterParams) => {
          if (params?.data?.categories == undefined) return "";
          return params.data?.categories ? params.data.categories.join(', ') : 'Unknown';
        },
        cellStyle: { textAlign: 'left', fontWeight: 'normal' },
        wrapText: true,
        flex : 0.5,
        headerTooltip: "The genre of the book",
        sortable: false,
        tooltipValueGetter: (p: ITooltipParams) => p.value
      },
      {
        headerName: 'Average Rating',
        field: 'averageRating',
        width: 140,
        headerTooltip: "The average rating of the book",
        sortable: false,
      },
    ],
    []
  );

  const booksPerPage: number = 20;
  const datasource: IDatasource = useMemo(
    () => ({
      rowCount: undefined,

      getRows: async (params: IGetRowsParams) => {
        setError('');
        try {
          const startIndex = params.startRow || 0;

          const { items, totalItems } = await getBooks({
            query: searchType + debouncedSearchQuery,
            startIndex,
            maxResults: booksPerPage,
          });

          let lastRow = -1;
          if (totalItems <= params.endRow) {
            lastRow = params.startRow + (items?.length ?? 0);
          }

          setIsLoading(false);

          // Tell AG Grid fetch is successful with data.
          params.successCallback(items ?? [], lastRow);

        } catch (err) {
          console.error('Error loading books:', err);
          setError('Failed to load books. Please try again.');
          setIsLoading(false);

          params.failCallback();
        }
      },
    }),
    [debouncedSearchQuery, booksPerPage, searchType]
  );

  const onGridReady = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.setGridOption('datasource', datasource);
    }
  }, [datasource]);

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearchQuery(value);
    dispatch(update(value));
  };

  const onCellDoubleClicked = (event: CellDoubleClickedEvent<Book>) => {
      if (event.data) {
        navigate(`/books/${event.data.id}`);
      }
    }

  const refreshGrid = () => {
    if (gridRef.current) {
        gridRef.current.api.setGridOption('datasource', datasource);
        setError('');
        setIsLoading(true);
    }
  };

return (
  <Box sx={{ display: 'flex', flexDirection: 'column'  }}>
    <Header title='Book Recommendation System'/>
    <Container  sx={{ my: 3, }}>
      <Paper sx={{ my: 1, backgroundColor: '#f5f5f5', p: 1}}>
        <TextField
          fullWidth
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
            searchQuery ? (
                <InputAdornment position="end">
                    <IconButton
                        onClick={() => handleSearch('')}
                        edge="end"
                        size="small"
                        aria-label="clear search"
                    >
                        <CloseIcon />
                    </IconButton>
                </InputAdornment>
            ) : null // Render nothing if the search query is empty
        ),
          }}
          size="small"
          margin='none'
        />
        <RadioGroup row name="search-radio-group" defaultValue="intitle:" onChange={(e) => setSearchType(e.target.value)}
sx={{ display: 'flex', gap: 1, m: 1 }}>
            <FormControlLabel
                value="intitle:"
                label="Search by Title"
                control={<Radio size='small'/>}
            />
            <FormControlLabel
                value="inauthor:"
                label="Search by Author"
                control={<Radio size='small'/>}
            />
          </RadioGroup>
      </Paper>
      {error && (
        <Alert severity="error" onClose={() => setError('')} action={
            <Button color="inherit" size="small" onClick={refreshGrid}>
                Retry
            </Button>
        }>
          {error}
        </Alert>
      )}

      {isLoading && (
          <Paper
            sx={{
              p: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: '#e3f2fd'
            }}
          >
            <CircularProgress size={15} />
            <Typography variant="body2">
              Loading books...
            </Typography>
          </Paper>
        ) }
        <Paper sx={{ height: 500, width: '100%', mt: 3, }}>
        <Box className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact<Book>
            ref={gridRef}
            columnDefs={columnDefs}
            onCellDoubleClicked={onCellDoubleClicked}

            rowModelType={"infinite"}
            datasource={datasource}
            cacheBlockSize={booksPerPage}
            cacheOverflowSize={10}
            maxConcurrentDatasourceRequests={1}
            infiniteInitialRowCount={3}
            onGridReady={onGridReady}
            rowHeight={40}
            headerHeight={50}
            animateRows={true}
            loadingOverlayComponent={() => (<PageLoader />)}
        />
        </Box>
      </Paper>
    </Container>
  </Box>
  );
}

export default BookList;
