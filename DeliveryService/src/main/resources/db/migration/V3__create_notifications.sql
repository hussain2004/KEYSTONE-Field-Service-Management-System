CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    technician_id BIGINT NOT NULL,
    work_order_id BIGINT NOT NULL,
    message VARCHAR(500) NOT NULL,
    read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notifications_technician
        FOREIGN KEY (technician_id)
        REFERENCES technicians(id),

    CONSTRAINT fk_notifications_work_order
        FOREIGN KEY (work_order_id)
        REFERENCES work_orders(id)
);

CREATE INDEX idx_notifications_technician_id
    ON notifications(technician_id);

CREATE INDEX idx_notifications_work_order_id
    ON notifications(work_order_id);

CREATE INDEX idx_notifications_created_at
    ON notifications(created_at);