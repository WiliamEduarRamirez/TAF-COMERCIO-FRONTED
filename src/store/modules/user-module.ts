import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { User } from '@/models/user';
import accountsServices from '@/services/accounts.services';

@Module({ namespaced: true })
class UserModule extends VuexModule {
  user: User | null = null;
  loading = true;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  get appLoading(): boolean {
    return this.loading;
  }

  get getUser(): User | null {
    return this.user;
  }

  get role(): string | undefined {
    return this.user?.roles[0];
  }

  @Mutation
  setUser(user: User | null): void {
    this.user = user;
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
        if (!this.user) {
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
