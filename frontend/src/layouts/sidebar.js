
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarComponent(props) {
    const navigate = useNavigate();

    function onLinkHome(e) {
        e.preventDefault();
        navigate('/');
    }

    function onLinkGestion(e) {
        e.preventDefault();
        navigate('/gestion/index');
    }

    function onLinkDocente(e) {
        e.preventDefault();
        navigate('/docente/index');
    }

    function onLinkEstudiante(e) {
        e.preventDefault();
        navigate('/alumno/index');
    }

    function onLinkMateria(e) {
        e.preventDefault();
        navigate('/materia/index');
    }

    function onLinkInscripcion(e) {
        e.preventDefault();
        navigate('/inscripcion/index');
    }
    
    return (
        <>
            <div className="main-sidebar">
                <aside id="sidebar-wrapper">
                    <div className="sidebar-brand">
                        <a href="index.html" onClick={onLinkHome}>TecnoWeb</a>
                    </div>
                    <div className="sidebar-user">
                        <div className="sidebar-user-picture">
                            <img alt="image" src="/assets/dist/img/avatar/avatar-1.jpeg" />
                        </div>
                        <div className="sidebar-user-details">
                            <div className="user-name">
                                Ericka Lopez Santos
                            </div>
                            <div className="user-role">
                                Administrator
                            </div>
                        </div>
                    </div>
                    <ul className="sidebar-menu">
                        <li className="menu-header">Inicio</li>
                        <li className="active">
                            <a href="index.html" onClick={onLinkHome}>
                                <i className="ion ion-speedometer"></i><span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="credits.html" onClick={onLinkGestion}>
                                <i className="ion ion-ios-copy-outline"></i> Gestión
                            </a>
                            <a href="credits.html" onClick={onLinkDocente}>
                                <i className="ion ion-ios-copy-outline"></i> Docente
                            </a>
                            <a href="credits.html" onClick={onLinkEstudiante}>
                                <i className="ion ion-ios-copy-outline"></i> Estudiante
                            </a>
                            <a href="credits.html" onClick={onLinkMateria}>
                                <i className="ion ion-ios-copy-outline"></i> Materia
                            </a>
                            <a href="credits.html" onClick={onLinkInscripcion}>
                                <i className="ion ion-ios-copy-outline"></i> Inscripción
                            </a>
                        </li>  
                    </ul>
                </aside>
            </div>
        </>
    );
};
