const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import services
const apiService = require('./api/service');
const chatbotService = require('./api/chatbotService');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from Frontend directory
app.use(express.static(path.join(__dirname, '../Frontend')));

// API endpoint for property search
app.post('/api/search', async (req, res) => {
  try {
    const searchParams = req.body;
    console.log('Received search request:', searchParams);
    
    const results = await apiService.searchAll(searchParams);
    res.json(results);
  } catch (error) {
    console.error('Error handling search request:', error);
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred while processing your request' 
    });
  }
});

// API endpoint for searching specific source
app.post('/api/search/:source', async (req, res) => {
  try {
    const { source } = req.params;
    const searchParams = req.body;
    console.log(`Received search request for ${source}:`, searchParams);
    
    const results = await apiService.searchSource(source, searchParams);
    res.json(results);
  } catch (error) {
    console.error(`Error handling ${req.params.source} search request:`, error);
    res.status(500).json({ 
      success: false, 
      error: 'An error occurred while processing your request' 
    });
  }
});

// API endpoint for chatbot
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await chatbotService.getResponse(message);
    
    res.json({
      success: true,
      response
    });
  } catch (error) {
    console.error('Error in chatbot API:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chatbot request'
    });
  }
});

// Default route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Add this new endpoint after your existing endpoints

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});