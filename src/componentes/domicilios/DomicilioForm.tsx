import { useEffect, useState } from "react";
import '../../slick-theme.css';
import Domicilio from '../../entidades/Domicilio';
import Localidad from "../../entidades/Localidad";
import LocalidadService from "../../servicios/LocalidadService";

type DomiciliosArgs = {
    domicilioPrevio: Domicilio,
    errors?: { [key in keyof Domicilio]?: string },
    handleChangeDomicilio: (key: keyof object, value: any) => void
}

function DomicilioForm({domicilioPrevio, errors={}, handleChangeDomicilio}:DomiciliosArgs) {
    const [domicilio, setDomicilio] = useState<Domicilio>(new Domicilio());
    const [localidades, setLocalidades] = useState<Localidad[]>([]);

    const urlapi = import.meta.env.VITE_API_URL;
    const localidadService = new LocalidadService(urlapi + "/localidades");

    const getLocalidadesRest = async () => {
        let localidades:Localidad[] = await localidadService.getAll();
        setLocalidades(localidades);
    }

    const handleChange = (key: string, value: any) => {
        let finalValue: any;
        errors[key] = ''
        if (key === 'localidad') {
            let localidad:Localidad;
            if (localidades.some(l => l.nombre === value)) {
                localidad = localidades.find(l => l.nombre === value)!;
            } else {
                localidad = new Localidad();
                localidad.nombre = String(value);
            }
            finalValue = localidad;
        }
        else if (typeof domicilio[key] === 'number') {
            finalValue = Number(value);
        } else {
            finalValue = value;
        }
  
        const newData = { ...domicilio, [key]: finalValue };

        setDomicilio(newData);
      };

    useEffect(() => {
        getLocalidadesRest();
        setDomicilio(domicilioPrevio);
    }, [domicilioPrevio.id]);

    useEffect(() => {
        handleChangeDomicilio('domicilio' as keyof object, domicilio);
    }, [domicilio]);
    
    return (
    <div className="mb-3 p-3 border rounded" >
        <div className="mb-3 row">
            <div className="col-9">
                <label htmlFor="calle" className="form-label">Calle</label>
                <input style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
                    type='text'
                    id='calle'
                    className='form-control'
                    value={domicilio.calle}
                    onChange={(e) => handleChange('calle', e.target.value)}
                    required
                    />
            {errors['calle'] && <div className='ms-1 mt-1 text-danger'>{errors['calle']}</div>}
            </div>
            <div className="col-3">
                <label htmlFor="numero" className="form-label">Número</label>
                <input style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
                    type='number'
                    min={0}
                    id='numero'
                    className='form-control'
                    value={domicilio.numero}
                    onChange={(e) => handleChange('numero', e.target.value)}
                    required
                    />
            {errors['numero'] && <div className='ms-1 mt-1 text-danger'>{errors['numero']}</div>}
            </div>
        </div>
        <div className="mb-3 row">
            <div className="col">
                <label htmlFor="pais" className="form-label">País</label>
                <input style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
                    type='text'
                    id='pais'
                    className='form-control'
                    value={domicilio.localidad.provincia.pais.nombre}
                    onChange={(e) => handleChange('pais', e.target.value)}
                    required
                    />
            {errors['pais'] && <div className='ms-1 mt-1 text-danger'>{errors['pais']}</div>}
            </div>
            <div className="col">
                <label htmlFor="provincia" className="form-label">Provincia</label>
                <input style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
                    type='text'
                    min={0}
                    id='provincia'
                    className='form-control'
                    value={domicilio.localidad.provincia.nombre}
                    onChange={(e) => handleChange('provincia', e.target.value)}
                    required
                    />
            {errors['provincia'] && <div className='ms-1 mt-1 text-danger'>{errors['provincia']}</div>}
            </div>
        </div>
        <div className="mb-3 row">
            <div className="col-9">
                <label htmlFor="localidad" className="form-label">Localidad</label>
                <input style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
                    type='text'
                    id='localidad'
                    className='form-control'
                    value={domicilio.localidad.nombre}
                    onChange={(e) => handleChange('localidad', e.target.value)}
                    required
                    />
            {errors['localidad'] && <div className='ms-1 mt-1 text-danger'>{errors['localidad']}</div>}
            </div>
            <div className="col-3" >
                <label htmlFor="cp" className="form-label">Código postal</label>
                <input style={{ backgroundColor: '#e0ebc2', border: '2px solid black', padding: '10px' }}
                    type='number'
                    min={0}
                    id='cp'
                    className='form-control'
                    value={domicilio.cp}
                    onChange={(e) => handleChange('cp', e.target.value)}
                    required
                    />
            {errors['cp'] && <div className='ms-1 mt-1 text-danger'>{errors['cp']}</div>}
            </div>
        </div>
    </div>
    );
}

export default DomicilioForm;