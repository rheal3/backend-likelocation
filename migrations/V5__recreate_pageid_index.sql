DROP INDEX IF EXISTS likes__pageid;

CREATE UNIQUE INDEX IF NOT EXISTS likes__user_id_page_id ON likes (
    user_id,
    page_id
);