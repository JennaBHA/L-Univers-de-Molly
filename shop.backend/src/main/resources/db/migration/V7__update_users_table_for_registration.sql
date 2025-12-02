-- Migration to add firstName, lastName, and phone fields to users table
-- This migration also handles existing data by splitting the 'name' field

-- Step 1: Add new columns
ALTER TABLE users ADD COLUMN first_name VARCHAR(255);
ALTER TABLE users ADD COLUMN last_name VARCHAR(255);
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Step 2: Migrate existing data from 'name' to 'firstName' and 'lastName'
-- Assumes name format is "FirstName LastName" or just "FirstName"
UPDATE users
SET first_name = SUBSTRING_INDEX(name, ' ', 1),
    last_name = IF(LOCATE(' ', name) > 0, SUBSTRING(name, LOCATE(' ', name) + 1), '')
WHERE name IS NOT NULL;

-- Step 3: Drop the old 'name' column
ALTER TABLE users DROP COLUMN name;
