import { Component, Vue } from 'vue-property-decorator';
import {
  REGEX_VALID_DECIMAL_NUMBERS,
  REGEX_VALID_NUMBERS,
} from '@/app/common/constants/validations-config';

@Component
class ValidationMixin extends Vue {
  validDecimalNumbers(event: any): boolean {
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!REGEX_VALID_DECIMAL_NUMBERS.test(key)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  validNumbers(event: any): boolean {
    const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!REGEX_VALID_NUMBERS.test(key)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
export default ValidationMixin;
