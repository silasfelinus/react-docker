describe("My First Test", () => {
  it("Visits the index page", () => {
    cy.visit("/");
    cy.contains("Welcome to Cosmos");
  });
});
