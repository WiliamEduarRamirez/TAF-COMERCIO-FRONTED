import { Component, Mixins, Vue } from 'vue-property-decorator';
import FormValidationMixin from '@/app/common/mixins/formValidationMixin';
import { namespace } from 'vuex-class';
import ModalMixin from '@/app/common/mixins/modalMixin';
import sleep from '@/app/common/functions/sleep';
import { TypeFormValues, TypeModel } from '@/app/models/type';
import typesServices from '@/app/services/types.services';

const type = namespace('type');

@Component
export default class ModalFormType extends Mixins(FormValidationMixin, ModalMixin) {
  dialog = false;
  valid = true;
  loading = false;
  editMode = false;
  form = new TypeFormValues();

  /******************* Start - Vuex *******************/
  @type.Action
  loadTypes!: () => Promise<void>;
  /******************* End - Vuex *******************/

  open(type: TypeModel | null): void {
    this.dialog = true;
    if (type) {
      this.editMode = true;
      const typeForm = {
        ...this.form,
        ...type
      };
      this.form = new TypeFormValues(typeForm as TypeFormValues);
    }
  }
  actionModal(): void {
    const form = this.$refs.form as Vue & { validate: () => boolean };
    if (!form.validate()) return;
    if (this.editMode) {
       this.editType();
    } else {
      this.addType();
    }
  }
    editType(): void {
    this.loading = true;
    typesServices
      .edit(this.form)
      .then(() => {
        this.loading = false;
        this.$toast.success('Tipo Editado Correctamente');
        this.loadTypes();
        this.close();
      })
      .catch((err) => {
        this.loading = false;
        if (err.response?.status === 400) {
          this.openModalError(err.response);
          return;
        }
        this.$toast.error('Ups, Ocurrió un error, intente nuevamente');
      });
  }
  addType(): void {
    this.loading = true;
    typesServices
      .add(this.form)
      .then(() => {
        this.loading = false;
        this.$toast.success('Tipo Agregado Correctamente');
        this.loadTypes();
        this.close();
      })
      .catch(err => {
        this.loading = false;
        if (err.response?.status === 400) {
          this.openModalError(err.response);
          return;
        }
        this.$toast.error('Ups, Ocurrió un error, intente nuevamente');
      });
  }

  async close(): Promise<void> {
    const form = this.$refs.form as Vue & { resetValidation: () => void };
    form.resetValidation();
    this.form = new TypeFormValues();
    this.dialog = false;
    await sleep(500);
    this.editMode = false;
  }
}
