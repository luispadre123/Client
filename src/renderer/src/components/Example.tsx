import React from 'react';
import useCrud from "../hooks/useCrud.tsx";


interface Document {
    _id?: string;
    name: string;
    genre: string;
}

const documentApi = {
    getAll: () => window.api.getAllDocuments() as Promise<Document[]>,
    insert: (data: Omit<Document, '_id'>) => window.api.insertDocument(data),
    update: (id: string, updates: Partial<Document>) => window.api.updateDocument(id, updates),
    delete: (id: string) => window.api.deleteDocument(id),
};

const Example: React.FC = () => {
    const {
        entities: documents,
        entityData: newDocument,
        setEntityData: setNewDocument,
        selectedEntityId,
        handleInsert,
        handleUpdate,
        handleDelete,
        handleSelectEntity
    } = useCrud<Document>(documentApi);

    return (
        <div>
            <h1>Document Manager</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newDocument.name || ''}
                    onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newDocument.genre || ''}
                    onChange={(e) => setNewDocument({ ...newDocument, genre: e.target.value })}
                />
                <button onClick={selectedEntityId ? handleUpdate : handleInsert}>
                    {selectedEntityId ? 'Update' : 'Insert'}
                </button>
            </div>

            <ul>
                {documents.map((doc) => (
                    <li key={doc._id}>
                        <span>{doc.name} ({doc.genre})</span>
                        <button onClick={() => handleSelectEntity(doc)}>Edit</button>
                        <button onClick={() => handleDelete(doc._id || '')}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Example;
