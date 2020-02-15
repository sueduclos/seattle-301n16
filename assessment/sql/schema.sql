DROP TABLE IF EXISTS click_counts;

CREATE TABLE click_counts (
  id SERIAL PRIMARY KEY,
  remote_id VARCHAR(255),
  clicks INT
);
