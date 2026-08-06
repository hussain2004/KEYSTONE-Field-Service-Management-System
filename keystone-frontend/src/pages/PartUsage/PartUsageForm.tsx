import {
  Box,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getAllWorkOrders } from "../../api/workOrderApi";
import { getAllParts } from "../../api/partApi";

import type { WorkOrder } from "../../types/workOrder";
import type { Part } from "../../types/part";
import type { PartUsage } from "../../types/partUsage";

interface PartUsageFormProps {
  partUsage: PartUsage;
  onChange: (partUsage: PartUsage) => void;
}

function PartUsageForm({
  partUsage,
  onChange,
}: PartUsageFormProps) {

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const workOrderData = await getAllWorkOrders();
      const partData = await getAllParts();

      setWorkOrders(workOrderData);
      setParts(partData);

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
            value={partUsage.workOrderId}
            onChange={(e) =>
              onChange({
                ...partUsage,
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
            label="Part"
            value={partUsage.partId}
            onChange={(e) =>
              onChange({
                ...partUsage,
                partId: Number(e.target.value),
              })
            }
          >
            {parts.map((part) => (
              <MenuItem
                key={part.id}
                value={part.id}
              >
                {part.partName}
              </MenuItem>
            ))}
          </TextField>

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            fullWidth
            type="number"
            label="Quantity Used"
            value={partUsage.quantityUsed}
            onChange={(e) =>
              onChange({
                ...partUsage,
                quantityUsed: Number(e.target.value),
              })
            }
          />

        </Grid>

      </Grid>

    </Box>
  );
}

export default PartUsageForm;