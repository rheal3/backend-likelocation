DROP INDEX IF EXISTS likes__pageid;

CREATE UNIQUE INDEX IF NOT EXISTS likes__pageid ON likes (
    page_id
);