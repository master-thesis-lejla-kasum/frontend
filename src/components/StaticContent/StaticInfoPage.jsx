import { Stack, ThemeProvider } from "@mui/material";
import React from "react";
import theme from "../../theme/theme";
import Navbar from "../Navbar/Navbar";
import "./StaticInfoPage.css"


const StaticInfoPage = ({ title, date, content }) => {
    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <Navbar />
                </Stack>

                <div className="wrapper">
                    <div className="form-wrapper">
                        <Stack className="title" direction="row" justifyContent="space-between">
                            <Stack>
                                {title}
                            </Stack>
                            <Stack className="date">
                                {date}
                            </Stack>
                        </Stack>
                        <Stack>
                            {content}
                        </Stack>
                    </div>
                </div>

            </Stack>
        </ThemeProvider>
    )
}

export default StaticInfoPage;