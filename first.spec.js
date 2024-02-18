/// <reference types="cypress" />
// import "../../types/cypress.d";


function GetUserName()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 7; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

describe('template spec', () => {

  // beforeEach(() => {
  //   cy.login()
  
  it.only('sign-up', () => {
    
    const newUser = {
      userData: Math.random().toString(36).substr(2, 6),
    }
    const onboardingData = {
      bankName: 'Mój bank',
      routingNumber: Math.floor(Math.random() * 1000000000),

    }
    
    
    cy.visit('/')
    cy.getBySel('signup').click()
    cy.getBySel("signup-first-name").type(newUser.userData)
    cy.getBySel("signup-last-name").type(newUser.userData)
    cy.getBySel("signup-username").type(newUser.userData)
    cy.getBySel("signup-password").type(newUser.userData)
    cy.getBySel("signup-confirmPassword").type(newUser.userData)
    cy.getBySel('signup-submit').click()

    cy.login(newUser.userData, newUser.userData)

    cy.getBySelLike('user-onboarding-dialog-title').should('be.visible')

    cy.getBySel('user-onboarding-next').click()

    cy.getBySel("bankaccount-bankName-input").type(onboardingData.bankName)
    cy.getBySel("bankaccount-routingNumber-input").type(onboardingData.routingNumber)
    cy.getBySel("bankaccount-accountNumber-input").type(onboardingData.routingNumber)
    cy.getBySel("bankaccount-submit").click()

    cy.getBySel('user-onboarding-dialog-title').should('contain', 'Finished')
    cy.get('.MuiTypography-root').should('contain', `We're excited to have you aboard the Real World App!`)
    cy.getBySel('user-onboarding-next').click()
  })

  it('new transaction', () => {
    cy.login()
    const payment ={
      amount: '1',
      description: 'kebab'
    }
    cy.getBySelLike("sidenav-user-balance").invoke('text').then(balance => {
      expect(balance).to.match(/\$\d/)
    })
    cy.getBySelLike('new-transaction').click()
    cy.getBySel('users-list').first().click()
    cy.get('#amount').type(payment.amount)
    cy.get('#transaction-create-description-input').type(payment.description)
    cy.getBySelLike('submit-payment').click()
    cy.get('.MuiTypography-root').should('contain', payment.amount)
    .and('contain', payment.description)
  })
})