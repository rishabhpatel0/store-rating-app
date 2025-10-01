CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(255)NOT NULL,
	role VARCHAR(20) CHECK(role in ('admin','store_owner','user'))NOT NULL 
);

CREATE TABLE stores(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	owner_id INT REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE rating(
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	store_id INT REFERENCES stores(id) ON DELETE CASCADE,
	rating INT CHECK (rating >=1 AND rating<=5)
);