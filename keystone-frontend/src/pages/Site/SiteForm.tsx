import {
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import type { Site } from "../../types/site";
import type { Customer } from "../../types/customer";

interface SiteFormProps {
  site: Site;
  customers: Customer[];
  onChange: (site: Site) => void;
}

function SiteForm({
  site,
  customers,
  onChange,
}: SiteFormProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Site Name"
          value={site.siteName}
          onChange={(e) =>
            onChange({ ...site, siteName: e.target.value })
          }
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          select
          fullWidth
          label="Customer"
          value={site.customerId}
          onChange={(e) =>
            onChange({
              ...site,
              customerId: Number(e.target.value),
            })
          }
        >
          {customers.map((customer) => (
            <MenuItem
              key={customer.id}
              value={customer.id}
            >
              {customer.customerName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Address"
          value={site.address}
          onChange={(e) =>
            onChange({
              ...site,
              address: e.target.value,
            })
          }
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          label="City"
          value={site.city}
          onChange={(e) =>
            onChange({
              ...site,
              city: e.target.value,
            })
          }
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          label="State"
          value={site.state}
          onChange={(e) =>
            onChange({
              ...site,
              state: e.target.value,
            })
          }
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          label="Country"
          value={site.country}
          onChange={(e) =>
            onChange({
              ...site,
              country: e.target.value,
            })
          }
        />
      </Grid>

      <Grid size={{ xs: 6 }}>
        <TextField
          fullWidth
          label="Postal Code"
          value={site.postalCode}
          onChange={(e) =>
            onChange({
              ...site,
              postalCode: e.target.value,
            })
          }
        />
      </Grid>

    </Grid>
  );
}

export default SiteForm;