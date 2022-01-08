import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import categoriesServices from '@/app/services/categories.services';
import { Pagination, PagingParams } from '@/app/models/pagination';
import { ErrorHandler } from '@/app/models/error';
import { Category } from '@/app/models/category';

@Module({ namespaced: true })
class CategoryModule extends VuexModule {
  _categories: Category[] = [];
  _initialLoading = false;
  _pagination: Pagination | null = null;
  _query = '';
  _searchMode = false;
  _predicate = new Map();
  _pagingParams = new PagingParams(1, 8);
  _modalFormCategory: any = null;
  _error = new ErrorHandler();
  _typeId: string | null = null;

  /*Reset default states*/
  @Mutation
  resetState() {
    this._categories = [];
    this._searchMode = false;
    this._initialLoading = false;
    this._pagination = null;
    this._pagingParams = new PagingParams(1, 8);
    this._modalFormCategory = null;
    this._error = new ErrorHandler();
  }

  get categories(): Category[] {
    return this._categories;
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
  get modalFormCategoryRef(): any {
    return this._modalFormCategory;
  }

  get axiosParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('pageNumber', this._pagingParams.pageNumber.toString());
    params.append('pageSize', this._pagingParams.pageSize.toString());
    params.append('typeId', this._typeId || '');
    if (this._searchMode) {
      params.append('query', this._query);
    }
    /*    this._predicate.forEach((value, key) => {
      params.append(key, value);
    });*/
    return params;
  }

  @Mutation
  setCategories(categories: Category[]): void {
    this._categories = categories;
  }
  @Mutation
  setTypeIdParam(typeId: string): void {
    this._typeId = typeId;
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
  setModalFormCategory(modal: any): void {
    this._modalFormCategory = modal;
  }
  @Mutation
  setPagination(pagination: Pagination | null): void {
    this._pagination = pagination;
  }

  @Action({ rawError: true })
  async loadCategories(): Promise<void> {
    this.context.commit('setInitialLoading', true);
    this.context.commit('setDefaultError');
    try {
      const result = await categoriesServices.list(this.axiosParams);
      this.context.commit('setCategories', result.data);
      this.context.commit('setPagination', result.pagination);
    } catch (error) {
      const errorHandler = new ErrorHandler(error);
      this.context.commit('setError', errorHandler);
    } finally {
      this.context.commit('setInitialLoading', false);
    }
  }

  @Action
  searchEnd(): void {
    this.context.commit('setQuery', '');
    this.context.commit('setSearchMode', false);
    this.context.dispatch('loadCategories');
  }
}
export default CategoryModule;
