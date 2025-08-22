import { User } from "./userInterfaces"

interface Diagnoses {
    diagnosis_id:number;
    diagnosis_date: Date;
    diagnosis: string;
    estimated_time:number;
    observation:string;
    buy:boolean;
    user_dni:string;
    incident_id:string;
}

interface IncidentCategories {
  id: number
  description:string;
}

interface IncidentEffects {
  id: number;
  description: string;
}

interface IncidentPriorities {
  id: number;
  description:string;
}

interface IncidentRisks {
  id: number;
  description:string;
}

interface IncidentStatus {
  id: number;
  description:string;
}

interface LogChangeStatusIncident {
    log_id:number;
    incident_id:string;
    change_date:Date;
    current_status:number;
    previous_state:number;
    user_dni:string;
}

export interface UserXIncident {
  assign_code: number;
  user_dni: string;
  incident_id: string;
  assign_date: Date;
  incident: Incident;
  user: User;
}

export interface Incident {
  incident_id: string;
  name: string;
  description: string;
  close_justification: string | null;
  incident_place: string;
  record_date: Date;
  cost: number;
  time_to_solve: number;
  user_dni: string;
  effect_id: number;
  risk_id: number;
  category_id: number;
  priority_id: number;
  status_id: number;
  diagnosis: Diagnoses[];
  category: IncidentCategories;
  effect: IncidentEffects;
  priority: IncidentPriorities;
  risk: IncidentRisks;
  status: IncidentStatus;
  user: User;
  log_change_status_incident: LogChangeStatusIncident[];
  user_x_incident: UserXIncident[];
}
