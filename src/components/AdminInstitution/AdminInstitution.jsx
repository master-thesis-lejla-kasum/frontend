import { IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, Typography, Collapse, Box, Paper, TableContainer, Button, InputAdornment, TextField, FormControlLabel, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AdminInstitution.css";
import theme from "../../theme/theme";
import AdminNavbar from "../Navbar/AdminNavbar";
import getToken from "../../util/getToken";
import institutionService from "../../service/institutionService";
import { KeyboardArrowUp, KeyboardArrowDown, Search } from "@mui/icons-material";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";



const AdminInstitution = ({ authBaseUrl }) => {

    const [institutions, setInstitutions] = useState([]);
    const [params, setParams] = useState({
        approved: false,
        name: ""
    });

    const columns = ["Identifikacija", "Naziv", "Entitet", "Kanton", "Opština", "Adresa", "Telefon", "Aktivacija"];

    useEffect(() => {
        //TODO check if has authority

        console.log(params.approved)
        var editedParams = {
            approved: params.approved ? false : null,
            name: params.name
        };
        institutionService.getAll(authBaseUrl, getToken("token"), editedParams)
            .then(res => {
                setInstitutions(res.data);
                console.log(res.data);
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

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = useState(false);

        return (
            <React.Fragment key={row.id}>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.identificationNumber}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.entity}</TableCell>
                    <TableCell>{row.canton}</TableCell>
                    <TableCell>{row.municipality}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>
                        {
                            row.approved == true ? "Aktivna" : <Button variant="outlined" color="warning">Odobri</Button>
                        }
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Kontakt osoba
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontWeight: "bold" }}>Ime</TableCell>
                                            <TableCell style={{ fontWeight: "bold" }}>Prezime</TableCell>
                                            <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={row.account.id}>
                                            <TableCell component="th" scope="row">
                                                {row.account.name}
                                            </TableCell>
                                            <TableCell>{row.account.surname}</TableCell>
                                            <TableCell>{row.account.email}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <AdminNavbar />
                </Stack>
                <Stack className="admin_institution-wrapper">
                    <Stack direction="row" spacing={10} className="admin_institution-filters">
                        <Stack>
                            <TextField
                                id="admin_filters-name"
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
                            <FormControlLabel
                                control={<Checkbox
                                    checked={params.approved}
                                    onChange={(e) => handleParamsChange("approved", e.target.checked)}
                                />}
                                label="Filtriraj neaktivne"
                            />
                        </Stack>
                    </Stack>
                    <Stack>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        {columns.map((column) => (
                                            <TableCell key={column} style={{ fontWeight: "bold" }}>{column}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {institutions.map((row) => (
                                        <Row key={row.id} row={row} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Stack>
                <Stack style={{ marginTop: 270 }}>
                    <Footer />
                </Stack>
            </Stack>
        </ThemeProvider>
    )
}

export default AdminInstitution;