import { Button, Card, CardActions, CardContent, Grid, InputLabel, MenuItem, Pagination, Select, Stack, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import theme from "../../theme/theme";
import Footer from "../Navbar/Footer";
import Navbar from "../Navbar/Navbar";
import articleService from "../../service/articleService";
import locationData from "../../util/locationData";
import "./Info.css"



const Info = ({ covidBaseUrl }) => {

    const [articles, setArticles] = useState([]);
    const [total, setTotal] = useState([]);
    const [params, setParams] = useState({
        pageNumber: 0,
        pageSize: 6,
        entity: "",
        canton: ""
    });

    useEffect(() => {
        console.log(params)
        articleService.search(covidBaseUrl, params)
            .then(res => {
                setArticles(res.data)
            })
            .catch(err => {
                console.log(err);
            })

        articleService.getTotal(covidBaseUrl, params)
            .then(res => {
                setTotal(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [params])

    function handlePageChange(event, value) {
        setParams(prevState => ({
            ...prevState,
            ["pageNumber"]: value - 1
        })
        )
    }

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

    const listArticles = articles.map((row, i) =>
        <Grid item xs={4}>
            <Card key={row.id} sx={{ minWidth: 300, maxWidth: 300 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {new Date(row.date).toDateString()}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {row.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {row.institution.entity + (row.institution.canton != null ? ", " + row.institution.canton : "")}
                    </Typography>
                    <Typography variant="body2">
                        {row.content.slice(0, 100) + "..."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => window.location.href = "/info/" + row.id}>Čitaj više</Button>
                </CardActions>
            </Card>
        </Grid>
    );

    const listEntities = locationData.map((entity) =>
        <MenuItem key={entity.value} value={entity.value}>{entity.label}</MenuItem>
    )

    function getCantons() {
        return locationData.find(entity => entity.value === "FBIH").cantons;
    }

    const listCantons = params.entity === "FBIH" && getCantons().map((canton) =>
        <MenuItem key={canton.value} value={canton.value}>{canton.label}</MenuItem>
    )

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={10}>
                <Stack>
                    <Stack>
                        <Navbar />
                    </Stack>
                </Stack>

                <Stack className="home_wrapper">
                    <Stack spacing={5}>
                        <Stack className="article-filters" direction="row" justifyContent="center" spacing={5}>
                            <Stack style={{ minWidth: 300 }}>
                                <InputLabel className="article_select-label" id="article_entity-dropdown-label">Entitet</InputLabel>
                                <Select
                                    labelId="article_entity-dropdown-label"
                                    id="article_entity-dropdown-"
                                    variant="outlined"
                                    value={params.entity}
                                    onChange={e => onSelectedEntityChange(e.target.value)}

                                >
                                    <MenuItem key="" value="">Odaberi entitet</MenuItem>
                                    {listEntities}
                                </Select>
                            </Stack>

                            <Stack style={{ minWidth: 300 }}>
                                <InputLabel className="article_select-label" id="article_canton-dropdown-label">Kanton</InputLabel>
                                <Select
                                    labelId="article_canton-dropdown-label"
                                    id="article_canton-dropdown-"
                                    variant="outlined"
                                    value={params.canton}
                                    onChange={e => onSelectedCantonChange(e.target.value)}

                                >
                                    <MenuItem key="" value="">Odaberi kanton - samo za FBIH</MenuItem>
                                    {listCantons}
                                </Select>
                            </Stack>
                        </Stack>

                        <Stack>
                            <Grid container spacing={10} justifyContent="center">
                                {listArticles}
                            </Grid>
                        </Stack>

                        <Stack className="pagination" alignItems="center">
                            <Pagination
                                count={Math.ceil(total / params.pageSize)}
                                page={params.pageNumber + 1}
                                onChange={handlePageChange}
                            />
                        </Stack>
                    </Stack>
                </Stack>

                <Stack>
                    <Footer />
                </Stack>

            </Stack>
        </ThemeProvider >
    )
}

export default Info;