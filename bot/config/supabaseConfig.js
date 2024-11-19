const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://shsmhklkxtoxnohogjsl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoc21oa2xreHRveG5vaG9nanNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4MzQ1ODEsImV4cCI6MjA0NzQxMDU4MX0.uRsV_sxaokszB-shq-xVK4Ww7T31QVZsgUUc8sVCAPk";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
