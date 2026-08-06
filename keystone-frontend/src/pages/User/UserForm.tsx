import {
  Box,
  Grid,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";

import type { User } from "../../types/user";

interface UserFormProps {
  user: User;
  onChange: (user: User) => void;
}

function UserForm({
  user,
  onChange,
}: UserFormProps) {

  return (
    <Box sx={{ mt: 1 }}>

      <Grid
        container
        spacing={2}
      >

        <Grid size={{ xs: 12 }}>

          <TextField
            fullWidth
            label="Name"
            value={user.name}
            onChange={(e) =>
              onChange({
                ...user,
                name: e.target.value,
              })
            }
          />

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            fullWidth
            type="email"
            label="Email"
            value={user.email}
            onChange={(e) =>
              onChange({
                ...user,
                email: e.target.value,
              })
            }
          />

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            fullWidth
            type="password"
            label="Password"
            helperText="Leave blank to keep the current password when editing."
            value={user.password}
            onChange={(e) =>
              onChange({
                ...user,
                password: e.target.value,
              })
            }
          />

        </Grid>

        <Grid size={{ xs: 12 }}>

          <TextField
            select
            fullWidth
            label="Role"
            value={user.role}
            onChange={(e) =>
              onChange({
                ...user,
                role: e.target.value as User["role"],
              })
            }
          >
            <MenuItem value="ADMIN">
              ADMIN
            </MenuItem>

            <MenuItem value="ENGINEER">
              ENGINEER
            </MenuItem>

            <MenuItem value="CUSTOMER">
              CUSTOMER
            </MenuItem>

          </TextField>

        </Grid>

        <Grid size={{ xs: 12 }}>

          <FormControlLabel
            control={
              <Switch
                checked={user.active}
                onChange={(e) =>
                  onChange({
                    ...user,
                    active: e.target.checked,
                  })
                }
              />
            }
            label="Active User"
          />

        </Grid>

      </Grid>

    </Box>
  );
}

export default UserForm;