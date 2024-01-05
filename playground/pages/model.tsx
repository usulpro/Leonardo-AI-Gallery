
import React, { useState } from 'react';
// Importing the API methods from the src/model directory
import { fetchUserInfo, fetchGenerationsByUserId } from 'leonardo-ai-gallery';

const ModelPage = () => {
    // State for storing input values and API responses
    const [token, setToken] = useState('8a69e018-5e1c-440e-b22e-7e98f5d82b25'); // Token state
    const [userId, setUserId] = useState(''); // User ID state
    const [offset, setOffset] = useState(0); // Offset state
    const [limit, setLimit] = useState(10); // Limit state
    const [loading, setLoading] = useState(false); // Loading state
    const [response, setResponse] = useState(null); // API response state
    const [error, setError] = useState(null); // Error state

    // Function for fetching user info
    const handleFetchUserInfo = async () => {
        setLoading(true);
        setError(null);
        try {
            const userInfo = await fetchUserInfo(token);
            setResponse(userInfo);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function for fetching generations by user ID
    const handleFetchGenerationsByUserId = async () => {
        setLoading(true);
        setError(null);
        try {
            const generations = await fetchGenerationsByUserId(token, userId, offset, limit);
            setResponse(generations);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">API Testing Playground</h1>
            <h2 className="text-2xl font-bold mb-4">Endpoints</h2>

            {/* Fetch User Info Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Fetch User Info</h2>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleFetchUserInfo}
                    disabled={loading}
                >
                    Fetch User Info
                </button>
            </div>

            {/* Fetch Generations By User ID Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Fetch Generations By User ID</h2>
                {/* Input fields for parameters */}
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                    type="number"
                    placeholder="Offset"
                    value={offset}
                    onChange={(e) => setOffset(Number(e.target.value))}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <input
                    type="number"
                    placeholder="Limit"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleFetchGenerationsByUserId}
                    disabled={loading}
                >
                    Fetch Generations
                </button>
            </div>

            {/* Display Results and Error Messages */}
            {response && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">API Response:</h2>
                    <pre className="bg-gray-900 p-4 rounded">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && (
                <div className="text-red-500">
                    <p>Error: {error}</p>
                </div>
            )}
        </div>
    );
};

export default ModelPage;
