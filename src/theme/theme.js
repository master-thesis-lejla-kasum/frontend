import { createTheme } from "@mui/material";
import { primary, secondary, info, white } from "./colors.js";

const theme = createTheme({
    palette: {
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
        },
        info: {
            main: info
        },
        white: {
            main: white
        }

    },
});

export default theme;