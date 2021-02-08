DROP DATABASE IF EXISTS iot;

CREATE DATABASE IF NOT EXISTS iot;

USE iot;

CREATE TABLE IF NOT EXISTS probe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    probeName VARCHAR(100) NOT NULL,
    ip VARCHAR(100) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS reading (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    probeId INT NOT NULL,
    temperature INT NOT NULL,
    humiditie INT NOT NULL,
    readingDate DATETIME
)

-- CREATE TABLE IF NOT EXISTS temperatures (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     probeId INT NOT NULL,
--     reading FLOAT NOT NULL,
--     readingDate DATETIME 
-- );

-- CREATE TABLE IF NOT EXISTS humidities (
--     id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     probeId INT NOT NULL,
--     reading FLOAT NOT NULL,
--     readingDate DATETIME
-- );