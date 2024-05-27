import { useEffect, useState } from "react";
import { useAtributos } from "../../hooks/useAtributos";
import UnidadMedidaService from "../../servicios/UnidadMedidaService";
import UnidadMedida from "../../entidades/UnidadMedida";
import { Box, Button } from "@mui/material";
import './UnidadMedida.css';
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

function UnidadMedidaForm() {
    const { unidadesMedida, setUnidadesMedida } = useAtributos();
    const [txtDenominacionNueva, setTxtDenominacionNueva] = useState<string>("");
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const urlapi = import.meta.env.VITE_API_URL;
    const unidadesMedidaService = new UnidadMedidaService(urlapi + "/unidadesmedida");

    const getUnidadesMedidaRest = async () => {
        let nuevasUnidades: UnidadMedida[] = await unidadesMedidaService.getAll();
        setUnidadesMedida(nuevasUnidades);
    }

    const mostrarInput = (categoriaPadreId?: number) => {
        const inputs = document.getElementsByClassName("input-categoria");
        for (let i = 0; i < inputs.length; i++) {
            const slide = inputs[i] as HTMLElement;
            slide.setAttribute("hidden", "true");
        }
        setTxtDenominacionNueva("");

        if (categoriaPadreId !== null)
            document.getElementById("inputCategoria" + categoriaPadreId)?.removeAttribute("hidden");
    }

    const save = async () => {
        if (txtDenominacionNueva == undefined || txtDenominacionNueva == "") {
            setTxtValidacion("Ingrese la unidad de medida");
            return;
        }
        if (unidadesMedida.some(a => a.denominacion === txtDenominacionNueva)) {
            setTxtValidacion("La unidad de medida ya existe");
            return;
        }

        const unidadNueva: UnidadMedida = new UnidadMedida();
        unidadNueva.denominacion = txtDenominacionNueva;

        await unidadesMedidaService.post(unidadNueva);

        setTxtValidacion("");
        mostrarInput();

        await getUnidadesMedidaRest();
    }

    const eliminarUnidadMedida = async (unidadId: number) => {
        try {
            await unidadesMedidaService.delete(unidadId);
        } catch (exception) {
            setTxtValidacion("Hay artículos que usan esta unidad de medida! Asegúrese de eliminar esos artículos primero");
            return;
        }

        setTxtValidacion("");
        await getUnidadesMedidaRest();
    }

    const closeForm = async () => {
        let modalClose: HTMLElement | null = document.getElementById("btn-close-unidad-medida");
        modalClose?.click();
    }

    useEffect(() => {
        getUnidadesMedidaRest();
    }, []);

    return (
       
        <div className="unidad-medida-container">
            <div className="unidad-medida-header">
                <input
                    type="text"
                    className="form-control unidad-medida-input"
                    placeholder="Unidad de medida"
                    value={txtDenominacionNueva}
                    onChange={(e) => setTxtDenominacionNueva(String(e.target.value))}
                />
               <Button
                    onClick={save}
                    sx={{
                        bgcolor: "#a6c732",
                        "&:hover": {
                            bgcolor: "#a0b750",
                        },
                        my: 3,
                        mx: 1,
                        width: 'auto',
                        maxWidth: 200
                    }}
                    variant="contained"
                >
                    Crear
                </Button>
            </div>

            <div className="accordion accordion-flush unidad-medida-accordion" id="accordionFlush0">
                {unidadesMedida.map(unidadMedida => (
                    <div key={unidadMedida.id} >
                        <h2 className="accordion-header d-flex flex-row" id={"flush-heading" + unidadMedida.id}>
                            <div className="contenido form-control " style={{fontSize:"20px"}}>
                                {unidadMedida.denominacion}
                            </div>
                            <Button
                                style={{
                                    margin:"10px 1px",
                                    backgroundColor: "#e05151",
                                    padding: "10px 15px",     // Ajusta el tamaño del botón
                                    height: "40px",
                                    width: "50px",
                                    minWidth: "auto",        // Asegura que el ancho mínimo sea automático
                                    minHeight: "10px",       // Asegura que la altura mínima sea automática

                                }}
                                className="custom-button"
                                variant="contained"
                                color="primary"
                                onClick={() => eliminarUnidadMedida(unidadMedida.id)}
                            >
                                <CIcon icon={cilTrash} size="sm" />

                            </Button>
                        </h2>
                        
                    </div>
                    
                ))}
                
            </div>

            <div className="unidad-medida-validation">
                <label>{txtValidacion}</label>
            </div>

            <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                    onClick={closeForm}
                    sx={{
                        bgcolor: "#a6c732",
                        "&:hover": {
                            bgcolor: "#a0b750",
                        },
                        my: 3,
                        mx: 1,
                        width: 'auto',
                        maxWidth: 200
                    }}
                    variant="contained"
                >
                    Guardar
                </Button>
            </Box>
        </div>
      
    );
};

export default UnidadMedidaForm;