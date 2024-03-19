import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lwgvczftflddoqgoiwaw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3Z3ZjemZ0ZmxkZG9xZ29pd2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MDU0OTcsImV4cCI6MjAyNjM4MTQ5N30.aaec22-AyjMVRD4ggOucB4OWQvFgf7rIf0-t4HOIDi0";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
