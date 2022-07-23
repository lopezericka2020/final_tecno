

console.log('Te Saluda Ericka Lopez Santos de Bolivia - Santa Cruz');

import app from './app'
import {AppDataSource} from './db'

async function main() {
    try{
        await AppDataSource.initialize();
        app.listen(7777)
        console.log('ingresar a --> http://localhost:7777/graphql');
    } catch (error){
        console.error(error);
    }
}
main();
