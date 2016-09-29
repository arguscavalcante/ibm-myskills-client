//angular.module('starter.services', [])

app.factory('PesquisaMock', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pesquisa =  {
  "nome": "Oi-BI",
  "descricao": "Pesquisa",
  "categorias": [{
    "nome": "Default",
    "descricao": "Grande descrição",
    "cor":"#C390D4",
    "corSecundaria":"#805D8C",
    "assuntos": [{
      "nome": "Processos de fullfilment",
      "texto": "O que você acha das mariolas?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o que voce acha das mariolas"
    }, {
      "nome": "OSS",
      "texto": "O que é o processo de Order Management?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o processo de Order Management"
    }, {
      "nome": "BSS",
      "texto": "Tá gostando seu order entry atual?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o seu order entry atual"
    }, {
      "nome": "Billing",
      "texto": "To Arbor or not to Arbor",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre Arbor or not to Arbor"
    }, {
      "nome": "WFM",
      "texto": "Sabe o que os técnicos de campo estão fazendo agora?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o que os técnicos de campo estão fazendo agora"
    }]
  },
  {
    "nome": "Default 2",
    "descricao": "Grande descrição 2",
    "cor":"#FFC300",
    "corSecundaria":"#E3AE00",
    "assuntos": [{
      "nome": "Processos de fullfilment",
      "texto": "O que você acha das mariolas?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o que voce acha das mariolas"
    }, {
      "nome": "OSS",
      "texto": "O que é o processo de Order Management?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o processo de Order Management"
    }, {
      "nome": "BSS",
      "texto": "Tá gostando seu order entry atual?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o seu order entry atual"
    }, {
      "nome": "Billing",
      "texto": "To Arbor or not to Arbor",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre Arbor or not to Arbor"
    }, {
      "nome": "WFM",
      "texto": "Sabe o que os técnicos de campo estão fazendo agora?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o que os técnicos de campo estão fazendo agora"
    }]
  },
  {
    "nome": "Default 3",
    "descricao": "Grande descrição 3",
    "cor":"#FF5733",
    "corSecundaria":"#DA4B2C",
    "assuntos": [{
      "nome": "Processos de fullfilment",
      "texto": "O que você acha das mariolas?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o que voce acha das mariolas"
    }, {
      "nome": "OSS",
      "texto": "O que é o processo de Order Management?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o processo de Order Management"
    }, {
      "nome": "BSS",
      "texto": "Tá gostando seu order entry atual?",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre o seu order entry atual"
    }, {
      "nome": "Billing",
      "texto": "To Arbor or not to Arbor",
      "tipoResposta": "escala likert",
      "descricao": "Explicacao sobre Arbor or not to Arbor"
    }]
  }]
};

  return {
    all: function() {
      return pesquisa;
    }
  };
});
