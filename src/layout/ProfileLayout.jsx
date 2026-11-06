import { useDispatch } from 'react-redux'
import Sidebar from '../companents/profile/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { loginControl } from '../redux/slices/appSlice';
import { useEffect } from 'react';

function ProfileLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = async () => {
            const response = await dispatch(loginControl());
            if (response.payload.isFinishLoginTime == true) {
                navigate("/");
            }
        }
        isLoggedIn();
    }, [window.location.pathname])
    return (
        <div style={{ display: "flex", padding: "50px 150px", gap: "50px" }}>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default ProfileLayout