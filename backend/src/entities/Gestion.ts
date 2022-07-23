
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()

export class Gestion extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    fecha_inicio: string;

    @Column()
    fecha_fin: string;

    @Column()
    nota: string;

    @Column()
    fecha_creacion: string;

    @Column()
    estado: string;
    
    @Column()
    concurrencia: string;

}

