# Urban Risk Intelligence Platform

**FIAP — Global Solution 2026**

## Descrição do projeto

O **Urban Risk Intelligence Platform** é um protótipo de monitoramento de riscos urbanos que reúne registros simulados de 
sensores, fontes públicas e relatos da comunidade. A solução apresenta ocorrências em um aplicativo, classifica sua prioridade 
por regras transparentes e oferece um painel com indicadores para auxiliar a visualização dos riscos.

> **Escopo:** os dados iniciais são simulados. A classificação de prioridade usa uma fórmula determinística. Os alertas aparecem
dentro do aplicativo; não há notificações push em segundo plano.

## Funcionalidades

- Consulta e cadastro de ocorrências urbanas.
- Cadastro, consulta e gerenciamento de sensores.
- Painel com indicadores de ocorrências, incluindo alertas e casos críticos.
- Priorização de eventos com base em gravidade, confiança e tipo.
- Identificação da origem dos registros.
- Atualização automática das informações a cada aproximadamente 5 segundos.
- Aviso de perda de conexão e tentativa de reconexão, mantendo os últimos eventos exibidos.
- Navegação entre telas, inclusive retorno ao painel.

## 1. Executar o backend (Java + Spring Boot)

Abra um terminal na raiz do projeto:

```bash
cd backend
```

No Windows, com o Maven Wrapper:

```powershell
.\mvnw.cmd spring-boot:run
```

Ou, caso tenha Maven instalado:

```bash
mvn spring-boot:run
```

A API ficará disponível em **http://localhost:8080**. 

Para executar os testes automatizados:

```powershell
.\mvnw.cmd test
```

## 2. Executar o frontend (React Native + Expo)

**Mantenha o backend em execução** e abra um segundo terminal, na raiz do projeto:

```bash
cd mobile
npm install
```

Para iniciar o Expo:

```bash
npx expo start
```

Para abrir diretamente no navegador:

```bash
npx expo start --web
```

Para iniciar no emulador Android configurado:

```bash
npx expo start --android
```

## 3. Configurar a conexão entre frontend e backend

| Ambiente | URL da API |
| --- | --- |
| Navegador no mesmo computador | `http://localhost:8080/api` |
| Emulador Android | `http://10.0.2.2:8080/api` |

## 4. Testar a integração das duas stacks

1. Execute o backend e verifique `http://localhost:8080/api/health`.
2. Execute o frontend e abra o painel.
3. Consulte os eventos e sensores apresentados.
4. Cadastre uma ocorrência e confira se ela aparece na listagem e nos indicadores.
5. Interrompa o backend com `Ctrl+C` e observe o aviso de desconexão.
6. Reinicie o backend e confira a reconexão do aplicativo.

## 5. Regra de prioridade

A prioridade é calculada pela fórmula:

```text
prioridade = min(100, gravidade * 14 + confianca / 5 + bonus_tipo)
```

Bônus por tipo: **ALAGAMENTO = 10**, **SERVICO = 7** e **CALOR = 5**. Essa regra permite explicar por que um evento recebeu determinada prioridade.

## 7. Integrantes

| [Arthur Koiti Kawasaki] | [RM 570938] |


## 8. Repositório e entrega

**Repositório GitHub:** [https://github.com/ArthurKawasaki/urban-risk.git]

## 9. Link Vídeo

Demonstração das funcionalidades do Urban Risk

**Drive:** [https://drive.google.com/file/d/1GL7kBx5Uc_PTNpBwG37_2IvRrOo_pFe_/view?usp=sharing]

**GitHub:** [https://github.com/ArthurKawasaki/urban-risk/releases/download/v1.0.0/2026-11-19.22-05-41.mkv]
