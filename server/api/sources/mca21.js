/**
 * MCA21 (Ministry of Corporate Affairs) API
 * 
 * This module handles communication with the MCA21 API for corporate property records.
 */

// Mock data for development/testing
const mockData = [
  {
    companyId: 'MCA21-001',
    companyName: 'TechSolutions Pvt Ltd',
    registeredAddress: 'Plot 45, Tech Park, Electronic City, Bangalore, Karnataka',
    cin: 'U72200KA2015PTC081234',
    dateOfIncorporation: '12/08/2015',
    authorizedCapital: '₹1,00,00,000',
    paidUpCapital: '₹75,00,000',
    companyStatus: 'Active',
    directors: [
      {
        name: 'Rahul Sharma',
        din: '01234567',
        designation: 'Managing Director'
      },
      {
        name: 'Priya Patel',
        din: '07654321',
        designation: 'Director'
      }
    ],
    propertyAssets: [
      {
        propertyId: 'PROP-BLR-001',
        propertyAddress: 'Plot 45, Tech Park, Electronic City, Bangalore, Karnataka',
        propertyType: 'Commercial Office',
        area: '5000 sq ft',
        acquisitionDate: '15/10/2016',
        acquisitionValue: '₹3,50,00,000'
      }
    ]
  },
  {
    companyId: 'MCA21-002',
    companyName: 'GreenEnergy Solutions Ltd',
    registeredAddress: 'Tower B, 5th Floor, Cyber City, Gurugram, Haryana',
    cin: 'L40300HR2010PLC045678',
    dateOfIncorporation: '05/03/2010',
    authorizedCapital: '₹5,00,00,000',
    paidUpCapital: '₹4,25,00,000',
    companyStatus: 'Active',
    directors: [
      {
        name: 'Vikram Singh',
        din: '02345678',
        designation: 'Chairman'
      },
      {
        name: 'Neha Gupta',
        din: '08765432',
        designation: 'Managing Director'
      }
    ],
    propertyAssets: [
      {
        propertyId: 'PROP-GGN-001',
        propertyAddress: 'Tower B, 5th Floor, Cyber City, Gurugram, Haryana',
        propertyType: 'Commercial Office',
        area: '8000 sq ft',
        acquisitionDate: '20/06/2012',
        acquisitionValue: '₹6,75,00,000'
      },
      {
        propertyId: 'PROP-GGN-002',
        propertyAddress: 'Plot 12, Sector 44, Gurugram, Haryana',
        propertyType: 'Industrial Land',
        area: '2 acres',
        acquisitionDate: '15/11/2015',
        acquisitionValue: '₹8,50,00,000'
      }
    ]
  }
];

/**
 * Search MCA21 records
 * 
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Search results
 */
async function search(params) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // In a real implementation, this would make an HTTP request to the MCA21 API
  console.log('Searching MCA21 with params:', params);
  
  // Filter mock data based on search parameters
  return mockData.filter(company => {
    // Filter by owner/company name if provided
    if (params.ownerName && !company.companyName.toLowerCase().includes(params.ownerName.toLowerCase()) &&
        !company.directors.some(director => director.name.toLowerCase().includes(params.ownerName.toLowerCase()))) {
      return false;
    }
    
    // Filter by state if provided
    if (params.state && !company.registeredAddress.toLowerCase().includes(params.state.toLowerCase())) {
      return false;
    }
    
    // Filter by district if provided
    if (params.district && !company.registeredAddress.toLowerCase().includes(params.district.toLowerCase())) {
      return false;
    }
    
    // Filter by CIN if provided
    if (params.registrationNumber && !company.cin.includes(params.registrationNumber)) {
      return false;
    }
    
    return true;
  });
}

module.exports = {
  search
};