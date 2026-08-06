import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  DialogActions,
} from "@mui/material";

import type { StatusHistory } from "../../types/statusHistory";

interface StatusHistoryDialogProps {
  open: boolean;
  history: StatusHistory[];
  onClose: () => void;
}

function StatusHistoryDialog({
  open,
  history,
  onClose,
}: StatusHistoryDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Status History</DialogTitle>

      <DialogContent>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell><b>Old Status</b></TableCell>
              <TableCell><b>New Status</b></TableCell>
              <TableCell><b>Changed By</b></TableCell>
              <TableCell><b>Changed At</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.oldStatus}</TableCell>
                <TableCell>{item.newStatus}</TableCell>
                <TableCell>{item.changedBy}</TableCell>
                <TableCell>{item.changedAt}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StatusHistoryDialog;