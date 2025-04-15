import React, { useState } from 'react';
import axios from 'axios'; 
import Navbar from './navbar'; 

const CreateTrade: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [conditions, setConditions] = useState<string[]>([]);
    const [showPrompt, setShowPrompt] = useState(false); 

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newConditions = [...conditions];
        newConditions[index] = event.target.value;
        setConditions(newConditions);
    };

    const handleAddCondition = () => {
        setConditions([...conditions, '']);
    };

    const handleRemoveCondition = (index: number) => {
        const newConditions = [...conditions];
        newConditions.splice(index, 1);
        setConditions(newConditions);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            
            await axios.post('http://localhost:8000/trade/createTrade', {
                title,
                description,
                conditions
            });
            // showPrompt true to display the prompt
            setShowPrompt(true);
            // Reset form fields 
            setTitle('');
            setDescription('');
            setConditions([]);
        } catch (error) {
           
            console.error('Error creating trade:', error);
        }
    };

    return (
        <div>
            <Navbar /> {}
            <div className="trade-detail-container">
                <h1 className="trade-title">Create New Trade</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={handleTitleChange} required />

                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={handleDescriptionChange} required />

                    <div>
                        <label>Conditions:</label>
                        {conditions.map((condition, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={condition}
                                    onChange={(event) => handleConditionChange(event, index)}
                                    required
                                />
                                <button type="button" onClick={() => handleRemoveCondition(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddCondition}>
                            Add Condition
                        </button>
                    </div>

                    <button type="submit">Create Trade</button>
                </form>
                {/* Display prompt if showPrompt is true */}
                {showPrompt && <p>Trade created successfully!</p>}
            </div>
        </div>
    );
};

export default CreateTrade;
