/**
 * DLR (Digital Land Records) API
 * 
 * This module handles communication with the DLR API for rural property records.
 */

// Mock data for development/testing
const mockData = [
  {
    landId: 'DLR-001',
    khataHolder: 'Ramesh Kumar',
    landAddress: 'Survey No. 123, Village Hoskote, Bangalore Rural, Karnataka',
    landArea: '2 acres',
    landValue: '₹1,20,00,000',
    khasraNumber: 'KA-BLR-123-456-789',
    registrationDate: '2021-08-15',
    tehsil: 'Hoskote Tehsil Office',
    encumbrances: [
      {
        type: 'Agricultural Loan',
        holder: 'Karnataka Gramin Bank',
        amount: '₹15,00,000',
        date: '2021-09-10'
      }
    ],
    landRevenue: '₹5,000 per annum',
    lastMutationDate: '2021-08-20',
    documentType: 'Inheritance',
    landDescription: 'Agricultural land with water source'
  },
  {
    landId: 'DLR-002',
    khataHolder: 'Suresh Singh',
    landAddress: 'Khasra No. 456, Village Manesar, Gurgaon, Haryana',
    landArea: '5 acres',
    landValue: '₹5,50,00,000',
    khasraNumber: 'HR-GGN-456-789-012',
    registrationDate: '2020-05-22',
    tehsil: 'Manesar Tehsil Office',
    encumbrances: [],
    landRevenue: '₹12,000 per annum',
    lastMutationDate: '2020-06-15',
    documentType: 'Sale Deed',
    landDescription: 'Agricultural land converted for commercial use'
  }
];

/**
 * Search DLR records
 * 
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Search results
 */
async function search(params) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // In a real implementation, this would make an HTTP request to the DLR API
  console.log('Searching DLR with params:', params);
  
  // Filter mock data based on search parameters
  return mockData.filter(property => {
    // Filter by owner name if provided
    if (params.ownerName && !property.khataHolder.toLowerCase().includes(params.ownerName.toLowerCase())) {
      return false;
    }
    
    // Filter by state if provided
    if (params.state && !property.landAddress.toLowerCase().includes(params.state.toLowerCase())) {
      return false;
    }
    
    // Filter by district if provided
    if (params.district && !property.landAddress.toLowerCase().includes(params.district.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}

module.exports = {
  search
};