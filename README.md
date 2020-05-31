
# Instruções

## 1 - Baixar e instalar o node e o npm
    Versões utilizadas:
        node -v : v12.17.0
        npm -v : 6.14.4

## 2 - Baixar e instalar o Oracle
    Criar usuário com permissões para leitura e escrita e criação de tabela
    

## 3 - Instalar os pacotes com npm install
    linha de comando na pasta raíz do projeto: npm install

## 4 - Configurações de banco
   ### 4.1 - Alterar os valores de usuario_db, password_db e localhost/orcl de acordo com seu usuário criado no banco de dados dentro da pasta raiz_do_projeto/config/dbconfig.js
    
        user          : process.env.NODE_ORACLEDB_USER || "usuario_db",
        password      : process.env.NODE_ORACLEDB_PASSWORD || 'password_db',
        connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/orcl",,
     
   ### 4.2 - Alterar o agendamento do consumo da api do Reddit em raiz_do_projeto/app.js
     
        

## 5 -  Rodar o projeto
    linha de comando na raíz do projeto: npm install
    


Api's

Primeiro endpoint: http://localhost:3000/postagens?ordem={valoe}&&dataInicial={valor}&&dataFinal={valor}

    Formato de data: 'dd/MM/YY' ou 'dd/MM/YY hh' ou 'dd/MM/YY hh:mm' ou 'dd/MM/YY hh:mm:ss'
    
    Exemplo: http://localhost:3000/postagens?dataInicial=20/05/20&&dataFinal=27/05/20&&ordem=ups
    
Segundo endpoint : http://localhost:3000/usuarios?ordem={valor_ordem}

    Possíveis valor_ordem para ordem: "ups" ou "comentarios"
    
    Exemplo: http://localhost:3000/usuarios?ordem=ups

    Exemplo: http://localhost:3000/postagens?dataInicial=20-05-20T14&&dataFinal=27-05-20&&ordem=comentarios

# Desafio Backend

A prova consiste em criar um programa que consulte a api do [reddit](https://www.reddit.com/dev/api/) uma vez por dia (deve ser uma tarefa agendada para rodar em um horário específico que você definir).

A sua tarefa diária deve salvar num banco de dados SQL as postagens que estejam HOT do subredit [artificial](https://api.reddit.com/r/artificial/hot).  

Você deve salvar título da postagem, nome do autor, timestamp da criação, número de "ups" e número de comentários, e criar dois endpoints para consulta desses dados (endpoints REST ou usando graphql).

O primeiro endpoint deve receber como parâmetro uma data inicial, uma data final e uma ordem (as ordens possíveis são número de "ups" e número de comentários) e deve retornar as postagens criadas dentro desse range seguindo a ordem estipulada (em ordem decrescente)

O segundo endpoint deve receber como parâmetro uma ordem (as ordens possíveis são número de "ups" e número de comentários) e deve retornar uma lista de usuários seguindo a ordem estipulada (em ordem decrescente)

Você pode utilizar qualquer linguagem para resolver o desafio, mas preferimos que seja em node ou python (essas são as linguagens que utilizamos aqui).

Além disso, não esqueça de incluir instruções sobre como executar o seu projeto.

Em caso de dúvidas entre em contato com a pessoa que te passou este desafio.
