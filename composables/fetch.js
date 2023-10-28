import { ref } from 'vue';

export async function useFetchApi(url, method, body) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const token = useCookie('token');

  const buscaInformacoes = async () => {
    try {
      const domain =
        process.env.NODE_ENV !== 'production'
          ? 'http://localhost:5001'
          : 'https://api.tonidev.com.br';

      const req = await fetch(`${domain}/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.value,
        },
        body: JSON.stringify(body),
      });

      const json = await req.json();
      data.value = json.data;
    } catch (err) {
      error.value = 'Erro ao obter informações na API.';
    } finally {
      loading.value = false;
    }
  };

  await buscaInformacoes();

  return {
    data,
    error,
    loading,
  };
}
