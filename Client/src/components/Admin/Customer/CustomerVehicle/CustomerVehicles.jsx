import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  TablePagination,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import vehicleService from "../../../../Service/vehicle.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import EditVehicleModal from "../../Vehicle/EditVehicle/EditVehicleModal";

const CustomerVehicles = ({ customerId }) => {
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vehiclesData, typesData] = await Promise.all([
          vehicleService.getVehiclesByCustomerId(token, customerId),
          vehicleService.getAllVehicleTypes(token),
        ]);

        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
        setVehicleTypes(Array.isArray(typesData) ? typesData : []);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (token && customerId) {
      fetchData();
    }
  }, [token, customerId]);

  const handleDelete = async (vehicleId) => {
    try {
      setLoading(true);
      await vehicleService.deleteVehicle(vehicleId, token);
      setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
      setSuccess("Vehicle deleted successfully");
    } catch (err) {
      setError(err.message || "Failed to delete vehicle");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle) => {
    setCurrentVehicle(vehicle);
    setEditModalOpen(true);
  };

  const handleUpdateVehicle = async (formData) => {
    try {
      setUpdating(true);
      const updatedVehicle = await vehicleService.updateVehicle(
        currentVehicle.id,
        formData,
        token
      );

      setVehicles((prev) =>
        prev.map((v) =>
          v.id === currentVehicle.id ? { ...v, ...updatedVehicle } : v
        )
      );
      setSuccess("Vehicle updated successfully");
      setEditModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to update vehicle");
    } finally {
      setUpdating(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* Notification messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          {success}
        </Alert>
      </Snackbar>

      {/* Edit Modal */}
      <EditVehicleModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        vehicle={currentVehicle}
        vehicleTypes={vehicleTypes}
        onSave={handleUpdateVehicle}
        loading={updating}
      />

      {/* Vehicles Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Make</strong>
              </TableCell>
              <TableCell>
                <strong>Model</strong>
              </TableCell>
              <TableCell>
                <strong>Year</strong>
              </TableCell>
              <TableCell>
                <strong>VIN</strong>
              </TableCell>
              <TableCell>
                <strong>Type</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No vehicles found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              vehicles
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.VIN}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(vehicle)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(vehicle.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        {vehicles.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={vehicles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        )}
      </TableContainer>
    </Box>
  );
};

export default CustomerVehicles;
