import { Component, Vue } from 'vue-property-decorator';
import { REGEX_VALID_DECIMAL_NUMBERS, REGEX_VALID_NUMBERS } from '@/constants/validations-config';

@Component
class FormValidation extends Vue {
  globalRules = {
    required: (v: string): any => !!v || 'Este campo es requerido',
    validNumbers: (v: string): any =>
      REGEX_VALID_NUMBERS.test(v) || 'Este campo acepta solo números',
    validDecimalNumbers: (v: string): any =>
      REGEX_VALID_DECIMAL_NUMBERS.test(v) || 'Este campo acepta solo números',
  };
}

export default FormValidation;
