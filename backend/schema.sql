-- PostgreSQL Schema Definition for DuitSense

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    google_uid VARCHAR(255) UNIQUE,
    persona_type VARCHAR(100),
    week_xp INTEGER DEFAULT 0,
    streak_count INTEGER DEFAULT 0,
    last_activity_date DATE,
    festive_mode BOOLEAN DEFAULT FALSE,
    opt_in_peer_data BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    note TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    xp_reward INTEGER DEFAULT 20,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'failed'
    fail_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Squads table
CREATE TABLE IF NOT EXISTS squads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    streak_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Squad Members mapping table
CREATE TABLE IF NOT EXISTS squad_members (
    squad_id INTEGER REFERENCES squads(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- 'leader', 'member'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (squad_id, user_id)
);

-- Leaderboard History (snapshots per week)
CREATE TABLE IF NOT EXISTS leaderboard_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    total_xp INTEGER NOT NULL,
    rank INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reward Logs
CREATE TABLE IF NOT EXISTS reward_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reward_type VARCHAR(100) NOT NULL,
    reward_value VARCHAR(255),
    claimed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_expenses_user_date ON expenses(user_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_users_xp ON users(week_xp DESC);
