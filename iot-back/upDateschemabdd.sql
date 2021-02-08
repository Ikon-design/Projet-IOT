USE iot;

ALTER TABLE
    reading
ADD
    (
        FOREIGN KEY (probeId) REFERENCES probe(id)
    );

-- ALTER TABLE
--     humidities
-- ADD
--     (
--         FOREIGN KEY (probeId) REFERENCES probe(id)
--     );