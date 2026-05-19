exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };

  if (event.requestContext?.http?.method === "OPTIONS" || event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }

  try {
    const body = typeof event.body === "string"
      ? JSON.parse(event.body || "{}")
      : event.body || {};

    const valor = Number(body.valor);
    const taxa = Number(body.taxa);
    const tempo = Number(body.tempo);

    if (!valor || !taxa || !tempo || valor <= 0 || taxa <= 0 || tempo <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          erro: "Informe valor, taxa e tempo corretamente."
        })
      };
    }

    const taxaDecimal = taxa / 100;
    const valorFinal = valor * Math.pow(1 + taxaDecimal, tempo);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        servico: "AWS Lambda - Juros Compostos",
        valorInicial: valor,
        taxaMensal: taxa,
        tempoMeses: tempo,
        valorFinal: Number(valorFinal.toFixed(2))
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        erro: "Erro ao calcular juros compostos.",
        detalhe: error.message
      })
    };
  }
};