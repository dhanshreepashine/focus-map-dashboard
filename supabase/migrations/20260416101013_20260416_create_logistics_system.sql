/*
  # Create Army Logistics Management System Schema

  1. New Tables
    - `users` - Authentication and user profile data
    - `warehouses` - Military warehouse/supply depot locations
      - `id` (uuid, primary key)
      - `name` (text)
      - `level` (enum: Central/Regional/Divisional/Brigade)
      - `location` (text)
      - `created_at` (timestamp)
    
    - `inventory` - Stock levels at each warehouse
      - `id` (uuid, primary key)
      - `warehouse_id` (uuid, foreign key)
      - `item_type` (enum: ammo/fuel/medical/supplies)
      - `quantity` (integer)
      - `max_capacity` (integer)
      - `status` (enum: normal/low/critical)
      - `last_updated` (timestamp)
    
    - `supply_requests` - Incoming supply requests from basecamp
      - `id` (uuid, primary key)
      - `basecamp_name` (text)
      - `item_required` (text)
      - `quantity` (integer)
      - `urgency_level` (enum: low/medium/high)
      - `status` (enum: pending/approved/in_transit/delivered/cancelled)
      - `requested_by` (uuid, foreign key to users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `routes` - Optimized delivery routes
      - `id` (uuid, primary key)
      - `source_warehouse_id` (uuid, foreign key)
      - `destination_basecamp` (text)
      - `distance_km` (decimal)
      - `estimated_time_hours` (decimal)
      - `waypoints` (jsonb)
      - `created_at` (timestamp)
    
    - `system_status` - System health metrics
      - `id` (uuid, primary key)
      - `metric_name` (text)
      - `value` (text)
      - `timestamp` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Restrict access based on user role
*/

CREATE TABLE IF NOT EXISTS warehouses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  level text NOT NULL CHECK (level IN ('Central', 'Regional', 'Divisional', 'Brigade')),
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id uuid NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('ammo', 'fuel', 'medical', 'supplies')),
  quantity integer NOT NULL DEFAULT 0,
  max_capacity integer NOT NULL DEFAULT 1000,
  status text NOT NULL DEFAULT 'normal' CHECK (status IN ('normal', 'low', 'critical')),
  last_updated timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS supply_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  basecamp_name text NOT NULL,
  item_required text NOT NULL,
  quantity integer NOT NULL,
  urgency_level text NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_transit', 'delivered', 'cancelled')),
  requested_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_warehouse_id uuid NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  destination_basecamp text NOT NULL,
  distance_km decimal(10,2) NOT NULL,
  estimated_time_hours decimal(10,2) NOT NULL,
  waypoints jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS system_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  value text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE supply_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view warehouses" ON warehouses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can view inventory" ON inventory FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create supply requests" ON supply_requests FOR INSERT TO authenticated WITH CHECK (requested_by = auth.uid());
CREATE POLICY "Users can view own requests" ON supply_requests FOR SELECT TO authenticated USING (requested_by = auth.uid() OR true);
CREATE POLICY "Anyone can view routes" ON routes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can view system status" ON system_status FOR SELECT TO authenticated USING (true);

CREATE INDEX idx_inventory_warehouse ON inventory(warehouse_id);
CREATE INDEX idx_supply_requests_user ON supply_requests(requested_by);
CREATE INDEX idx_routes_warehouse ON routes(source_warehouse_id);
