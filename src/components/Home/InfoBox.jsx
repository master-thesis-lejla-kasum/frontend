import React from "react";
import "./Home.css"
import { Stack } from "@mui/material";
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';


const InfoBox = ({ iconType, title, content, onClick }) => {

    const getIcon = (type) => {
        switch (type) {
            case "virus":
                return <div><CoronavirusOutlinedIcon fontSize="large" color="primary" /> </div>
            case "test":
                return <div><BiotechOutlinedIcon fontSize="large" color="primary" /> </div>
            case "vaccine":
                return <div><VaccinesOutlinedIcon fontSize="large" color="primary" /> </div>
        }
    }

    return (
        <div onClick={onClick} className="info-box">
            <Stack>
                <Stack alignItems="center">
                    {getIcon(iconType)}
                </Stack>
                <Stack alignItems="center">
                    <h4>
                        {title}
                    </h4>
                </Stack>
                <Stack>
                    {content}
                </Stack>
            </Stack>
        </div>
    )
}

export default InfoBox;