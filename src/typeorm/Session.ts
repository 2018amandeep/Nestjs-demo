import { ISession } from "connect-typeorm/out";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";


@Entity({name: 'session'})
export class SessionEntity implements ISession{
    @Index()
    @Column('bigint')
    expiredAt = Date.now();

    @PrimaryColumn('varchar', {length: 255})
    id = '';

    @Column('text')
    json = ''; 
}