describe('Testear el header de la aplicación',()=>{
  it('El título del Head es correcto',()=>{
    cy.visit('/')
    cy.document().its('title').should('eq', 'Jammint')
    cy.findByText(/Next.js!/i).should('be.visible');
    cy.findByText(/Next.js!/i).should('have.attr','href');
    cy.findByText(/Next.js!/i).should('have.css', 'font-size', '32px')
    cy.findByText(/Next.js!/i).should('have.css', 'font-weight', '700')
  })
})