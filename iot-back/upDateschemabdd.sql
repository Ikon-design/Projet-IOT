USE iot;

ALTER TABLE
    temperatures
ADD
    (
        FOREIGN KEY (probeId) REFERENCES probe(id)
    );

ALTER TABLE
    humidities
ADD
    (
        FOREIGN KEY (probeId) REFERENCES probe(id)
    );