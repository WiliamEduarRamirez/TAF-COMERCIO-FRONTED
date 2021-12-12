import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { User } from '@/app/models/user';
import accountsServices from '@/app/services/accounts.services';

@Module({ namespaced: true })
class UserModule extends VuexModule {
  _user: User | null = null;
  loading = true;

  get isLoggedIn(): boolean {
    return !!this._user;
  }

  get appLoading(): boolean {
    return this.loading;
  }

  get user(): User | null {
    return this._user;
  }

  get role(): string | undefined {
    return this._user?.roles[0];
  }

  @Mutation
  setUser(user: User | null): void {
    this._user = user;
  }

  @Mutation
  setLoading(): void {
    this.loading = false;
  }

  @Action
  async currentUser(): Promise<void> {
    try {
      const token = this.context.rootGetters['auth/getToken'];
      if (token) {
        if (!this._user) {
          const user = await accountsServices.current();
          this.context.commit('setUser', user);
        }
      } else {
        this.context.commit('setUser', null);
      }
      // eslint-disable-next-line no-empty
    } catch (e) {
      this.context.commit('setUser', null);
    } finally {
      this.context.commit('setLoading');
    }
  }
}
export default UserModule;
