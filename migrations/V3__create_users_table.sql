CREATE TABLE IF NOT EXISTS account (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS account__email ON account (
    email
);
