![Logo](https://github.com/IgorCavalcantiMoura/fap2024/blob/main/FBR%201.png?raw=true)

# FBR digital - Cadastro de Provedores
## Descrição
O Cadastro de Provedores da FBR Digital é uma aplicação que visa facilitar o cadastro e homologação de provedores de internet na base da FBR Digital. A plataforma permite o registro detalhado dos provedores, incluindo informações de infraestrutura, área de cobertura e serviços oferecidos, proporcionando maior visibilidade para a geração de novas demandas de serviços.

## Objetivo
O objetivo principal é garantir que os provedores de internet tenham seus cadastros completos, permitindo a homologação e visualização de demandas de serviços de acordo com a área de cobertura cadastrada.

## Funcionalidades Principais
- Cadastro de Provedores: Registro de informações corporativas como CNPJ, Nome Fantasia, Endereço e Contatos.
- Cadastro de Áreas de Cobertura: Definição das áreas onde o provedor opera, com a possibilidade de upload via CSV ou KMZ.
- Cadastro de Infraestrutura: Detalhamento da infraestrutura, incluindo ASN, participação em PTTs e operadoras de backbone.
- Cadastro de Serviços: Registro dos planos oferecidos, velocidade de conexão, SLA e preços.
- Sistema de Ranking: Ranking dos serviços baseado na razão preço/velocidade.
- Apresentação de Demandas: Exibição de demandas recebidas através de um painel que permite envio de propostas.

## Tecnologias Utilizadas
- Backend: NestJS
- Banco de Dados: MySQL
- ORM: TypeORM
- Linguagem: TypeScript
- Banco de dados em desenvolvimento: PostgreSQL

## Instalação e Configuração
- Node.js (>= 14.x)
- MySQL

## Passos para rodar o projeto localmente
#### Clone o repositório:

    git clone https://github.com/softexrecifepe/PI-T1-GP1-FBR.git
#### Acesse o diretório do projeto:

    cd fbr-digital-provedores
#### Instale as dependências:

    npm install
#### Configure as variáveis de ambiente no arquivo .env:

    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=sua_senha
    DB_DATABASE=fbr_digital

#### Inicie o servidor de desenvolvimento:

    npm run start:dev
#### O projeto estará rodando em:
    http://localhost:4000

## Contribuição
- Faça um fork do projeto.
- Crie uma branch para sua nova funcionalidade (git checkout -b feat/nova-funcionalidade).
- Faça commit das suas alterações (git commit -m 'Adiciona nova funcionalidade').
- Envie para o repositório remoto (git push origin feat/nova-funcionalidade).
- Crie um pull request.

## Equipe
<table align="center">
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/igor-cavalcanti-moura/">
        <img src="https://avatars.githubusercontent.com/u/105571519?v=4" width="100px;" alt="Igor Moura Profile Picture"/><br>
      </a>
      <sub>
          <b>Igor Moura</b>
         </sub>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/146452808?v=4" width="100px;" alt="Alyff Antônio Picture"/><br>
         </a>
        <sub>
          <b>Alyff Antônio</b>
        </sub>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/54045082?v=4" width="100px;" alt="Foto do Willians K."/><br>
      </a>
        <sub>
          <b>Willians K.</b>
        </sub>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/100253391?v=4" width="100px;" alt="Foto do José Felipe"/><br>
      </a>
        <sub>
          <b>José Felipe</b>
        </sub>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/66437895?v=4" width="100px;" alt="Foto do Thiago Dias"/><br>
      </a>
        <sub>
          <b>Thiago Dias</b>
        </sub>
    </td>
  </tr>
</table>

## Licença
Este projeto é licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contato
Para maiores informações ou sugestões, entre em contato: projetofbr@gmail.com
