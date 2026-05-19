const { app } = require('@azure/functions');

app.http('converterCambio', {
  methods: ['GET', 'POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      'Content-Type': 'application/json'
    };

    if (request.method === 'OPTIONS') {
      return {
        status: 204,
        headers,
        body: ''
      };
    }

    try {
      let body = {};

      if (request.method === 'POST') {
        body = await request.json();
      }

      const valor = Number(body.valor || request.query.get('valor'));
      const moeda = body.moeda || request.query.get('moeda');

      if (!valor || !moeda || valor <= 0) {
        return {
          status: 400,
          headers,
          jsonBody: {
            erro: 'Informe valor e moeda corretamente.'
          }
        };
      }

      const cotacoes = {
        USD: 5.0,
        EUR: 5.5
      };

      const cotacao = cotacoes[moeda];

      if (!cotacao) {
        return {
          status: 400,
          headers,
          jsonBody: {
            erro: 'Moeda inválida. Use USD ou EUR.'
          }
        };
      }

      const valorConvertido = valor / cotacao;

      return {
        status: 200,
        headers,
        jsonBody: {
          servico: 'Azure Function - Conversor de Câmbio',
          valorOriginalBRL: Number(valor.toFixed(2)),
          moeda: moeda,
          cotacaoUtilizada: cotacao,
          valorConvertido: Number(valorConvertido.toFixed(2))
        }
      };
    } catch (error) {
      return {
        status: 500,
        headers,
        jsonBody: {
          erro: 'Erro ao converter câmbio.',
          detalhe: error.message
        }
      };
    }
  }
});