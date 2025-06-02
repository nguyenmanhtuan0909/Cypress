it('Should remove product from the cart', () => {
  // Thêm sản phẩm đầu tiên vào giỏ
  cy.get('.inventory_item').first().find('.btn_inventory').click();
  cy.get('.shopping_cart_badge').should('have.text', '1');

  // Nhấn nút "Remove" để xóa
  cy.get('.inventory_item').first().find('.btn_inventory').click();

  // Kiểm tra giỏ hàng không hiển thị số lượng nữa
  cy.get('.shopping_cart_badge').should('not.exist');
});
