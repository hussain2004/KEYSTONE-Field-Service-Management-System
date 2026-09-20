ALTER TABLE notifications
    ADD COLUMN user_id BIGINT;

ALTER TABLE notifications
    ALTER COLUMN technician_id DROP NOT NULL;

ALTER TABLE notifications
    ADD CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES users(id);

CREATE INDEX idx_notifications_user_id
    ON notifications(user_id);

ALTER TABLE notifications
    ADD CONSTRAINT notifications_recipient_check
    CHECK (
        technician_id IS NOT NULL
        OR user_id IS NOT NULL
    );