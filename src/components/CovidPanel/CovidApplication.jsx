import { ThemeProvider } from "@emotion/react";
import { Stack } from "@mui/material";
import React from "react";
import CovidNavbar from "../Navbar/CovidNavbar";
import Footer from "../Navbar/Footer";
import theme from "../../theme/theme";
import "./Covid.css"


const CovidApplication = ({ covidBaseUrl }) => {

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <CovidNavbar />
                </Stack>

                <Stack className="covid_wrapper">
                    Lejla je zakon applications
                </Stack>

                <Stack>
                    <Footer />
                </Stack>
            </Stack>
        </ThemeProvider>
    )
}

export default CovidApplication;