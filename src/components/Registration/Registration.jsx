import { Alert, Button, InputLabel, MenuItem, Select, Snackbar, Stack, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import accountService from "../../service/accountService";
import institutionService from "../../service/institutionService";
import theme from "../../theme/theme";
import locationData from "../../util/locationData";
import { emptyOrNull, validEmail } from "../../util/validationUtils";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";
import "./Registration.css"

const Registration = ({ authBaseUrl }) => {

    const [name, setName] = useState("");
    const [identificationNumber, setIdentificationNumber] = useState("");
    const [selectedEntity, setSelectedEntity] = useState("0");
    const [selectedCanton, setSelectedCanton] = useState("0");
    const [selectedMunicipality, setSelectedMunicipality] = useState("0");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [personName, setPersonName] = useState("");
    const [personSurname, setPersonSurname] = useState("");
    const [personEmail, setPersonEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [showToast, setShowtToast] = useState(false);
    const [toastVariant, setToasVariant] = useState("success");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {

    }, [errors])



    function onNameChange(value) {
        delete errors.name;
        setName(value);
    }

    function onIdentificationNumberChange(value) {
        delete errors.identificationNumber;
        setIdentificationNumber(value);
    }

    function onSelectedEntityChange(value) {
        delete errors.entity;
        setSelectedEntity(value);
    }

    function onSelectedCantonChange(value) {
        delete errors.canton;
        setSelectedCanton(value);
    }

    function onSelectedMunicipalityChange(value) {
        delete errors.municipality;
        setSelectedMunicipality(value);
    }

    function onAddressChange(value) {
        delete errors.address;
        setAddress(value);
    }

    function onPhoneNumberChange(value) {
        delete errors.phoneNumber;
        setPhoneNumber(value);
    }

    function onPersonNameChange(value) {
        delete errors.personName;
        setPersonName(value);
    }

    function onPersonSurnameChange(value) {
        delete errors.personSurname;
        setPersonSurname(value);
    }

    function onPersonEmailChange(value) {
        delete errors.email;
        setPersonEmail(value);
    }

    function onPasswordChange(value) {
        delete errors.password;
        setPassword(value);
    }

    function onRepeatedPasswordChange(value) {
        delete errors.repeatedPassword;
        setRepeatedPassword(value);
    }

    function validate() {
        var err = {}
        var valid = true;

        if (emptyOrNull(name)) {
            err.name = "Ime mora biti uneseno"
        }

        if (emptyOrNull(identificationNumber)) {
            err.identificationNumber = "Identifikacijski broj mora biti unesen"
        }

        if (selectedEntity === "0") {
            err.entity = "Entitet mora biti odabran"
        }

        if (selectedEntity === "FBIH" && selectedCanton === "0") {
            err.canton = "Kanton mora biti odabran"
        }

        if (selectedMunicipality === "0") {
            err.municipality = "Opština mora biti odabrana"
        }

        if (emptyOrNull(address)) {
            err.address = "Adresa mora biti unesena"
        }

        if (emptyOrNull(phoneNumber)) {
            err.phoneNumber = "Broj telefona mora biti unesen"
        }

        if (emptyOrNull(personName)) {
            err.personName = "Ime ovlaštene osobe mora biti uneseno"
        }

        if (emptyOrNull(personSurname)) {
            err.personSurname = "Prezime ovlaštene osobe mora biti uneseno"
        }

        if (!validEmail(personEmail)) {
            err.personEmail = "Email ovlaštene osobe mora biti unesen"
        }

        if (emptyOrNull(password)) {
            err.password = "Password mora biti unesen"
        }

        if (password != repeatedPassword) {
            err.repeatedPassword = "Passwordi se ne poklapaju"
        }

        if (Object.keys(err).length > 0) {
            valid = false;
        }

        setErrors(err)

        return valid;
    }

    function clearForm() {
        setName("");
        setIdentificationNumber("");
        setSelectedEntity("0");
        setSelectedCanton("0");
        setSelectedMunicipality("0");
        setAddress("");
        setPhoneNumber("");
        setPersonName("");
        setPersonSurname("");
        setPersonEmail("");
        setPassword("");
        setRepeatedPassword("");
    }

    function register() {
        if (!validate()) {
            return;
        }

        const accountRequest = {
            name: personName,
            surname: personSurname,
            email: personEmail,
            password: password
        }

        accountService.createAccount(authBaseUrl, accountRequest)
            .then(response => {
                const institutionRequest = {
                    identificationNumber: identificationNumber,
                    name: name,
                    entity: selectedEntity,
                    canton: selectedCanton != "0" ? selectedCanton : null,
                    municipality: selectedMunicipality,
                    address: address,
                    phoneNumber: phoneNumber,
                    account: {
                        id: response.data.id
                    }
                }

                institutionService.createInstitution(authBaseUrl, institutionRequest)
                    .then(response => {
                        setShowtToast(true);
                        setToasVariant("success");
                        setToastMessage("Prijava je uspješno poslana")
                        clearForm();

                    })
                    .catch(error => {
                        console.log(error);
                        setShowtToast(true);
                        setToasVariant("error");
                        setToastMessage("Nešto je pošlo po zlu, molimo pokušajte kasnije")
                    })
            })
            .catch(error => {
                console.log(error)
                setShowtToast(true);
                setToasVariant("error");
                setToastMessage("Nešto je pošlo po zlu, molimo pokušajte kasnije")
            })
    }

    const listEntities = locationData.map((entity) =>
        <MenuItem key={entity.value} value={entity.value}>{entity.label}</MenuItem>
    )

    function getCantons() {
        return locationData.find(entity => entity.value === "FBIH").cantons;
    }

    const listCantons = selectedEntity === "FBIH" && getCantons().map((canton) =>
        <MenuItem key={canton.value} value={canton.value}>{canton.label}</MenuItem>
    )

    function getMunicipalities() {
        switch (selectedEntity) {
            case "FBIH":
                return selectedCanton != 0 ? getCantons().find(canton => canton.value === selectedCanton).municipalities : [];
            case "RS":
                return locationData.find(entity => entity.value === "RS").municipalities;
            case "BD":
                return locationData.find(entity => entity.value === "BD").municipalities;
            default:
                return [];
        }
    }

    const listMunicipalities = getMunicipalities().map((municipality) =>
        <MenuItem key={municipality.value} value={municipality.value}>{municipality.label}</MenuItem>
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
                                REGISTRACIJA INSTITUCIJA
                            </Stack>
                            <Stack className="input">
                                <TextField
                                    error={errors.name != null}
                                    helperText={errors.name ? errors.name : ""}
                                    id="reg_name"
                                    label="Naziv institucije"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => onNameChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={errors.identificationNumber != null}
                                    helperText={errors.identificationNumber ? errors.identificationNumber : ""}
                                    id="reg_identificationNumber"
                                    label="Identifikacijski broj institucije"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={identificationNumber}
                                    onChange={e => onIdentificationNumberChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <InputLabel id="reg_entity-dropdown-label">Entitet</InputLabel>
                                <Select
                                    error={errors.entity != null}
                                    labelId="reg_entity-dropdown-label"
                                    id="reg_entity-dropdown-"
                                    variant="outlined"
                                    value={selectedEntity}
                                    onChange={e => onSelectedEntityChange(e.target.value)}

                                >
                                    <MenuItem key="0" value="0">Odaberi entitet</MenuItem>
                                    {listEntities}
                                </Select>
                            </Stack>

                            <Stack className="input">
                                <InputLabel id="reg_canton-dropdown-label">Kanton</InputLabel>
                                <Select
                                    error={errors.canton != null}
                                    labelId="reg_canton-dropdown-label"
                                    id="reg_canton-dropdown-"
                                    variant="outlined"
                                    value={selectedCanton}
                                    onChange={e => onSelectedCantonChange(e.target.value)}

                                >
                                    <MenuItem key="0" value="0">Odaberi kanton - samo za FBIH</MenuItem>
                                    {listCantons}
                                </Select>
                            </Stack>

                            <Stack className="input">
                                <InputLabel id="reg_municipality-dropdown-label">Opština</InputLabel>
                                <Select
                                    error={errors.municipality != null}
                                    labelId="reg_municipality-dropdown-label"
                                    id="reg_municipality-dropdown-"
                                    variant="outlined"
                                    value={selectedMunicipality}
                                    onChange={e => onSelectedMunicipalityChange(e.target.value)}

                                >
                                    <MenuItem key="0" value="0">Odaberi opštinu</MenuItem>
                                    {listMunicipalities}
                                </Select>
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={errors.address != null}
                                    helperText={errors.address ? errors.address : ""}
                                    id="reg_address"
                                    label="Adresa"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={address}
                                    onChange={e => onAddressChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={errors.phoneNumber != null}
                                    helperText={errors.phoneNumber ? errors.phoneNumber : ""}
                                    id="reg_phoneNumber"
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
                                    error={errors.personName != null}
                                    helperText={errors.personName ? errors.personName : ""}
                                    id="reg_personName"
                                    label="Ime ovlaštene osobe"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={personName}
                                    onChange={e => onPersonNameChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={errors.personSurname != null}
                                    helperText={errors.personSurname ? errors.personSurname : ""}
                                    id="reg_personSurname"
                                    label="Prezime ovlaštene osobe"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={personSurname}
                                    onChange={e => onPersonSurnameChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={errors.personEmail != null}
                                    helperText={errors.personEmail ? errors.personEmail : ""}
                                    id="reg_personEmail"
                                    label="Email ovlaštene osobe"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={personEmail}
                                    onChange={e => onPersonEmailChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={errors.password != null}
                                    helperText={errors.password ? errors.password : ""}
                                    id="reg_password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => onPasswordChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={errors.repeatedPassword != null}
                                    helperText={errors.repeatedPassword ? errors.repeatedPassword : ""}
                                    id="reg_repeatedPassword"
                                    label="Ponovite password"
                                    variant="outlined"
                                    type="password"
                                    required
                                    value={repeatedPassword}
                                    onChange={e => onRepeatedPasswordChange(e.target.value)}
                                />
                            </Stack>

                            <Stack className="send-button">
                                <Button
                                    id="vacc-reg_send-button"
                                    className="button"
                                    variant="contained"
                                    color="success"
                                    onClick={(e) => register()}
                                >
                                    REGISTRACIJA
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
};

export default Registration;