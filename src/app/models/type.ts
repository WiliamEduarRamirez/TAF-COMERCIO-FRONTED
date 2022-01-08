export interface TypeModel {
  id: string;
  denomination: string;
  description: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}

export class TypeFormValues {
  id?: string = undefined;
  denomination = '';
  description = '';
  constructor(type?: TypeFormValues) {
    Object.assign(this, type);
  }
}
