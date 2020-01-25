DROP TABLE IF EXISTS shapes;

CREATE TABLE shapes (
    id SERIAL PRIMARY KEY,
    shape TEXT,
    color TEXT
);

INSERT INTO shapes (shape, color)
VALUES ('square', 'red'), ('triangle', 'blue');