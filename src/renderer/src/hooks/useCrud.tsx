import { useState, useEffect } from 'react';

type EntityWithId = {
    _id?: string;
};

type ApiMethods<T extends EntityWithId> = {
    getAll: () => Promise<T[]>;
    insert: (data: Omit<T, '_id'>) => Promise<T>;
    update: (id: string, updates: Partial<T>) => Promise<void>;
    delete: (id: string) => Promise<void>;
};

const useCrud = <T extends EntityWithId>(api: ApiMethods<T>) => {
    const [entities, setEntities] = useState<T[]>([]);
    const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
    const [entityData, setEntityData] = useState<Partial<T>>({});

    useEffect(() => {
        loadEntities();
    }, []);

    const loadEntities = async () => {
        try {
            const data = await api.getAll();
            setEntities(data);
        } catch (error) {
            console.error('Error loading entities:', error);
        }
    };

    const handleInsert = async () => {
        try {
            const newEntity = await api.insert(entityData as Omit<T, '_id'>);
            setEntities([...entities, newEntity]);
            setEntityData({});
        } catch (error) {
            console.error('Error inserting entity:', error);
        }
    };

    const handleUpdate = async () => {
        if (selectedEntityId) {
            try {
                await api.update(selectedEntityId, entityData);
                loadEntities();
                setSelectedEntityId(null);
                setEntityData({});
            } catch (error) {
                console.error('Error updating entity:', error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(id);
            setEntities(entities.filter(entity => entity._id !== id));
        } catch (error) {
            console.error('Error deleting entity:', error);
        }
    };

    const handleSelectEntity = (entity: T) => {
        setSelectedEntityId(entity._id || null);
        setEntityData(entity);
    };

    return {
        entities,
        entityData,
        setEntityData,
        selectedEntityId,
        handleInsert,
        handleUpdate,
        handleDelete,
        handleSelectEntity
    };
};

export default useCrud;
