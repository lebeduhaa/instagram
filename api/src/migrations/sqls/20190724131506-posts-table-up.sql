CREATE TABLE posts (
  id serial NOT NULL,
  user_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  picture VARCHAR (256),
  created_at DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
