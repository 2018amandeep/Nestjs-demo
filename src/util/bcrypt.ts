import * as bcrypt from 'bcrypt';

// const SALT = 10;

export function encodePassword(rawPassword: string){
    const SALT = bcrypt.genSaltSync();  // It generates the salt itself
    return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hash: string){
    return bcrypt.compareSync(rawPassword,hash);
}