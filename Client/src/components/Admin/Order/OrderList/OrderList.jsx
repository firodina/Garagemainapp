import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
  Chip,
  Pagination,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import orderService from "../../../../Service/order.service";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const itemsPerPage = 10;

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "in progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAllOrders();
        const normalizedData = data.map((order) => ({
          ...order,
          status: order.status?.toLowerCase(),
        }));
        setOrders(normalizedData);
        setFilteredOrders(normalizedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status?.toLowerCase() === statusFilter?.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const searchTerm = searchQuery?.toLowerCase();
      filtered = filtered.filter((order) => {
        return (
          order.order_id.toString().includes(searchTerm) ||
          (order.first_name + " " + order.last_name)
            ?.toLowerCase()
            .includes(searchTerm) ||
          order.status?.toLowerCase().includes(searchTerm) ||
          order.total_price.toString().includes(searchTerm)
        );
      });
    }

    setFilteredOrders(filtered);
    setPage(1);
  }, [statusFilter, searchQuery, orders]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStatusFilterChange = (event, newValue) => {
    setStatusFilter(newValue);
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // await orderService.deleteOrder(orderToDelete.order_id);
      setOrders(orders.filter((o) => o.order_id !== orderToDelete.order_id));
      setDeleteDialogOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h2" fontWeight="bold">
          Orders
        </Typography>

        <TextField
          variant="outlined"
          size="small"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClearSearch} edge="end">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: "4px",
              backgroundColor: "background.paper",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            },
          }}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              paddingRight: 1,
            },
          }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={statusFilter}
          onChange={handleStatusFilterChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {statusOptions.map((option) => (
            <Tab
              key={option.value}
              label={option.label}
              value={option.value}
              sx={{
                minWidth: "auto",
                px: 2,
                textTransform: "none",
                fontWeight: "medium",
              }}
            />
          ))}
        </Tabs>
      </Box>

      {filteredOrders.length === 0 ? (
        <Typography variant="body1" align="center" mt={4}>
          {searchQuery
            ? "No matching orders found"
            : `No ${
                statusFilter === "all" ? "" : statusFilter + " "
              }orders found`}
        </Typography>
      ) : (
        <>
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <Table aria-label="orders table">
              <TableHead sx={{ backgroundColor: "background.default" }}>
                <TableRow>
                  {[
                    "Order ID",
                    "Customer",
                    "Date",
                    "Amount",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: "bold",
                        py: 2,
                        borderBottom: "none",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentOrders.map((order) => (
                  <TableRow
                    key={order.order_id}
                    hover
                    sx={{ "&:last-child td": { borderBottom: 0 } }}
                  >
                    <TableCell>#{order.order_id}</TableCell>
                    <TableCell>
                      {order.customer?.name ||
                        `${order.first_name} ${order.last_name}`}
                    </TableCell>
                    <TableCell>
                      {new Date(order.order_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {Number(order.total_price).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={
                          order.status === "completed"
                            ? "success"
                            : order.status === "pending"
                            ? "warning"
                            : order.status === "in_progress"
                            ? "info"
                            : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/admin/orders/${order.order_id}`}
                        variant="outlined"
                        size="small"
                        color="primary"
                        sx={{
                          textTransform: "none",
                          borderRadius: "4px",
                          mr: 1,
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{
                          textTransform: "none",
                          borderRadius: "4px",
                        }}
                        onClick={() => handleDeleteClick(order)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                pb: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "4px",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete order #{orderToDelete?.order_id}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderList;
