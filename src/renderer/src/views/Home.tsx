import React, { useState, useEffect } from 'react';

interface Document {
    _id?: string;
    name: string;
    genre: string;
}

const Home: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [newDocument, setNewDocument] = useState<Document>({ name: '', genre: '' });
    const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            const docs: Document[] = await window.api.getAllDocuments();
            setDocuments(docs);
        } catch (error) {
            console.error('Error loading documents:', error);
        }
    };

    const handleInsert = async () => {
        try {
            const insertedDoc = await window.api.insertDocument(newDocument);
            setDocuments([...documents, insertedDoc]);
            setNewDocument({ name: '', genre: '' });
        } catch (error) {
            console.error('Error inserting document:', error);
        }
    };

    const handleUpdate = async () => {
        if (selectedDocId) {
            try {
                const updates = { name: newDocument.name, genre: newDocument.genre };
                await window.api.updateDocument(selectedDocId, updates);
                loadDocuments();
                setSelectedDocId(null);
                setNewDocument({ name: '', genre: '' });
            } catch (error) {
                console.error('Error updating document:', error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await window.api.deleteDocument(id);
            setDocuments(documents.filter(doc => doc._id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    };

    const handleSelectDoc = (doc: Document) => {
        setSelectedDocId(doc._id || null);
        setNewDocument({ name: doc.name, genre: doc.genre });
    };

    return (
        <div>
            <h1>Document Manager</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newDocument.genre}
                    onChange={(e) => setNewDocument({ ...newDocument, genre: e.target.value })}
                />
                <button onClick={selectedDocId ? handleUpdate : handleInsert}>
                    {selectedDocId ? 'Update' : 'Insert'}
                </button>
            </div>

            <ul>
                {documents.map((doc) => (
                    <li key={doc._id}>
                        <span>{doc.name} ({doc.genre})</span>
                        <button onClick={() => handleSelectDoc(doc)}>Edit</button>
                        <button onClick={() => handleDelete(doc._id || '')}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
