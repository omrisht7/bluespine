import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNotification } from '../contexts/NotificationProvider';

const BASE_URL = 'http://localhost:4000';

const UploadDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'claims' | 'invoices' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const notify = useNotification();

  const handleUpload = async () => {
    if (!selectedFile) {
      notify.error('Please select a CSV file to upload.');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const endpoint = dialogType === 'claims' ? '/api/claims' : '/api/invoices';
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      notify.success('Upload successful! Your CSV file has been processed.');
      setSelectedFile(null);
      setUploading(false);
      setOpenDialog(false);
    } catch (error) {
      notify.error('Failed to upload file. Please try again.');
      setUploading(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedFile(null);
    setDialogType(null);
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Upload Menu"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<FileUploadIcon />}
          tooltipTitle="Upload Claims"
          onClick={() => {
            setDialogType('claims');
            setOpenDialog(true);
          }}
        />
        <SpeedDialAction
          icon={<FileUploadIcon />}
          tooltipTitle="Upload Invoices"
          onClick={() => {
            setDialogType('invoices');
            setOpenDialog(true);
          }}
        />
      </SpeedDial>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Upload {dialogType === 'claims' ? 'Claims' : 'Invoices'} CSV
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please select a CSV file to upload {dialogType === 'claims' ? 'claims' : 'invoices'} data.
          </Typography>

          <Box>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ justifyContent: 'flex-start' }}
            >
              Choose File
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </Button>
            {selectedFile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <DescriptionIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {selectedFile.name}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleUpload} 
            variant="contained" 
            disabled={uploading || !selectedFile}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadDialog;