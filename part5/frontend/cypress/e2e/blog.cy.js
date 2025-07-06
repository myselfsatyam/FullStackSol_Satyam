describe('blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('backendUrl')}/api/testing/reset`);
    cy.visit('');
  });


  describe('after login', () => {
    beforeEach(() => {
      const user = {
        name: 'Pulkit',
        username: 'pulkit',
        password: 'pulkit',
      };
      
      cy.request('POST', `${Cypress.env('backendUrl')}/api/users`, user).then((res) => {
        window.localStorage.setItem('loggedNoteappUser', JSON.stringify(res.body));
        cy.visit('');
      });

      cy.request('POST', `${Cypress.env('backendUrl')}/api/login`, user).then((res) => {
        const blog = {
          title: 'Test Blog',
          author: `${JSON.parse(window.localStorage.loggedNoteappUser).id}`,
          url: 'https://devpulkit.vercel.app/',
          likes:0
        };

        cy.request({
          method: 'POST',
          url: `${Cypress.env('backendUrl')}/api/blogs`,
          body: blog,
          headers: {
            Authorization: `Bearer ${res.body.token}`,
            'Content-Type': 'application/json',
          },
        });

        cy.visit('');      
      });
    });


    it("blogs are ordered acc. to likes",()=>{
      
      const user = {
        username: 'pulkit',
        password: 'pulkit',
      };

      cy.request('POST', `${Cypress.env('backendUrl')}/api/login`, user).then((res) => {
        const blog = {
          title: 'Test2 Blog',
          author: `${JSON.parse(window.localStorage.loggedNoteappUser).id}`,
          url: 'https://devpulkit.vercel.app/',
          likes:0
        };

        cy.request({
          method: 'POST',
          url: `${Cypress.env('backendUrl')}/api/blogs`,
          body: blog,
          headers: {
            Authorization: `Bearer ${res.body.token}`,
            'Content-Type': 'application/json',
          },
        });

        cy.visit('');
      })

      cy.contains("view").click();
      cy.contains("view").click();

      for (let i=0;i<5;i++) cy.contains("Test").parent().contains("👍").click()
      for (let i=0;i<10;i++) cy.contains("Test2").parent().contains("👍").click()
      
      cy.get('.note').eq(0).should('contain', 'Test2')
      
      for (let i=0;i<15;i++) cy.contains("Test").parent().contains("👍").click()
      
      cy.get('.note').eq(0).should('contain', 'Test')

    });
  });
});