USE iot;

ALTER TABLE
    readings
ADD
    (
        FOREIGN KEY (probeId) REFERENCES probes(id)
    );