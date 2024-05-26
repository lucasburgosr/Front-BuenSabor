import { useState } from "react";
import Swal from "sweetalert2";
import { Button, TextField } from "@mui/material";

const URL_API = import.meta.env.VITE_API_URL;

interface UploadImageProps {
  onImageUpload: (uploadedImageUrl: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const uploadFiles = async () => {
    if (!selectedFiles) {
      return Swal.fire("No hay imágenes seleccionadas", "Selecciona al menos una imagen", "warning");
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("uploads", file);
    });

    Swal.fire({
      title: "Subiendo imágenes...",
      text: "Espere mientras se suben los archivos.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`${URL_API}/images/uploads`, {
        method: "POST",
        body: formData,
      });

      Swal.close();

      if (response.ok) {
        const data = await response.json();
        Swal.fire("Éxito", "Imágenes subidas correctamente", "success");
        onImageUpload(data.imageUrl); // Asumimos que la URL está en `data.imageUrl`
      } else {
        Swal.fire("Error", "Algo falló al subir las imágenes, inténtalo de nuevo.", "error");
      }
    } catch (error) {
      Swal.close();
      Swal.fire("Error", "Algo falló, contacta al desarrollador.", "error");
      console.error("Error:", error);
    }

    setSelectedFiles(null);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2vh", padding: ".5rem" }}>
        <TextField 
          id="outlined-basic"
          variant="outlined"
          type="file"
          onChange={handleFileChange}
          inputProps={{ multiple: true }}
          style={{backgroundColor:'#e2e9d0'}}
        />
        <Button variant="contained" onClick={uploadFiles}style={{ backgroundColor:'#a6c732'}} >
          Subir Imágenes
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;
