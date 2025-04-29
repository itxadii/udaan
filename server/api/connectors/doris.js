/**
 * DORIS (Digital Online Registration Information System) API Connector
 * This is a mock implementation as the real API is not available
 */

const axios = require('axios');
const config = require('../../config');

// Mock data for DORIS
const mockDorisData = [
  {
    id: 'DORIS-12345',
    ownerName: 'Rajesh Kumar',
    address: '123 MG Road, Bangalore',
    registrationNumber: 'REG123456',
    registrationDate: '2022-06-01',
    propertyType: 'urban',
    area: '1200 sq ft',
    marketValue: '₹ 75,00,000',
    encumbrances: [
      {
        type: 'Mortgage',
        holder: 'HDFC Bank Ltd.',
        amount: '₹ 50,00,000',
        date: '2022-06-01'
      }
    ],
    propertyTax: '₹ 15,000 per annum',
    lastTransactionDate: '2022-06-01'
  },
  {
    id: 'DORIS-67890',
    ownerName: 'Priya Singh',
    address: '456 Church Street, Bangalore',
    registrationNumber: 'REG789012',
    registrationDate: '2021-12-10',
    propertyType: 'urban',
    area: '1800 sq ft',
    marketValue: '₹ 1,20,00,000',
    encumbrances: [
      {
        type: 'Mortgage',
        holder: 'ICICI Bank Ltd.',
        amount: '₹ 80,00,000',
        date: '2021-12-10'
      }
    ],
    propertyTax: '₹ 24,000 per annum',
    lastTransactionDate: '2021-12-10'
  },
  {
    id: 'DORIS-24680',
    ownerName: 'Suresh Patel',
    address: 'Plot 45, Sector 12, Gandhinagar',
    registrationNumber: 'REG345678',
    registrationDate: '2022-03-20',
    propertyType: 'urban',
    area: '2500 sq ft',
    marketValue: '₹ 1,25,00,000',
    encumbrances: [],
    propertyTax: '₹ 25,000 per annum',
    lastTransactionDate: '2022-03-20'
  }
];

/**
 * Search for property records in DORIS
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Array of matching property records
 */
const search = async (params) => {
  try {
    // In a real implementation, this would make an API call to DORIS
    // For now, we'll simulate a network delay and return mock data
    console.log('Searching DORIS with params:', params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter mock data based on search parameters
    let results = [...mockDorisData];
    
    if (params.ownerName) {
      results = results.filter(record => 
        record.ownerName.toLowerCase().includes(params.ownerName.toLowerCase())
      );
    }
    
    if (params.propertyID) {
      results = results.filter(record => 
        record.id.includes(params.propertyID) || 
        record.registrationNumber.includes(params.propertyID)
      );
    }
    
    if (params.registrationNumber) {
      results = results.filter(record => 
        record.registrationNumber.includes(params.registrationNumber)
      );
    }
    
    if (params.searchType) {
      results = results.filter(record => 
        record.propertyType === params.searchType
      );
    }
    
    if (params.streetAddress) {
      results = results.filter(record => 
        record.address.toLowerCase().includes(params.streetAddress.toLowerCase())
      );
    }
    
    // Add a unique timestamp to simulate real API behavior
    const timestamp = new Date().toISOString();
    
    return {
      source: 'DORIS',
      timestamp,
      count: results.length,
      results
    };
  } catch (error) {
    console.error('Error searching DORIS:', error);
    throw new Error(`DORIS search failed: ${error.message}`);
  }
};

module.exports = {
  search
};