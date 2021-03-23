import {makeStyles} from "@material-ui/core/styles";

export const useHttpErrorStyles = makeStyles((theme) => ({
    container: {
        fontSize: "3rem",
        marginTop: 60,
        [theme.breakpoints.down('xs')]: {
            fontSize: "2rem",
        }
    },
    fixedContainer: {
        fontSize: "3rem",
        position: "absolute",
        top: 200
    },
    body: {
        background: "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(0, 0, 0, 1) 100%)",
        padding: 100,
        color: 'white',
        [theme.breakpoints.down('xs')]: {
            padding: 20,
        }
    },
}));