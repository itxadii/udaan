/**
 * MCA21 (Ministry of Corporate Affairs) API Connector
 * This is a mock implementation as the real API is not available
 */

const axios = require('axios');
const config = require('../../config');

// Mock data for MCA21
const mockMca21Data = [
  {
    id: 'MCA21-12345',
    companyName: 'Sunrise Properties Pvt Ltd',
    cinNumber: 'U70100KA2015PTC080123',
    registeredAddress: '123 MG Road, Bangalore',
    incorporationDate: '2015-05-20',
    authorizedCapital: '₹ 1,00,00,000',
    paidUpCapital: '₹ 75,00,000',
    directors: [
      {
        name: 'Rajesh Kumar',
        din: '01234567',
        designation: 'Managing Director'
      },
      {
        name: 'Priya Singh',
        din: '07654321',
        designation: 'Director'
      }
    ],
    propertyHoldings: [
      {
        propertyID: 'DORIS-12345',
        address: '123 MG Road, Bangalore',
        type: 'Commercial Office',
        area: '5000 sq ft',
        acquisitionDate: '2018-06-15',
        marketValue: '₹ 3,50,00,000'
      },
      {
        propertyID: 'DLR-67890',
        address: 'Plot 45, Sector 12, Gandhinagar',
        type: 'Land',
        area: '2500 sq ft',
        acquisitionDate: '2019-03-10',
        marketValue: '₹ 1,25,00,000'
      }
    ],
    encumbrances: [
      {
        type: 'Charge',
        chargeID: 'CH12345',
        holder: 'HDFC Bank Ltd.',
        amount: '₹ 2,00,00,000',
        creationDate: '2020-01-15',
        propertyID: 'DORIS-12345'
      }
    ]
  },
  {
    id: 'MCA21-67890',
    companyName: 'Golden Estates Ltd',
    cinNumber: 'L70100MH2010PLC123456',
    registeredAddress: 'Tower A, Bandra Kurla Complex, Mumbai',
    incorporationDate: '2010-11-30',
    authorizedCapital: '₹ 10,00,00,000',
    paidUpCapital: '₹ 8,50,00,000',
    directors: [
      {
        name: 'Vikram Mehta',
        din: '02468135',
        designation: 'Chairman'
      },
      {
        name: 'Sunita Sharma',
        din: '13579246',
        designation: 'Managing Director'
      },
      {
        name: 'Rahul Gupta',
        din: '98765432',
        designation: 'Director'
      }
    ],
    propertyHoldings: [
      {
        propertyID: 'DORIS-67890',
        address: '456 Church Street, Bangalore',
        type: 'Commercial Complex',
        area: '15000 sq ft',
        acquisitionDate: '2015-08-20',
        marketValue: '₹ 12,00,00,000'
      },
      {
        propertyID: 'CERSAI-24680',
        address: 'Plot 45, Sector 12, Gandhinagar',
        type: 'Commercial Land',
        area: '10000 sq ft',
        acquisitionDate: '2017-05-12',
        marketValue: '₹ 5,00,00,000'
      }
    ],
    encumbrances: [
      {
        type: 'Charge',
        chargeID: 'CH67890',
        holder: 'State Bank of India',
        amount: '₹ 8,00,00,000',
        creationDate: '2018-03-25',
        propertyID: 'DORIS-67890'
      },
      {
        type: 'Charge',
        chargeID: 'CH24680',
        holder: 'ICICI Bank Ltd.',
        amount: '₹ 3,50,00,000',
        creationDate: '2019-07-10',
        propertyID: 'CERSAI-24680'
      }
    ]
  }
];

/**
 * Search for company property records in MCA21
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Array of matching company property records
 */
const search = async (params) => {
  try {
    // In a real implementation, this would make an API call to MCA21
    // For now, we'll simulate a network delay and return mock data
    console.log('Searching MCA21 with params:', params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Filter mock data based on search parameters
    let results = [...mockMca21Data];
    
    if (params.companyName) {
      results = results.filter(record => 
        record.companyName.toLowerCase().includes(params.companyName.toLowerCase())
      );
    }
    
    if (params.cinNumber) {
      results = results.filter(record => 
        record.cinNumber.includes(params.cinNumber)
      );
    }
    
    if (params.directorName) {
      results = results.filter(record => 
        record.directors.some(director => 
          director.name.toLowerCase().includes(params.directorName.toLowerCase())
        )
      );
    }
    
    if (params.propertyID) {
      results = results.filter(record => 
        record.propertyHoldings.some(property => 
          property.propertyID.includes(params.propertyID)
        )
      );
    }
    
    // Add a unique timestamp to simulate real API behavior
    const timestamp = new Date().toISOString();
    
    return {
      source: 'MCA21',
      timestamp,
      count: results.length,
      results
    };
  } catch (error) {
    console.error('Error searching MCA21:', error);
    throw new Error(`MCA21 search failed: ${error.message}`);
  }
};

module.exports = {
  search
};