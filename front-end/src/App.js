import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [links, setLinks] = useState('');
    const [file1, setFile1] = useState(null);
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('links', links);
        if (file1) formData.append('files', file1);

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

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
    };

    const textAreaStyle = {
        width: '60%',
        height: '100px',
        marginBottom: '10px',
    };

    const buttonStyle = {
        marginTop: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const resultStyle = {
        marginTop: '20px',
        textAlign: 'left',
        maxWidth: '60%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <textarea
                    style={textAreaStyle}
                    value={links}
                    onChange={(e) => setLinks(e.target.value)}
                    placeholder="Enter links here..."
                />
                <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
                <button style={buttonStyle} type="submit">Submit</button>
            </form>
            {result && (
                <div style={resultStyle}>
                    <h3>Result:</h3>
                    <pre>{result}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
