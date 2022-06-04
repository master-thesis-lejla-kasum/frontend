import { Button, InputLabel, MenuItem, Select, Stack, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import applicationService from "../../service/applicationService";
import theme from "../../theme/theme";
import { emptyOrNull, validBornId, validEmail } from "../../util/validationUtils";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";
import "./TestRegistration.css"

const TestRegistration = ({ baseUrl }) => {

    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [bornId, setBornId] = useState();
    const [identificationId, setIdentificationId] = useState();
    const [birthday, setBirthday] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [selectedInstitution, setSelectedInstitution] = useState(1);
    const [testDate, setTestDate] = useState();
    const [testId, setTestId] = useState();

    const [errors, setErrors] = useState({});

    useEffect(() => {
        //TODO Get institutions
    }, [])

    useEffect(() => {

    }, [errors])

    function onNameChange(value) {
        delete errors.name;
        setName(value);
    }

    function onSurnameChange(value) {
        delete errors.surname;
        setSurname(value);
    }

    function onBornIdChange(value) {
        delete errors.bornId;
        setBornId(value);
    }

    function onIdentificationIdChange(value) {
        delete errors.identificationId;
        setIdentificationId(value);
    }

    function onBirthdayChange(value) {
        delete errors.birthday;
        setBirthday(value);
    }

    function onPhoneNumberChange(value) {
        delete errors.phoneNumber;
        setPhoneNumber(value);
    }

    function onEmailChange(value) {
        delete errors.email;
        setEmail(value);
    }

    function onTestDateChange(value) {
        delete errors.testDate;
        setTestDate(value);
    }

    function onTestIdChange(value) {
        delete errors.testId;
        setTestId(value);
    }

    function validate() {
        var err = {};
        var valid = true;

        if (emptyOrNull(name)) {
            err.name = "Ime mora biti uneseno";
        }

        if (emptyOrNull(surname)) {
            err.surname = "Prezime mora biti uneseno";
        }

        if (!validBornId(bornId)) {
            err.bornId = "Neispravan JMBG";
        }

        if (emptyOrNull(identificationId)) {
            err.identificationId = "Broj ličnog dokumenta mora biti unesen";
        }

        if (emptyOrNull(birthday)) {
            err.birthday = "Datum rodjenja mora biti unesen";
        }

        if (emptyOrNull(phoneNumber)) {
            err.phoneNumber = "Broj telefona mora biti unesen"
        }

        if (!emptyOrNull(email) && !validEmail(email)) {
            err.email = "Email neispravan";
        }

        if (Object.keys(err).length > 0) {
            valid = false;
        }

        if (emptyOrNull(testDate)) {
            err.testDate = "Datum testiranja mora biti unesen"
        }

        if (emptyOrNull(testId)) {
            err.testId = "Identifikacioni broj testa mora biti unesen"
        }

        setErrors(err)

        return valid;
    }

    function sendApplication() {

        if (!validate()) {
            return;
        }

        const request = {
            type: "Test",
            date: new Date().toISOString(),
            personalId: bornId,
            identificationId: identificationId,
            name: name,
            surname: surname,
            birthDate: birthday,
            phoneNumber: phoneNumber,
            email: email,
            testingDate: testDate,
            testId: testId,
            institution: {
                id: selectedInstitution
            }
        }

        console.log(request);

        //TODO call server
        /*
        applicationService.submitApplicaion(baseUrl, request)
            .then(response => {
                alert("Uspjesno")
            })
            .catch(error => {
                alert("greska")
            })
            */
    }


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
                                PRIJAVA POZITIVNOG TESTA
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.name != null}
                                    helperText={errors.name ? errors.name : ""}
                                    id="vacc-reg_name"
                                    label="Ime"
                                    variant="outlined"
                                    type="text"
                                    required
                                    onChange={e => onNameChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.surname != null}
                                    helperText={errors.surname ? errors.surname : ""}
                                    id="vacc-reg_surname"
                                    label="Prezime"
                                    variant="outlined"
                                    type="text"
                                    required
                                    onChange={e => onSurnameChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.bornId != null}
                                    helperText={errors.bornId ? errors.bornId : ""}
                                    id="vacc-reg_born-id"
                                    label="Jedinstveni matični broj"
                                    variant="outlined"
                                    type="text"
                                    required
                                    onChange={e => onBornIdChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.identificationId != null}
                                    helperText={errors.identificationId ? errors.identificationId : ""}
                                    id="vacc-reg_personal-id"
                                    label="Broj ličnog dokumenta"
                                    variant="outlined"
                                    type="text"
                                    required
                                    onChange={e => onIdentificationIdChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.birthday != null}
                                    helperText={errors.birthday ? errors.birthday : ""}
                                    id="vacc-reg_birthdate"
                                    label="Datum rođenja"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={e => onBirthdayChange(e.target.value)}

                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.phoneNumber != null}
                                    helperText={errors.phoneNumber ? errors.phoneNumber : ""}
                                    id="vacc-reg_phone"
                                    label="Broj telefona"
                                    variant="outlined"
                                    type="text"
                                    required
                                    onChange={e => onPhoneNumberChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.email != null}
                                    helperText={errors.email ? errors.email : ""}
                                    id="vacc-reg_email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    onChange={e => onEmailChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.testDate != null}
                                    helperText={errors.testDate ? errors.testDate : ""}
                                    id="vacc-reg_testingDate"
                                    label="Datum testiranja"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={e => onTestDateChange(e.target.value)}

                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.testId != null}
                                    helperText={errors.testId ? errors.testId : ""}
                                    id="vacc-reg_testId"
                                    label="Identifikacioni broj testa"
                                    variant="outlined"
                                    type="text"
                                    required
                                    onChange={e => onTestIdChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <InputLabel id="vacc-reg_institution-dropdown-label">Institucija</InputLabel>
                                <Select
                                    labelId="vacc-reg_institution-dropdown-label"
                                    id="vacc-reg_institution-dropdown"
                                    variant="outlined"
                                    value={selectedInstitution}
                                    onChange={e => setSelectedInstitution(e.target.value)}

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
                                    onClick={(e) => sendApplication()}
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

export default TestRegistration;