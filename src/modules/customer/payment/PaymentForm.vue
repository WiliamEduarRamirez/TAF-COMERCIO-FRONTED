<template>
  <v-row class="my-5 mx-2">
    <v-row>
      <v-col>
        <div>Desde payment form</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col> Credit Card </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="form.cardName"
                  hide-details
                  label="Nombre en la targeta"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="form.cardNumber"
                  hide-details
                  label="Numero de targeta"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  outlined
                  v-model="form.cardExpirationMonth"
                  hide-details
                  label="MM"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  outlined
                  v-model="form.cardExpirationYear"
                  hide-details
                  label="AA"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  outlined
                  v-model="form.securityCode"
                  hide-details
                  label="CVC"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  outlined
                  v-model="form.postalCode"
                  hide-details
                  label="Codigo Postal"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider> </v-divider>
          <v-card-actions>
            <div class="text-center" style="width: 100%">
              <v-btn @click="payment" color="primary" large> Realizar Pago </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card>
          <v-card-title> Resumen </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <h3>Subtotal:</h3>
                  <h3>S/. {{ formatDecimal(totalPrice) }}</h3>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="d-flex justify-space-between">
                  <h3>Descuento:</h3>
                  <h3>S/. {{ '0' }}</h3>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class=""></v-divider>
          <v-card-actions>
            <div style="width: 100%" class="d-flex justify-space-between my-3">
              <h2>Total:</h2>
              <h2>S/. {{ formatDecimal(totalPrice) }}</h2>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <form style="display: none" id="form-checkout">
      <input
        type="text"
        name="cardNumber"
        id="form-checkout__cardNumber"
        :value="form.cardNumber"
      />
      <input
        type="text"
        name="cardExpirationMonth"
        id="form-checkout__cardExpirationMonth"
        :value="form.cardExpirationMonth"
      />
      <input
        type="text"
        name="cardExpirationYear"
        id="form-checkout__cardExpirationYear"
        :value="form.cardExpirationYear"
      />
      <input type="text" name="cardholderName" id="form-checkout__cardholderName" value="" />
      <input type="email" name="cardholderEmail" id="form-checkout__cardholderEmail" value="" />
      <select
        type="text"
        name="securityCode"
        id="form-checkout__securityCode"
        :value="form.securityCode"
      />
      <select name="issuer" id="form-checkout__issuer" :value="this.form.issuer" />
      <input
        name="identificationType"
        id="form-checkout__identificationType"
        :value="this.form.docType"
      />
      <input
        type="text"
        name="identificationNumber"
        id="form-checkout__identificationNumber"
        :value="this.form.docNumber"
      />
      <select
        name="installments"
        id="form-checkout__installments"
        :value="this.form.installments"
      ></select>
    </form>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import sleep from '@/functions/sleep';
const shoppingCart = namespace('shoppingCart');

@Component
export default class PaymentForm extends Vue {
  form = {
    email: '',
    docType: 'DNI',
    docNumber: '73062536',
    cardName: 'Visa',
    cardNumber: '4009175332806176',
    cardholderName: '',
    cardExpirationMonth: '11',
    cardExpirationYear: '25',
    securityCode: '123',
    issuer: '',
    installments: '',
    postalCode: '05001',
    paymentMethodId: 'visa',
    transactionAmount: 1500,
    description: 'Alguna descripcion',
  };
  mp: any = null;
  async created(): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      this.mp = new window.MercadoPago('TEST-a8f9584b-ce0c-4896-b6bf-c3447910697c');
      /*    const identificationTypes = await this.mp.getIdentificationTypes();
      console.log(identificationTypes);*/
    } catch (e) {
      console.log(e);
    }
  }
  @shoppingCart.Getter
  totalPrice!: number;

  async payment(): Promise<void> {
    try {
      if (this.form.cardNumber.length >= 6) {
        const bin = this.form.cardNumber.substring(0, 6);
        const issuers = await this.mp.getIssuers({
          bin,
          paymentMethodId: this.form.paymentMethodId,
        });
        const issuerId = issuers[0].id;
        this.form.issuer = issuerId;
        const installments = await this.mp.getInstallments({
          bin,
          payment_method_id: this.form.paymentMethodId,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          amount: this.formatDecimal(this.totalPrice),
          issuer_id: issuerId,
        });
        this.form.installments = installments[0].payer_costs[0].installments;
      }
      await sleep(1000);
      const result = await this.mp.createCardToken({
        cardNumber: this.form.cardNumber,
        cardholderName: this.form.cardholderName,
        cardExpirationMonth: this.form.cardExpirationMonth,
        cardExpirationYear: this.form.cardExpirationYear,
        securityCode: this.form.securityCode,
        identificationType: this.form.docType,
        identificationNumber: this.form.docNumber,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped></style>
