/**
 * API Service
 * 
 * This service handles API requests and integrates data from multiple sources.
 */

// Import data sources
const dorisApi = require('./sources/doris');
const dlrApi = require('./sources/dlr');
const cersaiApi = require('./sources/cersai');
const mca21Api = require('./sources/mca21');

// Import data transformation and storage modules
const transformer = require('../data/transformer');
const storage = require('../data/storage');

// Initialize storage
storage.initializeStorage().catch(err => {
  console.error('Failed to initialize storage:', err);
});

/**
 * Search all data sources and return unified results
 * 
 * @param {Object} params - Search parameters
 * @returns {Promise<Object>} - Search results
 */
async function searchAll(params) {
  try {
    console.log('Searching all sources with params:', params);
    
    // Determine which sources to search based on property type
    const sources = [];
    if (!params.propertyType || params.propertyType === 'urban') {
      sources.push('doris', 'cersai', 'mca21');
    }
    if (!params.propertyType || params.propertyType === 'rural') {
      sources.push('dlr', 'cersai');
    }
    
    // Search each source in parallel
    const searchPromises = sources.map(source => searchSource(source, params));
    const results = await Promise.all(searchPromises);
    
    // Flatten and combine results
    const combinedResults = results.flat();
    
    // Store the combined results in unified storage
    await storage.storePropertyData(combinedResults);
    
    return {
      success: true,
      results: combinedResults,
      count: combinedResults.length,
      sources: sources
    };
  } catch (error) {
    console.error('Error in searchAll:', error);
    return {
      success: false,
      error: 'Failed to search property records',
      results: []
    };
  }
}

/**
 * Search a specific data source
 * 
 * @param {string} source - Data source name
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} - Search results
 */
async function searchSource(source, params) {
  try {
    console.log(`Searching ${source} with params:`, params);
    
    let rawResults = [];
    
    // Call appropriate API based on source
    switch (source.toLowerCase()) {
      case 'doris':
        rawResults = await dorisApi.search(params);
        break;
      case 'dlr':
        rawResults = await dlrApi.search(params);
        break;
      case 'cersai':
        rawResults = await cersaiApi.search(params);
        break;
      case 'mca21':
        rawResults = await mca21Api.search(params);
        break;
      default:
        console.warn(`Unknown source: ${source}`);
        return [];
    }
    
    // Add source information to each result if not present
    rawResults = rawResults.map(result => ({
      ...result,
      source: result.source || source.toUpperCase()
    }));
    
    // Transform results to unified format
    const transformedResults = transformer.transformDataArray(rawResults);
    
    return transformedResults;
  } catch (error) {
    console.error(`Error searching ${source}:`, error);
    return [];
  }
}

/**
 * Retrieve property data from unified storage
 * 
 * @param {Object} criteria - Search criteria
 * @returns {Promise<Object>} - Search results
 */
async function retrieveUnifiedData(criteria) {
  try {
    const results = await storage.retrievePropertyData(criteria);
    
    return {
      success: true,
      results: results,
      count: results.length
    };
  } catch (error) {
    console.error('Error retrieving unified data:', error);
    return {
      success: false,
      error: 'Failed to retrieve property records',
      results: []
    };
  }
}

module.exports = {
  searchAll,
  searchSource,
  retrieveUnifiedData
};