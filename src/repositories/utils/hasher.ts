import bcrypt from "bcryptjs";

export class Hasher { 

    salt = bcrypt.genSaltSync(10);
    passwordHash!:string;

    async hashPassword(password: string) {
        return this.passwordHash = bcrypt.hashSync(password, this.salt);
    }

    async compareHashes(password: string, hashedPassword: string) {
        return bcrypt.compare(password, hashedPassword)
        .then(match => match)
        .catch(err => {
            return false;
        });
    }
}

export default Hasher;