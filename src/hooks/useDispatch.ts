import { useDispatch as useReduxDispatch } from 'react-redux';
import { RootDispatch } from '../store';

export const useDispatch = () => useReduxDispatch<RootDispatch>();
