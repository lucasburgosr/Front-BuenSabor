import { useEffect, useRef, useState } from "react";
import '../../slick-theme.css';
import Domicilio from '../../entidades/Domicilio';
import MostrarDomicilio from "./MostrarDomicilio";
import ModalGenerico from "../modalGenerico/ModalGenerico";
import DomicilioForm from "./DomicilioForm";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

type DomiciliosArgs = {
    domiciliosPrevios: Domicilio[],
    editar?: boolean,
    handleChange: (key: keyof object, value: any) => void
}

function Domicilios({domiciliosPrevios, editar = false, handleChange}:DomiciliosArgs) {
    const [domicilios, setDomicilios] = useState<Domicilio[]>([]);
    const [domicilioSeleccionado, setDomicilioSeleccionado] = useState<Domicilio>(new Domicilio());
    const [errors, setErrors] = useState<{ [key in keyof Domicilio]?: string }>({});

    const modalRefDomicilioForm = useRef<any>(null);

    const handleDomicilioChange = (_key:keyof Domicilio, value:any) => {
        const domicilioNuevo = value;
        domicilioNuevo.id = domicilioSeleccionado.id;
        setDomicilioSeleccionado(domicilioNuevo);
    }

    const handleDomicilioUpdate = () => {
        const erroresNuevos = {calle:'',localidad:'',numero:'',cp:''};
        if (domicilioSeleccionado.calle === '') {
            erroresNuevos['calle'] = 'Debe ingresar calle';
        }
        if (domicilioSeleccionado.localidad.nombre === '') {
            erroresNuevos['localidad'] = 'Debe ingresar localidad';
        }
        if (domicilioSeleccionado.numero <= 0) {
            erroresNuevos['numero'] = 'Ingrese un número válido';
        }
        if (domicilioSeleccionado.cp <= 0) {
            erroresNuevos['cp'] = 'Ingrese código postal válido';
        }
        setErrors(erroresNuevos);
        if (erroresNuevos['calle'] || erroresNuevos['localidad'] || erroresNuevos['numero'] || erroresNuevos['cp']) {
            return
        }
        
        modalRefDomicilioForm.current.closeModal();
        setDomicilios([...domicilios.filter(domicilio => domicilio.id !== domicilioSeleccionado.id), domicilioSeleccionado].sort((a, b) => a.id - b.id));
    }

    const handleDomicilioDelete = (id: number) => {
        setDomicilios([...domicilios.filter(domicilio => domicilio.id !== id)].sort((a, b) => a.id - b.id));
    }

    const handleOpenModal = (value: Domicilio) => {
        setDomicilioSeleccionado(value);
        modalRefDomicilioForm.current.openModal();
    }

    useEffect(() => {
        setDomicilios(domiciliosPrevios);
    }, [domiciliosPrevios]);

    useEffect(() => {
        handleChange('domicilios' as keyof object, domicilios);
    }, [domicilios]);
    
    return (
    <>
    
    <ModalGenerico titulo="domicilio" tituloModal="Domicilio" ref={modalRefDomicilioForm}>
        <>
        <DomicilioForm domicilioPrevio={domicilioSeleccionado} handleChangeDomicilio={handleDomicilioChange} errors={errors}/>
        <button type='button' className="btn" onClick={handleDomicilioUpdate}>Enviar</button>
        </>
    </ModalGenerico>

    <div style={{overflowY:"scroll", height:"276px"}}>
    <div className="mx-3" >
        {domicilios.map((domicilio) => 
            <MostrarDomicilio key={domicilio.id} handleOpenModal={handleOpenModal} domicilioPrevio={domicilio} editar={editar} handleDelete={handleDomicilioDelete}/>
        )}
    </div>
    </div>
    
    {editar &&
        <div className="row mx-1 mt-3">
           

            <Button
            onClick={() => handleOpenModal(new Domicilio)}
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
            Nuevo
          </Button>
        </div>
    }

    </>
    );
}

export default Domicilios;