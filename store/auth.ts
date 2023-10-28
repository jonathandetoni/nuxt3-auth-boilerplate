import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    token: '',
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const { data, pending }: any = await useFetchApi('api/v1/login', 'POST', {
        email,
        password,
      });

      this.loading = pending;

      if (data.value?.authorized) {
        const token = useCookie('token');
        token.value = data.value.acessToken;
        this.authenticated = true;
        this.token = data.value.acessToken;

        const user = useCookie('user');
        user.value = data?.value?.user;
      }
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false;
      token.value = null;
      this.token = '';
    },
  },
});
