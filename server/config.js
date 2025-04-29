/**
 * Configuration file for the backend
 */

module.exports = {
  // API endpoints (mock for now)
  endpoints: {
    doris: 'https://api.doris.gov.in/v1',
    dlr: 'https://api.dlr.gov.in/v1',
    cersai: 'https://api.cersai.org/v1',
    mca21: 'https://api.mca21.gov.in/v1'
  },
  
  // API keys (would be in .env file in production)
  apiKeys: {
    doris: 'mock-api-key',
    dlr: 'mock-api-key',
    cersai: 'mock-api-key',
    mca21: 'mock-api-key'
  },
  
  // Timeout settings
  timeouts: {
    default: 5000, // 5 seconds
    extended: 10000 // 10 seconds
  }
};