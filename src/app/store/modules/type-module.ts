import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import typesServices from '@/app/services/types.services';
import { Pagination, PagingParams } from '@/app/models/pagination';
import { ErrorHandler } from '@/app/models/error';
import { TypeModel } from '@/app/models/type';

@Module({ namespaced: true })
class TypeModule extends VuexModule {
  _pagination: Pagination | null = null;
  _types: TypeModel[] = [];
  _query = '';
  _initialLoading = false;
  _searchMode = false;
  _predicate = new Map();
  _pagingParams = new PagingParams(1, 8);
  _modalFormType: any = null;
  _error = new ErrorHandler();

  /*Reset default states*/
  @Mutation
  resetState() {
    this._types = [];
    this._searchMode = false;
    this._initialLoading = false;
    this._pagination = null;
    this._pagingParams = new PagingParams(1, 8);
    this._modalFormType = null;
    this._error = new ErrorHandler();
  }

  get types(): TypeModel[] {
    return this._types;
  }
  get initialLoading(): boolean {
    return this._initialLoading;
  }
  get searchMode(): boolean {
    return this._searchMode;
  }
  get error(): ErrorHandler {
    return this._error;
  }
  get pagination(): Pagination | null {
    return this._pagination;
  }
  get query(): string {
    return this._query;
  }
  get modalFormTypeRef(): any {
    return this._modalFormType;
  }

  get axiosParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('pageNumber', this._pagingParams.pageNumber.toString());
    params.append('pageSize', this._pagingParams.pageSize.toString());
    if (this._searchMode) {
      params.append('query', this._query);
    }
    this._predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  @Mutation
  setTypes(types: TypeModel[]): void {
    this._types = types;
  }
  @Mutation
  setInitialLoading(val: boolean): void {
    this._initialLoading = val;
  }
  @Mutation
  setError(error: ErrorHandler) {
    this._error = error;
  }

  @Mutation
  setDefaultError() {
    this._error = new ErrorHandler();
  }
  @Mutation
  setSearchMode(val: boolean): void {
    this._searchMode = val;
  }
  @Mutation
  setQuery(query: string): void {
    this._query = query;
  }
  @Mutation
  setPaginate(page: number): void {
    this._pagingParams.pageNumber = page;
    this._pagination!.currentPage = page;
  }
  @Mutation
  setModalFormType(modal: any): void {
    this._modalFormType = modal;
  }
  @Mutation
  setPagination(pagination: Pagination | null): void {
    this._pagination = pagination;
  }

  @Action({ rawError: true })
  async loadTypes(): Promise<void> {
    this.context.commit('setInitialLoading', true);
    try {
      const result = await typesServices.list(this.axiosParams);
      this.context.commit('setTypes', result.data);
      this.context.commit('setPagination', result.pagination);
      this.context.commit('setInitialLoading', false);
    } catch (e) {
      this.context.commit('setInitialLoading', false);
      throw e;
    }
  }

  @Action
  searchEnd(): void {
    this.context.commit('setQuery', '');
    this.context.commit('setSearchMode', false);
    this.context.dispatch('loadTypes');
  }
}
export default TypeModule;
