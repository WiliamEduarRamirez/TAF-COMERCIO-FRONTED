import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const modalError = namespace('modalError');
@Component
class ModalMixin extends Vue {
  /******************* Start - Vuex *******************/
  @modalError.Mutation
  setDialog!: (val: boolean) => void;
  @modalError.Mutation
  setMessage!: (val: string) => void;
  @modalError.Mutation
  setTitle!: (val: string) => void;
  /******************* End - Vuex *******************/

  openModalError(response: any, title?: string): void {
    const msg: string = response?.data?.error?.message || 'Ocurrió un error';
    this.setDialog(true);
    this.setMessage(msg);
    if (title) this.setTitle(title);
  }
}
export default ModalMixin;
