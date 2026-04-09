/*
  # Create behavioral data table for FocusMap AI chatbot

  ## Summary
  Creates a table to store user behavioral data (screen time, focus, distractions, mood, sleep, productivity)
  that the AI chatbot uses to generate personalized insights.

  ## New Tables
  - `behavioral_data`
    - `id` (uuid, primary key)
    - `user_id` (uuid, references auth.users)
    - `date` (date) - the day this data was recorded
    - `screen_time_hours` (numeric) - total screen time in hours
    - `focus_time_hours` (numeric) - focused/productive time in hours
    - `distraction_count` (integer) - number of distraction events
    - `mood` (text) - user mood: great, good, neutral, tired, stressed
    - `sleep_hours` (numeric) - hours of sleep the prior night
    - `app_usage_category` (text) - dominant app category: social, productivity, entertainment, communication
    - `productivity_score` (integer) - 0-100 productivity score

  ## Security
  - RLS enabled
  - Authenticated users can only read their own data
  - Service role can insert sample data
*/

CREATE TABLE IF NOT EXISTS behavioral_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  screen_time_hours numeric(4,2) NOT NULL DEFAULT 0,
  focus_time_hours numeric(4,2) NOT NULL DEFAULT 0,
  distraction_count integer NOT NULL DEFAULT 0,
  mood text NOT NULL DEFAULT 'neutral' CHECK (mood IN ('great', 'good', 'neutral', 'tired', 'stressed')),
  sleep_hours numeric(4,2) NOT NULL DEFAULT 7,
  app_usage_category text NOT NULL DEFAULT 'productivity' CHECK (app_usage_category IN ('social', 'productivity', 'entertainment', 'communication', 'mixed')),
  productivity_score integer NOT NULL DEFAULT 50 CHECK (productivity_score >= 0 AND productivity_score <= 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE behavioral_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own behavioral data"
  ON behavioral_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own behavioral data"
  ON behavioral_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own behavioral data"
  ON behavioral_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS behavioral_data_user_id_idx ON behavioral_data(user_id);
CREATE INDEX IF NOT EXISTS behavioral_data_date_idx ON behavioral_data(date);
CREATE UNIQUE INDEX IF NOT EXISTS behavioral_data_user_date_idx ON behavioral_data(user_id, date);

/*
  Also create a sample_behavioral_data table for the demo dataset
  that doesn't require auth - readable by all authenticated users
  to power the chatbot demo experience.
*/
CREATE TABLE IF NOT EXISTS sample_behavioral_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_label text NOT NULL,
  date date NOT NULL,
  screen_time_hours numeric(4,2) NOT NULL DEFAULT 0,
  focus_time_hours numeric(4,2) NOT NULL DEFAULT 0,
  distraction_count integer NOT NULL DEFAULT 0,
  mood text NOT NULL DEFAULT 'neutral',
  sleep_hours numeric(4,2) NOT NULL DEFAULT 7,
  app_usage_category text NOT NULL DEFAULT 'productivity',
  productivity_score integer NOT NULL DEFAULT 50,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sample_behavioral_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read sample data"
  ON sample_behavioral_data FOR SELECT
  TO authenticated
  USING (true);
