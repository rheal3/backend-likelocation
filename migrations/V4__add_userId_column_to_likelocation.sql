ALTER TABLE IF EXISTS likes 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES account(id) ON DELETE cascade;

CREATE INDEX IF NOT EXISTS likes__user_id ON likes (
    user_id
);