import {environment} from "../../../environments/environment";

interface CRUD {
  READ_ALL: string;
  READ: ((id: string) => string);
  CREATE: string;
  UPDATE: string;
  DELETE: ((id: string) => string);
}

export const API_V1_EMPLOYEES: CRUD = {
  READ_ALL: `${environment.apiBase}/employees`,
  READ: (id: string) => `${environment.apiBase}/employees/${id}`,
  CREATE: `${environment.apiBase}/employees`,
  UPDATE: `${environment.apiBase}/employees`,
  DELETE: (id: string) => `${environment.apiBase}/employees/${id}`,
};

export const API_V1_HEALTH = `${environment.apiBase}/health`;
