# SaaS Financeiro Multicloud - BitCode - Grupo A

Projeto desenvolvido para a disciplina de Computação em Nuvem, com o objetivo de criar uma aplicação SaaS financeira utilizando uma arquitetura multicloud com serviços serverless distribuídos entre AWS, Azure e Google Cloud.

A aplicação simula um fluxo financeiro simples, em que cada provedor de nuvem executa uma responsabilidade específica. O frontend centraliza a interação com o usuário, chama os três serviços publicados em nuvem e exibe os resultados de forma integrada.

---

## Equipe Bitcode

**Grupo A**

- Brenda Vitória Scarpioni
- João Vitor Vieira da Silva
- César Antônio de Oliveira Rocha
- Vitor Francisco Moraes Pereira

---

## Objetivo do Projeto

O objetivo do projeto é demonstrar o uso de uma solução SaaS distribuída em múltiplas nuvens, utilizando funções serverless para processar partes diferentes de uma simulação financeira.

A aplicação permite informar:

- Valor inicial do investimento;
- Taxa de juros mensal;
- Tempo em meses;
- Moeda para conversão;
- IPCA fictício para projeção de inflação.

Com esses dados, o sistema realiza três operações principais:

1. Cálculo de juros compostos na AWS;
2. Conversão de câmbio na Azure;
3. Projeção de inflação no Google Cloud.

---

## Arquitetura da Solução

A aplicação foi organizada em uma arquitetura multicloud, onde o frontend atua como orquestrador das chamadas para as três funções em nuvem.

```text
Usuário
  |
  v
Frontend Web
  |
  |----> AWS Lambda
  |       Função: Juros Compostos
  |
  |----> Azure Function
  |       Função: Conversão de Câmbio
  |
  |----> Google Cloud Function
          Função: Projeção de Inflação/IPCA
