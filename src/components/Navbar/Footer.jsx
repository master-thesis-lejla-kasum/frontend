import { Stack, ThemeProvider, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <ThemeProvider>
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