import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from "../../components/table/Table";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const PatientDetails = () => {
    const { id } = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [weightRows, setWeightRows] = useState([]);
    const [waterRows, setWaterRows] = useState([]);
    const [requestSended, setRequestSended] = useState(false);
    const [waterIntakeChecked, setWaterIntakeChecked] = useState(false);
    const [weightChecked, setWeightChecked] = useState(false);

    const convertToEpochTime = (dateString) => {
        const date = new Date(dateString);
        return date.getTime();
    };
    const convertToDate = (epochTime) => {
        const date = new Date(epochTime);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const fetchWaterIntakeData = async () => {
        try {
            const response = await fetch('https://deudtchronicillness.eastus2.cloudapp.azure.com/water/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                body: JSON.stringify({
                    id: id,
                    startDate: convertToEpochTime(startDate),
                    endDate: convertToEpochTime(endDate),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                const newData = data.map(item => ({
                    volume: item.volume,
                    date: convertToDate(item.date),
                }));
                setWaterRows(newData);
            } 
            else {
              // Handle errors - data might include error message
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
    const fetchWeightData = async () => {
        try {
            const response = await fetch('https://deudtchronicillness.eastus2.cloudapp.azure.com/weight/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                },
                body: JSON.stringify({
                    id: id,
                    startDate: convertToEpochTime(startDate),
                    endDate: convertToEpochTime(endDate),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                const newData = data.map(item => ({
                    measure: item.measure,
                    date: convertToDate(item.date),
                }));
                setWeightRows(newData);
            } 
            else {
              // Handle errors - data might include error message
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleButtonClick = () => {
        setWaterRows([]);
        setWeightRows([]);
        if (waterIntakeChecked){
            fetchWaterIntakeData()
        }


        if (weightChecked){
            fetchWeightData()
        }

        
        setRequestSended(true);
    };

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />

                <h1>Patient Details</h1>
                <p>ID: {id}</p>
                <FormControlLabel
                control={
                    <Checkbox
                    checked={waterIntakeChecked}
                    onChange={(event) => setWaterIntakeChecked(event.target.checked)}
                    />
                }
                label="Water Intake"
                />
                <FormControlLabel
                control={
                    <Checkbox
                    checked={weightChecked}
                    onChange={(event) => setWeightChecked(event.target.checked)}
                    />
                }
                label="Weight"
                />

                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />

                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Button variant="contained" onClick={(handleButtonClick)}>Send Request</Button>
                    {requestSended && <Chart title = {"Health Data"} weight={weightRows} waterIntake={waterRows} aspect={4}/>}
                    
                </div>
            </div>
            
        </div>
    );
};

export default PatientDetails;
