# cpmanager
Dooile - Gerenciador de CNPJ/CPF com blacklist

## Requerimentos

É necessário ter o docker instalado na sua máquina.

## Quick Start

No Linux:

```bash
./cpmanager prod up -d --build
```

No Windows:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Em seguida acesse o frontend em `http://localhost:80` (Em desenvolvimento)

Para visualizar a documentação da GraphQLAPI do backend, basta acessar o GraphQL Playground em: `http://localhost:5000`

## Ambiente de desenvolvimento

No Linux:

```bash
./cpmanager dev up -d
```

No Windows:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### Ambiente de testes

Confira os logs e os resultados dos testes digitando na linha de comando:

```bash
./cpmanager dev logs node-test
```

ou

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f node-test
```

### Backend

Acesse o url:

```url
http://localhost:5000/
```

Para ver os logs:

```bash
./cpmanager dev logs node-backend
```

### Frontend

Acesse o url:

```url
http://localhost:3000/
```

Para ver os logs:

```bash
./cpmanager dev logs frontend
```
