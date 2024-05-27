import { useEffect, useState } from "react";
import Categoria from "../../entidades/Categoria";
import CategoriaService from "../../servicios/CategoriaService";
import { useAtributos } from "../../hooks/useAtributos";
import './Categorias.css';
import { Box, Button } from "@mui/material";
function CategoriasForm() {
    const { categorias, setCategorias } = useAtributos();
    const [txtDenominacionNueva, setTxtDenominacionNueva] = useState<string>("");
    const [txtValidacion, setTxtValidacion] = useState<string>("");

    const urlapi = import.meta.env.VITE_API_URL;
    const categoriaService = new CategoriaService(urlapi + "/categorias");

    const getCategoriasRest = async () => {
        let nuevasCategorias: Categoria[] = await categoriaService.getAll();
        setCategorias(nuevasCategorias);
    }

    const mostrarCategorias = (categoria: Categoria, padreId: number) => {
        const tieneHijos: boolean = categoria.subCategorias.length > 0;
        return (
            <div key={categoria.id} className="accordion-item">
                <h2 className="accordion-header d-flex flex-row" id={"flush-heading" + categoria.id}>
                    {tieneHijos
                        ? <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + categoria.id} aria-expanded="false" aria-controls={"flush-collapse" + categoria.id}> {categoria.denominacion} </button>
                        : <div className="accordion-button accordion-no-arrow collapsed"> {categoria.denominacion} </div>
                    }

                    <Button
                        onClick={() => mostrarInput(categoria.id)}
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

                    {!tieneHijos &&

                        <Button
                            onClick={() => eliminarCategoria(categoria.id)}
                            sx={{
                                bgcolor: "#e05151",
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
                            Eliminar
                        </Button>
                    }

                </h2>

                <h2 className="accordion-header input-categoria" id={"inputCategoria" + categoria.id} hidden>
                    <div className="d-flex flex-row">

                        <div className="accordion-button accordion-no-arrow collapsed">
                            <input type="text" className="form-control" placeholder="Nombre de la categoría" value={txtDenominacionNueva} onChange={(e) => setTxtDenominacionNueva(String(e.target.value))}></input>
                        </div>


                        <Button
                            onClick={() => save(categoria.id)}
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
                </h2>

                {tieneHijos &&
                    <div id={"flush-collapse" + categoria.id} className="accordion-collapse collapse" aria-labelledby={"flush-heading" + categoria.id} data-bs-parent={"#accordionFlush" + padreId}>
                        <div className="accordion-body">
                            {categoria.subCategorias.map(subcategoria =>
                                mostrarCategorias(subcategoria, categoria.id)
                            )}
                        </div>
                    </div>
                }

            </div>
        )
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

    const save = async (categoriaPadreId: number | null) => {
        if (txtDenominacionNueva == undefined || txtDenominacionNueva == "") {
            setTxtValidacion("Ingrese el nombre de la categoría");
            return;
        }

        const categoriaNueva: Categoria = new Categoria();
        categoriaNueva.denominacion = txtDenominacionNueva;

        if (categoriaPadreId) {
            const categoriaPadre: Categoria = categorias.filter(categoria => categoria.id === categoriaPadreId)[0];
            categoriaPadre.subCategorias.push(categoriaNueva);
            await categoriaService.put(categoriaPadreId, categoriaPadre);
        }
        else {
            await categoriaService.post(categoriaNueva);
        }

        setTxtValidacion("");
        mostrarInput();

        await getCategoriasRest();
    }

    const eliminarCategoria = async (categoriaId: number) => {
        try {
            await categoriaService.delete(categoriaId);
        } catch {
            alert(`Hubo un conflicto. Asegúrese de que la categoría no esté siendo utilizada en otros datos.`);
        }

        await getCategoriasRest();
    }

    useEffect(() => {
        getCategoriasRest();
    }, []);

    return (
        <>
            <div className="categoria-container">
                <div className="categoria-header">
                    <input
                        type="text"
                        className="form-control categoria-input"
                        placeholder="Nombre de la categoría"
                        value={txtDenominacionNueva}
                        onChange={(e) => setTxtDenominacionNueva(String(e.target.value))}
                    />
                    <Button
                        onClick={() => save(null)}
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

                <div className="accordion accordion-flush categoria-accordion" id="accordionFlush0">
                    {categorias
                        .filter(categoria => !categorias.some(categoriaPadre => categoriaPadre.subCategorias.some(subcategoria => subcategoria.id === categoria.id)))
                        .sort((a, b) => (a.denominacion < b.denominacion ? -1 : 1))
                        .map(categoria => mostrarCategorias(categoria, 0))
                    }
                </div>

                <div className="categoria-validation">
                    <label>{txtValidacion}</label>
                </div>
            </div>
        </>
    );
}

export default CategoriasForm;