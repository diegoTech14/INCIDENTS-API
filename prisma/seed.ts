import { MetaSeed } from "./meta-seed";
import { faker } from "@faker-js/faker";
import {
    departments,
    incident_effects,
    roles,
    users,
    incident_categories,
    incident_status,
    incident_risks,
    incident_priorities,
    incidents,
    diagnoses,
    users_x_rol
} from "@prisma/client";

const Meta = new MetaSeed();

const department_seed: departments[] = [
    {
        id: 1,
        description: faker.commerce.department()
    },
    {
        id: 2,
        description: faker.commerce.department()
    }
]

const user_seed: users[] = [
    {
        name: faker.person.firstName(),
        dni: "03a11fcb-49",
        first_surname: faker.person.lastName(),
        second_surname: faker.person.lastName(),
        phone: faker.phone.number({ style: 'national' }),
        email: faker.internet.email(),
        departmentId: 1,
        status: faker.datatype.boolean(),
        password: faker.internet.password(),
    },
    {
        name: faker.person.firstName(),
        dni: "99a11fcb-41",
        first_surname: faker.person.lastName(),
        second_surname: faker.person.lastName(),
        phone: faker.phone.number({ style: 'national' }),
        email: faker.internet.email(),
        departmentId: 2,
        status: faker.datatype.boolean(),
        password: faker.internet.password(),
    },
    {
        name: faker.person.firstName(),
        dni: "34a33fcb-02",
        first_surname: faker.person.lastName(),
        second_surname: faker.person.lastName(),
        phone: faker.phone.number({ style: 'national' }),
        email: faker.internet.email(),
        departmentId: 1,
        status: faker.datatype.boolean(),
        password: faker.internet.password(),
    }
]

const roles_seed: roles[] = [
    {
        rol_id: 1,
        description: faker.person.jobType(),
        status: faker.datatype.boolean(),
    },
    {
        rol_id: 2,
        description: faker.person.jobType(),
        status: faker.datatype.boolean(),
    },
    {
        rol_id: 3,
        description: faker.person.jobType(),
        status: faker.datatype.boolean(),
    }
]

const roles_x_users: users_x_rol[] = [
    {
        role_id:1,
        user_dni: "03a11fcb-49",
    },
    {
        role_id:3,
        user_dni: "99a11fcb-41",
    },
    {
        role_id:2,
        user_dni: "03a11fcb-49",
    },
]

const incident_effects_seed: incident_effects[] = [
    {
        id: 1,
        description: "High"
    },
    {
        id: 2,
        description: "Medium"
    },
    {
        id: 3,
        description: "Low"
    }
]

const incident_categories_seed: incident_categories[] = [

    {
        id: 1,
        description: "Repair"
    },
    {
        id: 2,
        description: "Natural intervention"
    },
    {
        id: 3,
        description: "Attention to furniture"
    }

]

const incident_status_seed: incident_status[] = [
    {
        id: 1,
        description: "Registered"
    },
    {
        id: 2,
        description: "Assigned"
    },
    {
        id: 3,
        description: "Under review"
    },
    {
        id: 4,
        description: "Under repair"
    },
    {
        id: 5,
        description: "Pending purchase"
    },
    {
        id: 6,
        description: "Finished"
    },
    {
        id: 7,
        description: "Approved"
    },
    {
        id: 8,
        description: "Refused"
    },
    {
        id: 9,
        description: "Closed"
    }
]

const incident_risks_seed: incident_risks[] = [
    {
        id: 1,
        description: "Low"
    },
    {
        id: 2,
        description: "Medium"
    },
    {
        id: 3,
        description: "High"
    },
]

const incident_priorities_seed: incident_priorities[] = [
    {
        id: 1,
        description: "Low"
    },
    {
        id: 2,
        description: "Medium"
    },
    {
        id: 3,
        description: "High"
    },
]

const incidents_seed: incidents[] = [
    {
        incident_id: "0000001-2024",
        name: "Gas leak",
        description: "Gas leak in the kitchen",
        close_justification: "",
        incident_place: "Kitchen",
        record_date: faker.date.anytime(),
        cost: 0.0,
        time_to_solve: 5,
        user_dni: "03a11fcb-49",
        effect_id: 1,
        risk_id: 1,
        category_id: 2,
        priority_id: 3,
        status_id: 1
    },
    {
        incident_id: "0000002-2024",
        name: "Gas leak",
        description: "Gas leak in the kitchen",
        close_justification: "",
        incident_place: "Kitchen",
        record_date: faker.date.anytime(),
        cost: 0.0,
        time_to_solve: 5,
        user_dni: "99a11fcb-41",
        effect_id: 1,
        risk_id: 1,
        category_id: 2,
        priority_id: 3,
        status_id: 1
    },
    {
        incident_id: "0000003-2024",
        name: "Gas leak",
        description: "Gas leak in the kitchen",
        close_justification: "",
        incident_place: "Kitchen",
        record_date: faker.date.anytime(),
        cost: 0.0,
        time_to_solve: 5,
        user_dni: "34a33fcb-02",
        effect_id: 1,
        risk_id: 1,
        category_id: 2,
        priority_id: 3,
        status_id: 1
    },

]

const diagnoses_seed: diagnoses[] = [
    {
        diagnosis_id: 1,
        diagnosis_date: faker.date.anytime(),
        diagnosis:"Pipe damage grade 2",
        estimated_time: 5,
        observation: "Not yet",
        buy: faker.datatype.boolean(),
        user_dni: "34a33fcb-02",
        incident_id: "0000001-2024"
    },
    {
        diagnosis_id: 2,
        diagnosis_date: faker.date.anytime(),
        diagnosis:"Pipe damage grade 2",
        estimated_time: 5,
        observation: "Not yet",
        buy: faker.datatype.boolean(),
        user_dni: "03a11fcb-49",
        incident_id: "0000002-2024"
    },
    {
        diagnosis_id: 3,
        diagnosis_date: faker.date.anytime(),
        diagnosis:"Pipe damage grade 2",
        estimated_time: 5,
        observation: "Still damaged",
        buy: faker.datatype.boolean(),
        user_dni: "99a11fcb-41",
        incident_id: "0000003-2024"
    }
]

await Meta.generate_seed<departments>("departments", department_seed);
await Meta.generate_seed<users>("users", user_seed);
await Meta.generate_seed<roles>("roles", roles_seed);
await Meta.generate_seed<incident_effects>("incident_effects", incident_effects_seed);
await Meta.generate_seed<incident_categories>("incident_categories", incident_categories_seed);
await Meta.generate_seed<incident_status>("incident_status", incident_status_seed);
await Meta.generate_seed<incident_risks>("incident_risks", incident_risks_seed);
await Meta.generate_seed<incident_priorities>("incident_priorities", incident_priorities_seed);
await Meta.generate_seed<incidents>("incidents", incidents_seed);
await Meta.generate_seed<diagnoses>("diagnoses", diagnoses_seed);
await Meta.generate_seed<users_x_rol>("users_x_rol", roles_x_users);