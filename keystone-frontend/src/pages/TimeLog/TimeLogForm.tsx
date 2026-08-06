import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getAllWorkOrders } from "../../api/workOrderApi";
import { getAllTechnicians } from "../../api/technicianApi";

import type { WorkOrder } from "../../types/workOrder";
import type { Technician } from "../../types/technician";
import type { TimeLog } from "../../types/timeLog";

interface TimeLogFormProps {
  timeLog: TimeLog;
  onChange: (timeLog: TimeLog) => void;
}

function TimeLogForm({
  timeLog,
  onChange,
}: TimeLogFormProps) {

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const workOrderData = await getAllWorkOrders();
      const technicianData = await getAllTechnicians();

      setWorkOrders(workOrderData);
      setTechnicians(technicianData);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ mt: 1 }}>

      <Grid
        container
        spacing={2}
      >

        <Grid size={{ xs: 12 }}>

          <TextField
            select
            fullWidth
            label="Work Order"
            value={timeLog.workOrderId}
            onChange={(e) =>
              onChange({
                ...timeLog,
                workOrderId: Number(e.target.value),
              })
            }
          >
            {workOrders.map((workOrder) => (
              <MenuItem
                key={workOrder.id}
                value={workOrder.id}
              >
                {workOrder.title}
              </MenuItem>
            ))}
          </TextField>

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            select
            fullWidth
            label="Technician"
            value={timeLog.technicianId}
            onChange={(e) =>
              onChange({
                ...timeLog,
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

        <Grid size={{ xs: 6 }}>

          <TextField
            fullWidth
            type="datetime-local"
            label="Start Time"
            value={timeLog.startTime}
            onChange={(e) =>
              onChange({
                ...timeLog,
                startTime: e.target.value,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

        </Grid>

        <Grid size={{ xs: 6 }}>

          <TextField
            fullWidth
            type="datetime-local"
            label="End Time"
            value={timeLog.endTime}
            onChange={(e) =>
              onChange({
                ...timeLog,
                endTime: e.target.value,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            fullWidth
            type="number"
            label="Hours Worked"
            value={timeLog.hoursWorked}
            onChange={(e) =>
              onChange({
                ...timeLog,
                hoursWorked: Number(e.target.value),
              })
            }
          />

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Remarks"
            value={timeLog.remarks}
            onChange={(e) =>
              onChange({
                ...timeLog,
                remarks: e.target.value,
              })
            }
          />

        </Grid>

      </Grid>

    </Box>
  );
}

export default TimeLogForm;