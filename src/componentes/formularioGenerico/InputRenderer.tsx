import ArticuloInsumo from "../../entidades/ArticuloInsumo";
import ArticuloManufacturado from "../../entidades/ArticuloManufacturado";
import Empleado from "../../entidades/Empleado";
import Promocion from "../../entidades/Promocion";
import DomicilioForm from "../domicilios/DomicilioForm";
import Domicilios from "../domicilios/Domicilios";
import CargarImagen from "../imagenes/CargarImagen";
import CargarImagenes from "../imagenes/CargarImagenes";
import ManufacturadoCargarDetalles from "../manufacturadoCargarDetalles/ManufacturadoCargarDetalles";
import SeleccionSucursales from "../seleccionSucursales/SeleccionSucursales";

type InputRendererProps<T> = {
  atributo: keyof T;
  value: any;
  listaSelects: any;
  data: T;
  handleChange: (key: keyof T, value: any) => void;
  errors: { [key in keyof T]?: string };
};

function InputRenderer<T>({ atributo, value, listaSelects, data, handleChange, errors }: InputRendererProps<T>) {
  const handleChangeWrapper = (e: React.ChangeEvent<any>) => {
    handleChange(atributo, e.target.value);
  };

  switch (atributo) {
    case 'imagen':
      return <CargarImagen imagenPrevia={(data as Empleado).imagen} handleChange={handleChange} />;
    case 'imagenes':
      return <CargarImagenes imagenesPrevias={(data as ArticuloInsumo).imagenes} handleChange={handleChange} />;
    case 'articuloManufacturadoDetalles':
      return <ManufacturadoCargarDetalles detallesPrevios={(data as ArticuloManufacturado).articuloManufacturadoDetalles} handleChange={handleChange} />;
    case 'promocionesxxxxx':
      return <SeleccionSucursales sucursalesPrevias={(data as Promocion).sucursales} handleChange={handleChange} />;
    case 'domicilio':
      return <DomicilioForm domicilioPrevio={(data as Empleado).domicilio} handleChangeDomicilio={handleChange} />;
    case 'domicilios':
      return <Domicilios editar domiciliosPrevios={(data as Empleado).domicilios} handleChange={handleChange} />;
    case 'preparacion':
      return (
        <textarea
          id={String(atributo)}
          className='form-control'
          rows={3}
          value={String(value)}
          onChange={handleChangeWrapper}
          required
        />
      );
  }

  if (listaSelects[atributo]) {
    return (
      <>
        <select
          style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
          id={String(atributo)}
          className='form-select'
          value={value ? ((typeof value === 'string' ? value : (value as { id: any }).id)) : '0'}
          onChange={handleChangeWrapper}
          required
        >
          <option disabled value={0}>Seleccionar </option>
          {listaSelects[atributo][0].map((dato: any) => (
            <option key={dato.id} value={dato.id}>{dato.denominacion || dato.nombre}</option>
          ))}
        </select>
        {listaSelects[atributo].length > 1 && listaSelects[atributo][1]}
        {errors[atributo] && <div className='ms-1 mt-1 text-danger'>{errors[atributo]}</div>}
      </>
    );
  } else if (atributo.toString().includes('fecha')) {
    return (
      <input
        style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
        type='date'
        id={String(atributo)}
        className='form-control'
        value={String(value)}
        onChange={handleChangeWrapper}
        required
      />
    );
  } else if (atributo.toString().includes('hora')) {
    return (
      <input
        style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
        type='time'
        id={String(atributo)}
        className='form-control'
        value={String(value)}
        onChange={handleChangeWrapper}
        required
      />
    );
  } else if (atributo === 'rol') {
    return (
      <input
        style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
        type='text'
        id={String(atributo)}
        className='form-control'
        value={String(value)}
        disabled
      />
    );
  } else {
    return (
      <input
        style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
        type={typeof data[atributo] === 'number' ? 'number' : 'text'}
        id={String(atributo)}
        className='form-control'
        min='0'
        max='100000000'
        step='0.01'
        value={String(value)}
        onChange={handleChangeWrapper}
        required
      />
    );
  }
};

export default InputRenderer;
