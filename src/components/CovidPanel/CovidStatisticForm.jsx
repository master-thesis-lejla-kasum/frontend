import { ThemeProvider } from "@emotion/react";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CovidNavbar from "../Navbar/CovidNavbar";
import Footer from "../Navbar/Footer";
import theme from "../../theme/theme";
import "./Covid.css"
import getUserFromToken from "../../util/getUserFromToken";
import statisticService from "../../service/statisticService";
import { emptyOrNull, isNegativeNumber } from "../../util/validationUtils";
import getToken from "../../util/getToken";



const CovidStatisticForm = ({ covidBaseUrl }) => {

    const currentDate = new Date();

    const [statistic, setStatistic] = useState(
        {
            date: currentDate.toISOString().split('T')[0],
            testedCases: 0,
            positiveCases: 0,
            recoverCases: 0,
            deathCases: 0,
            hospitalizedCases: 0,
            vaccinatedCases: 0,
            institution: {
                id: ""
            }
        }
    );
    const [errors, setErrors] = useState({});

    const [showToast, setShowtToast] = useState(false);
    const [toastVariant, setToasVariant] = useState("success");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const institutionId = getUserFromToken().institutionId;
        handleStatisticChange("institution", { id: institutionId })
    }, [])

    function handleStatisticChange(name, value) {

        delete errors[name];

        setStatistic(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    function validate() {
        var err = {}
        var valid = true;

        if (emptyOrNull(statistic.date)) {
            err.date = "Datum mora biti odabran";
        }

        if (isNegativeNumber(statistic.testedCases)) {
            err.testedCases = "Broj mora biti pozitivan";
        }

        if (isNegativeNumber(statistic.positiveCases)) {
            err.positiveCases = "Broj mora biti pozitivan";
        }

        if (isNegativeNumber(statistic.recoverCases)) {
            err.recoverCases = "Broj mora biti pozitivan";
        }

        if (isNegativeNumber(statistic.deathCases)) {
            err.deathCases = "Broj mora biti pozitivan";
        }

        if (isNegativeNumber(statistic.hospitalizedCases)) {
            err.hospitalizedCases = "Broj mora biti pozitivan";
        }

        if (isNegativeNumber(statistic.vaccinatedCases)) {
            err.vaccinatedCases = "Broj mora biti pozitivan";
        }

        if (Object.keys(err).length > 0) {
            valid = false;
        }

        setErrors(err)

        return valid;
    }

    function onSaveClick() {
        if (!validate()) {
            return;
        }

        console.log(statistic)

        statisticService.create(covidBaseUrl, statistic, getToken("token"))
            .then(res => {
                setShowtToast(true);
                setToasVariant("success");
                setToastMessage("Statistika uspješno dodana")
                onDiscardClick();
            })
            .catch(err => {
                console.log(err);
                setShowtToast(true);
                setToasVariant("error");
                setToastMessage("Nešto je pošlo po zlu, molimo pokušajte kasnije")
            })
    }

    function onDiscardClick() {
        setStatistic({
            ...statistic,
            date: currentDate.toISOString().split('T')[0],
            testedCases: 0,
            positiveCases: 0,
            recoverCases: 0,
            deathCases: 0,
            hospitalizedCases: 0,
            vaccinatedCases: 0
        });
        setErrors({})
    }

    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={showToast} autoHideDuration={6000}>
                <Alert variant="filled" severity={toastVariant}>
                    {toastMessage}
                </Alert>
            </Snackbar>

            <Stack spacing={10}>
                <Stack>
                    <CovidNavbar />
                </Stack>

                <Stack className="covid_wrapper">
                    <div className="covid_form-wrapper">
                        <Stack spacing={3}>
                            <Stack className="covid_form-title">
                                UNOS STATISTIKE
                            </Stack>
                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.date != null}
                                    helperText={errors.title ? errors.title : ""}
                                    id="info_form-title"
                                    label="Naslov"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    required
                                    value={statistic.date}
                                    onChange={e => handleStatisticChange("date", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.testedCases != null}
                                    helperText={errors.testedCases ? errors.testedCases : ""}
                                    id="stat_form-testetCases"
                                    label="Broj testiranih osoba"
                                    variant="outlined"
                                    type="number"
                                    required
                                    value={statistic.testedCases}
                                    onChange={e => handleStatisticChange("testedCases", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.positiveCases != null}
                                    helperText={errors.positiveCases ? errors.positiveCases : ""}
                                    id="stat_form-positiveCases"
                                    label="Broj pozitivnih slučajeva"
                                    variant="outlined"
                                    type="number"
                                    required
                                    value={statistic.positiveCases}
                                    onChange={e => handleStatisticChange("positiveCases", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.recoverCases != null}
                                    helperText={errors.recoverCases ? errors.recoverCases : ""}
                                    id="stat_form-recoverCases"
                                    label="Broj oporavljenih slučajeva"
                                    variant="outlined"
                                    type="number"
                                    required
                                    value={statistic.recoverCases}
                                    onChange={e => handleStatisticChange("recoverCases", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.deathCases != null}
                                    helperText={errors.deathCases ? errors.deathCases : ""}
                                    id="stat_form-deathCases"
                                    label="Broj smrtnih slučajeva"
                                    variant="outlined"
                                    type="number"
                                    required
                                    value={statistic.deathCases}
                                    onChange={e => handleStatisticChange("deathCases", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.hospitalizedCases != null}
                                    helperText={errors.hospitalizedCases ? errors.hospitalizedCases : ""}
                                    id="stat_form-hospitalizedCases"
                                    label="Broj hospitaliziranih pacijenata"
                                    variant="outlined"
                                    type="number"
                                    required
                                    value={statistic.hospitalizedCases}
                                    onChange={e => handleStatisticChange("hospitalizedCases", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.vaccinatedCases != null}
                                    helperText={errors.vaccinatedCases ? errors.vaccinatedCases : ""}
                                    id="stat_form-vaccinatedCases"
                                    label="Broj vakcinisanih osoba"
                                    variant="outlined"
                                    type="number"
                                    required
                                    value={statistic.vaccinatedCases}
                                    onChange={e => handleStatisticChange("vaccinatedCases", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input" direction="row" spacing={9} justifyContent="space-between">
                                <Button color="success" variant="contained" onClick={onSaveClick}>Sačuvaj</Button>
                                <Button color="error" variant="outlined" onClick={onDiscardClick}>Poništi</Button>
                            </Stack>
                        </Stack>
                    </div>
                </Stack>

                <Stack>
                    <Footer />
                </Stack>
            </Stack>
        </ThemeProvider>
    )
}

export default CovidStatisticForm;