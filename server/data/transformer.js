/**
 * Data Transformation Module
 * 
 * This module handles normalization and transformation of data from different sources
 * to create a unified data structure for the UDAAN Property Search System.
 */

// Define the unified data structure schema
const unifiedSchema = {
  id: String,                  // Unique identifier for the property
  source: String,              // Data source (DORIS, DLR, CERSAI, MCA21)
  ownerName: String,           // Name of property owner
  address: String,             // Property address
  propertyType: String,        // Urban or Rural
  area: String,                // Property area
  marketValue: String,         // Market value of property
  registrationNumber: String,  // Registration number
  registrationDate: String,    // Registration date (normalized format)
  registrationOffice: String,  // Registration office
  encumbrances: Array,         // Array of encumbrance objects
  propertyTax: String,         // Property tax information
  lastTransactionDate: String, // Last transaction date (normalized format)
  documentType: String,        // Type of document
  executionDate: String,       // Execution date (normalized format)
  propertyDescription: String  // Description of property
};

/**
 * Normalize date format to YYYY-MM-DD
 * Handles various input formats
 * 
 * @param {string} dateString - Date string in various formats
 * @returns {string} - Normalized date string or original if parsing fails
 */
function normalizeDate(dateString) {
  if (!dateString) return null;
  
  try {
    // Handle different date formats
    let date;
    
    // Check if it's DD/MM/YYYY format
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('/');
      date = new Date(`${year}-${month}-${day}`);
    } 
    // Check if it's MM/DD/YYYY format
    else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      date = new Date(dateString);
    }
    // Check if it's already in YYYY-MM-DD format
    else if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) {
      return dateString; // Already in desired format
    }
    // Try standard parsing for other formats
    else {
      date = new Date(dateString);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Could not parse date: ${dateString}`);
      return dateString; // Return original if parsing fails
    }
    
    // Format to YYYY-MM-DD
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error(`Error normalizing date ${dateString}:`, error);
    return dateString; // Return original if error occurs
  }
}

/**
 * Transform DORIS (urban) data to unified format
 * 
 * @param {Object} data - Raw DORIS data
 * @returns {Object} - Transformed data in unified format
 */
function transformDorisData(data) {
  return {
    id: data.propertyId || data.id || `DORIS-${Date.now()}`,
    source: 'DORIS',
    ownerName: data.ownerName || data.owner || null,
    address: data.propertyAddress || data.address || null,
    propertyType: 'urban',
    area: data.propertyArea || data.area || null,
    marketValue: data.marketValue || data.value || null,
    registrationNumber: data.regNumber || data.registrationNumber || null,
    registrationDate: normalizeDate(data.regDate || data.registrationDate),
    registrationOffice: data.regOffice || data.registrationOffice || null,
    encumbrances: Array.isArray(data.encumbrances) ? data.encumbrances.map(e => ({
      type: e.type || null,
      holder: e.holder || null,
      amount: e.amount || null,
      date: normalizeDate(e.date)
    })) : [],
    propertyTax: data.propertyTax || null,
    lastTransactionDate: normalizeDate(data.lastTransactionDate),
    documentType: data.documentType || null,
    executionDate: normalizeDate(data.executionDate),
    propertyDescription: data.propertyDescription || data.description || null
  };
}

/**
 * Transform DLR (rural) data to unified format
 * 
 * @param {Object} data - Raw DLR data
 * @returns {Object} - Transformed data in unified format
 */
function transformDlrData(data) {
  return {
    id: data.landId || data.id || `DLR-${Date.now()}`,
    source: 'DLR',
    ownerName: data.ownerName || data.khataHolder || null,
    address: data.landAddress || data.address || null,
    propertyType: 'rural',
    area: data.landArea || data.area || null,
    marketValue: data.landValue || data.value || null,
    registrationNumber: data.khasraNumber || data.registrationNumber || null,
    registrationDate: normalizeDate(data.registrationDate),
    registrationOffice: data.tehsil || data.registrationOffice || null,
    encumbrances: Array.isArray(data.encumbrances) ? data.encumbrances.map(e => ({
      type: e.type || null,
      holder: e.holder || null,
      amount: e.amount || null,
      date: normalizeDate(e.date)
    })) : [],
    propertyTax: data.landRevenue || data.propertyTax || null,
    lastTransactionDate: normalizeDate(data.lastMutationDate || data.lastTransactionDate),
    documentType: data.documentType || null,
    executionDate: normalizeDate(data.executionDate),
    propertyDescription: data.landDescription || data.description || null
  };
}

/**
 * Transform CERSAI data to unified format
 * 
 * @param {Object} data - Raw CERSAI data
 * @returns {Object} - Transformed data in unified format
 */
function transformCersaiData(data) {
  return {
    id: data.assetId || data.id || `CERSAI-${Date.now()}`,
    source: 'CERSAI',
    ownerName: data.borrowerName || data.ownerName || null,
    address: data.assetAddress || data.address || null,
    propertyType: data.assetType === 'agricultural' ? 'rural' : 'urban',
    area: data.assetArea || data.area || null,
    marketValue: data.assetValue || data.value || null,
    registrationNumber: data.securityInterestId || data.registrationNumber || null,
    registrationDate: normalizeDate(data.registrationDate),
    registrationOffice: data.filingOffice || data.registrationOffice || null,
    encumbrances: [{
      type: 'Security Interest',
      holder: data.securedCreditorName || null,
      amount: data.loanAmount || null,
      date: normalizeDate(data.filingDate)
    }],
    propertyTax: null,
    lastTransactionDate: normalizeDate(data.lastTransactionDate),
    documentType: data.securityType || data.documentType || null,
    executionDate: normalizeDate(data.executionDate),
    propertyDescription: data.assetDescription || data.description || null
  };
}

/**
 * Transform MCA21 data to unified format
 * 
 * @param {Object} data - Raw MCA21 data
 * @returns {Object} - Transformed data in unified format
 */
function transformMca21Data(data) {
  return {
    id: data.chargeId || data.id || `MCA21-${Date.now()}`,
    source: 'MCA21',
    ownerName: data.companyName || data.ownerName || null,
    address: data.assetAddress || data.address || null,
    propertyType: data.assetType || 'urban',
    area: data.assetArea || data.area || null,
    marketValue: data.assetValue || data.value || null,
    registrationNumber: data.chargeNumber || data.registrationNumber || null,
    registrationDate: normalizeDate(data.chargeCreationDate || data.registrationDate),
    registrationOffice: data.registrarOffice || data.registrationOffice || null,
    encumbrances: [{
      type: 'Charge',
      holder: data.chargeHolder || null,
      amount: data.chargeAmount || null,
      date: normalizeDate(data.chargeCreationDate)
    }],
    propertyTax: null,
    lastTransactionDate: normalizeDate(data.lastModificationDate || data.lastTransactionDate),
    documentType: data.chargeType || data.documentType || null,
    executionDate: normalizeDate(data.executionDate),
    propertyDescription: data.assetDescription || data.description || null
  };
}

/**
 * Handle missing fields by providing default values or placeholders
 * 
 * @param {Object} data - Transformed data
 * @returns {Object} - Data with missing fields handled
 */
function handleMissingFields(data) {
  // Create a copy of the data
  const result = { ...data };
  
  // Iterate through the unified schema
  Object.keys(unifiedSchema).forEach(field => {
    // If field is missing or null, provide a default value
    if (result[field] === undefined || result[field] === null) {
      if (field === 'encumbrances') {
        result[field] = [];
      } else if (field === 'propertyType') {
        result[field] = 'unknown';
      } else {
        result[field] = 'Not available';
      }
    }
  });
  
  return result;
}

/**
 * Transform data from any source to unified format
 * 
 * @param {string} source - Data source (doris, dlr, cersai, mca21)
 * @param {Object} data - Raw data from the source
 * @returns {Object} - Transformed data in unified format
 */
function transformData(source, data) {
  let transformedData;
  
  // Apply appropriate transformation based on source
  switch (source.toLowerCase()) {
    case 'doris':
      transformedData = transformDorisData(data);
      break;
    case 'dlr':
      transformedData = transformDlrData(data);
      break;
    case 'cersai':
      transformedData = transformCersaiData(data);
      break;
    case 'mca21':
      transformedData = transformMca21Data(data);
      break;
    default:
      console.warn(`Unknown data source: ${source}`);
      transformedData = data;
  }
  
  // Handle missing fields
  return handleMissingFields(transformedData);
}

/**
 * Transform an array of data from multiple sources to unified format
 * 
 * @param {Array} dataArray - Array of data objects with source information
 * @returns {Array} - Array of transformed data in unified format
 */
function transformDataArray(dataArray) {
  if (!Array.isArray(dataArray)) {
    console.error('Expected an array of data objects');
    return [];
  }
  
  return dataArray.map(item => {
    if (!item.source) {
      console.warn('Data item missing source information:', item);
      return handleMissingFields(item);
    }
    
    return transformData(item.source, item);
  });
}

module.exports = {
  transformData,
  transformDataArray,
  normalizeDate,
  handleMissingFields
};