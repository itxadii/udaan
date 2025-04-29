/**
 * Data Storage Module
 * 
 * This module handles storing and retrieving unified property data.
 */

const fs = require('fs').promises;
const path = require('path');

// Define the path for the unified data file
const DATA_FILE_PATH = path.join(__dirname, '../data/unified_property_data.json');

/**
 * Initialize the data storage
 * Creates the data file if it doesn't exist
 */
async function initializeStorage() {
  try {
    await fs.access(DATA_FILE_PATH);
    console.log('Data storage file exists');
  } catch (error) {
    // File doesn't exist, create it with empty data structure
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify({ properties: [] }));
    console.log('Created new data storage file');
  }
}

/**
 * Store property data in the unified storage
 * 
 * @param {Array|Object} data - Property data to store (single object or array)
 * @returns {Promise<boolean>} - Success status
 */
async function storePropertyData(data) {
  try {
    // Read existing data
    const existingDataStr = await fs.readFile(DATA_FILE_PATH, 'utf8');
    const existingData = JSON.parse(existingDataStr);
    
    // Convert single object to array if needed
    const dataArray = Array.isArray(data) ? data : [data];
    
    // Check for duplicates and add new data
    const existingIds = new Set(existingData.properties.map(p => p.id));
    const newProperties = dataArray.filter(p => !existingIds.has(p.id));
    
    // Update existing properties if they exist
    dataArray.forEach(newProp => {
      if (existingIds.has(newProp.id)) {
        const index = existingData.properties.findIndex(p => p.id === newProp.id);
        if (index !== -1) {
          existingData.properties[index] = { ...existingData.properties[index], ...newProp };
        }
      }
    });
    
    // Add new properties
    existingData.properties = [...existingData.properties, ...newProperties];
    
    // Write updated data back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(existingData, null, 2));
    
    console.log(`Stored ${newProperties.length} new properties, updated ${dataArray.length - newProperties.length} existing properties`);
    return true;
  } catch (error) {
    console.error('Error storing property data:', error);
    return false;
  }
}

/**
 * Retrieve property data based on search criteria
 * 
 * @param {Object} criteria - Search criteria
 * @returns {Promise<Array>} - Matching property data
 */
async function retrievePropertyData(criteria = {}) {
  try {
    // Read data file
    const dataStr = await fs.readFile(DATA_FILE_PATH, 'utf8');
    const data = JSON.parse(dataStr);
    
    // If no criteria provided, return all data
    if (Object.keys(criteria).length === 0) {
      return data.properties;
    }
    
    // Filter properties based on criteria
    return data.properties.filter(property => {
      // Check each criterion
      return Object.entries(criteria).every(([key, value]) => {
        // Skip undefined or null values in criteria
        if (value === undefined || value === null || value === '') {
          return true;
        }
        
        // Handle special case for property type
        if (key === 'propertyType' && property[key]) {
          return property[key].toLowerCase() === value.toLowerCase();
        }
        
        // Handle special case for owner name (partial match)
        if (key === 'ownerName' && property[key]) {
          return property[key].toLowerCase().includes(value.toLowerCase());
        }
        
        // Handle special case for address (partial match)
        if (key === 'address' && property[key]) {
          return property[key].toLowerCase().includes(value.toLowerCase());
        }
        
        // Default exact match
        return property[key] === value;
      });
    });
  } catch (error) {
    console.error('Error retrieving property data:', error);
    return [];
  }
}

module.exports = {
  initializeStorage,
  storePropertyData,
  retrievePropertyData
};