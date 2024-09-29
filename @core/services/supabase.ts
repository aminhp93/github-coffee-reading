import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";

const supabase = createClient<Database>(
  "https://bnimawsouehpkbipqqvl.supabase.co" as string,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuaW1hd3NvdWVocGtiaXBxcXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM0NDY4MzcsImV4cCI6MTk4OTAyMjgzN30.K_BGIC_TlWbHl07XX94EWxRI_2Om_NKu_PY5pGtG-hk" as string
);

export default supabase;
