ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_gallery TEXT[] DEFAULT '{}';
