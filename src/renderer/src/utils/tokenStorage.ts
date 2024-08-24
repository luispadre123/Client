import { ipcRenderer } from 'electron';

// Guardar el token
export const saveToken = async (token: string) => {
    await ipcRenderer.invoke('save-token', token);
};

// Cargar el token
export const loadToken = async (): Promise<string | null> => {
    const token = await ipcRenderer.invoke('load-token');
    return token;
};
