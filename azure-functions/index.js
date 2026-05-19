module.exports = async function (context, req) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers,
      body: ""
    };
    return;
  }

  try {
    const valor = Number(req.body?.valor);
    const moeda = req.body?.moeda;

    if (!valor || !moeda || valor <= 0) {
      context.res = {
        status: 400,
        headers,
        body: {
          erro: "Informe valor e moeda corretamente."
        }
      };
      return;
    }

    const cotacoes = {
      USD: 5.0,
      EUR: 5.5
    };

    const cotacao = cotacoes[moeda];

    if (!cotacao) {
      context.res = {
        status: 400,
        headers,
        body: {
          erro: "Moeda inválida. Use USD ou EUR."
        }
      };
      return;
    }

    const valorConvertido = valor / cotacao;

    context.res = {
      status: 200,
      headers,
      body: {
        servico: "Azure Function - Conversor de Câmbio",
        valorOriginalBRL: Number(valor.toFixed(2)),
        moeda,
        cotacaoUtilizada: cotacao,
        valorConvertido: Number(valorConvertido.toFixed(2))
      }
    };
  } catch (error) {
    context.res = {
      status: 500,
      headers,
      body: {
        erro: "Erro ao converter câmbio.",
        detalhe: error.message
      }
    };
  }
};