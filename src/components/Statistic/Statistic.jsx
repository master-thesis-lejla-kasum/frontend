import { Stack, ThemeProvider, MenuItem, InputLabel, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Statistic.css";
import theme from "../../theme/theme";
import Navbar from "../Navbar/Navbar";
import Footer from "../Navbar/Footer";
import statisticService from "../../service/statisticService";
import locationData from "../../util/locationData";

import CanvasJSReact from '../../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Statistic = ({ covidBaseUrl }) => {

    const [params, setParams] = useState({
        entity: "",
        canton: "",
        municipality: "",
        startDate: "",
        endDate: ""
    });

    const [stat, setStat] = useState([]);

    useEffect(() => {
        statisticService.getStatistic(covidBaseUrl, params)
            .then(res => {
                setStat(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [params]);

    function onSelectedEntityChange(value) {
        setParams(prevState => ({
            ...prevState,
            ["entity"]: value,
            ["canton"]: ""
        })
        )
    }

    function onSelectedCantonChange(value) {
        setParams(prevState => ({
            ...prevState,
            ["canton"]: value
        })
        )
    }

    function onSelectedMunicipality(value) {
        setParams(prevState => ({
            ...prevState,
            ["municipality"]: value
        })
        )
    }

    function onParamsChange(name, value) {
        setParams(prevState => ({
            ...prevState,
            [name]: value
        })
        )
    }

    const listEntities = locationData.map((entity) =>
        <MenuItem key={entity.value} value={entity.value}>{entity.label}</MenuItem>
    )

    function getCantons() {
        return locationData.find(entity => entity.value === "FBIH").cantons;
    }

    const listCantons = params.entity === "FBIH" && getCantons().map((canton) =>
        <MenuItem key={canton.value} value={canton.value}>{canton.label}</MenuItem>
    )

    function getFBIHMunicipalities() {
        var municipalities = [];
        const cantons = getCantons();
        for (var i = 0; i < cantons.length; i++) {
            cantons[i].municipalities.forEach(m => municipalities.push(m));
        }
        return municipalities;
    }

    function getRSMunicipalities() {
        return locationData.find(entity => entity.value === "RS").municipalities;
    }

    function getBDMunicipalities() {
        return locationData.find(entity => entity.value === "BD").municipalities;
    }

    function getMunicipalities() {
        switch (params.entity) {
            case "RS":
                return getRSMunicipalities();
            case "BD":
                return getBDMunicipalities();
            case "FBIH":
                const cantons = getCantons();
                if (params.canton === "") {
                    return getFBIHMunicipalities();
                }
                else {
                    return cantons.find(canton => canton.value === params.canton).municipalities;
                }
            default:
                var municipalities = [];
                getFBIHMunicipalities().forEach(m => municipalities.push(m));
                getBDMunicipalities().forEach(m => municipalities.push(m));
                getRSMunicipalities().forEach(m => municipalities.push(m));
                return municipalities;
        }
    }

    const listMunicipalities = getMunicipalities().map((municipality) =>
        <MenuItem key={municipality.value} value={municipality.label}>{municipality.label}</MenuItem>
    )

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    function getDisplayDate(date) {
        return new Date(date).toISOString().split('T')[0];
    }

    function getMainGraphOptions() {
        var positiveDataPoints = [];
        var recoveredDataPoints = [];
        var deathDataPoints = [];

        for (var i = 0; i < stat.length; i++) {
            positiveDataPoints.push(
                { label: getDisplayDate(stat[i].date), y: stat[i].positiveCases },
            )

            recoveredDataPoints.push(
                { label: getDisplayDate(stat[i].date), y: stat[i].recoverCases },
            )

            deathDataPoints.push(
                { label: getDisplayDate(stat[i].date), y: stat[i].deathCases },
            )
        }

        const data = [
            {
                type: "column",
                name: "Broj pozitivnih slučajeva",
                showInLegend: true,
                yValueFormatString: "#,##0.# Units",
                dataPoints: positiveDataPoints
            },
            {
                type: "column",
                name: "Broj oporavljenih slučajeva",
                showInLegend: true,
                yValueFormatString: "#,##0.# Units",
                dataPoints: recoveredDataPoints
            },
            {
                type: "column",
                name: "Broj smrtnih slučajeva",
                showInLegend: true,
                yValueFormatString: "#,##0.#",
                dataPoints: deathDataPoints
            }
        ]

        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Odnos pozitivnih oporavljenih i smrtnih slučajeva"
            },
            axisX: {
                title: "Vrsta slučaja"
            },
            axisY: {
                title: "Broj slučajeva",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC",
                includeZero: true
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: data
        }

        return options;

    }

    function getSecondaryGraphOptions() {
        var hospitalizedDataPoints = [];
        var vaccinatedDataPoints = [];

        for (var i = 0; i < stat.length; i++) {
            hospitalizedDataPoints.push(
                { x: new Date(stat[i].date), y: stat[i].hospitalizedCases },
            )

            vaccinatedDataPoints.push(
                { x: new Date(stat[i].date), y: stat[i].vaccinatedCases },
            )
        }

        const data = [
            {
                type: "spline",
                name: "Hospitalizirani slučajevi",
                showInLegend: true,
                yValueFormatString: "#,##0.#",
                dataPoints: hospitalizedDataPoints
            },
            {
                type: "spline",
                name: "Vakcinisani na dan",
                showInLegend: true,
                yValueFormatString: "#,##0.#",
                dataPoints: vaccinatedDataPoints
            }
        ]

        const options = {
            animationEnabled: true,
            title: {
                text: "Dnevni odnos hospitaliziranih i vakcinisanih"
            },
            axisY: {
                title: "Broj slučajeva"
            },
            legend: {
                cursor: "pointer",
                fontSize: 16,
                itemclick: toggleDataSeries
            },
            toolTip: {
                shared: true
            },
            data: data
        }

        return options;

    }

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <Navbar />
                </Stack>

                <Stack className="statistic_page-wrapper" spacing={10}>
                    <Stack className="statistic_page-filters" spacing={5}>
                        <Stack direction="row" spacing={5}>
                            <Stack style={{ minWidth: 300 }}>
                                <InputLabel className="statistic_page-select-label" id="stat_entity-dropdown-label">Entitet</InputLabel>
                                <Select
                                    labelId="stat_entity-dropdown-label"
                                    id="stat_entity-dropdown-"
                                    variant="outlined"
                                    value={params.entity}
                                    onChange={e => onSelectedEntityChange(e.target.value)}

                                >
                                    <MenuItem key="" value="">Odaberi entitet</MenuItem>
                                    {listEntities}
                                </Select>
                            </Stack>

                            <Stack style={{ minWidth: 300 }}>
                                <InputLabel className="statistic_page-select-label" id="stat_canton-dropdown-label">Kanton</InputLabel>
                                <Select
                                    labelId="stat_canton-dropdown-label"
                                    id="stat_canton-dropdown-"
                                    variant="outlined"
                                    value={params.canton}
                                    onChange={e => onSelectedCantonChange(e.target.value)}

                                >
                                    <MenuItem key="" value="">Odaberi kanton - samo za FBIH</MenuItem>
                                    {listCantons}
                                </Select>
                            </Stack>

                            <Stack style={{ minWidth: 300 }}>
                                <InputLabel className="statistic_page-select-label" id="stat_municipality-dropdown-label">Opština</InputLabel>
                                <Select
                                    labelId="stat_municipality-dropdown-label"
                                    id="stat_municipality-dropdown-"
                                    variant="outlined"
                                    value={params.municipality}
                                    onChange={e => onSelectedMunicipality(e.target.value)}

                                >
                                    <MenuItem key="" value="">Odaberi opštinu</MenuItem>
                                    {listMunicipalities}
                                </Select>
                            </Stack>
                        </Stack>
                        <Stack direction="row" spacing={5}>
                            <Stack style={{ minWidth: 300 }}>
                                <TextField
                                    id="stat_startDate"
                                    label="Od"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={params.startDate}
                                    onChange={e => onParamsChange("startDate", e.target.value)}

                                />
                            </Stack>

                            <Stack style={{ minWidth: 300 }}>
                                <TextField
                                    id="stat_endDate"
                                    label="Do"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={params.endDate}
                                    onChange={e => onParamsChange("endDate", e.target.value)}

                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack>
                        <CanvasJSChart options={getMainGraphOptions()}
                        />
                    </Stack>

                    <Stack>
                        <CanvasJSChart options={getSecondaryGraphOptions()}
                        />
                    </Stack>
                </Stack>

                <Stack>
                    <Footer />
                </Stack>

            </Stack>
        </ThemeProvider>
    )
}

export default Statistic;