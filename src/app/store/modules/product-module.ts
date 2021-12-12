import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { Pagination, PagingParams, PredicateParams } from '@/app/models/pagination';
import productsServices from '@/app/services/products.services';
import { Product } from '@/app/models/product';
import { Photo } from '@/app/models/photo';
import photosServices from '@/app/services/photos-services';

@Module({ namespaced: true })
class ProductModule extends VuexModule {
  _pagination: Pagination | null = null;
  _pagingParams = new PagingParams(1, 6);
  _products: Product[] = [];
  _initialLoading = false;
  _loading = false;
  _loadingProductPhotos = false;
  _predicate = new Map();
  _currentProduct: Product | null = null;
  _currentProductPhotos: Photo[] = [];
  modalAddPhoto: any = null;
  modalFromProduct: any = null;

  @Mutation
  setPredicate(predicateParams: PredicateParams): void {
    const resetPredicate = () => {
      this._predicate.forEach((value, key) => {
        this._predicate.delete(key);
      });
    };
    switch (predicateParams.predicate) {
      case 'categoryId':
        resetPredicate();
        this._predicate.set('categoryId', predicateParams.value);
        this._predicate.set('isEnable', true);
        break;
      case 'typeId':
        resetPredicate();
        this._predicate.set('typeId', predicateParams.value);
        break;
      case 'isEnable':
        this._predicate.set('isEnable', predicateParams.value);
        break;
    }
  }

  @Mutation
  public setProducts(products: Product[]): void {
    this._products = products;
  }

  @Mutation
  setModalAddPhotoRef(modalRef: any): void {
    this.modalAddPhoto = modalRef;
  }

  @Mutation
  setModalFromProductRef(modalRef: any): void {
    this.modalFromProduct = modalRef;
  }

  @Mutation
  public setPaginate(page: number): void {
    this._pagingParams.pageNumber = page;
    this._pagination!.currentPage = page;
  }

  @Mutation
  public setPagingParams(pagingParams: PagingParams): void {
    this._pagingParams = pagingParams;
  }

  @Mutation
  public setPagination(_pagination: Pagination): void {
    this._pagination = _pagination;
  }

  @Mutation
  public setInitialLoading(val: boolean): void {
    this._initialLoading = val;
  }

  @Mutation
  public setLoading(val: boolean): void {
    this._loading = val;
  }

  @Mutation setCurrentProduct(product: Product | null) {
    this._currentProduct = product;
  }

  @Mutation
  public setLoadingProductPhotos(val: boolean): void {
    this._loadingProductPhotos = val;
  }

  @Mutation setCurrentProductPhotos(photos: Photo[]) {
    this._currentProductPhotos = photos;
  }

  get axiosParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('pageNumber', this._pagingParams.pageNumber.toString());
    params.append('pageSize', this._pagingParams.pageSize.toString());
    this._predicate.forEach((value, key) => {
      params.append(key, value);
    });
    return params;
  }

  get getInitialLoading(): boolean {
    return this._initialLoading;
  }

  get loadingProduct(): boolean {
    return this._loading;
  }

  get loadingProductPhotos(): boolean {
    return this._loadingProductPhotos;
  }

  get modalAddPhotoRef(): any {
    return this.modalAddPhoto;
  }

  get modalFromProductRef(): any {
    return this.modalFromProduct;
  }

  get products(): Product[] {
    return this._products;
  }

  get getPaginate(): Pagination | null {
    return this._pagination;
  }

  get currentProduct(): Product | null {
    return this._currentProduct;
  }

  get currentProductPhotos(): Photo[] {
    return this._currentProductPhotos;
  }

  @Action({ rawError: true })
  async loadProducts(): Promise<void> {
    this.context.commit('setInitialLoading', true);
    try {
      const result = await productsServices.list(this.axiosParams);
      this.context.commit('setProducts', result.data);
      this.context.commit('setPagination', result.pagination);
      this.context.commit('setInitialLoading', false);
    } catch (e) {
      this.context.commit('setInitialLoading', false);
      throw e;
    }
  }
  @Action({ rawError: true })
  async loadCurrentProduct(productId: string): Promise<void> {
    this.context.commit('setLoading', true);
    try {
      const product = await productsServices.details(productId);
      this.context.commit('setCurrentProduct', product);
      this.context.commit('setLoading', false);
    } catch (e) {
      this.context.commit('setLoading', false);
      throw e;
    }
  }

  @Action({ rawError: true })
  async loadCurrentProductPhotos(productId: string): Promise<void> {
    this.context.commit('setLoadingProductPhotos', true);
    try {
      const photos = await photosServices.listOfProducts(productId);
      this.context.commit('setCurrentProductPhotos', photos);
      this.context.commit('setLoadingProductPhotos', false);
    } catch (e) {
      this.context.commit('setLoadingProductPhotos', false);
      throw e;
    }
  }
}
export default ProductModule;
