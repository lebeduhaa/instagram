ALTER TABLE users
ADD status VARCHAR (20) CHECK ( status in ('active', 'requested', 'deleted')) NOT NULL DEFAULT 'active';
