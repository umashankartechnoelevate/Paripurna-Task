import React from 'react'
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import axios from 'axios'
import EditUser from './EditUser';

const DisplayData = (props) => {
    console.log("props in child", props)

    const [open, setOpen] = useState(false)
    const [childData, setChildData] = useState([])

    console.log("child data in child state", childData)
    const [selectedUser, setSelectedUser] = useState()


    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/allUsers")
            console.log("got all data child", response.data.data)
            setChildData(response.data.data)

        } catch (err) {
            console.log("error while getting the api", err)
        }
    }


    const deleteData = async (_id, index) => {
        console.log("_id to delete", _id)
        try {
            let response = await axios.delete(`http://localhost:8000/deleteuser/${_id}`)
            console.log("response while deleting", response)
            getData()
        } catch (err) {
            console.log("error in deleting", err)
        }
    }


    const editUser = (value) => {
        setSelectedUser(value)
        setOpen(true)
    }

    const DataToParent = () => {
        props.dataFromChild()
    }

    return (

        <Box sx={{ width: "100%", px: 4, mt: 5 }}>
            <TableContainer sx={{ justifyContent: "center" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">FirstName</TableCell>
                            <TableCell align="center">LastName</TableCell>
                            <TableCell align="center">Email ID</TableCell>
                            <TableCell align="center">Mobile No</TableCell>
                            <TableCell align="center">DOB</TableCell>
                            <TableCell align="center">Age</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Lat</TableCell>
                            <TableCell align="center">Long</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            childData.map((data, index) => {
                                console.log("data while mapping", data)
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="center">{data.firstName}</TableCell>
                                        <TableCell align="center">{data.lastName}</TableCell>
                                        <TableCell align="center">{data.emailId}</TableCell>
                                        <TableCell align="center">{data.phoneNo}</TableCell>
                                        <TableCell align="center">{data.dob}</TableCell>
                                        <TableCell align="center">{data.age}</TableCell>
                                        <TableCell align="center">{data.address}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center" >
                                            <Button onClick={() => { editUser(data) }} sx={{ marginRight: "5px" }} size="small" variant="contained">Edit</Button>
                                            <Button onClick={() => deleteData(data._id, index)} size="small" variant="contained">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>

            <EditUser open={open} setOpen={setOpen} selectedUser={selectedUser} setSelectedUser={setSelectedUser} getData={getData()} />
        </Box>

    )
}

export default DisplayData