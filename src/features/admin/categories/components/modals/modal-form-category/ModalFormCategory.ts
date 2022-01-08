import { Component, Mixins, Vue } from 'vue-property-decorator';
import FormValidationMixin from '@/app/common/mixins/formValidationMixin';
import { namespace } from 'vuex-class';
import ModalMixin from '@/app/common/mixins/modalMixin';
import sleep from '@/app/common/functions/sleep';
import categoriesServices from '@/app/services/categories.services';
import { Category, CategoryFormValues } from '@/app/models/category';

const category = namespace('category');

@Component
export default class ModalFormCategory extends Mixins(FormValidationMixin, ModalMixin) {
  dialog = false;
  valid = true;
  loading = false;
  editMode = false;
  form = new CategoryFormValues();

  /******************* Start - Vuex *******************/
  @category.Action
  loadCategories!: () => Promise<void>;
  /******************* End - Vuex *******************/

  open(category: Category | null): void {
    this.dialog = true;
    if (category) {
      this.editMode = true;
      const categoryForm = {
        ...this.form,
        ...category
      };
      this.form = new CategoryFormValues(categoryForm as CategoryFormValues);
    }
  }
  actionModal(): void {
    const form = this.$refs.form as Vue & { validate: () => boolean };
    if (!form.validate()) return;
    if (this.editMode) {
      this.editCategory();
    } else {
      this.addCategory();
    }
  }
  editCategory(): void {
    this.loading = true;
    this.form.typeId = this.$route.params.id;
    categoriesServices
      .edit(this.form)
      .then(() => {
        this.loading = false;
        this.$toast.success('Categoria Editada Correctamente');
        this.loadCategories();
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
  addCategory(): void {
    this.loading = true;
    this.form.typeId = this.$route.params.id;
    categoriesServices
      .add(this.form)
      .then(() => {
        this.loading = false;
        this.$toast.success('Categoria Agregada Correctamente');
        this.loadCategories();
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
    this.form = new CategoryFormValues();
    this.dialog = false;
    await sleep(500);
    this.editMode = false;
  }
}
