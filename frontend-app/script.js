const URL_AWS = "https://lu8jg4w71i.execute-api.sa-east-1.amazonaws.com/default/jurosCompostos";
const URL_AZURE = "https://func-cambio-grupoa-ggeedpbmcqfvd3ba.brazilsouth-01.azurewebsites.net/api/converterCambio";
const URL_GOOGLE = "https://projetar-inflacao-514889871389.southamerica-east1.run.app";

const btnSimular = document.getElementById("btnSimular");

const resultadoAWS = document.getElementById("resultadoAWS");
const resultadoAzure = document.getElementById("resultadoAzure");
const resultadoGoogle = document.getElementById("resultadoGoogle");

btnSimular.addEventListener("click", simularInvestimento);

function formatarMoedaBR(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarMoedaEstrangeira(valor, moeda) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: moeda
  });
}

function validarCampos(valor, taxa, tempo, ipca) {
  if (!valor || !taxa || !tempo || !ipca) {
    alert("Preencha todos os campos.");
    return false;
  }

  if (valor <= 0 || taxa <= 0 || tempo <= 0 || ipca <= 0) {
    alert("Preencha todos os campos com valores maiores que zero.");
    return false;
  }

  return true;
}

function iniciarCarregamento() {
  btnSimular.disabled = true;
  btnSimular.textContent = "Simulando...";

  resultadoAWS.innerHTML = "Calculando juros compostos na AWS...";
  resultadoAzure.innerHTML = "Aguardando resultado da AWS...";
  resultadoGoogle.innerHTML = "Aguardando resultado da AWS...";
}

function finalizarCarregamento() {
  btnSimular.disabled = false;
  btnSimular.textContent = "Simular investimento";
}

async function simularInvestimento() {
  const valor = Number(document.getElementById("valor").value);
  const taxa = Number(document.getElementById("taxa").value);
  const tempo = Number(document.getElementById("tempo").value);
  const moeda = document.getElementById("moeda").value;
  const ipca = Number(document.getElementById("ipca").value);

  if (!validarCampos(valor, taxa, tempo, ipca)) {
    return;
  }

  iniciarCarregamento();

  let valorFinalAWS = null;

  try {
    const dadosAWS = await chamarAWS(valor, taxa, tempo);
    valorFinalAWS = dadosAWS.valorFinal;

    resultadoAWS.innerHTML = `
      <span class="sucesso">Serviço disponível</span><br><br>
      <strong>Provedor:</strong> AWS Lambda<br>
      <strong>Valor inicial:</strong> ${formatarMoedaBR(dadosAWS.valorInicial)}<br>
      <strong>Taxa mensal:</strong> ${dadosAWS.taxaMensal}%<br>
      <strong>Tempo:</strong> ${dadosAWS.tempoMeses} meses<br>
      <strong>Valor final:</strong> ${formatarMoedaBR(dadosAWS.valorFinal)}
    `;
  } catch (error) {
    console.error("Erro AWS:", error);

    resultadoAWS.innerHTML = `
      <span class="erro">Serviço Indisponível</span><br><br>
      Não foi possível acessar a AWS Lambda.
    `;

    resultadoAzure.innerHTML = `
      <span class="erro">Serviço Indisponível</span><br><br>
      A conversão depende do resultado da AWS.
    `;

    resultadoGoogle.innerHTML = `
      <span class="erro">Serviço Indisponível</span><br><br>
      A projeção de inflação depende do resultado da AWS.
    `;

    finalizarCarregamento();
    return;
  }

  await Promise.all([
    executarAzure(valorFinalAWS, moeda),
    executarGoogle(valorFinalAWS, ipca)
  ]);

  finalizarCarregamento();
}

async function chamarAWS(valor, taxa, tempo) {
  const url = `${URL_AWS}?valor=${encodeURIComponent(valor)}&taxa=${encodeURIComponent(taxa)}&tempo=${encodeURIComponent(tempo)}`;

  const resposta = await fetch(url, {
    method: "GET"
  });

  if (!resposta.ok) {
    throw new Error("Erro ao acessar AWS Lambda.");
  }

  return await resposta.json();
}

async function executarAzure(valor, moeda) {
  try {
    resultadoAzure.innerHTML = "Convertendo câmbio na Azure...";

    const dadosAzure = await chamarAzure(valor, moeda);

    resultadoAzure.innerHTML = `
      <span class="sucesso">Serviço disponível</span><br><br>
      <strong>Provedor:</strong> Azure Function<br>
      <strong>Valor em reais:</strong> ${formatarMoedaBR(dadosAzure.valorOriginalBRL)}<br>
      <strong>Moeda escolhida:</strong> ${dadosAzure.moeda}<br>
      <strong>Cotação usada:</strong> ${formatarMoedaBR(dadosAzure.cotacaoUtilizada)}<br>
      <strong>Valor convertido:</strong> ${formatarMoedaEstrangeira(dadosAzure.valorConvertido, dadosAzure.moeda)}
    `;
  } catch (error) {
    console.error("Erro Azure:", error);

    resultadoAzure.innerHTML = `
      <span class="erro">Serviço Indisponível</span><br><br>
      Não foi possível acessar a Azure Function.
    `;
  }
}

async function chamarAzure(valor, moeda) {
  const resposta = await fetch(URL_AZURE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      valor: valor,
      moeda: moeda
    })
  });

  if (!resposta.ok) {
    throw new Error("Erro ao acessar Azure Function.");
  }

  return await resposta.json();
}

async function executarGoogle(valor, ipca) {
  try {
    resultadoGoogle.innerHTML = "Aplicando projeção de inflação no Google Cloud...";

    const dadosGoogle = await chamarGoogle(valor, ipca);

    resultadoGoogle.innerHTML = `
      <span class="sucesso">Serviço disponível</span><br><br>
      <strong>Provedor:</strong> Google Cloud Function<br>
      <strong>Valor antes da inflação:</strong> ${formatarMoedaBR(dadosGoogle.valorAntesInflacao)}<br>
      <strong>IPCA aplicado:</strong> ${dadosGoogle.ipcaAplicado}%<br>
      <strong>Perda estimada:</strong> ${formatarMoedaBR(dadosGoogle.perdaInflacao)}<br>
      <strong>Valor real projetado:</strong> ${formatarMoedaBR(dadosGoogle.valorReal)}
    `;
  } catch (error) {
    console.error("Erro Google:", error);

    resultadoGoogle.innerHTML = `
      <span class="erro">Serviço Indisponível</span><br><br>
      Não foi possível acessar a Google Cloud Function.
    `;
  }
}

async function chamarGoogle(valor, ipca) {
  const url = `${URL_GOOGLE}?valor=${encodeURIComponent(valor)}&ipca=${encodeURIComponent(ipca)}`;

  const resposta = await fetch(url, {
    method: "GET"
  });

  if (!resposta.ok) {
    throw new Error("Erro ao acessar Google Cloud Function.");
  }

  return await resposta.json();
}