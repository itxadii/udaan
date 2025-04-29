// Simple knowledge base for the chatbot
const knowledgeBase = {
    "what is udaan": "UDAAN 2.0 is a property search system that allows you to search for property records across multiple government databases in India.",
    "how to search property": "To search for a property, go to the home page and fill out the search form with details like owner name, state, district, and property type. Then click the 'Search' button to view results.",
    "what databases": "UDAAN 2.0 searches across multiple government databases including DORIS (Digital Online Registration Information System), DLR (Digital Land Records), CERSAI, and MCA21.",
    "property types": "UDAAN 2.0 supports searching for both urban and rural properties. You can select the property type in the search form.",
    "view details": "To view detailed information about a property, click the 'View Details' button on any property card in the search results.",
    "new search": "To start a new search, click the 'New Search' button at the top of the results page, or navigate back to the home page.",
    "contact": "For more information or support, please contact the UDAAN 2.0 team at support@udaan.gov.in.",
    "help": "I can help you with questions about how to use the UDAAN 2.0 property search system. Try asking about how to search for properties, view details, or what databases we use.",
    "about": "UDAAN 2.0 is a revolutionary property search system developed as part of a hackathon project. It aims to simplify property searches across multiple government databases in India."
};

/**
 * Get response for user message
 * @param {string} userInput - User's message
 * @returns {string} - Chatbot response
 */
function getResponse(userInput) {
    // Convert input to lowercase for easier matching
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (input.match(/^(hi|hello|hey|greetings)/)) {
        return "Hello! How can I help you with UDAAN 2.0 property search system today?";
    }
    
    // Check for thank you
    if (input.match(/thank you|thanks|thx/)) {
        return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Check for goodbye
    if (input.match(/bye|goodbye|see you|farewell/)) {
        return "Goodbye! Feel free to come back if you have more questions about UDAAN 2.0.";
    }
    
    // Check knowledge base for answers
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (input.includes(key)) {
            return value;
        }
    }
    
    // Check for specific questions
    if (input.includes("search") && input.includes("property")) {
        return knowledgeBase["how to search property"];
    }
    
    if (input.includes("database") || input.includes("data source")) {
        return knowledgeBase["what databases"];
    }
    
    if (input.includes("urban") || input.includes("rural")) {
        return knowledgeBase["property types"];
    }
    
    if (input.includes("detail") || input.includes("more info")) {
        return knowledgeBase["view details"];
    }
    
    // Default response
    return "I'm sorry, I can only answer questions related to the UDAAN 2.0 website and property search system. Could you please rephrase your question or ask something about how to use our property search features?";
}

module.exports = {
    getResponse
};