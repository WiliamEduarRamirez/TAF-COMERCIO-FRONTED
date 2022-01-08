export interface Category {
  id: string;
  denomination: string;
  description: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
}

export class CategoryFormValues {
  id?: string = undefined;
  typeId: string | null = null;
  denomination = '';
  description = '';
  constructor(category?: CategoryFormValues) {
    Object.assign(this, category);
  }
}
