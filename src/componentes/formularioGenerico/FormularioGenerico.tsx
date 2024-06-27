import { useEffect, useMemo, useState } from 'react';
import InputRenderer from './InputRenderer';
import useFormHandlers from './useFormHandlers';
import UploadImage from '../common/UploadImage';
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

type FormProps<T extends object> = {
  data: T;
  listaSelects?: any;
  onSubmit: (formData: T) => void;
};

function FormularioGenerico<T extends object>({ data, listaSelects = {}, onSubmit }: FormProps<T>) {
  const [formData, setFormData] = useState<T>(data);
  const [errors, setErrors] = useState<{ [key in keyof T]?: string }>({});
  const { handleChange, handleSubmit } = useFormHandlers<T>(formData, setFormData, errors, setErrors, listaSelects, onSubmit);

  const keys = useMemo(() => Object.keys(data) as Array<keyof T>, [data]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleImageUpload = (uploadedImageUrl: string) => {
    setFormData({
      ...formData,
      imageUrl: uploadedImageUrl // Ajusta el campo según tu modelo de datos
    });
  };

  return (
    <div style={{ backgroundColor: '#f1f5e4' }} >
      <form onSubmit={handleSubmit} className='container' >
        <div className='row'  >
          {keys.map((atributo, indice) =>
            !['id', 'pedidos', 'esParaElaborar', 'type', 'sucursales', 'casaMatriz', 'eliminado'].includes(String(atributo)) && (
              <div key={String(atributo)} className='mb-3' >
                <label htmlFor={String(atributo)} className='form-label' style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '26px',
                  display: 'block',   
                }}>
                  {data.constructor.labels ? data.constructor.labels[indice] : String(atributo)}
                </label>
                <InputRenderer key={String(atributo)} atributo={atributo} value={formData[atributo]} listaSelects={listaSelects} data={data} handleChange={handleChange} errors={errors}>
                </InputRenderer>
              </div>
            )
          )}
        </div>

        <div className='mb-35' >
          <UploadImage onImageUpload={handleImageUpload} />
        </div>
        <Button
          type='submit'
          sx={{
            bgcolor: "#a6c732",
            "&:hover": {
              bgcolor: "#a0b750",
            },
            my: 3,
            mx: 1
          }}
          variant="contained"
          startIcon={<Add />}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default FormularioGenerico;
