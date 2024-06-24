import Empresa from "../../entidades/Empresa";
import EmpresaService from "../../servicios/EmpresaService";
import CardGenerica from "../../componentes/cardGenerica/CardGenerica";
import { useDispatch } from "react-redux";
import { selectEmpresa } from "../../redux/slices/slicesUnificados";

const Empresas: React.FC = () => {

  const empresa = new Empresa();
  const empresaBase = new Empresa();

  const urlapi = import.meta.env.VITE_API_URL;
  const empresasService = new EmpresaService(urlapi + "/empresas");

  const dispatch = useDispatch();

  const handleEmpresaClick = (empresa: Empresa) => {
    dispatch(selectEmpresa(empresa));
  }

  return (
    <div className="m-3">
      <CardGenerica
        entidadPrevia={empresa}
        entidadBase={empresaBase}
        apiServicio={empresasService}
        onClick={handleEmpresaClick}
      />
    </div>
  );
};

export default Empresas;
