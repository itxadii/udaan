document.addEventListener('DOMContentLoaded', function() {
    // Get chatbot elements
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input-field');
    const chatbotSend = document.getElementById('chatbot-send');
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.add('active');
        chatbotInput.focus();
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message when clicking send button
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message when pressing Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to send user message and get bot response
    async function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addMessage('user', message);
        
        // Clear input field
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Check if backend server is running
            const serverCheck = await fetch('/api/health', { method: 'GET' })
                .then(response => response.ok)
                .catch(() => false);
            
            if (!serverCheck) {
                // If server is not running, use fallback responses
                setTimeout(() => {
                    removeTypingIndicator();
                    const fallbackResponse = getFallbackResponse(message);
                    addMessage('bot', fallbackResponse);
                }, 1000);
                return;
            }
            
            // Send message to backend API
            const response = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            const data = await response.json();
            
            // Remove typing indicator
            removeTypingIndicator();
            
            if (data.success) {
                // Add bot response to chat
                addMessage('bot', data.response);
            } else {
                // Add error message to chat
                addMessage('bot', 'Sorry, I encountered an error. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending message to chatbot API:', error);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add fallback response
            const fallbackResponse = getFallbackResponse(message);
            addMessage('bot', fallbackResponse);
        }
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to add a message to the chat
    function addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingDiv.appendChild(dot);
        }
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Fallback responses when server is not available
    function getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple pattern matching for common questions
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! I'm UDAAN Assistant. How can I help you with property search today?";
        }
        
        if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Goodbye! Feel free to come back if you have more questions.";
        }
        
        if (lowerMessage.includes('search') && lowerMessage.includes('property')) {
            return "To search for a property, fill out the search form with details like property type, owner name, and location. Then click the 'Search' button to view results.";
        }
        
        if (lowerMessage.includes('database') || lowerMessage.includes('data source')) {
            return "UDAAN 2.0 searches across multiple government databases including DORIS (Digital Online Registration Information System), DLR (Digital Land Records), CERSAI, and MCA21.";
        }
        
        if (lowerMessage.includes('urban') || lowerMessage.includes('rural')) {
            return "UDAAN 2.0 supports searching for both urban and rural properties. You can select the property type in the search form.";
        }
        
        // Default response
        return "I'm currently operating in offline mode. For the best experience, please ensure the backend server is running. I can answer basic questions about UDAAN 2.0 property search system.";
    }
});