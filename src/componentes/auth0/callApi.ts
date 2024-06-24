// callApi.ts

export const callApi = async (getAccessTokenSilently: any): Promise<string | null> => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
        });
        
        // Guardar el token en localStorage
        localStorage.setItem("token", token);

        console.log("Token almacenado en localStorage:", token);
        
        return token;
    } catch (error) {
        console.error("Error al obtener el token:", error);
        return null;
    }
};
