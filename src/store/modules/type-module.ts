import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { Type } from '@/models/product';
import typesServices from '@/services/types.services';

@Module({ namespaced: true })
class TypeModule extends VuexModule {
  _types: Type[] = [];
  _initialLoading = false;

  get types(): Type[] {
    return this._types;
  }
  get initialLoadingTypes(): boolean {
    return this._initialLoading;
  }

  @Mutation
  setTypes(types: Type[]): void {
    this._types = types;
  }
  @Mutation
  setInitialLoading(val: boolean): void {
    this._initialLoading = val;
  }

  @Action({ rawError: true })
  async loadTypes(): Promise<void> {
    this.context.commit('setInitialLoading', true);
    try {
      const types = await typesServices.list();
      this.context.commit('setTypes', types);
      this.context.commit('setInitialLoading', false);
    } catch (e) {
      this.context.commit('setInitialLoading', false);
      throw e;
    }
  }
}
export default TypeModule;
