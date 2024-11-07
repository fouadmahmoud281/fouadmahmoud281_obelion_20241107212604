CREATE TABLE searches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  query VARCHAR(255) NOT NULL,
  suggestion VARCHAR(255) NOT NULL
);

CREATE INDEX idx_query ON searches(query);

CREATE INDEX idx_suggestion ON searches(suggestion);
