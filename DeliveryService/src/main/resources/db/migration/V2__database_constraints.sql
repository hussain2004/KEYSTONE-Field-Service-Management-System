CREATE INDEX IF NOT EXISTS idx_work_orders_status
    ON work_orders(status);

CREATE INDEX IF NOT EXISTS idx_work_orders_customer_id
    ON work_orders(customer_id);

CREATE INDEX IF NOT EXISTS idx_work_orders_technician_id
    ON work_orders(technician_id);

CREATE INDEX IF NOT EXISTS idx_work_orders_scheduled_date
    ON work_orders(scheduled_date);

CREATE INDEX IF NOT EXISTS idx_status_history_work_order_id
    ON status_history(work_order_id);