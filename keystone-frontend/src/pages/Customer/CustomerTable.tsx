import { useEffect, useMemo, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllCustomers } from "../../api/customerApi";
import type { Customer } from "../../types/customer";

interface CustomerTableProps {
  refresh: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

function CustomerTable({
  refresh,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, [refresh]);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Failed to load customers", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const keyword = search.toLowerCase();

      return (
        customer.customerName.toLowerCase().includes(keyword) ||
        customer.companyName.toLowerCase().includes(keyword) ||
        customer.email.toLowerCase().includes(keyword) ||
        customer.phoneNumber.includes(keyword)
      );
    });
  }, [customers, search]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        p: 3,
        border: "1px solid #E5E7EB",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Customer List
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Total Customers: {filteredCustomers.length}
          </Typography>
        </Box>

        <TextField
          placeholder="Search customers..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: 300,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table>

          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#F8FAFC",
              }}
            >
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Customer Name</b></TableCell>
              <TableCell><b>Company</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  hover
                  sx={{
                    transition: "0.2s",

                    "&:hover": {
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                >
                  <TableCell>{customer.id}</TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {customer.customerName}
                  </TableCell>

                  <TableCell>{customer.companyName}</TableCell>

                  <TableCell>{customer.email}</TableCell>

                  <TableCell>{customer.phoneNumber}</TableCell>

                  <TableCell>
                    <Chip
                      label={customer.active ? "Active" : "Inactive"}
                      color={customer.active ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(customer)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => onDelete(customer)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>
              ))
            )}

          </TableBody>

        </Table>
      </TableContainer>

    </Paper>
  );
}

export default CustomerTable;