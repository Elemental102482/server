# Iniciar servidor Minecraft (público)

Este site é uma interface simples para iniciar o servidor automaticamente. Para que **qualquer pessoa** possa pedir para iniciar o servidor, o repositório deve ser **público** e permitir issues.

Como pedir para iniciar o servidor:
- Clique no botão abaixo para abrir uma issue pré-preenchida com o comando `/start`.

[Iniciar servidor agora](https://github.com/Davigtkiller/server/issues/new?title=Iniciar+Servidor&body=%2Fstart)

**Atenção: este repositório requer aprovação.**
- Quando a issue com `/start` for criada, ela será marcada com a label `pending-approval` e ficará aguardando a aprovação de um colaborador com permissão (admin/maintain/write).
- Para aprovar, um colaborador deve comentar `/approve` na issue. Uma vez aprovado, o workflow iniciará o servidor e publicará o endereço (IP:PORT) na própria issue, além do MOTD configurado (`bem vindo a nightfall`).

Aprovadores:
- @Davigtkiller (proprietário/administrador) — pode aprovar pedidos e iniciar o servidor.

Observações importantes:
- Depois que a issue for aprovada, um workflow vai rodar o servidor no GitHub Actions (runners são temporários).
- Para funcionar, adicione o secret `NGROK_TOKEN` em Settings → Secrets and variables → Actions.
- Uso público: este sistema permite que qualquer usuário abra uma issue para solicitar início; manter a triagem por aprovadores ajuda a evitar spam.

Se quiser, posso adicionar medidas anti-abuso adicionais (ex.: checar idade da conta, limitar por intervalo de tempo, ou requerer aprovação manual específica).