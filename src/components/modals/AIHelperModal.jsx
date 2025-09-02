import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal'; // It uses the base Modal we just created

const AIHelperModal = ({ onClose }) => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState([{ role: 'ai', text: 'Hello! I am the Klar Hub AI assistant. How can I help you today? Feel free to ask about features, pricing, or anything else.' }]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => { 
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
    }, [chatHistory]);

    const callGeminiAPI = async (prompt) => {
        setIsLoading(true);

        // This check prevents errors when testing locally without a serverless function
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost') {
            setChatHistory(prev => [...prev, { role: 'ai', text: "The AI assistant only works on the live website (klarhub.store). Please visit the site to use this feature." }]);
            setIsLoading(false);
            return;
        }

        const apiUrl = '/api/gemini'; // This will be the path to your serverless function
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                throw new Error("The AI assistant is experiencing issues.");
            }
            
            const result = await response.json();
            const text = result.text;
            
            if (text) {
                setChatHistory(prev => [...prev, { role: 'ai', text }]);
            } else {
                throw new Error("Received an empty response from the AI assistant.");
            }
        } catch (err) {
            console.error("AI Helper Error:", err);
            setChatHistory(prev => [...prev, { role: 'ai', text: 'Sorry, the AI assistant is currently experiencing issues. Please try again later or join our Discord for help.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const sendMessage = (prompt) => {
        if (!prompt.trim() || isLoading) return;
        setChatHistory(prev => [...prev, { role: 'user', text: prompt }]);
        callGeminiAPI(prompt);
        setInput('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    const quickQuestions = ["What are the features for FF2?", "How much is lifetime access?", "Is Klar Hub safe to use?"];

    return (
        <Modal onClose={onClose}>
            {(handleClose) => (
                <div className="bg-theme-modal-card rounded-lg shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col border border-theme">
                    <div className="p-4 border-b border-theme flex justify-between items-center flex-shrink-0">
                        <h3 className="text-lg font-bold text-theme-primary">AI Script Helper</h3>
                        <button onClick={handleClose} className="text-theme-secondary hover:text-theme-primary text-2xl">×</button>
                    </div>
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-klar text-white' : 'bg-theme-button-secondary text-theme-button-secondary-text'}`}>
                                    <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\* (.*?)(?:\n|$)/g, '<li>$1</li>').replace(/<li>/g, '<li class="list-disc ml-4">') }}></p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-theme-button-secondary text-theme-button-secondary p-3 rounded-lg flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                     {chatHistory.length === 1 && (
                         <div className="p-4 border-t border-theme flex-shrink-0">
                             <p className="text-sm text-theme-secondary mb-2 text-center">Or try one of these:</p>
                             <div className="flex flex-wrap justify-center gap-2">
                                 {quickQuestions.map(q => (
                                     <button key={q} onClick={() => sendMessage(q)} className="bg-theme-button-secondary hover:bg-theme-button-secondary-hover text-theme-button-secondary-text text-sm px-3 py-1 rounded-full transition">{q}</button>
                                 ))}
                             </div>
                         </div>
                    )}
                    <form onSubmit={handleFormSubmit} className="p-4 border-t border-theme flex gap-2 flex-shrink-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="w-full bg-theme-button-secondary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:ring-2 focus:ring-klar p-3"
                        />
                        <button type="submit" className="bg-klar hover:bg-klar-light text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center" disabled={isLoading}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l1.425-3.562a.75.75 0 000-1.406L3.105 2.289z" /></svg>
                        </button>
                    </form>
                </div>
            )}
        </Modal>
    );
};

export default AIHelperModal;
