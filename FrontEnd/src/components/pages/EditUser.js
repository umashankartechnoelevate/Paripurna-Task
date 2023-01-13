import React from 'react'
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';



import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const top100Films = [
    { label: 'Bangalore' },
    { label: 'Pune' },
    { label: 'Mumbai' },
    { label: 'Hubli' },
    { label: 'Chennai' },
    { label: "Gurgaon" },
    { label: 'Sangli' },
]


const EditUser = ({ open, setOpen, selectedUser, getData }) => {
    console.log("selected user", selectedUser)
    const style = {
        display: "flex",
        justifyContent: "center",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [allDetails, setAllDetails] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        dob: null,
        age: "",
        phoneNo: "",
        address: ""
    })

    useEffect(() => {
        setAllDetails({ ...selectedUser })
    }, [selectedUser])

    console.log("input data in edit component", allDetails)

    const updateData = (e) => {
        setAllDetails({
            ...allDetails,
            [e.target.name]: e.target.value
        })
    }

    const getDobDate = (val) => {
        console.log("value in date", val)
        let date = new Date(val)
        console.log("date by new date", date)
        setAllDetails({
            ...allDetails,
            dob: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
        })
        setDobValid("")
        setAddValid("")
    };
    //validations for registration form 
    const [firstNameValid, setFirstNameValid] = useState("")
    const [lastNameValid, setLastNameValid] = useState("")
    const [emailValid, setEmailValid] = useState("")
    const [dobValid, setDobValid] = useState("")
    const [ageValid, setAgeValid] = useState("")
    const [mobileValid, setMobileValid] = useState("")
    const [addValid, setAddValid] = useState("")

    const firstNameValidation = () => {
        const nameRegex = /^[A-Za-z]+$/;
        if (allDetails.firstName) {

            if (nameRegex.test(allDetails.firstName)) {
                setFirstNameValid("")
                return true
            } else {
                setFirstNameValid("Invalid FirstName")
            }

        } else {
            setFirstNameValid("* Firstname Required")
        }
    }

    const lastNameValidation = () => {
        const nameRegex = /^[A-Za-z]+$/;
        if (allDetails.lastName) {

            if (nameRegex.test(allDetails.lastName)) {
                setLastNameValid("")
                return true
            } else {
                setLastNameValid("Invalid LastName")
            }

        } else {
            setLastNameValid("* Lastname  Required")
        }
    }
    const emailValidation = () => {
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+(\.\w{2,3})$/;
        if (allDetails.emailId) {
            if (emailRegex.test(allDetails.emailId)) {
                setEmailValid("")
                return true
            } else {
                setEmailValid("Invalid Email")
            }

        } else {
            setEmailValid("* EmailID Required")
        }
    }
    const mobileValidation = () => {
        const mobileRegex = /^(\+|\d)[0-9]{7,16}$/;
        if (allDetails.phoneNo) {
            if (mobileRegex.test(allDetails.phoneNo)) {
                setMobileValid("")
                return true
            } else {
                setMobileValid("Invalid Mobile Number")
            }
        } else {
            setMobileValid("* Mobile number Required")
        }
    }

    const ageValidation = () => {
        const ageRegex = /^[0-9]+$/;
        if (allDetails.age) {
            if (ageRegex.test(allDetails.age)) {
                setAgeValid("")
                return true
            } else {
                setAgeValid("Invalid Age")
            }
        } else {
            setAgeValid("* Age Required")
        }
    }

    const dobValidation = () => {
        if (allDetails.dob == null) {
            setDobValid("* DOB Required")
        } else {
            setDobValid("")
            return true
        }
    }
    const addValidation = () => {
        if (allDetails.dob == null) {
            setAddValid("* Address Required")
        } else {
            setAddValid("")
            return true
        }
    }

    let editProduct = async (ID) => {
        firstNameValidation()
        lastNameValidation()
        emailValidation()
        mobileValidation()
        ageValidation()
        dobValidation()
        addValidation()
        if (firstNameValidation() && lastNameValidation() && emailValidation() && mobileValidation() && ageValidation() && dobValidation() & addValidation()) {

            try {
                let response = await axios.put(`http://localhost:8000/editUser/${selectedUser._id}`, allDetails)
                setOpen(false);
                getData()
            } catch (err) {
                console.log("err", err);
            }
        }
    }


    useEffect(() => {
        let calculate_age = () => {
            let today = new Date();
            let birthDate = new Date(allDetails.dob);  // create a date object directly from `dob1` argument
            let age_now = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
            if (allDetails.dob !== null) {
                setAllDetails({
                    ...allDetails,
                    age: age_now
                })
            }
            setAgeValid("")
            return age_now;
        }
        calculate_age()

    }, [allDetails.dob])
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={2} item lg={12} md={12} xs={6}
                        sx={{
                            padding: "10px 20px",
                            // border: "1px solid black",
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row"
                        }}>

                        <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }} >
                            <Grid item lg={5.75} md={6} xs={12}>
                                <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setFirstNameValid("") } }}
                                    id="outlined-basic" label="First Name" variant="outlined" fullWidth name="firstName" value={allDetails.firstName} onChange={updateData} />
                                {firstNameValid && <span style={{ color: "red", }}>{firstNameValid}</span>}

                            </Grid>
                            <Grid item lg={5.75} md={6} xs={12}>
                                <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setLastNameValid("") } }}
                                    id="outlined-basic" label="Last Name" variant="outlined" fullWidth name="lastName" value={allDetails.lastName} onChange={updateData} />
                                {lastNameValid && <span style={{ color: "red", }}>{lastNameValid}</span>}

                            </Grid>
                        </Grid>
                        <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid item lg={5.75} md={6} xs={12}>
                                <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setEmailValid("") } }}
                                    id="outlined-basic" label="Email" variant="outlined" fullWidth name="emailId" value={allDetails.emailId} onChange={updateData} />
                                {emailValid && <span style={{ color: "red", }}>{emailValid}</span>}

                            </Grid>
                            <Grid item lg={5.75} md={6} xs={12}>
                                <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setMobileValid("") } }}
                                    id="outlined-basic" label="Phone No" variant="outlined" fullWidth name="phoneNo" value={allDetails.phoneNo} onChange={updateData} />
                                {mobileValid && <span style={{ color: "red", }}>{mobileValid}</span>}

                            </Grid>
                        </Grid>
                        <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid item lg={5.75} md={6} xs={12}>
                                {/* <TextField id="outlined-basic" label="DOB" variant="outlined" fullWidth name="dob" value={allDetails.dob} onChange={updateData} /> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid sx={{ margin: "0px" }} >
                                        <DatePicker
                                            sx={{ width: "600px" }}
                                            fullWidth
                                            label="Date of Birth"
                                            value={allDetails.dob}
                                            onChange={(e) => { getDobDate(e) }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        {dobValid && <span style={{ color: "red", }}>{dobValid}</span>}

                                    </Grid>
                                </LocalizationProvider>

                            </Grid>
                            <Grid item lg={5.75} md={6} xs={12}>
                                <TextField id="outlined-basic" label="age" variant="outlined" fullWidth name="age" value={allDetails.age} onChange={updateData} />
                                {ageValid && <span style={{ color: "red", }}>{ageValid}</span>}

                            </Grid>
                        </Grid>
                        <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Grid item lg={5.75} md={6} xs={12}>
                                <Autocomplete
                                    // disablePortal
                                    value={selectedUser?.address}
                                    id="combo-box-demo"
                                    options={top100Films}
                                    onChange={(e, value) => { setAllDetails({ ...allDetails, address: value.label }) }}
                                    renderInput={(params) => <TextField {...params} label="Address" />}
                                />
                                {addValid && <span style={{ color: "red", }}>{addValid}</span>}

                            </Grid>
                        </Grid>

                        <Grid item lg={12} md={12} xs={12}>
                            <Button onClick={editProduct} fullWidth variant="contained">Edit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default EditUser