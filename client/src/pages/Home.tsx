import { Box } from "@mui/material"
import Topbar from "../components/Topbar"
import { Column } from "../layout/styles"
import Dashboard from "../components/Dashboard"
import UploadDialog from "../components/UploadDialog"

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Topbar />
      <Column sx={{ py: 6, px: 3, maxWidth: 1200, mx: 'auto', gap: 4 }}>
        <Dashboard />
      </Column>
      <UploadDialog />
    </Box>
  )
}

export default Home