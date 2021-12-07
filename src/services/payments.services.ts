import request from '@/api/api';
import { MercadoPagoPayment } from '@/models/payment';

const paymentsServices = {
  create: (processPayment: MercadoPagoPayment): Promise<void> =>
    request.post<void>('/payments/mercado-pago', processPayment),
};
export default paymentsServices;
