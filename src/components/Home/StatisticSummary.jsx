import { Stack } from "@mui/material";
import React from "react";
import "./Home.css"

const StatisticSummary = ({ title, statistics }) => {

    const listStatistic = statistics.map((stat) =>
        <Stack key={stat.name} className="number-box" alignItems="center" spacing={3}>
            <Stack>
                {stat.name}
            </Stack>
            <Stack>
                {stat.count}
            </Stack>
        </Stack>
    )

    return (
        <div className="statistic_wrapper">
            <Stack spacing={10}>
                <Stack alignItems="center">
                    <h3>
                        {title}
                    </h3>
                </Stack>
                <Stack direction="row" justifyContent="space-evenly">
                    {listStatistic}
                </Stack>
            </Stack>
        </div>
    )
}

export default StatisticSummary;