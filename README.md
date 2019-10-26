# cpmanager
Dooile - Gerenciador de CNPJ/CPF com blacklist

## Requerimentos

É necessário ter o docker instalado na sua máquina.

## Quick Start

No Linux:

```bash
./cpmanager prod up -d
```

No Windows:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Em seguida acesse o frontend em `http://localhost:3000` (Em desenvolvimento)

Para visualizar a documentação da GraphQLAPI do backend, basta acessar o GraphQL Playground em: `http://localhost:40000`
