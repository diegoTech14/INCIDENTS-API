export interface userCredentials { 
    email: string, 
    password: string,
}

export interface userIdentifier { 
    dni: string
}

export interface roles { 
    role_id: number
}

export interface jwtPayload {
    user_dni: string, 
    roles: roles[]
}

export interface roleRoute { 
    role_id:number
}