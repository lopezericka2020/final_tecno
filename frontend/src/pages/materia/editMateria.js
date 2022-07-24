
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import toastr from 'toastr';
import { GET_ALLMATERIA } from '../../queries/MateriaQueries';

export default function EditMateria(props) {
    const navigate = useNavigate();
    const params = useParams();

    const [nombre, setNombre] = React.useState('');
    const [sigla, setSigla] = React.useState('');
    const [concurrencia, setConcurrencia] = React.useState(null);
    const [estado, setEstado] = React.useState(true);

    const getMateria = useQuery(
        gql`
            {
                getMateria( id: "${params.idmateria}" ) {
                    id
                    sigla
                    nombre
                    fecha_creacion
                    estado
                    concurrencia
                }
            }
        `
    );

    React.useEffect( () => {
        if ( !getMateria.loading ) {
            if ( getMateria.data ) {
                if ( getMateria.data.getMateria ) {
                    setSigla(getMateria.data.getMateria.sigla);
                    setNombre(getMateria.data.getMateria.nombre);
                    setConcurrencia(getMateria.data.getMateria.concurrencia);
                    setEstado(getMateria.data.getMateria.estado === "true" ? true : false);
                }
            }
        }
    }, [ getMateria ] );

    const [ updateMateria ] = useMutation( gql`
        mutation {
            updateMateria (
                id: "${params.idmateria}"
                input: {
                    sigla: "${sigla}",
                    nombre: "${nombre}",
                    estado: "${estado}",
                    concurrencia: "${concurrencia}"
                }
            )
            {
                message
                success
            }
        }
    `, {
        variables: { sigla, nombre, estado },
        refetchQueries: [ { query: GET_ALLMATERIA, } ],
    } );

    function onBack(e) {
        e.preventDefault();
        navigate('/materia/index');
    }

    function onSubmitStore(e) {
        e.preventDefault();
        if ( sigla.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Sigla', { closeButton: true, progressBar: true, } );
            return;
        }
        if ( nombre.toString().trim().length === 0 ) {
            toastr.warning( 'No se permite campo vacio.', 'Campo Nombre', { closeButton: true, progressBar: true, } );
            return;
        }
        updateMateria().then( (data) => {
            if ( data.data.updateMateria ) {
                if ( data.data.updateMateria.success === true ) {
                    navigate('/materia/index');
                } else {
                    toastr.error( data.data.updateMateria.message, 'Error al actualizar', { closeButton: true, progressBar: true, } );
                }
            }
        } ). catch ( (e) => {
            console.log(e);
        } ) . finally ( () => {
            console.log('Finish')
        } );
    }

    if ( getMateria.loading ) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role={"status"}>
                    <span className="sr-only">
                        
                    </span>
                </div>
            </div>
        );
    };

    if ( getMateria.error ) {
        return (
            <p>Algo salió mal, intentar nuevamente...</p>
        );
    }

    return (
        <div className="main-content">
            <section className="section">
                <h1 className="section-header">
                    <div>
                        Editar Materia
                    </div>
                    <div className="float-right">
                        <button className="btn btn-sm btn-primary" onClick={onBack}>
                            Atras
                        </button>
                    </div>
                </h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card card-primary">
                            <div className="card-header"><h4>Registrar</h4></div>

                            <div className="card-body">
                                <form method="POST" onSubmit={onSubmitStore}>

                                    <div className="row">
                                        <div className="form-group col-4">
                                            <label htmlFor="sigla_materia">Sigla</label>
                                            <input id="sigla_materia" type="text" className="form-control" 
                                                value={sigla}
                                                onChange={ (e) => setSigla(e.target.value) }
                                            />
                                        </div>
                                        <div className="form-group col-8">
                                            <label htmlFor="nombre_materia">Nombre</label>
                                            <input id="nombre_materia" type="text" className="form-control" 
                                                value={nombre}
                                                onChange={ (e) => setNombre(e.target.value) }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" checked={estado} className="custom-control-input" id="estado_docente"
                                                readOnly
                                            />
                                            <label className="custom-control-label" 
                                                htmlFor="estado_docente" 
                                                onClick={ () => setEstado(!estado) }
                                                style={{ cursor: 'pointer', }}
                                            >
                                                Activo
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-danger mr-1" onClick={onBack}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Editar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
