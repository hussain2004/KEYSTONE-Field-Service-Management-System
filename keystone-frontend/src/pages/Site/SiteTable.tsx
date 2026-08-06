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
  IconButton,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllSites } from "../../api/siteApi";
import type { Site } from "../../types/site";

interface SiteTableProps {
  refresh: boolean;
  onEdit: (site: Site) => void;
  onDelete: (site: Site) => void;
}

function SiteTable({
  refresh,
  onEdit,
  onDelete,
}: SiteTableProps) {

  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSites();
  }, [refresh]);

  const loadSites = async () => {
    try {
      setLoading(true);
      const data = await getAllSites();
      setSites(data);
    } catch (error) {
      console.error("Failed to load sites", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSites = useMemo(() => {
    const keyword = search.toLowerCase();

    return sites.filter((site) =>
      site.siteName.toLowerCase().includes(keyword) ||
      site.city.toLowerCase().includes(keyword) ||
      site.state.toLowerCase().includes(keyword) ||
      site.country.toLowerCase().includes(keyword) ||
      (site.customerName ?? "").toLowerCase().includes(keyword)
    );
  }, [sites, search]);

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
        border: "1px solid #E5E7EB",
        p: 3,
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
            Site List
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Total Sites: {filteredSites.length}
          </Typography>
        </Box>

        <TextField
          placeholder="Search sites..."
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
              <TableCell><b>Site Name</b></TableCell>
              <TableCell><b>City</b></TableCell>
              <TableCell><b>State</b></TableCell>
              <TableCell><b>Country</b></TableCell>
              <TableCell><b>Customer</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {filteredSites.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  No sites found.
                </TableCell>
              </TableRow>
            ) : (
              filteredSites.map((site) => (
                <TableRow
                  key={site.id}
                  hover
                  sx={{
                    transition: "0.2s",

                    "&:hover": {
                      backgroundColor: "#F9FAFB",
                    },
                  }}
                >
                  <TableCell>{site.id}</TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {site.siteName}
                  </TableCell>

                  <TableCell>{site.city}</TableCell>

                  <TableCell>{site.state}</TableCell>

                  <TableCell>{site.country}</TableCell>

                  <TableCell>{site.customerName}</TableCell>

                  <TableCell align="center">

                    <IconButton
                      color="primary"
                      onClick={() => onEdit(site)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => onDelete(site)}
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

export default SiteTable;