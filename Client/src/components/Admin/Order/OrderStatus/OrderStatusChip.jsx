import React from "react";
import { Chip } from "@mui/material";

const statusColors = {
  Pending: "default",
  "In Progress": "primary",
  Completed: "success",
  Canceled: "error",
};

const OrderStatusChip = ({ status }) => {
  return (
    <Chip
      label={status}
      color={statusColors[status] || "default"}
      size="small"
    />
  );
};

export default OrderStatusChip;
