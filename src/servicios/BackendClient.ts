import AbstractBackendClient from "./AbstractBackendClient";

export default abstract class BackendClient<T> extends AbstractBackendClient<T> {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`);
    const data = await response.json();
    return data as T[];
  }

  async getById(id: number): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    const data = await response.json();
    return data as T;
  }

  async post(data: T): Promise<T> {
    try {
        const response = await fetch(`${this.baseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log("Sending data:", JSON.stringify(data));

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al crear la entidad: ${errorMessage}`);
        }

        const newData = await response.json();
        return newData as T;
    } catch (error) {
        console.error("Error en la solicitud POST:", error);
        throw error;
    }
}


  async put(id: number, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as T;
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar el elemento con ID ${id}`);
    }
  }
}
