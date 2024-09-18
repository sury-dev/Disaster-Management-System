const axios = require('axios');
const asyncHandler = require('./asyncHandler');
const { ApiError } = require('./ApiError'); // Assuming you have a custom error handler

// Replace with your actual API key and external user ID
const apiKey = 'igPu63VK4AoQnEBz8P3aan7fB9bfXfUP';
const externalUserId = 'user1';

// Function to create a chat session
async function createChatSession() {
    try {
        const response = await axios.post(
            'https://api.on-demand.io/chat/v1/sessions',
            {
                pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
                externalUserId: externalUserId
            },
            {
                headers: {
                    apikey: apiKey
                }
            }
        );
        return response.data.data.id; // Extract session ID
    } catch (error) {
        console.error('Error creating chat session:', error);
        throw new Error('Failed to create chat session');
    }
}

// Function to submit a query
async function submitQuery(sessionId, query) {
    try {
        const response = await axios.post(
            `https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`,
            {
                endpointId: 'predefined-openai-gpt4o',
                query: query,  // Use dynamic query
                pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
                responseMode: 'sync'
            },
            {
                headers: {
                    apikey: apiKey
                }
            }
        );
        return response.data; // Return the response
    } catch (error) {
        console.error('Error submitting query:', error);
        throw new Error('Failed to submit query');
    }
}

// Main function to execute the API calls
async function handleQuery2(query) {
    try {
        const sessionId = await createChatSession();
        if (sessionId) {
            const response = await submitQuery(sessionId, query);
            return response; // Return the response to be used by the caller
        }
    } catch (error) {
        console.error('Error handling query:', error);
        throw error;
    }
}

// Controller function to handle the AI query
const handleQuery = asyncHandler(async (req, res) => {
    const { message } = req.body; // Get the query/message from the request body

    if (!message) {
        throw new ApiError(400, "No message was sent to the AI");
    }

    const response = await handleQuery2(message); // Call the function to process the query
    if (response) {
        console.log(response.data.answer); // Log the answer
        return res.status(200).json({ success: true, data: response.data.answer }); // Send the answer back to the client // Send the response back to the client
    } else {
        throw new ApiError(500, "Failed to get a response from the AI");
    }
});

module.exports = { handleQuery };
