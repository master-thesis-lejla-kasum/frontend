import { Alert, Button, InputLabel, MenuItem, Select, Snackbar, Stack, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import applicationService from "../../service/applicationService";
import publicInstitutionService from "../../service/publicInstitutionService";
import theme from "../../theme/theme";
import { emptyOrNull, validBornId, validEmail } from "../../util/validationUtils";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";
import "./TestRegistration.css"

const TestRegistration = ({ covidBaseUrl, authBaseUrl }) => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [bornId, setBornId] = useState("");
    const [identificationId, setIdentificationId] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [selectedInstitution, setSelectedInstitution] = useState("0");
    const [testDate, setTestDate] = useState("");
    const [testId, setTestId] = useState("");

    const [availableInstitutions, setAvailableInstitutions] = useState([]);
    const [errors, setErrors] = useState({});
    const [showToast, setShowtToast] = useState(false);
    const [toastVariant, setToasVariant] = useState("success");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        publicInstitutionService.getInstitutions(covidBaseUrl)
            .then(response => {
                setAvailableInstitutions(response.data);
            })
            .catch(err => {
                console.log(err)
            })

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

    function onInstitutionChange(value) {
        delete errors.institution;
        setSelectedInstitution(value);
    }

    function onTestDateChange(value) {
        delete errors.testDate;
        console.log(value)
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

        if (selectedInstitution === "0") {
            err.institution = "Odaberite instituciju";
        }

        if (emptyOrNull(testDate)) {
            err.testDate = "Datum testiranja mora biti unesen"
        }

        if (emptyOrNull(testId)) {
            err.testId = "Identifikacioni broj testa mora biti unesen"
        }

        if (Object.keys(err).length > 0) {
            valid = false;
        }

        setErrors(err)

        return valid;
    }

    function clearForm() {
        setName("");
        setSurname("");
        setBornId("");
        setIdentificationId("");
        setBirthday("");
        setPhoneNumber("");
        setEmail("");
        setSelectedInstitution(0);
        setTestDate("");
        setTestId("");
    }

    function sendApplication() {

        if (!validate()) {
            return;
        }

        const request = {
            type: "TEST",
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

        applicationService.submitApplicaion(covidBaseUrl, request)
            .then(response => {
                setShowtToast(true);
                setToasVariant("success");
                setToastMessage("Prijava je uspješno poslana")
                clearForm();

            })
            .catch(error => {
                setShowtToast(true);
                setToasVariant("error");
                setToastMessage("Nešto je pošlo po zlu, molimo pokušajte kasnije")
            })
    }

    const listInstitutions = availableInstitutions && availableInstitutions.map((inst) =>
        <MenuItem key={inst.id} value={inst.id}>{inst.name}</MenuItem>
    )


    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={showToast} autoHideDuration={6000}>
                <Alert variant="filled" severity={toastVariant}>
                    {toastMessage}
                </Alert>
            </Snackbar>

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
                                    id="test-reg_name"
                                    label="Ime"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => onNameChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.surname != null}
                                    helperText={errors.surname ? errors.surname : ""}
                                    id="test-reg_surname"
                                    label="Prezime"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={surname}
                                    onChange={e => onSurnameChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.bornId != null}
                                    helperText={errors.bornId ? errors.bornId : ""}
                                    id="test-reg_born-id"
                                    label="Jedinstveni matični broj"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={bornId}
                                    onChange={e => onBornIdChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.identificationId != null}
                                    helperText={errors.identificationId ? errors.identificationId : ""}
                                    id="test-reg_personal-id"
                                    label="Broj ličnog dokumenta"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={identificationId}
                                    onChange={e => onIdentificationIdChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.birthday != null}
                                    helperText={errors.birthday ? errors.birthday : ""}
                                    id="test-reg_birthdate"
                                    label="Datum rođenja"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={birthday}
                                    onChange={e => onBirthdayChange(e.target.value)}

                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.phoneNumber != null}
                                    helperText={errors.phoneNumber ? errors.phoneNumber : ""}
                                    id="test-reg_phone"
                                    label="Broj telefona"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={phoneNumber}
                                    onChange={e => onPhoneNumberChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.email != null}
                                    helperText={errors.email ? errors.email : ""}
                                    id="test-reg_email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    value={email}
                                    onChange={e => onEmailChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.testDate != null}
                                    helperText={errors.testDate ? errors.testDate : ""}
                                    id="test-reg_testingDate"
                                    label="Datum testiranja"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={testDate}
                                    onChange={e => onTestDateChange(e.target.value)}

                                />
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.testId != null}
                                    helperText={errors.testId ? errors.testId : ""}
                                    id="test-reg_testId"
                                    label="Identifikacioni broj testa"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={testId}
                                    onChange={e => onTestIdChange(e.target.value)}
                                />
                            </Stack>
                            <Stack className="input">
                                <InputLabel id="test-reg_institution-dropdown-label">Institucija</InputLabel>
                                <Select
                                    error={errors.institution != null}
                                    labelId="test-reg_institution-dropdown-label"
                                    id="test-reg_institution-dropdown"
                                    variant="outlined"
                                    value={selectedInstitution}
                                    onChange={e => onInstitutionChange(e.target.value)}

                                >
                                    <MenuItem key="0" value="0">Odaberi instituciju</MenuItem>
                                    {listInstitutions}
                                </Select>
                            </Stack>

                            <Stack className="send-button">
                                <Button
                                    id="test-reg_send-button"
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