import {
  Box,
  Grid,
  TextField,
} from "@mui/material";

import type { Part } from "../../types/part";

interface PartFormProps {
  part: Part;
  onChange: (part: Part) => void;
}

function PartForm({
  part,
  onChange,
}: PartFormProps) {

  return (
    <Box sx={{ mt: 1 }}>

      <Grid container spacing={2}>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Part Name"
            value={part.partName}
            onChange={(e) =>
              onChange({
                ...part,
                partName: e.target.value,
              })
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Part Code"
            value={part.partCode}
            onChange={(e) =>
              onChange({
                ...part,
                partCode: e.target.value,
              })
            }
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Unit Price"
            value={part.unitPrice}
            onChange={(e) =>
              onChange({
                ...part,
                unitPrice: Number(e.target.value),
              })
            }
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Stock Quantity"
            value={part.stockQuantity}
            onChange={(e) =>
              onChange({
                ...part,
                stockQuantity: Number(e.target.value),
              })
            }
          />
        </Grid>

      </Grid>

    </Box>
  );
}

export default PartForm;