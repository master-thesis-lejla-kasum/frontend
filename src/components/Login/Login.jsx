import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Login.css"
import theme from "../../theme/theme";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";
import authService from "../../service/authService";
import getUserFromToken from "../../util/getUserFromToken";


const Login = ({ authBaseUrl }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

    }, [error])

    function login() {
        const request = {
            email: email,
            password: password
        }

        authService.login(authBaseUrl, request)
            .then(response => {
                document.cookie = "token=" + response.data.token + "; path=/; max-age=6000;";
                var roles = getUserFromToken().roles;
                localStorage.userRoles = roles;
                console.log(roles);
                if (roles.some(role => role.authority === "Admin")) {
                    window.location.href = "/admin/institution"
                }
                setError("");

            })
            .catch(error => {
                setError("Neispravni podaci za prijavu")
            })
    }

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <Navbar />
                </Stack>

                <div className="wrapper">
                    <div className="form-wrapper">
                        <Stack spacing={3}>
                            <Stack className="title">
                                PRIJAVA
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={error != ""}
                                    id="login_email"
                                    label="Email"
                                    variant="outlined"
                                    type="text"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Stack>

                            <Stack className="input">
                                <TextField
                                    error={error != ""}
                                    helperText={error}
                                    id="login_password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Stack>

                            <Stack>
                                <Stack className="login-button">
                                    <Button
                                        id="login_login-button"
                                        className="button"
                                        variant="contained"
                                        color="success"
                                        onClick={(e) => login()}
                                    >
                                        PRIJAVA
                                    </Button>
                                </Stack>
                                <Stack className="register-button">
                                    <Button
                                        id="login_register-button"
                                        className="button"
                                        variant="outlined"
                                        color="success"
                                        onClick={() => window.location.href = "/register"}
                                    >
                                        REGISTRACIJA
                                    </Button>
                                </Stack>
                            </Stack>

                        </Stack>
                    </div>

                </div>

                <Stack className="footer">
                    <Footer />
                </Stack>
            </Stack>
        </ThemeProvider>
    )
}

export default Login;