import React, { useState, useEffect } from 'react';

function PaymentForm({ onBack, onClose, onSave }) {
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    userName: '',
    cvc: '',
    password: ['', '']
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { number, expiry, userName, cvc, password } = cardInfo;
    const isNumberValid = number.length === 16;
    const isExpiryValid = expiry.replace(/\s|\//g, '').length === 4;
    const isNameValid = userName.trim().length > 0;
    const isCvcValid = cvc.length === 3;
    const isPwValid = password[0].length === 1 && password[1].length === 1;
    setIsValid(isNumberValid && isExpiryValid && isNameValid && isCvcValid && isPwValid);
  }, [cardInfo]);

  const getMaskedInput = (number) => {
    let masked = '';
    for (let i = 0; i < number.length; i++) {
      if (i >= 8) masked += '*';
      else masked += number[i];
    }
    return masked.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleInputChange = (field, value) => {
    if (field === 'number') {
      if (value.length < getMaskedInput(cardInfo.number).length) {
        setCardInfo({ ...cardInfo, number: cardInfo.number.slice(0, -1) });
      } else {
        const lastChar = value.slice(-1);
        if (/[0-9]/.test(lastChar) && cardInfo.number.length < 16) {
          setCardInfo({ ...cardInfo, number: cardInfo.number + lastChar });
        }
      }
    } else if (field === 'userName') {
      setCardInfo({ ...cardInfo, userName: value.replace(/[^a-zA-Z\s]/g, '') });
    } else if (field === 'expiry') {
      const onlyNums = value.replace(/\D/g, '').slice(0, 4);
      let formatted = onlyNums;
      if (onlyNums.length > 2) formatted = onlyNums.slice(0, 2) + ' / ' + onlyNums.slice(2);
      setCardInfo({ ...cardInfo, expiry: formatted });
    } else {
      setCardInfo({ ...cardInfo, [field]: value });
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <button className="back-arrow-btn" onClick={onBack}>←</button>
        <h3 className="header-title">카드 추가</h3>
        <button className="close-btn-right" onClick={onClose}>✕</button>
      </div>

      <div className="card-preview-wrapper">
        <div className="card-preview-ui">
          <div className="card-chip"></div>
          <div className="preview-number">{getMaskedInput(cardInfo.number) || '0000 0000 **** ****'}</div>
          <div className="preview-bottom">
            <span className="preview-name">{cardInfo.userName.toUpperCase() || 'NAME'}</span>
            <span className="preview-expiry">{cardInfo.expiry || 'MM / YY'}</span>
          </div>
        </div>
      </div>

      <div className="input-form">
        <div className="input-group">
          <label>카드 번호</label>
          <input type="text" value={getMaskedInput(cardInfo.number)} onChange={(e) => handleInputChange('number', e.target.value)} className="gray-input" placeholder="0000 0000 0000 0000" />
        </div>
        <div className="input-group"><label>만료일</label><input type="text" value={cardInfo.expiry} onChange={(e) => handleInputChange('expiry', e.target.value)} className="gray-input half-input" placeholder="MM / YY" /></div>
        <div className="input-group"><label>카드 소유자 이름 (영문)</label><input type="text" value={cardInfo.userName} onChange={(e) => handleInputChange('userName', e.target.value)} className="gray-input" placeholder="NAME" /></div>
        <div className="input-row">
          <div className="input-group"><label>보안 코드(CVC/CVV)</label><input type="password" maxLength="3" className="gray-input mini-input" onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})} /></div>
          <div className="input-group"><label>카드 비밀번호</label>
            <div className="pw-inputs">
              <input type="password" maxLength="1" className="gray-input pw-box" onChange={(e) => {
                let newPw = [...cardInfo.password]; newPw[0] = e.target.value; setCardInfo({...cardInfo, password: newPw});
              }} />
              <input type="password" maxLength="1" className="gray-input pw-box" onChange={(e) => {
                let newPw = [...cardInfo.password]; newPw[1] = e.target.value; setCardInfo({...cardInfo, password: newPw});
              }} />
              <span className="dot">·</span><span className="dot">·</span>
            </div>
          </div>
        </div>
        <button className={`submit-btn ${isValid ? 'active' : ''}`} disabled={!isValid} onClick={() => onSave({ ...cardInfo, displayNumber: getMaskedInput(cardInfo.number) })}>
          작성 완료
        </button>
      </div>
    </div>
  );
}

export default PaymentForm;