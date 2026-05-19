# SaaS Financeiro Multicloud - Grupo A

Projeto desenvolvido para a disciplina de Computação em Nuvem, com o objetivo de criar uma aplicação web financeira utilizando serviços em nuvem de diferentes provedores.

O sistema simula um investimento financeiro e distribui partes do processamento entre AWS, Azure e Google Cloud, utilizando funções serverless.

---

## Equipe

- Brenda Vitória Scarpioni
- João Vitor Vieira da Silva
- César Antônio de Oliveira Rocha
- Vitor Francisco Moraes Pereira

---

## Objetivo

O objetivo do projeto é demonstrar o funcionamento de uma aplicação SaaS em ambiente multicloud.

A aplicação permite que o usuário informe dados de uma simulação financeira e receba os resultados processados por diferentes serviços em nuvem.

Cada provedor ficou responsável por uma etapa do processamento, mostrando como diferentes nuvens podem trabalhar em conjunto em uma mesma solução.

---

## O que o site faz

O site realiza uma simulação financeira simples.

O usuário informa:

- Valor inicial do investimento;
- Taxa de juros mensal;
- Tempo em meses;
- Moeda para conversão;
- IPCA fictício.

Depois disso, o sistema calcula o valor final com juros compostos, converte esse valor para uma moeda estrangeira e também mostra uma projeção considerando a inflação informada.

Os resultados aparecem em três cards separados, cada um representando uma nuvem diferente.

---

## Funcionalidades

- Simulação de investimento financeiro;
- Cálculo de juros compostos;
- Conversão de câmbio;
- Projeção fictícia de inflação/IPCA;
- Integração entre três provedores de nuvem;
- Exibição dos resultados em uma interface web.

---

## Tecnologias Utilizadas

### Frontend

- HTML
- CSS
- JavaScript

### Serviços em Nuvem

- AWS Lambda
- Amazon API Gateway
- Azure Functions
- Google Cloud Run Functions

### Ferramentas de Desenvolvimento

- Visual Studio Code
- Node.js
- GitHub
- Navegador Web

---

## Nuvens Utilizadas

### AWS

A AWS foi utilizada para hospedar a função responsável pelo cálculo de juros compostos.

Essa função recebe os dados do investimento, como valor inicial, taxa mensal e tempo, e retorna o valor final calculado.

Serviços utilizados:

- AWS Lambda
- Amazon API Gateway

---

### Azure

A Azure foi utilizada para hospedar a função responsável pela conversão de câmbio.

Essa função recebe o valor calculado e converte para uma moeda estrangeira, como dólar ou euro, utilizando uma cotação fictícia para fins acadêmicos.

Serviço utilizado:

- Azure Functions

---

### Google Cloud

O Google Cloud foi utilizado para hospedar a função responsável pela projeção fictícia de inflação.

Essa função recebe o valor final do investimento e aplica o IPCA informado pelo usuário, mostrando uma estimativa do valor real após a inflação.

Serviço utilizado:

- Google Cloud Run Functions

---

## Arquitetura Geral

A aplicação segue uma arquitetura multicloud.

O frontend é responsável por receber os dados do usuário e chamar as funções publicadas nas três nuvens.

Fluxo básico:

Usuário informa os dados no site.

O frontend envia os dados para a AWS.

A AWS calcula os juros compostos.

O valor calculado é enviado para a Azure.

A Azure realiza a conversão de câmbio.

O mesmo valor também é enviado para o Google Cloud.

O Google Cloud realiza a projeção de inflação.

O frontend exibe todos os resultados na tela.

---

## Organização do Projeto

O projeto foi organizado em pastas separadas para facilitar a visualização dos arquivos de cada parte da aplicação.

- aws-lambda: arquivos da função criada na AWS;
- azure-functions: arquivos da função criada na Azure;
- google-functions: arquivos da função criada no Google Cloud;
- frontend-app: arquivos da interface web;
- servidor-local.js: servidor usado para testes locais;
- README.md: documentação principal do projeto.

---

## Conclusão

O projeto demonstrou como uma aplicação web pode utilizar diferentes provedores de nuvem ao mesmo tempo.

Com a divisão das funções entre AWS, Azure e Google Cloud, foi possível criar uma solução multicloud simples, funcional e integrada.

A atividade permitiu compreender melhor o uso de funções serverless, APIs públicas e integração entre serviços em nuvem.
