import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { User, UserFormValues } from '@/models/user';
import accountsServices from '@/services/accounts-services';
import router from '@/router/index';

@Module({ namespaced: true })
class Auth extends VuexModule {
  token: string | null = window.localStorage.getItem('jwt');
  user: User | null = null;
  initialLoading = false;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  get getToken(): string | null {
    return this.token;
  }

  get getInitialLoading(): boolean {
    return this.initialLoading;
  }

  @Mutation
  public setToken(token: string | null): void {
    this.token = token;
  }

  @Mutation
  public setInitialLoading(val: boolean): void {
    this.initialLoading = val;
  }

  @Mutation
  public setUser(user: User): void {
    this.user = user;
  }

  @Action
  async login(creds: UserFormValues): Promise<void> {
    this.context.commit('setInitialLoading', true);
    try {
      const user = await accountsServices.login(creds);
      this.context.commit('setUser', user);
      this.context.commit('setToken', user.token);
      await router.push({ name: 'dashboard' });
      // eslint-disable-next-line no-useless-catch
    } catch (e) {
      throw e;
    } finally {
      this.context.commit('setInitialLoading', false);
    }
  }
}
export default Auth;
