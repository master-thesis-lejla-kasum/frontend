import { Stack, ThemeProvider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articleService from "../../service/articleService";
import theme from "../../theme/theme";
import Navbar from "../Navbar/Navbar";
import "./SingleInfo.css"


const SingleInfo = ({ covidBaseUrl }) => {
    let { id } = useParams();
    const [article, setArticle] = useState({});

    useEffect(() => {
        console.log(id);
        articleService.getById(covidBaseUrl, id)
            .then(res => {
                setArticle(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

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
                                {article.title}
                            </Stack>
                            <Stack className="date">
                                {new Date(article.date).toDateString()}
                            </Stack>
                        </Stack>
                        <Stack>
                            {article.content}
                        </Stack>
                    </div>
                </div>

            </Stack>
        </ThemeProvider>
    )
}

export default SingleInfo;