import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { CartItem } from '@/models/shopping-cart';
import { Product } from '@/models/product';

@Module({ namespaced: true })
class ShoppingCartModule extends VuexModule {
  _shoppingCartItems: CartItem[] = JSON.parse(
    window.localStorage.getItem('shopping-cart-items') || '[]'
  );

  get shoppingCartItems(): CartItem[] {
    return this._shoppingCartItems;
  }
  get totalItems(): number {
    return this._shoppingCartItems.length;
  }

  @Mutation
  public setShoppingCartItems(cartItem: CartItem): void {
    const existItem = this._shoppingCartItems.find((x) => x.product.id === cartItem.product.id);
    if (existItem) {
      this._shoppingCartItems = this._shoppingCartItems.map((item) =>
        item.product.id === cartItem.product.id ? cartItem : item
      );
    } else {
      this._shoppingCartItems = [...this._shoppingCartItems, cartItem];
    }
    window.localStorage.setItem('shopping-cart-items', JSON.stringify(this._shoppingCartItems));
  }

  @Action
  public addItemsOnStart(product: Product): void {
    const existItem = this._shoppingCartItems.find((x) => x.product.id === product.id);
    if (existItem) {
      existItem.amount = existItem.amount + 1;
      this.context.commit('setShoppingCartItems', existItem);
    } else {
      const cartItem: CartItem = {
        amount: 1,
        product,
      };
      this.context.commit('setShoppingCartItems', cartItem);
    }
  }
}
export default ShoppingCartModule;