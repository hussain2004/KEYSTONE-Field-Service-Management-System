import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getAllSites } from "../../api/siteApi";
import { getAllTechnicians } from "../../api/technicianApi";

import type { Site } from "../../types/site";
import type { Technician } from "../../types/technician";
import type { WorkOrder } from "../../types/workOrder";

interface WorkOrderFormProps {
  workOrder: WorkOrder;
  onChange: (workOrder: WorkOrder) => void;
}

function WorkOrderForm({
  workOrder,
  onChange,
}: WorkOrderFormProps) {

  const [sites, setSites] = useState<Site[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const siteData = await getAllSites();
      const technicianData = await getAllTechnicians();

      setSites(siteData);
      setTechnicians(technicianData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Grid container spacing={2}>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Title"
            value={workOrder.title}
            onChange={(e) =>
              onChange({
                ...workOrder,
                title: e.target.value,
              })
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={workOrder.description}
            onChange={(e) =>
              onChange({
                ...workOrder,
                description: e.target.value,
              })
            }
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            select
            fullWidth
            label="Priority"
            value={workOrder.priority}
            onChange={(e) =>
              onChange({
                ...workOrder,
                priority: e.target.value,
              })
            }
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            select
            fullWidth
            label="Status"
            value={workOrder.status}
            onChange={(e) =>
              onChange({
                ...workOrder,
                status: e.target.value,
              })
            }
          >
           <MenuItem value="OPEN">Open</MenuItem>
<MenuItem value="ASSIGNED">Assigned</MenuItem>
<MenuItem value="IN_PROGRESS">In Progress</MenuItem>
<MenuItem value="ON_HOLD">On Hold</MenuItem>
<MenuItem value="COMPLETED">Completed</MenuItem>
<MenuItem value="CLOSED">Closed</MenuItem>
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            type="date"
            label="Scheduled Date"
            InputLabelProps={{ shrink: true }}
            value={workOrder.scheduledDate}
            onChange={(e) =>
              onChange({
                ...workOrder,
                scheduledDate: e.target.value,
              })
            }
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
  <TextField
    fullWidth
    type="datetime-local"
    label="Start Time"
    InputLabelProps={{ shrink: true }}
    value={workOrder.startTime}
    onChange={(e) =>
      onChange({
        ...workOrder,
        startTime: e.target.value,
      })
    }
  />
</Grid>
<Grid size={{ xs: 6 }}>
  <TextField
    fullWidth
    type="datetime-local"
    label="End Time"
    InputLabelProps={{ shrink: true }}
    value={workOrder.endTime}
    onChange={(e) =>
      onChange({
        ...workOrder,
        endTime: e.target.value,
      })
    }
  />
</Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            select
            fullWidth
            label="Site"
            value={workOrder.siteId}
            onChange={(e) => {
              const siteId = Number(e.target.value);

              const selectedSite = sites.find(
                (site) => site.id === siteId
              );

              onChange({
                ...workOrder,
                siteId,
                customerId: selectedSite?.customerId ?? 0,
              });
            }}
          >
            {sites.map((site) => (
              <MenuItem
                key={site.id}
                value={site.id}
              >
                {site.siteName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            select
            fullWidth
            label="Technician"
            value={workOrder.technicianId}
            onChange={(e) =>
              onChange({
                ...workOrder,
                technicianId: Number(e.target.value),
              })
            }
          >
            {technicians.map((technician) => (
              <MenuItem
                key={technician.id}
                value={technician.id}
              >
                {technician.technicianName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

      </Grid>
    </Box>
  );
}

export default WorkOrderForm;