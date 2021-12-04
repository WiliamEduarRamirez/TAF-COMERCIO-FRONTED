import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Category } from '@/models/product';
import categoriesServices from '@/services/categories.services';

@Module({ namespaced: true })
class CategoryModule extends VuexModule {
  _categories: Category[] = [];
  _initialLoading = false;

  get categories(): Category[] {
    return this._categories;
  }
  get initialLoadingCategories(): boolean {
    return this._initialLoading;
  }

  @Mutation
  setCategories(categories: Category[]): void {
    this._categories = categories;
  }
  @Mutation
  setInitialLoading(val: boolean): void {
    this._initialLoading = val;
  }

  @Action({ rawError: true })
  async loadCategories(typeId: string): Promise<void> {
    this.context.commit('setInitialLoading', true);
    try {
      const categories = await categoriesServices.list(typeId);
      this.context.commit('setCategories', categories);
      this.context.commit('setInitialLoading', false);
    } catch (e) {
      this.context.commit('setInitialLoading', false);
      throw e;
    }
  }
}
export default CategoryModule;
