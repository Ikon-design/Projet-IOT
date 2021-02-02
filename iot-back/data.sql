INSERT INTO
    probe (probeName, ip, latitude, longitude)
VALUES
    (
        "Cesi",
        "192.168.97.3",
        49.382557146451425,
        1.0751502628327172
    ),
    (
        "Vernon",
        "192.168.97.4",
        49.08863817264291,
        1.4859040557468701
    ),
    (
        "Siege",
        "192.168.97.5",
        49,
        1.09111455575894
    );

INSERT INTO
    temperatures (probeId, reading, readingDate)
VALUES
    (1, 45.2, NOW()),
    (2, 25.2, NOW());

INSERT INTO
    humidities (probeId, reading, readingDate)
VALUES
    (1, 23.2, NOW()),
    (2, 43.2, NOW());