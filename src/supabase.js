import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ntslooqofuhhkttmgtni.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50c2xvb3FvZnVoaGt0dG1ndG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYyODQ3MjAsImV4cCI6MTk5MTg2MDcyMH0.Uo1xuDiZcMJ_ObNWQ-MhZOfhHt6eaNhOBjzigZGJh2s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
