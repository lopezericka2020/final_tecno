
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useQuery } from '@apollo/client';
import { GET_ALLDOCENTE } from '../../queries/DocenteQueries';
import RowDocente from './rowDocente';

ReactModal.setAppElement('body');

export default function IndexDocente(props) {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_ALLDOCENTE);

    function onCreate(e) {
        e.preventDefault();
        navigate('/docente/create');
    }

    if ( loading ) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role={"status"}>
                    <span className="sr-only">
                        
                    </span>
                </div>
            </div>
        );
    };

    if ( error ) {
        return (
            <p>Algo salió mal, intentar nuevamente...</p>
        );
    }

    return (
        <div className="main-content">
            <section className="section">
                <h1 className="section-header">
                    <div>
                        Gestionar Docente
                    </div>
                    <div className="float-right">
                        <button className="btn btn-sm btn-primary" onClick={onCreate}>
                            Nuevo
                        </button>
                    </div>
                </h1>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="float-right">
                                    <form>
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Buscar..." />
                                            <div className="input-group-btn">
                                                <button className="btn btn-secondary"><i className="ion ion-search"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <h4>Listado</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <th className="text-center">#</th>
                                                <th>Ci</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Género</th>
                                                <th>Estado Civil</th>
                                                <th>Email</th>
                                                <th>Concurrencia</th>
                                                <th>Acción</th>
                                            </tr>
                                            { data.getAllDocente.map( ( item, key ) => {
                                                return (
                                                    <RowDocente key={key} docente={item} index={key} />
                                                );
                                            } ) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
