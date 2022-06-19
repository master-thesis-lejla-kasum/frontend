import React, { useEffect } from "react";
import { Button, Stack, ThemeProvider } from '@mui/material';
import theme from "../../theme/theme";
import "./Navbar.css"
import { Coronavirus } from "@mui/icons-material";

const AdminNavbar = () => {

    function logout() {
        document.cookie = "token=; path=/; max-age=-99999999;";
        window.location.href = "/";
    }


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
                            <Button color="white" onClick={() => window.location.href = "/admin/institution"}>INSTITUCIJE</Button>
                        </Stack>
                        <Stack direction="row">
                            <Button color="white" onClick={(e) => logout()}>ODJAVA</Button>
                        </Stack>
                    </Stack>
                </Stack>

            </div>
        </ThemeProvider>
    )
}

export default AdminNavbar;