/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import EditUser from './EditUser';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal({ setLogout }) {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const [email, setEmail] = useState('');
    // const [username, setUsername] = useState('');
    const [user, setUser] = useState('')

    const buttonStyle = {
        ':hover': {
            bgcolor: '#ef5350', // theme.palette.primary.main
            color: 'white',
        },
        color: '#fff',
        fontWeight: 'bold'
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setUser(res.data)
            })
            .catch(err => {
                console.log("noUser logged in")
                history.push('/')
            });
    }, []);

    return (
        <div>
            <Button onClick={handleOpen}
                sx={buttonStyle}
            >
                Edit Info
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* ENTER LOGIN HERE */}
                        <EditUser handleClose={handleClose} 
                        username = {user.username} 
                        email = {user.email} 
                        id = {user._id}
                        setLogout = {setLogout}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}