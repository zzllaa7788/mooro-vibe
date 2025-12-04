import Lottie from 'lottie-react';
import chatAnimation from '../../../assets/Chat.json';
import './LoadingSpinner.css';

export const LoadingSpinner = ({ text = '답변 생성 중...' }) => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__animation">
        <Lottie
          animationData={chatAnimation}
          loop={true}
          autoplay={true}
          style={{ width: 120, height: 120 }}
        />
      </div>
      <p className="loading-text">{text}</p>
    </div>
  );
};
