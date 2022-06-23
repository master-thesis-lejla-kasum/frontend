import { IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, Typography, Collapse, Box, Paper, TableContainer, Button, InputAdornment, TextField, FormControlLabel, Checkbox, Modal, Dialog, InputLabel, Select, OutlinedInput, MenuItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AdminInstitution.css";
import theme from "../../theme/theme";
import AdminNavbar from "../Navbar/AdminNavbar";
import getToken from "../../util/getToken";
import institutionService from "../../service/institutionService";
import roleService from "../../service/roleService";
import { KeyboardArrowUp, KeyboardArrowDown, Search } from "@mui/icons-material";
import Footer from "../Navbar/Footer";
import accountService from "../../service/accountService";



const AdminInstitution = ({ authBaseUrl }) => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [institutions, setInstitutions] = useState([]);
    const [params, setParams] = useState({
        approved: false,
        name: ""
    });
    const [openModal, setOpenModal] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState({});
    const [roles, setRoles] = useState([]);

    const columns = ["Identifikacija", "Naziv", "Entitet", "Kanton", "Opština", "Adresa", "Telefon", "Aktivacija"];

    useEffect(() => {
        //TODO check if has authority

        var editedParams = {
            approved: params.approved ? false : null,
            name: params.name
        };
        institutionService.getAll(authBaseUrl, getToken("token"), editedParams)
            .then(res => {
                setInstitutions(res.data);
            })
            .catch(err => {
                console.log(err);
            })

        roleService.getAll(authBaseUrl, getToken("token"))
            .then(res => {
                var tempRoles = res.data.map((role) => ({ id: role.id, name: role.name, checked: false }));
                setRoles(tempRoles);
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

    function onApproveClick(institution) {
        setOpenModal(true);
        setSelectedInstitution(institution);
    }

    function handleRoleDropdownChange(event) {
        var selected = event.target.value[event.target.value.length - 1]
        setRoles(roles.map((row) => ({ ...row, checked: row.id == selected ? !row.checked : row.checked })));
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
                            row.approved == true ? "Aktivna" : <Button variant="outlined" color="success" onClick={(e) => onApproveClick(row)} >Odobri</Button>
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

    function getRenderValue() {
        return roles.filter(role => role.checked).map((role) => (role.name)).join();
    }

    function onActivateClick() {
        const updateInstitutionRequest = {
            id: selectedInstitution.id,
            identificationNumber: selectedInstitution.identificationNumber,
            name: selectedInstitution.name,
            entity: selectedInstitution.entity,
            canton: selectedInstitution.canton,
            municipality: selectedInstitution.municipality,
            address: selectedInstitution.address,
            phoneNumber: selectedInstitution.phoneNumber,
            approved: true,
            account: {
                id: selectedInstitution.account.id
            }
        }

        const updateAccountRequest = {
            id: selectedInstitution.account.id,
            name: selectedInstitution.account.name,
            surname: selectedInstitution.account.surname,
            roles: roles.filter(role => role.checked).map((role) => { return { id: role.id } })
        }

        institutionService.updateInstitution(authBaseUrl, getToken("token"), updateInstitutionRequest, updateInstitutionRequest.id)
            .then(res => {
                accountService.updateAccount(authBaseUrl, getToken("token"), updateAccountRequest, updateAccountRequest.id)
                    .then(res => {
                        setInstitutions(institutions.map((row) => ({ ...row, approved: row.id === selectedInstitution.id ? true : row.approved })))
                        setOpenModal(false);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })

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

            <Dialog
                open={openModal}
                onClose={(e) => setOpenModal(false)}
            >
                <Stack className="admin_institution-modal" >
                    <Stack alignItems="center" className="admin_institution-modal-title">
                        <h3>
                            Dodjela autorizacijskih prava
                        </h3>
                    </Stack>

                    <Stack className="admin_institution-modal-dropdown">
                        <Select
                            id="admin_institutions-roles-checkbox"
                            multiple
                            value={roles}
                            onChange={handleRoleDropdownChange}
                            renderValue={getRenderValue}
                            MenuProps={MenuProps}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    <Checkbox checked={role.checked} />
                                    <ListItemText primary={role.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>

                    <Stack direction="row" spacing={9} justifyContent="space-between">
                        <Button color="success" variant="contained" onClick={onActivateClick}>Aktiviraj</Button>
                        <Button color="error" variant="outlined" onClick={(e) => setOpenModal(false)}>Poništi</Button>
                    </Stack>
                </Stack>
            </Dialog>

        </ThemeProvider>
    )
}

export default AdminInstitution;