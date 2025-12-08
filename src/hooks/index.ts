import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import useDebounce from './useDebounce';

// Type-safe version of useDispatch
const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Type-safe version of useSelector
const useAppSelector = useSelector.withTypes<RootState>()

export { useAppDispatch, useAppSelector, useDebounce };
