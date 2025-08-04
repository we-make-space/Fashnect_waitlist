-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow anonymous inserts" ON waitlist
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON waitlist
  FOR ALL 
  TO service_role 
  USING (true);

CREATE POLICY "Allow authenticated users to read" ON waitlist
  FOR SELECT 
  TO authenticated 
  USING (true);
