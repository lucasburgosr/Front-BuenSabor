import '../../slick-theme.css';
import Domicilio from '../../entidades/Domicilio';

type DomiciliosArgs = {
    domicilioPrevio: Domicilio,
    editar?: boolean,
    handleOpenModal: (value: Domicilio) => void,
    handleDelete: (id: number) => void,
}

function MostrarDomicilio({domicilioPrevio, editar = false, handleOpenModal, handleDelete}:DomiciliosArgs) {
    return (
    <div className="mb-3 row">

        <div className="card">
        <div className="card-body row" style={{ backgroundColor: '#e0ebc2', border: '1px solid black', padding: '10px' }}>
            <div className="col">
                <h5 className="card-title">Domicilio</h5>
                <h6 className="card-subtitle mb-2 text-muted">{domicilioPrevio.calle} {domicilioPrevio.numero}</h6>
                <p className="card-text">Código postal: {domicilioPrevio.cp}, Localidad: {domicilioPrevio.localidad.nombre}</p>
            </div>
            {editar && 
            <div className="col-2" >
                <div className="d-flex flex-column justify-content-end" >
                    <a className="btn " style={{textAlign: "center", backgroundColor: "#a6c732" ,marginBottom:10,color:'white', padding: '10px'}} onClick={() => handleOpenModal(domicilioPrevio)}>Modificar</a>
                    <a className="btn " style={{textAlign: "center", backgroundColor: "#dd5555" ,marginBottom:10,color:'white', padding: '10px'}} onClick={() => handleDelete(domicilioPrevio.id)}>Eliminar</a>
                </div>
            </div>
            }
        </div>
        </div>
    </div>
    );
}

export default MostrarDomicilio;