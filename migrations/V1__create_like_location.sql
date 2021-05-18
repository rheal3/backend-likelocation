CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    page_id TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS likes__pageid ON likes (
    page_id
);