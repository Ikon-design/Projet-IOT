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
    reading (probeId, temperature, humiditie, readingDate)
VALUES
    (4, 25.2, 23.4, NOW()),
    (4, 45.2, 52.4, NOW()),
    (4, 13.2, 12.4, NOW()),
    (1, 15.2, 24.4, NOW()),
    (2, 34.2, 21.4, NOW()),
    (2, 32.2, 33.4, NOW()),
    (2, 45.2, 27.4, NOW()),
    (3, 25.2, 23.4, NOW()),
    (3, 45.2, 43.4, NOW()),
    (3, 22.2, 23.5, NOW());

-- INSERT INTO
--     temperatures (probeId, reading, readingDate)
-- VALUES
--     (1, 45.2, NOW()),
--     (2, 25.2, NOW());
-- INSERT INTO
--     humidities (probeId, reading, readingDate)
-- VALUES
--     (1, 23.2, NOW()),
--     (2, 43.2, NOW());