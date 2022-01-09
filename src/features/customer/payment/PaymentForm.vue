<template>
  <v-row class="my-5 mx-2">
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <form id="form-checkout">
            <v-card-title>
              <v-row>
                <v-col> Mercado Pago </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    label="Número de la tarjeta"
                    type="text"
                    outlined
                    dense
                    name="cardNumber"
                    id="form-checkout__cardNumber"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    label="Titular de la Targeta"
                    type="text"
                    outlined
                    dense
                    name="cardholderName"
                    id="form-checkout__cardholderName"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    hide-details
                    label="Mes de vencimiento"
                    type="text"
                    outlined
                    dense
                    name="cardExpirationMonth"
                    id="form-checkout__cardExpirationMonth"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    hide-details
                    type="text"
                    outlined
                    label="Año de vencimiento"
                    dense
                    name="cardExpirationYear"
                    id="form-checkout__cardExpirationYear"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    hide-details
                    outlined
                    label="Código de seguridad"
                    dense
                    type="text"
                    name="securityCode"
                    id="form-checkout__securityCode"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    hide-details
                    outlined
                    label="E-mail"
                    dense
                    type="email"
                    name="cardholderEmail"
                    id="form-checkout__cardholderEmail"
                  >
                  </v-text-field>
                </v-col>

                <select
                  style="width: 100%; display: none"
                  name="issuer"
                  id="form-checkout__issuer"
                ></select>
                <select
                  style="width: 100%; display: none"
                  name="installments"
                  id="form-checkout__installments"
                ></select>
                <v-col cols="6">
                  <select
                    style="width: 100%"
                    name="identificationType"
                    id="form-checkout__identificationType"
                  ></select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    hide-details
                    outlined
                    label="Nro. Documento"
                    dense
                    type="text"
                    name="identificationNumber"
                    id="form-checkout__identificationNumber"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-btn
                    :loading="loading"
                    width="250"
                    color="primary"
                    large
                    type="submit"
                    id="form-checkout__submit"
                  >
                    Pagar
                  </v-btn>
                  <!--                  <button type="submit" id="form-checkout__submit">Pagar</button>-->
                </v-col>
                <v-col cols="6">
                  <progress value="0" class="progress-bar">Cargando...</progress>
                </v-col>
              </v-row>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card>
          <v-card-title> Culqi </v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <form>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    dense
                    label="Número de tarjeta"
                    data-culqi="card[number]"
                    id="card[number]"
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="text"
                    dense
                    label="Correo Electrónico"
                    data-culqi="card[email]"
                    id="card[email]"
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    type="text"
                    dense
                    label="MM"
                    ddata-culqi="card[exp_month]"
                    id="card[exp_month]"
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    type="text"
                    dense
                    label="YYYY"
                    data-culqi="card[exp_year]"
                    id="card[exp_year]"
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    type="text"
                    dense
                    label="CVV"
                    data-culqi="card[cvv]"
                    id="card[cvv]"
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <!--                <v-col cols="12">
                  <v-btn
                    :loading="loadingCulqi"
                    @click="paymentV2Culqi"
                    style="width: 100%"
                    color="primary"
                  >
                    Pagar
                  </v-btn>
                </v-col>-->
              </v-row>
            </form>
            <v-row>
              <v-col cols="12">
                <v-btn @click="paymentCulqi" style="width: 100%" color="primary"> Pagar </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
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
  </v-row>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { MercadoPagoPayment } from '@/app/models/payment';
import paymentsServices from '@/app/services/payments.services';
import { User } from '@/app/models/user';
import sleep from '@/app/common/functions/sleep';
import { PUBLIC_KEY_CULQI, PUBLIC_KEY_MERCADO_PAGO } from '@/app/common/constants/constants.app';
import FormatMixin from '@/app/common/mixins/formatMixin';
import FormValidationMixin from '@/app/common/mixins/formValidationMixin';
const shoppingCart = namespace('shoppingCart');
const user = namespace('user');

declare global {
  interface Window {
    Culqi: any;
    MercadoPago: any;
  }
}

@Component
export default class PaymentForm extends Mixins(FormatMixin, FormValidationMixin) {
  form = {
    email: '',
    docType: 'DNI',
    docNumber: '73062536',
    cardName: 'Visa',
    cardNumber: '3',
    cardholderName: '',
    cardExpirationMonth: '11',
    cardExpirationYear: '25',
    securityCode: '123',
    issuer: '',
    installments: '',
    postalCode: '05001',
    paymentMethodId: 'visa',
    transactionAmount: 1500,
    description: 'Alguna descripcion'
  };
  cardForm: any = null;
  loading = false;
  loadingCulqi = false;

  @shoppingCart.Getter
  totalPrice!: number;

  @user.Getter
  user!: User | null;

  @shoppingCart.Mutation
  resetShoppingCartItems!: () => void;

  destroyed(): void {
    if (this.cardForm) {
      this.cardForm.unmount();
    }
  }
  created(): void {
    if (!this.user) {
      this.$router.push({ name: 'home' });
    }
  }
  /*  mounted(): void {
    window.Culqi.publicKey = "pk_test_17595c69457ccd97";
    window.Culqi.init();
  }*/
  mounted(): void {
    if (!this.user) return;
    window.Culqi.publicKey = PUBLIC_KEY_CULQI;
    window.Culqi.init();

    const mp = new window.MercadoPago(PUBLIC_KEY_MERCADO_PAGO);
    this.cardForm = mp.cardForm({
      amount: this.formatDecimal(this.totalPrice),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular de la tarjeta'
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail'
        },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Número de la tarjeta'
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth',
          placeholder: 'Mes de vencimiento'
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear',
          placeholder: 'Año de vencimiento'
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de seguridad'
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Cuotas'
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento'
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número de documento'
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emisor'
        }
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn('Form Mounted handling error: ', error);
        },
        onFormUnmounted: (error: any) => {
          if (error) return console.warn('Form Unmounted handling error: ', error);
        },
        onCardTokenReceived: (error: any[], token: any) => {
          if (error) {
            console.warn('Token handling error test: ', error);
            return;
          }
          console.log('Token available: ', token);
        },
        onSubmit: (event: any) => {
          event.preventDefault();
          this.loading = true;
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType
          } = this.cardForm.getCardFormData();

          const processPayment: MercadoPagoPayment = {
            description: 'Descripción del producto',
            docNumber: identificationNumber,
            docType: identificationType,
            email: email,
            paymentMethodId: payment_method_id,
            installments: Number(installments),
            issuerId: issuer_id,
            token: token,
            transactionAmount: Number(amount)
          };

          paymentsServices.create(processPayment).then(() => {
            this.loading = false;
            this.$router.push({ name: 'home' });
            this.$toast('Su compra se realizo correctamente');
            this.resetShoppingCartItems();
          });
        },
        onFetching: () => {
          // Animate progress bar
          const progressBar = document.querySelector('.progress-bar');
          progressBar!.removeAttribute('value');
          return () => {
            progressBar!.setAttribute('value', '0');
          };
        }
      }
    });
  }
  async paymentV2Culqi(): Promise<void> {
    try {
      this.loadingCulqi = true;
      await window.Culqi.createToken();
      await sleep(2000);
      console.log(window.Culqi.token);
      if (window.Culqi.token.object === 'error') {
        console.log(window.Culqi.token);
        return;
      }
      if (window.Culqi.token) {
        var token = window.Culqi.token.id;
        alert('Se ha creado un token:' + token);
      } else {
        console.log(window.Culqi.error);
        alert(window.Culqi.error.user_message);
      }
    } catch (e) {
      console.log('entra aqui');
      console.log(e);
    } finally {
      this.loadingCulqi = false;
    }
  }
  paymentCulqi(): void {
    window.Culqi.publicKey = 'pk_test_17595c69457ccd97';
    const amountDecimal = this.formatDecimal(this.totalPrice) as string;
    const amount = parseInt(amountDecimal.split('.').join(''));
    window.Culqi.settings({
      title: 'Eccomerce',
      currency: 'PEN',
      description: 'Utiliza Culqi',
      amount: amount
    });
    window.Culqi.open();
  }
}
</script>

<style scoped></style>
