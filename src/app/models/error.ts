export class ErrorHandler {
  exist = false;
  type?: string = undefined;
  code?: number = undefined;
  message?: string = 'Ups, Ocurrió un error';
  constructor(error?: any) {
    if (error) {
      this.exist = true;
      if (!error.message) return;
      if (error?.message === 'Network Error') {
        this.message = 'Compruebe su conexión a internet';
        this.type = 'Network Error';
        return;
      }
      if (!error.response) return;
      this.code = error.response.status;
      if (error.response.status === 400) {
        this.message = error.response?.data?.errors?.message || this.message;
        return;
      }
      if (error.response.status >= 500) {
        this.message = 'Error de servidor';
        return;
      }
    }
  }
}
