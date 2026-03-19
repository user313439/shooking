import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail({ products, addedItems, onAdd, onSetQuantity }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  // 장바구니에 이미 담겨있는 상품인지 확인
  const cartItem = addedItems.find(item => item.id === (product?.id));
  const isAdded = !!cartItem;

  // 로컬 수량 상태 (장바구니에 있으면 그 수량, 없으면 기본 1)
  const [localQuantity, setLocalQuantity] = useState(cartItem ? cartItem.quantity : 1);

  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const handleQuantityChange = (delta) => {
    const newQty = Math.max(1, localQuantity + delta);
    setLocalQuantity(newQty);
    // 이미 장바구니에 있다면 즉시 반영
    if (isAdded) {
      onSetQuantity(product.id, newQty);
    }
  };

  const handleAddToCart = () => {
    if (isAdded) {
      onAdd(product.id); // 제거
    } else {
      onSetQuantity(product.id, localQuantity); // 현재 설정된 수량으로 추가
    }
  };

  // 💡 요구사항: 같은 브랜드의 다른 상품 최대 3개 필터링
  const relatedProducts = products
    .filter(p => p.brand === product.brand && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container detail-page">
      <header className="header" style={{ marginBottom: '20px' }}>
        <button className="back-btn" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>← 뒤로가기</button>
      </header>
      <div className="product-detail-content" style={{ padding: '0 20px' }}>
        <div className="detail-img-box" style={{ textAlign: 'center', background: '#f9f9f9', borderRadius: '12px', padding: '20px' }}>
          <img src={product.img} alt={product.brand} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div className="detail-info" style={{ marginTop: '20px' }}>
          <h2 style={{ margin: '0' }}>{product.brand}</h2>
          <p className="desc" style={{ color: '#666' }}>{product.desc}</p>
          <p className="price" style={{ fontWeight: 'bold', fontSize: '20px' }}>{product.price}</p>
          
          {/* 수량 조절 영역 추가 */}
          <div className="qty-control" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <button onClick={() => handleQuantityChange(-1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc' }}>-</button>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{localQuantity}</span>
            <button onClick={() => handleQuantityChange(1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ccc' }}>+</button>
          </div>

          <button 
            className={`add-btn ${isAdded ? 'active' : ''}`} 
            onClick={handleAddToCart}
            style={{ padding: '15px', fontSize: '16px' }}
          >
            {isAdded ? '장바구니에서 제거' : '장바구니 담기'}
          </button>
        </div>
      </div>

      {/* 관련 상품 섹션 */}
      <div className="related-section" style={{ padding: '40px 20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', textAlign: 'left' }}>
          관련 상품
        </h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', textAlign: 'left' }}>
          {product.brand}의 다른 신발은 어떠신가요?
        </p>
        <div className="product-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', padding: '0' }}>
          {relatedProducts.map(rp => (
            <div key={rp.id} className="product-card mini" onClick={() => navigate(`/detail/${rp.id}`)} style={{ cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ background: '#f2f2f2', borderRadius: '8px', padding: '10px' }}>
                <img src={rp.img} alt={rp.brand} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <p style={{ fontSize: '11px', marginTop: '5px', fontWeight: 'bold' }}>{rp.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;