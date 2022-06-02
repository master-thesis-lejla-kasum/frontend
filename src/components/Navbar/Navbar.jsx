import React, { useEffect } from "react";
import { Button, Stack, ThemeProvider } from '@mui/material';
import theme from "../../theme/theme";
import "./Navbar.css"
import { Coronavirus } from "@mui/icons-material";

const Navbar = () => {

    useEffect(() => {
        console.log('Navbar');
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <div className="navbar">
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" justifyContent="center">
                        <div>
                            <Coronavirus fontSize="large" color="white" />
                        </div>
                    </Stack>
                    <Stack direction="row" spacing={3} justifyContent="space-between">
                        <Stack direction="row">
                            <Button color="white" onClick={() => window.location.href = "/"}>POČETNA</Button>
                            <Button color="white">O PORTALU</Button>
                            <Button color="white">ŠTA JE COVID-19?</Button>
                            <Button color="white">MJERE I PREPORUKE</Button>
                            <Button color="white">STATISTIKA</Button>
                        </Stack>
                        <Stack direction="row">
                            <Button color="white">Login</Button>
                        </Stack>
                    </Stack>
                </Stack>

            </div>
        </ThemeProvider>
    )
}

export default Navbar;