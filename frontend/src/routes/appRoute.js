
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Inicio from '../pages/inicio';
import IndexDocente from '../pages/docente/indexDocente';
import CreateDocente from '../pages/docente/createDocente';
import EditDocente from '../pages/docente/editDocente';

import IndexAlumno from '../pages/alumno/indexAlumno';
import CreateAlumno from '../pages/alumno/createAlumno';
import EditAlumno from '../pages/alumno/editAlumno';

import IndexMateria from '../pages/materia/indexMateria';
import CreateMateria from '../pages/materia/createMateria';
import EditMateria from '../pages/materia/editMateria';

import IndexGestion from '../pages/gestion/indexGestion';
import CreateGestion from '../pages/gestion/createGestion';
import EditGestion from '../pages/gestion/editGestion';

import IndexInscripcion from '../pages/inscripcion/indexInscripcion';
import CreateInscripcion from '../pages/inscripcion/createInscripcion';
import EditInscripcion from '../pages/inscripcion/editarInscripcion';

export default function AppRoute() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='/docente/index' element={<IndexDocente />} />
                <Route path='/docente/create' element={<CreateDocente />} />
                <Route path='/docente/edit/:iddocente' element={<EditDocente />} />

                <Route path='/alumno/index' element={<IndexAlumno />} />
                <Route path='/alumno/create' element={<CreateAlumno />} />
                <Route path='/alumno/edit/:idalumno' element={<EditAlumno />} />

                <Route path='/materia/index' element={<IndexMateria />} />
                <Route path='/materia/create' element={<CreateMateria />} />
                <Route path='/materia/edit/:idmateria' element={<EditMateria />} />

                <Route path='/gestion/index' element={<IndexGestion />} />
                <Route path='/gestion/create' element={<CreateGestion />} />
                <Route path='/gestion/edit/:idgestion' element={<EditGestion />} />

                <Route path='/inscripcion/index' element={<IndexInscripcion />} />
                <Route path='/inscripcion/create' element={<CreateInscripcion />} />
                <Route path='/inscripcion/edit/:idinscripcion' element={<EditInscripcion />} />
            </Routes>
        </>
    );
};
