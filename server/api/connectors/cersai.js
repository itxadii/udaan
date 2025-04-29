/**
 * CERSAI (Central Registry of Securitisation Asset Reconstruction and Security Interest) API Connector
 * This is a mock implementation as the real API is not available
 */

const axios = require('axios');
const config = require('../../config');

// Mock data for CERSAI
const mockCersaiData = [
  {
    id: 'CERSAI-12345',
    ownerName: 'Aditya Waghmare',
    address: 'Pune',
    securityInterestType: 'Mortgage',
    lenderName: 'HDFC Bank Ltd.',
    registrationDate: '2022-06-01',
    propertyType: 'urban',
    area: '1200 sq ft',
    marketValue: '₹ 75,00,000',
    assetClassification: 'Immovable Property',
    encumbrances: [
      {
        type: 'Mortgage',
        holder: 'HDFC Bank Ltd.',
        amount: '₹ 50,00,000',
        date: '2022-06-01'
      }
    ],
    securityAmount: '₹ 50,00,000',
    securityPeriod: '15 years',
    interestRate: '8.5%'
  },
  {
    id: 'CERSAI-67890',
    ownerName: 'Priya Singh',
    address: '456 Church Street, Bangalore',
    securityInterestType: 'Hypothecation',
    lenderName: 'ICICI Bank Ltd.',
    registrationDate: '2021-12-10',
    propertyType: 'urban',
    area: '1800 sq ft',
    marketValue: '₹ 1,20,00,000',
    assetClassification: 'Immovable Property',
    encumbrances: [
      {
        type: 'Hypothecation',
        holder: 'ICICI Bank Ltd.',
        amount: '₹ 80,00,000',
        date: '2021-12-10'
      }
    ],
    securityAmount: '₹ 80,00,000',
    securityPeriod: '20 years',
    interestRate: '8.75%'
  },
  {
    id: 'CERSAI-24680',
    ownerName: 'Suresh Patel',
    address: 'Plot 45, Sector 12, Gandhinagar',
    securityInterestType: 'Mortgage',
    lenderName: 'State Bank of India',
    registrationDate: '2022-03-20',
    propertyType: 'urban',
    area: '2500 sq ft',
    marketValue: '₹ 1,25,00,000',
    assetClassification: 'Immovable Property',
    encumbrances: [
      {
        type: 'Mortgage',
        holder: 'State Bank of India',
        amount: '₹ 90,00,000',
        date: '2022-03-20'
      }
    ],
    securityAmount: '₹ 90,00,000',
    securityPeriod: '25 years',
    interestRate: '8.25%'
  }
];

/**
 * Search for security interest records in CERSAI
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Array of matching security interest records
 */
const search = async (params) => {
  try {
    // In a real implementation, this would make an API call to CERSAI
    // For now, we'll simulate a network delay and return mock data
    console.log('Searching CERSAI with params:', params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Filter mock data based on search parameters
    let results = [...mockCersaiData];
    
    if (params.ownerName) {
      results = results.filter(record => 
        record.ownerName.toLowerCase().includes(params.ownerName.toLowerCase())
      );
    }
    
    if (params.propertyID) {
      results = results.filter(record => 
        record.id.includes(params.propertyID)
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
      source: 'CERSAI',
      timestamp,
      count: results.length,
      results
    };
  } catch (error) {
    console.error('Error searching CERSAI:', error);
    throw new Error(`CERSAI search failed: ${error.message}`);
  }
};

module.exports = {
  search
};