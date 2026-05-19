# 💻 SaaS Financeiro Multicloud 

Projeto desenvolvido para a disciplina de **Computação em Nuvem**, com o objetivo de criar uma aplicação financeira SaaS utilizando uma arquitetura **multicloud** com serviços **serverless** distribuídos entre AWS, Azure e Google Cloud.

A aplicação permite simular um investimento financeiro, calcular juros compostos, converter o valor para moeda estrangeira e aplicar uma projeção fictícia de inflação/IPCA.

---

## 👥 Equipe BitCode

**Grupo A**

- Brenda Vitória Scarpioni
- João Vitor Vieira da Silva
- César Antônio de Oliveira Rocha
- Vitor Francisco Moraes Pereira

---

## 🎯 Objetivo

O objetivo do projeto é demonstrar o uso de diferentes provedores de nuvem trabalhando em conjunto dentro de uma mesma aplicação.

Cada nuvem ficou responsável por uma função específica:

| Provedor | Serviço | Responsabilidade |
|---|---|---|
| AWS | Lambda + API Gateway | Cálculo de juros compostos |
| Azure | Azure Functions | Conversão de câmbio |
| Google Cloud | Cloud Run Functions | Projeção de inflação/IPCA |

O frontend centraliza a entrada dos dados, chama os três serviços e exibe os resultados em uma única interface.

---

## 🧩 Arquitetura da Solução

Usuário
  |
  v
Frontend Web
  |
  |----> AWS Lambda
  |       Calcula juros compostos
  |
  |----> Azure Function
  |       Converte o valor para dólar/euro
  |
  |----> Google Cloud Function
          Aplica projeção fictícia de inflação

---

## 🚀 Funcionalidades

- Cadastro dos dados da simulação financeira;
- Cálculo de juros compostos;
- Conversão do valor final para moeda estrangeira;
- Projeção fictícia de inflação/IPCA;
- Consumo de funções serverless em três provedores diferentes;
- Exibição dos resultados em cards separados no frontend.

---

## 🛠️ Tecnologias Utilizadas

**Frontend**

- HTML5
- CSS3
- JavaScript

**Nuvem e Serverless**

- AWS Lambda
- Amazon API Gateway
- Azure Functions
- Google Cloud Run Functions

**Desenvolvimento**

- Visual Studio Code
- Node.js
- GitHub
- Navegador Web

---

## 📁 Estrutura do Projeto

TRABALHO NUVEM
├── aws-lambda
│   └── index.js
│
├── azure-functions
│   └── src
│       └── functions
│           └── converterCambio.js
│
├── frontend-app
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── google-functions
│   ├── index.js
│   └── package.json
│
├── servidor-local.js
├── .gitignore
└── README.md

---

## ☁️ Serviços em Nuvem

### AWS Lambda - Juros Compostos

Responsável por calcular o valor final do investimento com base no valor inicial, taxa mensal e tempo em meses.

**Exemplo de chamada:**

https://lu8jg4w71i.execute-api.sa-east-1.amazonaws.com/default/jurosCompostos?valor=1000&taxa=1.2&tempo=12

**Retorno esperado:**

{
  "servico": "AWS Lambda - Juros Compostos",
  "valorInicial": 1000,
  "taxaMensal": 1.2,
  "tempoMeses": 12,
  "valorFinal": 1153.89
}

---

### Azure Function - Conversão de Câmbio

Responsável por converter o valor final calculado pela AWS para dólar ou euro.

**Endpoint:**

https://func-cambio-grupoa-ggeedpbmcqfvd3ba.brazilsouth-01.azurewebsites.net/api/converterCambio

**Entrada esperada:**

{
  "valor": 1153.89,
  "moeda": "USD"
}

**Retorno esperado:**

{
  "servico": "Azure Function - Conversor de Câmbio",
  "valorOriginalBRL": 1153.89,
  "moeda": "USD",
  "cotacaoUtilizada": 5,
  "valorConvertido": 230.78
}

---

### Google Cloud Function - Projeção de Inflação

Responsável por aplicar uma projeção fictícia de inflação/IPCA sobre o valor final do investimento.

**Exemplo de chamada:**

https://projetar-inflacao-514889871389.southamerica-east1.run.app?valor=1153.89&ipca=4.5

**Retorno esperado:**

{
  "servico": "Google Cloud Function - Projetor de Inflação",
  "valorAntesInflacao": 1153.89,
  "ipcaAplicado": 4.5,
  "valorReal": 1104.2,
  "perdaInflacao": 49.69
}

---

## 🖥️ Frontend

O frontend foi desenvolvido com HTML, CSS e JavaScript.

Ele permite que o usuário informe:

- Valor inicial;
- Taxa de juros mensal;
- Tempo em meses;
- Moeda para conversão;
- IPCA fictício.

Após clicar em **Simular investimento**, o sistema chama as três funções em nuvem e exibe os resultados nos cards da AWS, Azure e Google Cloud.

---

## ▶️ Como Executar Localmente

Na raiz do projeto, execute:

node servidor-local.js

Depois acesse no navegador:

http://localhost:5500

---

## 🧪 Dados de Teste

Valor inicial: 1000  
Taxa mensal: 1.2  
Tempo em meses: 12  
Moeda: Dólar  
IPCA fictício: 4.5  

Resultado esperado:

Valor final com juros: R$ 1.153,89  
Valor convertido: US$ 230,78  
Valor real projetado: R$ 1.104,20  
Perda estimada pela inflação: R$ 49,69  

---

## ✅ Status do Projeto

- AWS Lambda funcionando;
- Azure Function funcionando;
- Google Cloud Function funcionando;
- Frontend integrado com as três nuvens;
- Projeto preparado para versionamento no GitHub.

---

## 📌 Conclusão

O projeto demonstrou o uso de uma arquitetura multicloud com serviços serverless, distribuindo responsabilidades entre AWS, Azure e Google Cloud.

A aplicação mostra como diferentes provedores podem trabalhar juntos em uma mesma solução, com o frontend atuando como ponto central de integração entre os serviços.
