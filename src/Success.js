import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  // Wallet 페이지에서 전달한 데이터 받기
  const amount = location.state?.amount || 0;
  const count = location.state?.count || 0;

  return (
    <div className="success-container" style={{ textAlign: 'center', padding: '50px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="success-content">
        <h1 className="success-title" style={{ fontSize: '32px', marginBottom: '10px' }}>결제 완료!</h1>
        <p style={{ fontSize: '18px', margin: '5px 0' }}>총 <strong>{count}개</strong>의 상품을 구매하셨습니다.</p>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>총 결제 금액 {amount.toLocaleString()}원</p>
        
        <div className="success-icon" style={{ fontSize: '80px', marginBottom: '40px' }}>✔️</div>
        
        <button 
          className="home-btn" 
          onClick={() => navigate('/')}
          style={{ 
            padding: '15px 40px', 
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer', 
            backgroundColor: '#f8e71c', 
            border: 'none',
            borderRadius: '30px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          상품 목록 보기
        </button>
      </div>
    </div>
  );
}

export default Success;