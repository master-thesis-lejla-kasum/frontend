import { ThemeProvider } from "@emotion/react";
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CovidNavbar from "../Navbar/CovidNavbar";
import Footer from "../Navbar/Footer";
import theme from "../../theme/theme";
import "./Covid.css"
import { emptyOrNull } from "../../util/validationUtils";
import getUserFromToken from "../../util/getUserFromToken";
import articleService from "../../service/articleService";
import getToken from "../../util/getToken";


const CovidArticleForm = ({ covidBaseUrl }) => {

    const [article, setArticle] = useState({ title: "", content: "" });
    const [errors, setErrors] = useState({});

    const [showToast, setShowtToast] = useState(false);
    const [toastVariant, setToasVariant] = useState("success");
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {

    }, [])

    function handleArticleChange(name, value) {

        delete errors[name];

        setArticle(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    function validate() {
        var err = {}
        var valid = true;

        if (emptyOrNull(article.title)) {
            err.title = "Naslov mora biti unesen"
        }

        if (emptyOrNull(article.content)) {
            err.content = "Sadržaj mora biti unesen"
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
        const request = {
            title: article.title,
            date: new Date(),
            content: article.content,
            active: true,
            institution: {
                id: getUserFromToken().institutionId
            }
        }

        articleService.create(covidBaseUrl, request, getToken("token"))
            .then(res => {
                setShowtToast(true);
                setToasVariant("success");
                setToastMessage("Članak uspješno spašen")
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
        setArticle({ ...article, title: "", content: "" });
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
                                UNOS INFO PREPORUKA I MJERA
                            </Stack>
                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.title != null}
                                    helperText={errors.title ? errors.title : ""}
                                    id="info_form-title"
                                    label="Naslov"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={article.title}
                                    onChange={e => handleArticleChange("title", e.target.value)}
                                />
                            </Stack>

                            <Stack className="covid_form-input">
                                <TextField
                                    error={errors.content != null}
                                    helperText={errors.content ? errors.content : ""}
                                    multiline
                                    rows={10}
                                    id="info_form-content"
                                    label="Sadržaj"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={article.content}
                                    onChange={e => handleArticleChange("content", e.target.value)}
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

export default CovidArticleForm;