//AIzaSyAaa7QCYt67ws_tqm63nkccSijO-WGNGGw
import React from 'react'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
// import Form from '@mui/material/Form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import DisplayData from './DisplayData';

import styled from 'styled-components';
import axios from 'axios';
import EditUser from './EditUser';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SearchLoctaion = () => {

    const top100Films = [
        { label: 'Bangalore' },
        { label: 'Pune' },
        { label: 'Mumbai' },
        { label: 'Hubli' },
        { label: 'Chennai' },
        { label: "Gurgaon" },
        { label: 'Sangli' },
    ]
    const [allDetails, setAllDetails] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        dob: null,
        age: "",
        phoneNo: "",
        address: ""
    })
    console.log("all details", allDetails)

    const getData = (e) => {
        setAllDetails({
            ...allDetails,
            [e.target.name]: e.target.value
        })
    }

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

    const dataFromChild = () => {

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
    };

    const submitData = async () => {
        firstNameValidation()
        lastNameValidation()
        emailValidation()
        mobileValidation()
        ageValidation()
        dobValidation()
        addValidation()

        if (firstNameValidation() && lastNameValidation() && emailValidation() && mobileValidation() && ageValidation() && dobValidation() & addValidation()) {
            try {
                const data = await axios.post("http://localhost:8000/newuser", allDetails)
                console.log("submitted adta", data.status)
                setAllDetails({
                    firstName: "",
                    lastName: "",
                    emailId: "",
                    dob: null,
                    age: "",
                    phoneNo: "",
                    address: ""
                })
                window.location.reload()
            } catch (err) {
                console.log("erro while posting", err)
            }

            // setChildData([...childData, allDetails])
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
            <Grid className='main-container' container item lg={12} md={12} xs={12} sx={{ display: "flex" }}>
                {/* <Form> */}
                <Grid container spacing={2} item lg={6} md={6} xs={6}
                    sx={{
                        padding: "10px 20px",
                        // border: "1px solid black",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row"
                    }}>

                    <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }} >
                        <Grid item lg={5.95} md={6} xs={12}>
                            <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setFirstNameValid("") } }}
                                id="outlined-basic" label="First Name" variant="outlined" fullWidth name="firstName" value={allDetails.firstName}
                                onChange={getData} />
                            {firstNameValid && <span style={{ color: "red", }}>{firstNameValid}</span>}
                        </Grid>
                        <Grid item lg={5.95} md={6} xs={12}>
                            <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setLastNameValid("") } }}
                                id="outlined-basic" label="Last Name" variant="outlined" fullWidth name="lastName" value={allDetails.lastName}
                                onChange={getData} />
                            {lastNameValid && <span style={{ color: "red" }}>{lastNameValid}</span>}

                        </Grid>
                    </Grid>
                    <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item lg={5.95} md={6} xs={12}>
                            <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setEmailValid("") } }}
                                id="outlined-basic" label="Email" variant="outlined" fullWidth name="emailId" value={allDetails.emailId}
                                onChange={getData} />
                            {emailValid && <div style={{ color: "red" }}>{emailValid}</div>}
                        </Grid>
                        <Grid item lg={5.95} md={6} xs={12}>
                            <TextField onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setMobileValid("") } }}
                                id="outlined-basic" label="Phone No" variant="outlined" fullWidth name="phoneNo" value={allDetails.phoneNo}
                                onChange={getData} />
                            {mobileValid && <span style={{ color: "red" }}>{mobileValid}</span>}

                        </Grid>
                    </Grid>
                    <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item lg={6} md={6} xs={12} >
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
                                </Grid>
                            </LocalizationProvider>
                            {dobValid && <span style={{ color: "red" }}>{dobValid}</span>}
                        </Grid>
                        <Grid item lg={5.95} md={6} xs={12}>
                            <TextField
                                id="outlined-basic" label="age" variant="outlined" fullWidth name="age" value={allDetails.age}
                                onChange={getData} />
                            {ageValid && <span style={{ color: "red" }}>{ageValid}</span>}

                        </Grid>
                    </Grid>
                    <Grid className='px-4 py-4' container spacing={2} item lg={12} md={12} xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Grid item lg={5.95} md={6} xs={12}>
                            <Autocomplete
                                // disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                onChange={(e, value) => { setAllDetails({ ...allDetails, address: value.label }) }}
                                renderInput={(params) => <TextField {...params} label="Address" />}
                                onBlur={(e) => { if (e.target.value && e.target.value.trim().length > 0) { setAddValid("") } }}
                            />
                            {addValid && <span style={{ color: "red" }}>{addValid}</span>}

                        </Grid>
                    </Grid>

                    <Grid item lg={12} md={12} xs={12}>
                        <Button onClick={submitData} fullWidth variant="contained">Submit</Button>
                    </Grid>
                </Grid>

                <Divider orientation="vertical" variant="middle" flexItem />

                <Grid item lg={5.9} md={5.9} xs={5.9} sx={{ padding: "0px 10px", width: "100%", display: "flex", justifyContent: "center" }}>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                        width="100%" height="350" frameborder="0" style={{ border: "0" }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </Grid>

                <DisplayData dataFromChild={dataFromChild()} />
            </Grid>
        </div >
    )
}

export default SearchLoctaion