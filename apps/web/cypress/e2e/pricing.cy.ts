describe("pricing page", () => {
  beforeEach(() => {
    cy.visit("/pricing");
  });

  it("should show headline", () => {
    cy.get("h1").should("contain", "Pricing");
  });
});
