import { Stack, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import theme from "../../theme/theme";

const Footer = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="navbar">
                <Stack alignItems="center">
                    <Typography fontSize="small">
                        Demo page
                    </Typography>

                </Stack>
            </div>
        </ThemeProvider>
    )
}

export default Footer;