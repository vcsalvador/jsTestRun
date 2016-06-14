# CSS Maintainability Metric Calculator

Calcula uma métrica de manutenibilidade de código CSS baseada em 12 critérios.

## Desenvolvimento

Este é um pacote node.js e usa o gulp.js com algumas tarefas:

- **`gulp calculator`**: constrói o código do _bookmarklet_ e o coloca na
  pasta `dist/` sob os nomes `calculator.js` e `calculator.min.js`
- **`gulp docs`**: constrói a documentação do projeto e a coloca na pasta
  `dist/`.
- **`gulp`**: cria um _watch_ que reconstrói os arquivos sempre que
  há modificação.
- **`gulp deploy`**: publica a documentação na _github page_ do projeto.
