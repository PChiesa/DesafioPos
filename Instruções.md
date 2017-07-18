## Introdução

Atualmente, existem muitos frameworks javascript que facilitam o desenvolvimento de Single Page Applications (SPA), como por exemplo Vue, React e Angular, porém, ao utilizá-los, nos acomadamos com suas estruturas e funcionalidades. Por um lado, a abstração é excelente para a produtividade, permitindo construir aplicações de forma mais rápida e menos trabalhosa. Por outro, acabamos ignorando diversas funcionalidades providas pelo javascript puro e nos tornamos dependentes de bibliotecas e frameworks de terceiros

## Instruções

O desafio pode ser dividido em três partes: a primeira consiste em criar uma mini biblioteca de componentes, com funcionalidade bem limitada; a segunda, em criar um roteador simples para rotear componentes; a terceira, estilizar a página

Cada parte do desafio possui uma estrutura associada. Por exemplo, o arquivo ./api/router.js define as funções que devem ser obrigatoriamente implementadas para o roteador. Todos os métodos possuem uma documentação descrevendo o comportamento esperado

### Biblioteca de Componentes

A biblioteca de componentes deve ser capaz de referenciar um HTMLElement na página e associar um comportamento a ele. Toda a estrutura deve estar contida no arquivo api/component.js

### Roteador

O roteador deve ser capaz de inserir e retirar componentes do DOM de acordo com a URL atual. Cada página do roteador deve ser representada por um componente

### Estilização

A página deve ser estilizada. Neste etapa, não é permitida a utilização de nenhuma biblioteca, como bootstrap, foundation, materialize, etc. para a estilização, porém é permitida a utilização de assets como imagens e ícones

A classe bottom-natigation deve ser semelhante ao componente [Tab Bars](https://developer.apple.com/ios/human-interface-guidelines/ui-bars/tab-bars/) das guidelines da Apple. Note que não é necessário reproduzir o componente fielmente. Cores, fontes, espaçamentos e ícones não precisam ser iguais, podem ser definidos livremente

A estrutura HTML pode ser modificada conforme as necessidades do candidato

## Considerações Gerais

* As estruturas já definidas devem ser implementadas, porém o candidato pode criar funções, variáveis e arquivos adicionais conforme a necessidade
* Não é permitido o uso de nenhuma biblioteca ou framework que implemente o sistema de roteamento, de componente e de estilo
* Não é permitido o uso de JQuery nem de bibliotecas similares. Deve ser usado javascript puro, ES6 de preferência
* O projeto deve funcionar no navegador Google Chrome. Não é necessário suportar outros navegadores
* O projeto deve se adequar a telas pequenas somente (mobile). Não é necessário implementar estilos adicionais para telas maiores
* O projeto deve ter controle de versão (git de preferência) e deve estar disponível em um repositório público, como GitHub, Bitbucket, etc.
* O candidato é livre para adicionar qualquer sistema de automação ou bundler, como webpack, gulp, grunt, etc. Não é obrigatório, a utilização fica a critério do candidato
* O candidato pode utilizar qualquer pré-processador de CSS, como Sass, Less, Stylus, ..., desde que ele documente como utilizá-lo. O uso não é obrigatório
* Não é necessária a criação de um back end

### Considerações Finais
* O prazo para a entrega do projeto é de 7 dias
* Qualquer dúvida sobre o desafio, mandar um email para posmambaux@stone.com.br

Divirta-se \ (^ヮ^) /