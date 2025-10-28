import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Topbar = () => {
    return (
        <AppBar position="static" color="primary" elevation={1}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h1" fontWeight="bold" color="inherit">
                        Reconciliation Dashboard
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Topbar;