describe('Cart Test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });

  it('Should add a product to the cart', () => {
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('Should remove a product from the cart', () => {
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Nhấn nút Remove
    cy.get('.inventory_item').first().find('button').contains('Remove').click();

    // Biểu tượng giỏ hàng biến mất hoặc trở về 0
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('Should sort products by price low to high', () => {
    cy.get('.product_sort_container').select('lohi');
    cy.get('.inventory_item_price').first().should('have.text', '$7.99');
  });

  it('Should complete the checkout process step one', () => {
    cy.get('.inventory_item').first().find('.btn_inventory').click();
    cy.get('.shopping_cart_link').click();

    // Nhấn Checkout
    cy.get('[data-test="checkout"]').click();

    // Điền thông tin
    cy.get('[data-test="firstName"]').type('John');
    cy.get('[data-test="lastName"]').type('Doe');
    cy.get('[data-test="postalCode"]').type('12345');

    // Nhấn Continue
    cy.get('[data-test="continue"]').click();

    // Xác minh đang ở bước 2 của checkout
    cy.url().should('include', '/checkout-step-two.html');
  });
});
