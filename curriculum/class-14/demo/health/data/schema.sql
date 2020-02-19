DROP TABLE IF EXISTS health_data;

CREATE TABLE health_data (
  id SERIAL PRIMARY KEY,
  day VARCHAR(10),
  steps INT,
  calories INT,
  sleep_hours INT
);