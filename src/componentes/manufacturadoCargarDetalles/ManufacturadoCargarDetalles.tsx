
import { useEffect, useState }from "react";
import ArticuloInsumo from '../../entidades/ArticuloInsumo';
import ArticuloManufacturadoDetalle from '../../entidades/ArticuloManufacturadoDetalle';
import ArticuloInsumoService from "../../servicios/ArticuloInsumoService";

type DetallesManufacturadosArgs = {
    detallesPrevios: ArticuloManufacturadoDetalle[],
    handleChange: (key: keyof object, value: any) => void
}

function ManufacturadoCargarDetalles({ detallesPrevios, handleChange }: DetallesManufacturadosArgs) {
    const [detalles, setDetalles] = useState<ArticuloManufacturadoDetalle []>([]);
    const [insumos, setInsumos] = useState<ArticuloInsumo[]>([]);
    const [selectedInsumo, setSelectedInsumo] = useState("0");
    const [cantidad, setCantidad] = useState(0);
    const [unidadMedida, setUnidadMedida] = useState("");

    const urlapi = import.meta.env.VITE_API_URL;
    const articuloInsumoService = new ArticuloInsumoService(urlapi + "/insumos");

    const getInsumosRest = async () => {
        const datos:ArticuloInsumo[] = await articuloInsumoService.getAll();
        setInsumos(datos.filter(insumo => {return insumo.esParaElaborar}));
    }

    const agregarInsumo = () => {
        if (selectedInsumo === "0") {
            console.log("No se ha seleccionado un insumo.");
            return;
        }
        if (cantidad === 0) {
            console.log("La cantidad no puede ser cero.");
            return;
        }

        const insumo:ArticuloInsumo = insumos.filter((insumo) => {return insumo.id === Number(selectedInsumo)})[0];
        console.log("Insumo seleccionado:", insumo);

        const detalle:ArticuloManufacturadoDetalle = new ArticuloManufacturadoDetalle;
        detalle.articuloInsumo = insumo;
        detalle.cantidad = cantidad;

        console.log("Nuevo detalle a agregar:", detalle);
        setDetalles( [...detalles.filter(detalle => {return detalle.articuloInsumo.id !== insumo.id}), detalle] );

        setCantidad(0);
        setSelectedInsumo("0");
    }

    const deleteDetalle = (id:number) => {
        console.log("Eliminando detalle con índice:", id);
        setDetalles([...detalles.filter((_detalle, index) => index !== id)]);
    }

    const handleChangeInsumo = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const idInsumo = e.target.value;
        let unidad = "";
        if (idInsumo !== "0") {
            const insumoSeleccionado = insumos.filter((insumo) => {return insumo.id === Number(e.target.value)})[0];
            unidad = insumoSeleccionado.unidadMedida.denominacion;
            console.log("Unidad de medida seleccionada:", unidad);
        }
        setUnidadMedida(unidad);
        setSelectedInsumo(e.target.value);
    }

    useEffect(() => {
        getInsumosRest();
    }, []);

    useEffect(() => {
        setDetalles(detallesPrevios);
    }, [detallesPrevios]);

    useEffect(() => {
        handleChange('articuloManufacturadoDetalles' as keyof object, detalles);
    }, [detalles]);

    console.log("Detalles actuales:", detalles);

    return (
    <div className="p-3 border rounded">
        
        <div style={{height:'248px', overflowY:'auto',}}>
        <table className='table' >
            <thead >
                <tr >
                    <th style={{width:"50%", textAlign:'left', marginLeft: '10%',backgroundColor:'#eaf1d5'}}>
                        <label htmlFor="cboDetalleInsumo" className="form-label">Insumo</label>
                        <select style={{border: '2px solid black', padding: '10px',backgroundColor:'#e0ebc2' }} id="cboDetalleInsumo" className='form-select'  value={selectedInsumo} onChange={e => handleChangeInsumo(e)}>
                                
                            <option  value={0}>Seleccionar insumo</option>

                            {insumos?.map((insumo:ArticuloInsumo) => 
                                <option key={insumo.id} value={insumo.id}>{insumo.denominacion}</option>
                            )}

                        </select>
                    </th>

                    <th style={{width:"10%", textAlign:'left',backgroundColor:'#eaf1d5'}}>
                        <label htmlFor="txtCantidad" className="form-label">Cantidad</label>
                        <input style={{border: '2px solid black', padding: '10px',backgroundColor:'#e0ebc2' }} type="text" id="txtCantidad" className="form-control" pattern="[0-9]+" placeholder="Ingrese la cantidad del insumo" value={cantidad ? cantidad : ''} onChange={e => setCantidad(Number(e.target.value))} />
                    </th>

                    <th style={{width:"20%", textAlign:'center',backgroundColor:'#eaf1d5'}}>
                        <label htmlFor="txtUnidadMedida" className="form-label">Medida</label>
                        <input style={{border: '2px solid black', padding: '10px',backgroundColor:'#e0ebc2' }} type="text" id="txtUnidadMedida" className="form-control" value={unidadMedida} disabled />
                    </th>

                    <th style={{width:"25%", textAlign:'center',backgroundColor:'#eaf1d5'}}>
                        <label htmlFor="btnAgregar" className="form-label">Acciones</label>
                        <a  className="btn  mb-1 form-control" id="btnAgregar" style={{ textAlign: "center", backgroundColor: "#a6c732" ,marginBottom:10,color:'white', padding: '10px' }} onClick={agregarInsumo}>Agregar</a>
                    </th>
                </tr>
            </thead>
            <tbody>
            {detalles.map((detalle, index) => (
                <tr key={index}>
                    <td style={{width:"60%",backgroundColor:'#eaf1d5'}}>{detalle.articuloInsumo.denominacion}</td>
                    <td style={{width:"5%", textAlign:'center',backgroundColor:'#eaf1d5'}}>{detalle.cantidad}</td>
                    <td style={{width:"10%", textAlign:'center',backgroundColor:'#eaf1d5'}}>{detalle.articuloInsumo.unidadMedida.denominacion}</td>
                    <td style={{width:"25%", textAlign:'center',backgroundColor:'#eaf1d5'}}><a className="btn btn-danger mb-0" style={{ marginBottom:10,color:'white' }} onClick={() => deleteDetalle(index)}>Eliminar</a></td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
    );
}

export default ManufacturadoCargarDetalles;