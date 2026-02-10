import React from 'react';

function ProductCard() {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', width: '200px' }}>
      <img 
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
        alt="신발" 
        style={{ width: '100%' }} 
      />
      <h3>슈킹 슈즈 (브랜드A)</h3>
      <p>편안하고 착용감이 좋은 신발</p>
      <p><strong>35,000원</strong></p>
      <button>담기</button>
    </div>
  );
}

export default ProductCard;