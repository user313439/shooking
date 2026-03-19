import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentForm({ onSave }) {
  const navigate = useNavigate();
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
    // 8번째 자리까지는 숫자로, 그 이후 8자리는 *로 표시 (총 16자리)
    let display = '';
    for (let i = 0; i < 16; i++) {
      if (i < number.length) {
        if (i >= 8) display += '*';
        else display += number[i];
      } else {
        // 입력되지 않은 자리는 공백 또는 기본값 표시 (선택 사항)
        // 여기서는 시안처럼 0000 0000 **** **** 구조를 유지하기 위해 채워넣지 않음
      }
    }
    // 4자리마다 띄어쓰기 추가
    return display.replace(/(.{4})/g, '$1 ').trim();
  };

  const handleInputChange = (field, value) => {
    if (field === 'number') {
      // 마스킹(*) 문자 때문에 value.replace(/\D/g, '')를 쓰면 숫자가 유실됨
      // 이전 숫자 문자열과 현재 입력된 문자열의 길이를 비교하여 실제 입력 감지
      const cleanValue = value.replace(/\s/g, ''); // 공백만 제거
      
      let newNumber = cardInfo.number;
      if (cleanValue.length > getMaskedInput(cardInfo.number).replace(/\s/g, '').length) {
        // 입력이 추가된 경우 (마지막 글자가 새로 입력된 숫자여야 함)
        const lastChar = cleanValue.slice(-1);
        if (/[0-9]/.test(lastChar) && newNumber.length < 16) {
          newNumber += lastChar;
        }
      } else if (cleanValue.length < getMaskedInput(cardInfo.number).replace(/\s/g, '').length) {
        // 삭제된 경우
        newNumber = newNumber.slice(0, -1);
      }
      
      setCardInfo({ ...cardInfo, number: newNumber });
    } else if (field === 'userName') {
      setCardInfo({ ...cardInfo, userName: value.replace(/[^a-zA-Z\s]/g, '').toUpperCase() });
    } else if (field === 'expiry') {
      const onlyNums = value.replace(/\D/g, '').slice(0, 4);
      let formatted = onlyNums;
      if (onlyNums.length > 2) formatted = onlyNums.slice(0, 2) + ' / ' + onlyNums.slice(2);
      setCardInfo({ ...cardInfo, expiry: formatted });
    } else {
      setCardInfo({ ...cardInfo, [field]: value });
    }
  };

  const handleSubmit = () => {
    onSave({ ...cardInfo, displayNumber: getMaskedInput(cardInfo.number) });
    navigate('/wallet');
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <button className="back-arrow-btn" onClick={() => navigate(-1)}>←</button>
        <h3 className="header-title">카드 추가</h3>
        <button className="close-btn-right" onClick={() => navigate('/wallet')}>✕</button>
      </div>

      <div className="card-preview-wrapper">
        <div className="card-preview-ui">
          <div className="card-chip"></div>
          <div className="preview-number">
            {cardInfo.number.length > 0 
              ? getMaskedInput(cardInfo.number) 
              : '0000 0000 **** ****'}
          </div>
          <div className="preview-bottom">
            <span className="preview-name">{cardInfo.userName || 'NAME'}</span>
            <span className="preview-expiry">{cardInfo.expiry || 'MM / YY'}</span>
          </div>
        </div>
      </div>

      <div className="input-form">
        <div className="input-group">
          <label>카드 번호</label>
          <input 
            type="text" 
            value={getMaskedInput(cardInfo.number)} 
            onChange={(e) => handleInputChange('number', e.target.value)} 
            className="gray-input" 
            placeholder="0000 0000 **** ****" 
          />
        </div>
        <div className="input-group"><label>만료일</label><input type="text" value={cardInfo.expiry} onChange={(e) => handleInputChange('expiry', e.target.value)} className="gray-input half-input" placeholder="MM / YY" /></div>
        <div className="input-group"><label>카드 소유자 이름 (영문)</label><input type="text" value={cardInfo.userName} onChange={(e) => handleInputChange('userName', e.target.value)} className="gray-input" placeholder="NAME" maxLength="30" /></div>
        <div className="input-row">
          <div className="input-group"><label>보안 코드(CVC/CVV)</label><input type="password" maxLength="3" value={cardInfo.cvc} className="gray-input mini-input" onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value.replace(/\D/g, '')})} /></div>
          <div className="input-group"><label>카드 비밀번호</label>
            <div className="pw-inputs">
              <input type="password" maxLength="1" value={cardInfo.password[0]} className="gray-input pw-box" onChange={(e) => {
                let newPw = [...cardInfo.password]; newPw[0] = e.target.value.replace(/\D/g, ''); setCardInfo({...cardInfo, password: newPw});
              }} />
              <input type="password" maxLength="1" value={cardInfo.password[1]} className="gray-input pw-box" onChange={(e) => {
                let newPw = [...cardInfo.password]; newPw[1] = e.target.value.replace(/\D/g, ''); setCardInfo({...cardInfo, password: newPw});
              }} />
              <span className="dot">·</span><span className="dot">·</span>
            </div>
          </div>
        </div>
        <button className={`submit-btn ${isValid ? 'active' : ''}`} disabled={!isValid} onClick={handleSubmit}>
          작성 완료
        </button>
      </div>
    </div>
  );
}

export default PaymentForm;