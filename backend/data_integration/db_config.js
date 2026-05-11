const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'duitsense',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Helper to run queries (Mocked)
const query = async (text, params) => {
  console.log('Skipping real DB, returning mock query data...', text);
  return {
    rowCount: 1,
    rows: [{
      current_time: new Date(),
      category: 'Food',
      median_percentage: '35.00'
    },
    {
      category: 'Transport',
      median_percentage: '15.00'
    }]
  };
};

// Mock pool object for anything using pool directly
const mockPool = {
  query: query
};

module.exports = {
  query,
  pool: mockPool,
};
