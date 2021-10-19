/// <reference types="cypress" />
context('Assertions', () => {
    let email = ''

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(() => {

        cy.visit('/')
        cy.get('[data-testid=Button-primary]').click();
        cy.makeid().then((value) => (email = value));
    })



    describe('Case 1: New User Registration - Invalid Data', () => {
        it('.should() - Throw error when the user fails to accept the terms and conditions', () => {
            cy.get('[data-testid=sign-in-button]').click();
            cy.get('[data-testid=register]').click();
            cy.get('#create-account-email').clear();
            cy.get('#create-account-email').type(email + '@gmail.com');
            cy.get('#create-account-password').clear();
            cy.get('#create-account-password').type('12356');
            cy.get('[data-testid=Button-primary]').click();
            cy.get('.error-text').should('contain', 'Bevestig dat je akkoord gaat met de algemene voorwaarden')
        })

        describe('Case 2: New User Registration - Success', () => {
            it('.should() - create an user', () => {
                cy.createUser(email);
                cy.get('.my-account__title').should('exist')
            })

            describe('Case 3: New User Registration - and modify address Success', () => {
                it('.should() - create an user and add an address', () => {
                    cy.createUser(email);
                    cy.get('.my-account__title').should('exist')
                    cy.intercept('POST', 'https://th-beacon.prd.b2cecom.eu.pvh.cloud*',{
                     statusCode: 200,
                     body: {
                     },
                     })
                    cy.get('[data-testid="/myaccount/addressbook?storeId=30019&langId=31&catalogId=10158"]').click();
                    cy.get('[data-testid=address-add-button]').click();
                    cy.get('#firstName').clear();
                    cy.get('#firstName').type('Adonis');
                    cy.get('#lastName').type('Celestine');
                    cy.get('#address1').type('Hildebranddreef');
                    cy.get('#address2').type('1');
                    cy.get('#city').type('Utrecht');
                    cy.get('#zipCode').type('3561 VD');
                    cy.get('#country').select('Nederland')
                    cy.get('[data-testid=address-save-button]').click();
                    cy.get('#address1').should('have.value', 'Hildebranddreef');
                    cy.get('#address2').should('have.value', '1');
                    cy.get('#city').should('have.value','Utrecht')

                })

            })

        })
    })
})