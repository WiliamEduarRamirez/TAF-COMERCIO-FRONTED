export interface MercadoPagoPayment {
  transactionAmount: number;
  token: string;
  description: string;
  installments: number;
  paymentMethodId: string;
  issuerId?: string;
  email: string;
  docType: string;
  docNumber: string;
}
