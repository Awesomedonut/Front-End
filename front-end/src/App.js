// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [links, setLinks] = useState('');
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('links', links);
        if (file1) formData.append('files', file1);
        if (file2) formData.append('files', file2);

        try {
            const response = await axios.post('https://chat-api.cryptoslam.dev/post_content', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error during API request', error);
            setResult('Error: ' + error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={links}
                    onChange={(e) => setLinks(e.target.value)}
                    placeholder="Enter links here..."
                />
                <br />
                <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
                <input type="file" onChange={(e) => setFile2(e.target.files[0])} />
                <br />
                <button type="submit">Submit</button>
            </form>
            {result && (
                <div>
                    <h3>Result:</h3>
                    <pre>{result}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
