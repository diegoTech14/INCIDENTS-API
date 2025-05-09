import bcrypt from "bcryptjs";

export class Hasher { 

    salt = bcrypt.genSaltSync(10);
    passwordHash!:string;

    hashPassword(password: string) {
        return this.passwordHash = bcrypt.hashSync(password, this.salt);
    }

    compareHashes(password: string, hashedPassword: string) {
        bcrypt.compare(password, hashedPassword, (err, res) => {
            return res
        });
    }
}

export default Hasher;