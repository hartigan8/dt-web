import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const List = () => {
  const [rows, setRows] = useState([]);
  let navigate = useNavigate();

  const handleButtonClick = (id) => {
    navigate(`/patientDetails/${id}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://deudtchronicillness.eastus2.cloudapp.azure.com/user?page=1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            },
        });

        const data = await response.json();
        if (response.ok) {
            // Assuming data is the array you want to set to rows
            setRows(data);
        } else {
            // Handle errors - data might include error message
            console.error(data.message);
        }
      } catch (error) {
          console.error('Error during registration:', error);
      }
    };

    fetchData();
    console.log(rows)
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Surname</TableCell>
            <TableCell className="tableCell">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">{row.surname}</TableCell>
              <TableCell className="tableCell">{row.phoneNumber}</TableCell>
              <TableCell className="tableCell">
                <Button variant="contained" onClick={() => handleButtonClick(row.id)}>Show Deatils</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
