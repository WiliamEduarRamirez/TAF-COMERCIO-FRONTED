import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { CartItem } from '@/app/models/shopping-cart';
import { Product } from '@/app/models/product';

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

  get totalPrice(): number {
    let totalPrice = 0;
    this._shoppingCartItems.forEach((x) => {
      totalPrice += x.product.price * x.amount;
    });
    return totalPrice;
  }

  @Mutation
  public resetShoppingCartItems(): void {
    this._shoppingCartItems = [];
    window.localStorage.removeItem('shopping-cart-items');
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

  @Mutation
  public changeAmountItem(cartItem: CartItem): void {
    this._shoppingCartItems = this._shoppingCartItems.map((item) =>
      item.product.id === cartItem.product.id ? cartItem : item
    );
    window.localStorage.setItem('shopping-cart-items', JSON.stringify(this._shoppingCartItems));
  }

  @Mutation
  public deleteAmountItem(cartItem: CartItem): void {
    this._shoppingCartItems = this._shoppingCartItems.filter(
      (item) => item.product.id !== cartItem.product.id
    );
    window.localStorage.setItem('shopping-cart-items', JSON.stringify(this._shoppingCartItems));
  }

  @Action
  public increaseAmount(cartItem: CartItem): void {
    cartItem.amount = cartItem.amount + 1;
    this.context.commit('changeAmountItem', cartItem);
  }

  @Action
  public decreaseAmount(cartItem: CartItem): void {
    cartItem.amount = cartItem.amount - 1;
    this.context.commit('changeAmountItem', cartItem);
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
