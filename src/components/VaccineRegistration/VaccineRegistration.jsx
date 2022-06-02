import { Button, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../../theme/theme";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";
import "./VaccineRegistration.css"

const VaccineRegistration = () => {
    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <Navbar />
                </Stack>

                <div className="wrapper">
                    <div className="form-wrapper">
                        <Stack spacing={3}>
                            <Stack className="title">
                                PRIJAVA ZA VAKCINACIJU
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    id="vacc-reg_name"
                                    label="Ime"
                                    variant="outlined"
                                    type="text"
                                    required
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    id="vacc-reg_surname"
                                    label="Prezime"
                                    variant="outlined"
                                    type="text"
                                    required
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    id="vacc-reg_born-id"
                                    label="Jedinstveni matični broj"
                                    variant="outlined"
                                    type="text"
                                    required
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    id="vacc-reg_personal-id"
                                    label="Broj ličnog dokumenta"
                                    variant="outlined"
                                    type="text"
                                    required
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    id="vacc-reg_birthdate"
                                    label="Datum rođenja"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}

                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    id="vacc-reg_phone"
                                    label="Broj telefona"
                                    variant="outlined"
                                    type="text"
                                    required
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    id="vacc-reg_email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                />
                            </Stack>
                            <Stack className="input">
                                <InputLabel id="vacc-reg_institution-dropdown-label">Institucija</InputLabel>
                                <Select
                                    labelId="vacc-reg_institution-dropdown-label"
                                    id="vacc-reg_institution-dropdown"
                                    variant="outlined"
                                    value="1"

                                >
                                    <MenuItem key="1" value="1">Dom zdravlja Jajce</MenuItem>
                                    <MenuItem key="2" value="2">Dom zdravlja Ilidža</MenuItem>
                                </Select>
                            </Stack>

                            <Stack className="send-button">
                                <Button
                                    id="vacc-reg_send-button"
                                    className="button"
                                    variant="contained"
                                    color="success"
                                >
                                    POŠALJI PRIJAVU
                                </Button>
                            </Stack>
                        </Stack>
                    </div>
                </div>

                <Stack>
                    <Footer />
                </Stack>
            </Stack>
        </ThemeProvider>
    )
}

export default VaccineRegistration;