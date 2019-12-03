DROP TABLE IF EXISTS gifs;

CREATE TABLE IF NOT EXISTS gifs(
	id SERIAL NOT NULL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	public_id VARCHAR(255) NOT NULL,
	size VARCHAR(255) NOT NULL,
	imageUrl VARCHAR(255) NOT NULL,
	createdOn TIMESTAMP NOT NULL,
);