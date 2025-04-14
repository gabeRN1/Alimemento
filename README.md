Alimemento

Alimemento é uma aplicação web para gerenciamento de alimentação. A plataforma permite que os usuários registrem suas refeições, planejem as próximas refeições, visualizem um histórico de alimentos consumidos e calculem o total de calorias ingeridas ao longo do tempo. Este repositório contém a parte central da aplicação, que inclui funcionalidades de registro de alimentos, planejamento e visualização de refeições.
Funcionalidades Principais
1. Registro de Refeições

Os usuários podem registrar refeições com as seguintes informações:

    Nome do alimento

    Descrição

    Calorias

    Data e hora

    Tipo de refeição (Café da manhã, Almoço, Lanche, Jantar)

Após o registro, as refeições são armazenadas no banco de dados e exibidas em um histórico com a possibilidade de edição e exclusão.
2. Planejamento de Refeições

Os usuários podem planejar suas refeições para o dia, com as seguintes informações:

    Nome do alimento

    Tipo de refeição

    Data e hora

    Calorias estimadas

Essas refeições planejadas ficam visíveis em uma tabela, com a opção de exclusão. O objetivo é permitir que os usuários possam planejar sua dieta com antecedência.
3. Histórico de Refeições

O histórico mostra todas as refeições registradas até o momento. Os usuários podem:

    Visualizar informações sobre cada refeição, incluindo o nome, descrição, calorias, data e tipo.

    Ordenar o histórico de refeições por nome, calorias e data.

    Editar ou excluir refeições.

4. Cálculo de Calorias Totais

O sistema calcula automaticamente o total de calorias consumidas a partir das refeições registradas. O total de calorias é mostrado no painel principal.
5. Filtros e Ordenação

Os usuários podem filtrar as refeições por tipo e data. Além disso, é possível ordenar as refeições pelo nome, calorias ou data, clicando nas colunas da tabela.
6. Modos de Visualização

O sistema possui três modos de visualização:

    Formulário de Registro: Para adicionar novas refeições.

    Planejamento: Para adicionar refeições planejadas.

    Histórico: Para visualizar e gerenciar todas as refeições registradas.

Como Funciona

O código React na página DashboardPage é a principal interface do usuário, responsável pela interação com as refeições. Ele utiliza o estado para controlar o conteúdo da página, incluindo as refeições registradas, planejadas e os formulários de entrada. O código também realiza operações com a API para salvar, editar, excluir e consultar as refeições.
Fluxo de Dados

    Usuário Logado: O sistema depende da ID do usuário para buscar as refeições associadas a esse usuário no banco de dados. A ID é armazenada no localStorage para identificar o usuário em sessões subsequentes.

    Formulários Dinâmicos: O estado do formulário é atualizado conforme o usuário preenche os campos. Ao submeter o formulário, as informações são enviadas para a API (POST para criar ou PUT para editar).

    API: A aplicação faz requisições para endpoints da API para manipular as refeições. A API é responsável por interagir com o banco de dados, realizar as operações CRUD (Create, Read, Update, Delete) e retornar os dados necessários.

Funções do Código

    handleSubmit: Função responsável por enviar os dados do formulário para a API e atualizar o estado das refeições.

    handlePlanningSubmit: Função para adicionar refeições planejadas.

    handleDelete: Função para excluir uma refeição do histórico.

    handlePlannedDelete: Função para excluir uma refeição planejada.

    handleEdit: Função para editar uma refeição existente.

Exemplo de Uso

    Registrar uma Refeição: Ao acessar a página inicial, o usuário pode preencher o formulário de refeição. Após o envio, a refeição será salva e aparecerá no histórico.

    Planejar uma Refeição: O usuário pode acessar o modo de planejamento, adicionar refeições planejadas e visualizar suas refeições agendadas para o dia.

    Visualizar Histórico: O usuário pode ver todas as refeições registradas, ordenar por nome, calorias ou data e excluir ou editar as refeições.

Tecnologias Utilizadas

    React: Framework para construção da interface do usuário.

    Tailwind CSS: Biblioteca de estilos para criação de layouts responsivos e customizados.

    API: Endpoints que interagem com um banco de dados para CRUD das refeições.

Dependências

    react

    react-dom

    tailwindcss

Instruções de Instalação
1. Clone o Repositório

Clone este repositório para o seu computador:

git clone https://github.com/your-username/alimemento.git
cd alimemento

2. Instale as Dependências

Instale as dependências utilizando npm ou yarn:

npm install
# ou
yarn install

3. Execute o Projeto

Para rodar o projeto em modo de desenvolvimento, use o comando:

npm run dev
# ou
yarn dev

A aplicação estará disponível em http://localhost:3000.
Melhorias Futuras

    Autenticação com Google: No futuro, a autenticação será aprimorada para permitir login com Google.

    Relatórios Avançados: Implementação de gráficos e relatórios detalhados sobre o consumo de calorias e os tipos de refeições.

    Sugestões de Refeições: Sistema de sugestões baseado no histórico de refeições e preferências do usuário.

Contribuições

Contribuições são bem-vindas! Se você tem alguma sugestão, correção ou melhoria, fique à vontade para abrir um issue ou um pull request.

Se você tiver alguma dúvida ou precisar de mais informações, sinta-se à vontade para entrar em contato!