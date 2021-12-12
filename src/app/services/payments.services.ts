import request from '@/app/api/api';
import { MercadoPagoPayment } from '@/app/models/payment';

const paymentsServices = {
  create: (processPayment: MercadoPagoPayment): Promise<void> =>
    request.post<void>('/payments/mercado-pago', processPayment),
};
export default paymentsServices;
