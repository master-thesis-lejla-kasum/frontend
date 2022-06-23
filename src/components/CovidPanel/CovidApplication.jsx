import { ThemeProvider } from "@emotion/react";
import { Button, Checkbox, FormControlLabel, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CovidNavbar from "../Navbar/CovidNavbar";
import Footer from "../Navbar/Footer";
import theme from "../../theme/theme";
import "./Covid.css"
import applicationService from "../../service/applicationService";
import getToken from "../../util/getToken";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Search } from "@mui/icons-material";


const CovidApplication = ({ covidBaseUrl }) => {

    const testColumns = ["Datum prijave", "JMBG", "Broj ličnog dokumenta", "Ime", "Prezime", "Datum rođenja", "Broj telefona", "Email", "Datum testiranja", "ID Testa", "Obrađena"];
    const vaccineColumns = ["Datum prijave", "JMBG", "Broj ličnog dokumenta", "Ime", "Prezime", "Datum rođenja", "Broj telefona", "Email", "Obrađena"];


    const [applications, setApplications] = useState([]);
    const [params, setParams] = useState({
        name: "",
        surname: "",
        type: "VACCINE",
        processed: false
    });

    useEffect(() => {

        var editedParams = {
            processed: params.processed ? false : null,
            name: params.name,
            surname: params.surname,
            type: params.type
        };

        applicationService.search(covidBaseUrl, getToken("token"), editedParams)
            .then(res => {
                setApplications(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [params])

    function handleParamsChange(name, value) {

        setParams(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    function getColumns() {
        if (params.type === "TEST") {
            return testColumns;
        }
        return vaccineColumns;
    }

    function onApproveClick(application) {
        const params = {
            processingStatus: true
        }
        applicationService.update(covidBaseUrl, getToken("token"), params, application.id)
            .then(res => {
                setApplications(applications.map((row) => ({ ...row, processed: row.id === application.id ? true : row.processed })))
            })
            .catch(err => {
                console.log(err);
            })
    }

    function getDisplayDate(date) {
        return new Date(date).toISOString().split('T')[0];
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <CovidNavbar />
                </Stack>

                <Stack className="covid_wrapper">
                    <Stack direction="row" spacing={10} className="covid_application-filters">
                        <Stack>
                            <TextField
                                id="covid_applications-filters-name"
                                label="Pretraga po imenu"
                                value={params.name}
                                onChange={(e) => handleParamsChange("name", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    )
                                }}
                                variant="outlined"
                            />
                        </Stack>
                        <Stack>
                            <TextField
                                id="covid_applications-filters-surname"
                                label="Pretraga po prezimenu"
                                value={params.surname}
                                onChange={(e) => handleParamsChange("surname", e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    )
                                }}
                                variant="outlined"
                            />
                        </Stack>
                        <Stack>
                            <Select
                                labelId="covid_filters-dropdown-label"
                                id="covid_filters-dropdown"
                                variant="outlined"
                                value={params.type}
                                onChange={e => handleParamsChange("type", e.target.value)}

                            >
                                <MenuItem key="TEST" value="TEST">Prijave za testiranje</MenuItem>
                                <MenuItem key="VACCINE" value="VACCINE">Prijave za vakcinaciju</MenuItem>
                            </Select>
                        </Stack>
                        <Stack>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={params.processed}
                                    onChange={(e) => handleParamsChange("processed", e.target.checked)}
                                />}
                                label="Filtriraj neobrađene"
                            />
                        </Stack>
                    </Stack>

                    <Stack>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {getColumns().map((column) => (
                                            <TableCell key={column} style={{ fontWeight: "bold" }}>{column}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {applications.map((row) => (
                                        <TableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                            <TableCell>{getDisplayDate(row.date)}</TableCell>
                                            <TableCell>{row.personalId}</TableCell>
                                            <TableCell>{row.identificationId}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.surname}</TableCell>
                                            <TableCell>{getDisplayDate(row.birthDate)}</TableCell>
                                            <TableCell>{row.phoneNumber}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            {params.type === "TEST" && <TableCell>{getDisplayDate(row.testingDate)}</TableCell>}
                                            {params.type === "TEST" && <TableCell>{row.testId}</TableCell>}
                                            <TableCell>
                                                {
                                                    row.processed == true ? <CheckCircleOutlineOutlinedIcon color="success" /> : <Button variant="outlined" color="success" onClick={(e) => onApproveClick(row)} >Obrađena</Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Stack>

                <Stack>
                    <Footer />
                </Stack>
            </Stack>
        </ThemeProvider>
    )
}

export default CovidApplication;