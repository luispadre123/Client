
interface LoginType{
    isRegister: Boolean;
    toggleForm?: ()=>void;
    formData?: LoginRegisterProps;
    updateField?: (field: string, value: string) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>, formData: FormData) => void;
}

interface LoginRegisterProps{
    correo: string;
    id: string;
    nombreCompleto: string;
    numeroTelefono: string;
    password: string;
    salt: number;
    username: string;
}
export type{
    LoginType
}