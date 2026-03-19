import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductList({ products, addedItems, onAdd }) {
  const navigate = useNavigate();

  // 첫 화면용 상품 필터링: 각 브랜드별 상위 2개씩만 추출
  const displayProducts = [
    ...products.filter(p => p.brand === '브랜드A').slice(0, 2),
    ...products.filter(p => p.brand === '브랜드B').slice(0, 2),
    ...products.filter(p => p.brand === '브랜드C').slice(0, 2),
  ];

  // addedItems가 [{id, quantity}] 형태일 때를 고려하여 id 배열 추출
  const addedItemIds = addedItems.map(item => typeof item === 'object' ? item.id : item);

  return (
    <div className="container">
      <header className="header">
        <div className="header-inner">
          <div className="cart-icon" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
            🛒 {addedItems.length > 0 && <span className="badge">{addedItems.length}</span>}
          </div>
        </div>
      </header>
      <section className="title-section">
        <h2>신발 상품 목록</h2>
        <p>현재 6개의 상품이 있습니다.</p>
      </section>
      <div className="product-grid">
        {displayProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isAdded={addedItemIds.includes(product.id)} 
            onAdd={onAdd}
            onClickImage={() => navigate(`/detail/${product.id}`)}
            onBuy={() => {
              if (!addedItemIds.includes(product.id)) onAdd(product.id);
              navigate('/cart');
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;