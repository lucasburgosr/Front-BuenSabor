import Empleado from "../entidades/Empleado";
import BackendClient from "./BackendClient";

export default class EmpleadoService extends BackendClient<Empleado> {

    async getEmpleadoByMail(mail: string): Promise<Empleado | null> {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("No token found");
			}

			console.log(token)
	
			const response = await fetch(`${import.meta.env.VITE_API_URL}${this.baseUrl}/mail?email=${mail}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
	
			const contentType = response.headers.get("content-type");
			if (!response.ok) {
				if (contentType && contentType.includes("application/json")) {
					const errorData = await response.json();
					throw new Error(`Error fetching usuario: ${errorData.message}`);
				} else {
					throw new Error(`Error fetching usuario: ${response.statusText}`);
				}
			}
	
			if (contentType && contentType.includes("application/json")) {
				return await response.json();
			} else {
				throw new Error("Unexpected content type, expected JSON");
			}
		} catch (error) {
			console.error("Error fetching usuario:", error);
			throw error;
		}
	}
	
	
}
