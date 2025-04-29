/**
 * DLR (Digital Land Records) API Connector
 * This is a mock implementation as the real API is not available
 */

const axios = require('axios');
const config = require('../../config');

// Mock data for DLR
const mockDlrData = [
  {
    id: 'DLR-12345',
    ownerName: 'Rajesh Kumar',
    address: 'Haripur Village, Dehradun',
    surveyNumber: 'KH123',
    landArea: '2.5 hectares',
    landUse: 'Agricultural',
    marketValue: '₹ 85,00,000',
    recordUpdatedDate: '2021-11-30',
    propertyType: 'rural',
    encumbrances: [
      {
        type: 'Lien',
        holder: 'Agricultural Development Bank',
        amount: '₹ 20,00,000',
        date: '2022-01-15'
      }
    ],
    landClassification: 'Irrigated',
    soilType: 'Alluvial',
    waterSource: 'Canal Irrigation'
  },
  {
    id: 'DLR-67890',
    ownerName: 'Suresh Patel',
    address: 'Plot 45, Sector 12, Gandhinagar',
    surveyNumber: 'CS456',
    landArea: '2500 sq ft',
    landUse: 'Residential',
    marketValue: '₹ 1,25,00,000',
    recordUpdatedDate: '2022-03-15',
    propertyType: 'urban',
    encumbrances: [],
    landClassification: 'Residential Plot',
    soilType: 'N/A',
    waterSource: 'Municipal Supply'
  },
  {
    id: 'DLR-24680',
    ownerName: 'Meena Kumari',
    address: 'Rampur Village, Jaipur',
    surveyNumber: 'KH789',
    landArea: '1.8 hectares',
    landUse: 'Agricultural',
    marketValue: '₹ 65,00,000',
    recordUpdatedDate: '2022-05-20',
    propertyType: 'rural',
    encumbrances: [
      {
        type: 'Mortgage',
        holder: 'Gramin Bank',
        amount: '₹ 15,00,000',
        date: '2022-06-10'
      }
    ],
    landClassification: 'Partially Irrigated',
    soilType: 'Red Soil',
    waterSource: 'Well'
  }
];

/**
 * Search for land records in DLR
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Array of matching land records
 */
const search = async (params) => {
  try {
    // In a real implementation, this would make an API call to DLR
    // For now, we'll simulate a network delay and return mock data
    console.log('Searching DLR with params:', params);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter mock data based on search parameters
    let results = [...mockDlrData];
    
    if (params.ownerName) {
      results = results.filter(record => 
        record.ownerName.toLowerCase().includes(params.ownerName.toLowerCase())
      );
    }
    
    if (params.propertyID) {
      results = results.filter(record => 
        record.id.includes(params.propertyID) || 
        record.surveyNumber.includes(params.propertyID)
      );
    }
    
    if (params.surveyNumber) {
      results = results.filter(record => 
        record.surveyNumber.includes(params.surveyNumber)
      );
    }
    
    if (params.searchType) {
      results = results.filter(record => 
        record.propertyType === params.searchType
      );
    }
    
    if (params.village) {
      results = results.filter(record => 
        record.address.toLowerCase().includes(params.village.toLowerCase())
      );
    }
    
    // Add a unique timestamp to simulate real API behavior
    const timestamp = new Date().toISOString();
    
    return {
      source: 'DLR',
      timestamp,
      count: results.length,
      results
    };
  } catch (error) {
    console.error('Error searching DLR:', error);
    throw new Error(`DLR search failed: ${error.message}`);
  }
};

module.exports = {
  search
};