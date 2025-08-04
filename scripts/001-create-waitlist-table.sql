-- Create waitlist table to store email and phone submissions
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the waitlist form)
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Allow service role to read all data
CREATE POLICY "Allow service role full access" ON waitlist
  FOR ALL 
  TO service_role 
  USING (true);

-- Allow authenticated users to read all data (for admin dashboard)
CREATE POLICY "Allow authenticated users to read" ON waitlist
  FOR SELECT 
  TO authenticated 
  USING (true);
