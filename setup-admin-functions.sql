-- Skapa admin_users tabell om den inte finns
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aktivera RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Skapa policy för admin_users (endast autentiserade användare kan läsa)
CREATE POLICY "Admin users can read own data" ON admin_users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Funktion för att verifiera admin-lösenord
CREATE OR REPLACE FUNCTION verify_admin_password(user_email TEXT, user_password TEXT)
RETURNS TABLE(
  user_id UUID,
  user_name TEXT,
  user_role TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stored_hash TEXT;
  user_record RECORD;
BEGIN
  -- Hämta användardata
  SELECT id, name, password_hash, role, is_active
  INTO user_record
  FROM admin_users 
  WHERE email = user_email AND is_active = true;
  
  -- Kontrollera om användaren finns
  IF NOT FOUND THEN
    RETURN;
  END IF;
  
  -- Kontrollera lösenord (enkelt för demo - använd bcrypt i produktion)
  IF user_record.password_hash = crypt(user_password, user_record.password_hash) THEN
    -- Returnera användardata
    user_id := user_record.id;
    user_name := user_record.name;
    user_role := user_record.role;
    RETURN NEXT;
  END IF;
  
  RETURN;
END;
$$;

-- Funktion för att uppdatera last_login
CREATE OR REPLACE FUNCTION update_admin_last_login(user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE admin_users 
  SET last_login = NOW(), updated_at = NOW()
  WHERE id = user_id;
END;
$$;

-- Skapa en test-admin-användare (lösenord: admin123)
INSERT INTO admin_users (email, name, password_hash, role) 
VALUES (
  'admin@skaply.se', 
  'Admin User', 
  crypt('admin123', gen_salt('bf')), 
  'super_admin'
) ON CONFLICT (email) DO NOTHING;

-- Ge public access till funktionerna
GRANT EXECUTE ON FUNCTION verify_admin_password(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_admin_last_login(UUID) TO anon, authenticated; 