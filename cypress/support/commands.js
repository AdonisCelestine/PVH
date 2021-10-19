// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('makeid', makeid)

Cypress.Commands.add('createUser', createUser)
      // fill-out form
      //let result : Cypress.Response

      function makeid()  {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 6; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

function createUser(email) {
      cy.get('[data-testid=sign-in-button]').click();
      cy.get('[data-testid=register]').click();
      cy.get('#create-account-email').clear();
      cy.get('#create-account-email').type(email + '@gmail.com');
      cy.get('#create-account-password').clear();
      cy.get('#create-account-password').type('12356');
      cy.get('.agree-terms > [data-testid=checkbox-label]').click();
      cy.get('[data-testid=Button-primary]').click();
      cy.get('.my-account__title').should('exist')
}
     
    

