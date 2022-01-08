import { Component, Vue } from 'vue-property-decorator';
import {
  REGEX_VALID_DECIMAL_NUMBERS,
  REGEX_VALID_EMAIL,
  REGEX_VALID_NAME,
  REGEX_VALID_NUMBERS,
} from '@/app/common/constants/validations-config';

const msgVerifyCharacter = 'Caracteres invalidos';

@Component
class FormValidationMixin extends Vue {
  globalRules = {
    required: (v: string): any => !!v || 'Este campo es requerido',
    requiredNullable: (v: string): any => !!v ?? 'Este campo es requerido',
    validPassword: (value: string): any => {
      let message = 'Formato no válido';
      const expReg =
        /^(?=.*[a-z\u00f1])(?=.*[A-Z\u00d1])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-\\“!@#%&/,><’:;|_~`])\S{8,60}$/;
      const capitalLetter = /[A-Z\u00d1]/;
      const especial = /[\^$*.[\]{}()?\-\\“!@#%&/,><’:;|_~`]/;
      const lowerCase = /[a-z\u00f1]/;
      const number = /[0-9]/;
      const array: string[] = [];
      if (!capitalLetter.test(value)) array.push('una mayúscula');
      if (!especial.test(value)) array.push('un caracter especial');
      if (!lowerCase.test(value)) array.push('una minúscula');
      if (!number.test(value)) array.push('un número');
      if (value.length <= 8) array.push('8 caracteres');
      if (array.length > 0) {
        message = 'Se requiere al menos (' + array.join(', ').toString() + ')';
      }
      return expReg.test(value) || message;
    },
    validEmail: (v: string): any => REGEX_VALID_EMAIL.test(v) || 'Email invalido',
    validNames: (v: string) => REGEX_VALID_NAME.test(v) || msgVerifyCharacter,
    validNumbers: (v: string): any =>
      REGEX_VALID_NUMBERS.test(v) || 'Este campo acepta solo números',
    validDecimalNumbers: (v: string): any =>
      REGEX_VALID_DECIMAL_NUMBERS.test(v) || 'Este campo debe tener el formato 00.00',
  };
}

export default FormValidationMixin;
