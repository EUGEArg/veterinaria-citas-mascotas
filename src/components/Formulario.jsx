import {useState, useEffect} from 'react';
import Error from './Error';

//Funciones del state
const  Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false); //MOstrar alerta de error

    //Cuando detectamos un cambio en el state, se ejecuta este useEffect
    useEffect(() => {
    if(Object.keys(paciente).length > 0) {
        setNombre(paciente.nombre) //Se asocia al formulario de nuevo
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
    }
    }, [paciente])
    
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    //Cuando el usuario haga click en el boton de agregar
    const handleSubmit = (e) => {
        e.preventDefault();

        //Validación de formulario--verificar que los campos estén llenos
        if( [ nombre, propietario, email, fecha, sintomas ].includes('') ){
            console.log('Hay al menos un campo vacío')

            setError(true)
            return;
        }
        setError(false)

        //Objeto de Paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        if(paciente.id) {
            //Editar Objeto---estoy creando un nuevo objeto
            objetoPaciente.id = paciente.id
            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({})
        }else{
            //Nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([ ...pacientes, objetoPaciente]); //Agregar al array de pacientes un nuevo paciente
    
        }

        
         //Reincia el formulario
        setNombre('');
        setPropietario ('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    return(
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Paciente y {''}
                <span className="text-indigo-600 font-bold">Adminístralos</span>
            </p> 
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                
                {error && <Error><p>Todos los campos son obligatorios</p></Error>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-grey-700 uppercase font-bold">Nombre Mascota</label>
                    <input 
                        id="mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="text"
                        placeholder="Nombre de la Mascota"
                        value={nombre} //Valor de la variable nombre
                        onChange={(e) => setNombre(e.target.value)}
                     />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-grey-700 uppercase font-bold">Nombre Propietario</label>
                    <input 
                        id="propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="text"
                        placeholder="Nombre del Propietario"
                        value={propietario} //Valor de la variable nombre
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-grey-700 uppercase font-bold">Email</label>
                    <input 
                        id="email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="email"
                        placeholder="Email Contacto Propietario"
                        value={email} //Valor de la variable nombre
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-grey-700 uppercase font-bold">Alta</label>
                    <input 
                        id="alta"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        type="date"
                        value={fecha} //Valor de la variable nombre
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas"  className="block text-grey-700 uppercase font-bold">Síntomas</label>
                    <textarea 
                        id="sintomas" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                        placeholder="Describe los síntomas"
                        value={sintomas} //Valor de la variable nombre
                        onChange={(e) => setSintomas(e.target.value)}>                        
                    </textarea>                   
                </div>

                <div>
                    <input
                     type="submit"
                     className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
                     value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} //De esta manera puedo cambiar el placeholder del btn submit
                     /> 
                </div>
            </form>   
        </div>
    )
}
                
export default Formulario;