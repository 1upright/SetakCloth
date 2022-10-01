import { Button, DialogActions, DialogTitle, TextField } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router';
import {
  changeAddrRequest,
  getLocationxyRequest
} from '../../store/actions/services/userService';

declare global {
  interface Window {
    kakao?: any;
  }
}
const { kakao } = window;

const Address: React.FC = ({ changeAddress, handleClose }) => {
  const [addr, setAddr] = useState<string>('');
  const [addrDetail, setAddrDetail] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = async () => {
    const result1 = await getLocationxyRequest(`${addr} ${addrDetail}`);
    if (result1?.data?.documents) {
      const addrInfo = {
        addr,
        addrLat: result1?.data?.documents[0].y,
        addrLng: result1?.data?.documents[0].x,
        addrDetail
      };
      const result2 = await changeAddrRequest(addrInfo);
      if (result2?.data?.message === 'Created') {
        changeAddress(`${addr} ${addrDetail}`);
        handleClose(2);
      } else {
        navigate('/error');
      }
    } else {
      navigate('/error');
    }
  };

  const handleComplete = async (data) => {
    setAddr(`${data.address} ${data.buildingName}`);
  };

  const addrDetailChange = (event) => {
    setAddrDetail(event.target.value);
  };

  return (
    <div style={{ padding: 10, width: 500 }}>
      <DialogTitle>주소 설정하기</DialogTitle>
      <DaumPostcode autoClose={false} onComplete={handleComplete} />
      <TextField
        margin="dense"
        label={addr || '기본 주소'}
        fullWidth
        variant="outlined"
        disabled
      />
      <TextField
        margin="dense"
        label="상세 주소 입력"
        type="text"
        fullWidth
        variant="outlined"
        value={addrDetail}
        onChange={addrDetailChange}
      />
      <DialogActions>
        <Button onClick={() => handleClose(2)}>취소</Button>
        <Button onClick={handleChange}>변경</Button>
      </DialogActions>
    </div>
  );
};

export default Address;