DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR(255),
    string_phone_number VARCHAR(255)
)
