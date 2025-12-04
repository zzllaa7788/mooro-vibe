// 환경 변수 설정
export const env = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  GEMINI_API_URL: import.meta.env.VITE_GEMINI_API_URL,
};

// 환경 변수 검증
export const validateEnv = () => {
  if (!env.GEMINI_API_KEY) {
    console.warn('⚠️ VITE_GEMINI_API_KEY가 설정되지 않았습니다.');
    return false;
  }
  return true;
};

