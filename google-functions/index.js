exports.projetarInflacao = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "OPTIONS,POST,GET");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const valor = Number(req.body?.valor);
    const ipca = Number(req.body?.ipca);

    if (!valor || !ipca || valor <= 0 || ipca <= 0) {
      res.status(400).json({
        erro: "Informe valor e IPCA corretamente."
      });
      return;
    }

    const valorReal = valor / (1 + ipca / 100);
    const perdaInflacao = valor - valorReal;

    res.status(200).json({
      servico: "Google Cloud Function - Projetor de Inflação",
      valorAntesInflacao: Number(valor.toFixed(2)),
      ipcaAplicado: ipca,
      valorReal: Number(valorReal.toFixed(2)),
      perdaInflacao: Number(perdaInflacao.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao projetar inflação.",
      detalhe: error.message
    });
  }
};