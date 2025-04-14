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

4. Filtros e Ordenação

Os usuários podem filtrar as refeições por:

    Tipo de refeição: Como Café da manhã, Almoço, Lanche, Jantar.

    Data: Filtrando as refeições por data de registro.

    Calorias: Filtrando ou ordenando as refeições por calorias.

Além disso, é possível ordenar as refeições pelo nome, calorias ou data, clicando nas colunas da tabela.
5. Cálculo de Calorias Totais

O sistema calcula automaticamente o total de calorias consumidas a partir das refeições registradas. O total de calorias é mostrado no painel principal.
6. Modos de Visualização

O sistema possui três modos de visualização:

    Formulário de Registro: Para adicionar novas refeições.

    Planejamento: Para adicionar refeições planejadas.

    Histórico: Para visualizar e gerenciar todas as refeições registradas.

Como Funciona
Estrutura do Next.js com App Router

Este projeto foi desenvolvido utilizando o Next.js com App Router (/app), o que permite uma estrutura moderna para organização de páginas, componentes e API Routes dentro de uma única estrutura. As funcionalidades da aplicação são divididas em:

    Páginas: As páginas são gerenciadas através da pasta /app, como app/dashboard/page.tsx para a página do painel principal e app/login/page.tsx para a página de login.

    API Routes: A API interna do Next.js permite a interação com o banco de dados e manipulação das refeições através de rotas criadas na pasta app/api.

Conexão com MongoDB Atlas

A aplicação utiliza MongoDB Atlas como banco de dados na nuvem. O MongoDB armazena as informações das refeições, permitindo o registro, planejamento, consulta e exclusão de dados dos usuários.

    A conexão com o MongoDB é realizada no arquivo app/lib/mongodb.ts, onde são configurados os parâmetros de acesso e as operações de banco de dados.

Deploy no Vercel

A aplicação foi deployada no Vercel, uma plataforma de deploy com integração direta ao Next.js. O Vercel permite a hospedagem de aplicações Next.js com otimizações automáticas e CI/CD integrado. O deploy foi feito diretamente do repositório GitHub para o Vercel.
Fluxo de Dados

    Usuário Logado: O sistema depende da ID do usuário para buscar as refeições associadas a esse usuário no banco de dados. A ID é armazenada no localStorage para identificar o usuário em sessões subsequentes.

    Formulários Dinâmicos: O estado do formulário é atualizado conforme o usuário preenche os campos. Ao submeter o formulário, as informações são enviadas para a API (POST para criar ou PUT para editar).

    API: A aplicação faz requisições para endpoints da API (localizados na pasta /app/api) para manipular as refeições. A API é responsável por interagir com o banco de dados MongoDB, realizar as operações CRUD (Create, Read, Update, Delete) e retornar os dados necessários.

Funções do Código

    handleSubmit: Função responsável por enviar os dados do formulário para a API e atualizar o estado das refeições.

    handlePlanningSubmit: Função para adicionar refeições planejadas.

    handleDelete: Função para excluir uma refeição do histórico.

    handlePlannedDelete: Função para excluir uma refeição planejada.

    handleEdit: Função para editar uma refeição existente.

    handleFilterByType: Função que permite filtrar as refeições pelo tipo (Café da manhã, Almoço, Lanche, Jantar).

    handleSort: Função para ordenar as refeições por nome, calorias ou data.

Exemplo de Uso

    Registrar uma Refeição: Ao acessar a página inicial, o usuário pode preencher o formulário de refeição. Após o envio, a refeição será salva e aparecerá no histórico.

    Planejar uma Refeição: O usuário pode acessar o modo de planejamento, adicionar refeições planejadas e visualizar suas refeições agendadas para o dia.

    Visualizar Histórico: O usuário pode ver todas as refeições registradas, ordenar por nome, calorias ou data e excluir ou editar as refeições.

    Filtrar Refeições: O usuário pode usar a funcionalidade de filtro para exibir apenas as refeições de um tipo específico, como "Almoço" ou "Café da manhã", facilitando a visualização do histórico de refeições planejadas ou registradas.

Tecnologias Utilizadas

    Next.js com App Router: Framework para construção de aplicações full-stack com renderização no lado do servidor, utilizando o novo sistema de rotas baseado em pastas (/app).

    API Routes do Next.js: Endpoints para realizar operações CRUD com o banco de dados e interação com a interface do usuário.

    MongoDB Atlas: Banco de dados na nuvem para armazenar as informações das refeições.

    Tailwind CSS: Biblioteca de estilos para criação de layouts responsivos e customizados.

    Vercel: Plataforma de deploy para aplicações Next.js, com integração CI/CD.

Dependências

    next

    tailwindcss

    mongodb (diretamente, sem Mongoose)

Instruções de Instalação

    Clone o Repositório

Clone este repositório para o seu computador:

git clone https://github.com/your-username/alimemento.git
cd alimemento

    Instale as Dependências

Instale as dependências utilizando npm ou yarn:

npm install
# ou
yarn install

    Configuração do MongoDB

Certifique-se de configurar as variáveis de ambiente para conectar o MongoDB Atlas. Crie um arquivo .env.local na raiz do projeto e adicione a variável MONGODB_URI com a URL de conexão do seu banco MongoDB Atlas:

MONGODB_URI=mongodb+srv://<usuário>:<senha>@cluster0.mongodb.net/alimemento

    Execute o Projeto

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