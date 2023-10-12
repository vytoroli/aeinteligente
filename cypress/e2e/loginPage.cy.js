describe('loginPage-Testes', () => {
 
  beforeEach('Page', () => {
    cy.visit('aeinteligente.com.br/accounts/login/r')
  })

  it('Teste de Login com Credenciais válidas',() =>{
    cy.get('input[id="inptUsuario"]').click().type('testeqa@teste.com');
    cy.get('input[id="inptSenha"]').click().type('senha010101');
    //cy.get('button[id="btnEntrar"]').click(); 
  })

  it('Teste de Login com Credenciais Inválidas',() =>{
    cy.get('input[id="inptUsuario"]').click().type('testeqa@teste.com');
    cy.get('input[id="inptSenha"]').click().type('senha010101');
    cy.get('button[id="btnEntrar"]').click();
    cy.contains('div[id="swal2-content"]','Nome de usuário/e-mail não encontrado.').should('be.visible');
  })

  it('Teste de Validação de Campos Vazios',() =>{
    cy.get('input[id="inptUsuario"]').click();
    cy.get('input[id="inptSenha"]').click();
    cy.get('input[id="inptUsuario"]').click();
    cy.contains('[id="mat-error-0"]','Preencha este campo').should('be.visible');
    cy.contains('[id="mat-error-1"]','Preencha este campo').should('be.visible');
  })

  it('Teste de visualização de senha',() =>{
    cy.get('input[id="inptUsuario"]').click().type('Qa-test');
    cy.get('input[id="inptSenha"]').click().type('testeSenhaVisivel')
    cy.contains('mat-icon','visibility_off').click();
    cy.contains('mat-icon','visibility').should('be.visible');
   
  })

  it('Teste de solicitação de acesso - email válido',() =>{
    cy.get('button[id="btnSolicitarAcesso"]').click()
    cy.get('input[id="mat-input-2"]').click().type('Desafio QA AEI');
    cy.get('input[id="mat-input-3"]').click().type('qa@teste.com');
    cy.contains('span','Dependências Administrativas').click();
    cy.contains('span',' Privada').click();
    cy.contains('span',' Estadual ').click().click().type('{esc}');
    cy.get('input[id="telefone"]').click().type('31999999999');
    cy.contains('span','Enviar').click();
    
   /* Bug encontrado nesse teste. Ao enviar, ele apresenta uma mensagem de erro informando a falta de preenchimento da dependência 
    administrativa. O erro presente tambem no teste manual.*/

  })

  it('Teste de solicitação de acesso - email inválido',() =>{
    cy.get('button[id="btnSolicitarAcesso"]').click()
    cy.get('input[id="mat-input-2"]').click().type('Desafio QA AEI');
    cy.get('input[id="mat-input-3"]').click().type('qateste');
    cy.get('input[id="mat-input-2"]').click();
    cy.contains('mat-error[id="mat-error-5"]',' E-mail inválido ').should('be.visible');
  })

})