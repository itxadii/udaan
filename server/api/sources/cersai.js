/**
 * CERSAI (Central Registry of Securitisation Asset Reconstruction and Security Interest) API
 * 
 * This module handles communication with the CERSAI API for property security interest records.
 */

// Mock data for development/testing
const mockData = [
  {
    assetId: 'CERSAI-001',
    borrowerName: 'Aditya Waghmare',
    assetAddress: 'Flat 301, Sunshine Apartments, Baner Road, Pune, Maharashtra',
    assetArea: '1500 sq ft',
    assetValue: '₹95,00,000',
    securityInterestId: 'SI-PUN-2022-56789',
    registrationDate: '12/04/2022',
    filingOffice: 'Pune CERSAI Registry Office',
    securedCreditorName: 'HDFC Bank Ltd.',
    loanAmount: '₹65,00,000',
    filingDate: '15/04/2022',
    securityType: 'Mortgage',
    executionDate: '10/04/2022',
    assetDescription: 'Residential apartment on 3rd floor with parking',
    assetType: 'residential'
  },
  {
    assetId: 'CERSAI-002',
    borrowerName: 'Sunrise Properties Pvt Ltd',
    assetAddress: 'Plot 78, Industrial Area Phase II, Chandigarh',
    assetArea: '5000 sq ft',
    assetValue: '₹2,50,00,000',
    securityInterestId: 'SI-CHD-2021-34567',
    registrationDate: '22/09/2021',
    filingOffice: 'Chandigarh CERSAI Registry Office',
    securedCreditorName: 'State Bank of India',
    loanAmount: '₹1,80,00,000',
    filingDate: '25/09/2021',
    securityType: 'Hypothecation',
    executionDate: '20/09/2021',
    assetDescription: 'Commercial property with warehouse facilities',
    assetType: 'commercial'
  },
  {
    assetId: 'CERSAI-003',
    borrowerName: 'Ramesh Agarwal',
    assetAddress: 'Survey No. 45, Hoskote Village, Bangalore Rural, Karnataka',
    assetArea: '3 acres',
    assetValue: '₹1,20,00,000',
    securityInterestId: 'SI-BLR-2022-78901',
    registrationDate: '05/02/2022',
    filingOffice: 'Bangalore Rural CERSAI Registry Office',
    securedCreditorName: 'Karnataka Bank Ltd.',
    loanAmount: '₹75,00,000',
    filingDate: '08/02/2022',
    securityType: 'Mortgage',
    executionDate: '01/02/2022',
    assetDescription: 'Agricultural land with borewells and farm house',
    assetType: 'agricultural'
  }
];

/**
 * Search CERSAI records
 * 
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Search results
 */
async function search(params) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real implementation, this would make an HTTP request to the CERSAI API
  console.log('Searching CERSAI with params:', params);
  
  // Filter mock data based on search parameters
  return mockData.filter(property => {
    // Filter by owner/borrower name if provided
    if (params.ownerName && !property.borrowerName.toLowerCase().includes(params.ownerName.toLowerCase())) {
      return false;
    }
    
    // Filter by state if provided
    if (params.state && !property.assetAddress.toLowerCase().includes(params.state.toLowerCase())) {
      return false;
    }
    
    // Filter by district if provided
    if (params.district && !property.assetAddress.toLowerCase().includes(params.district.toLowerCase())) {
      return false;
    }
    
    // Filter by security interest ID if provided
    if (params.registrationNumber && !property.securityInterestId.includes(params.registrationNumber)) {
      return false;
    }
    
    // Filter by asset type if provided
    if (params.propertyType) {
      // Check if rural/urban matches with agricultural/non-agricultural
      const isRural = params.propertyType.toLowerCase() === 'rural';
      const isAgricultural = property.assetType === 'agricultural';
      
      if (isRural !== isAgricultural) {
        return false;
      }
    }
    
    return true;
  });
}

module.exports = {
  search
};