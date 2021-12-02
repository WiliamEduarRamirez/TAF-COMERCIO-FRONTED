import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Pagination, PagingParams } from '@/models/pagination';
import productsServices from '@/services/products.services';

@Module({ namespaced: true })
class ProductModule extends VuexModule {
  pagination: Pagination | null = null;
  pagingParams = new PagingParams(1, 8);
  products: ProductModule[] = [];
  initialLoading = false;

  get axiosParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString());
    return params;
  }

  get getInitialLoading(): boolean {
    return this.initialLoading;
  }

  get getProducts(): ProductModule[] {
    return this.products;
  }

  get getPaginate(): Pagination | null {
    return this.pagination;
  }

  @Mutation
  public setProducts(products: ProductModule[]): void {
    this.products = products;
  }

  @Mutation
  public setPagination(pagination: Pagination): void {
    this.pagination = pagination;
  }

  @Mutation
  public setInitialLoading(val: boolean): void {
    this.initialLoading = val;
  }

  @Action
  async listProducts(): Promise<void> {
    this.context.commit('setInitialLoading', true);
    try {
      const result = await productsServices.list(this.axiosParams);
      this.context.commit('setProducts', result.data);
      this.context.commit('setPagination', result.pagination);
    } catch (e) {
      console.log(e);
    } finally {
      this.context.commit('setInitialLoading', false);
    }
  }
}
export default ProductModule;
