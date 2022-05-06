import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
	const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []); //Patra obtener el valor como lo dejé en localStorage
	const [paciente, setPaciente] = useState({});

	
	//Sincroniza el state con lo que hay en pacientes
	useEffect(() => {
		localStorage.setItem('pacientes', JSON.stringify(pacientes));
	}, [pacientes])//Se ejecuta cuando cambia el valor de pacientes
	
	//Eliminar paciente
	const eliminarPaciente = id => {
		const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id); //Filtra los pacientes que no coincidan con el id
		setPacientes(pacientesActualizados); //Lo actualiza en el state eliminandolo
	};

	return (
		<div className="container mx-auto mt-20">
			<Header />
			<div className="mt-12 md:flex">
				<Formulario
					pacientes={pacientes}
					setPacientes={setPacientes}
					paciente={paciente}
					setPaciente={setPaciente}
				/>
				<ListadoPacientes
					pacientes={pacientes} //PROP Propiedad que se envia al componente ListadoPacientes
					setPaciente={setPaciente}
					eliminarPaciente={eliminarPaciente}
				/>
			</div>
		</div>
	);
}

export default App;
