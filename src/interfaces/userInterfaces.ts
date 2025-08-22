export interface User {
  dni: string;
  name: string;
  first_surname: string;
  second_surname: string;
  phone: string;
  email: string;
  departmentId: number;
  status: boolean;
  password: string;
}


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