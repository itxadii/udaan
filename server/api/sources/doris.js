/**
 * DORIS (Digital Online Registration Information System) API
 * 
 * This module handles communication with the DORIS API for urban property records.
 */

// Mock data for development/testing
const mockData = [
  {
    propertyId: 'DORIS-001',
    ownerName: 'Rahul Sharma',
    propertyAddress: '123 MG Road, Bangalore, Karnataka',
    propertyArea: '1200 sq ft',
    marketValue: '₹85,00,000',
    regNumber: 'BLR-REG-2022-12345',
    regDate: '15/06/2022',
    regOffice: 'Bangalore South Sub-Registrar Office',
    encumbrances: [
      {
        type: 'Mortgage',
        holder: 'State Bank of India',
        amount: '₹50,00,000',
        date: '20/06/2022'
      }
    ],
    propertyTax: '₹15,000 per annum',
    lastTransactionDate: '15/06/2022',
    documentType: 'Sale Deed',
    executionDate: '10/06/2022',
    propertyDescription: 'Residential apartment on 3rd floor'
  },
  {
    propertyId: 'DORIS-002',
    ownerName: 'Priya Patel',
    propertyAddress: '45 Nehru Place, Delhi',
    propertyArea: '1800 sq ft',
    marketValue: '₹1,25,00,000',
    regNumber: 'DEL-REG-2021-78901',
    regDate: '03/11/2021',
    regOffice: 'Delhi South Sub-Registrar Office',
    encumbrances: [],
    propertyTax: '₹22,000 per annum',
    lastTransactionDate: '03/11/2021',
    documentType: 'Sale Deed',
    executionDate: '25/10/2021',
    propertyDescription: 'Commercial shop in market complex'
  }
];

/**
 * Search DORIS records
 * 
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Search results
 */
async function search(params) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, this would make an HTTP request to the DORIS API
  console.log('Searching DORIS with params:', params);
  
  // Filter mock data based on search parameters
  return mockData.filter(property => {
    // Filter by owner name if provided
    if (params.ownerName && !property.ownerName.toLowerCase().includes(params.ownerName.toLowerCase())) {
      return false;
    }
    
    // Filter by state if provided
    if (params.state && !property.propertyAddress.toLowerCase().includes(params.state.toLowerCase())) {
      return false;
    }
    
    // Filter by district if provided
    if (params.district && !property.propertyAddress.toLowerCase().includes(params.district.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}

module.exports = {
  search
};