import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Stack, ThemeProvider } from '@mui/material';
import theme from "../../theme/theme";
import "./Home.css"
import Navbar from "../Navbar/Navbar";
import StatisticSummary from "./StatisticSummary";
import InfoBox from "./InfoBox";
import Footer from "../Navbar/Footer";

const Home = () => {

    const [totalStatistics, setTotalStatistics] = useState([]);
    const [latestStatistics, setLatestStatistics] = useState([]);

    useEffect(() => {
        var totalStat = [
            {
                name: "Ukupno zaraženih",
                count: 1000
            },
            {
                name: "Oporavljeni",
                count: 956
            },
            {
                name: "Preminuli",
                count: 14
            }
        ]

        setTotalStatistics(totalStat);

        var latestStat = [
            {
                name: "Zaraženi",
                count: 45
            },
            {
                name: "Oporavljeni",
                count: 57
            },
            {
                name: "Preminuli",
                count: 0
            }
        ]

        setLatestStatistics(latestStat);

        console.log('Home');
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <div>
                <Stack spacing={10}>
                    <Stack>
                        <Navbar />
                    </Stack>

                    <div className="home_wrapper">
                        <Stack direction="row" justifyContent="space-evenly">
                            <div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={() => window.location.href = "/test-registration"}
                                >
                                    PRIJAVI POZITIVAN TEST
                                </Button>

                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    onClick={() => window.location.href = "/vaccine-registration"}

                                >
                                    PRIJAVA ZA VAKCINACIJU
                                </Button>
                            </div>
                            <div>
                                <Button variant="contained" color="secondary" size="large">TRENUTNE MJERE</Button>
                            </div>
                        </Stack>
                    </div>

                    <div>
                        <Stack className="home_wrapper">
                            <StatisticSummary
                                title={"BOSNA I HERCEGOVINA"}
                                statistics={totalStatistics}
                            />
                        </Stack>
                    </div>

                    <div>
                        <Stack className="home_wrapper">
                            <StatisticSummary
                                title={"POSLJEDNJA 24 SATA"}
                                statistics={latestStatistics}
                            />
                        </Stack>
                    </div>

                    <Stack className="home_wrapper" direction="row" justifyContent="space-evenly">
                        <InfoBox
                            title={"Šta je COVID-19?"}
                            iconType={"virus"}
                            content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                        />
                        <InfoBox
                            title={"COVID-19 testiranje"}
                            iconType={"test"}
                            content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."}

                        />
                        <InfoBox
                            title={"Proces vakcinacije"}
                            iconType={"vaccine"}
                            content={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type."}

                        />
                    </Stack>

                    <Stack>
                        <Footer />
                    </Stack>
                </Stack>
            </div>
        </ThemeProvider >
    )
}

export default Home;