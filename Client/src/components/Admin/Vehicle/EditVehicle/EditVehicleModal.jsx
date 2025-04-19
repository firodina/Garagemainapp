import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

const EditVehicleModal = ({
  open,
  onClose,
  vehicle,
  vehicleTypes,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    VIN: "",
    vehicle_type_name: "",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year || "",
        VIN: vehicle.VIN || "",
        vehicle_type_name: vehicle.type || "",
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Vehicle
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            name="vehicle_type_name"
            value={formData.vehicle_type_name}
            onChange={handleChange}
            label="Vehicle Type"
          >
            {vehicleTypes.map((type) => (
              <MenuItem
                key={type.vehicle_type_id}
                value={type.vehicle_type_name}
              >
                {type.vehicle_type_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          name="make"
          label="Make"
          value={formData.make}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="model"
          label="Model"
          value={formData.model}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="year"
          label="Year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="VIN"
          label="VIN"
          value={formData.VIN}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => onSave(formData)}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditVehicleModal;
