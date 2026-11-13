import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from 'react-redux';

function Loading() {
    const { isLoading } = useSelector(store => store.loading);
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loading;