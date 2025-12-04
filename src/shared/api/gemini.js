import { env } from '../config';

// Google AI Studio curl 명령어와 동일하게 설정
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Gemini API를 사용하여 텍스트 생성 (REST API 방식)
 * @param {string} prompt - 사용자 질문
 * @param {string} model - 사용할 모델 (curl 예시와 동일: gemini-2.0-flash-exp)
 * @returns {Promise<string>} 생성된 답변
 */
export const generateAnswer = async (
  prompt,
  model = 'gemini-2.0-flash-exp'
) => {
  try {
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'Gemini API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.'
      );
    }

    const url = `${GEMINI_API_BASE_URL}/models/${model}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    console.log('🚀 Gemini API 호출 시작:', { 
      model, 
      url,
      prompt: prompt.slice(0, 50) + '...' 
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ API 응답 오류:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // 상세한 에러 메시지 추출
      const errorMessage = errorData.error?.message || 'API 요청 실패';
      const errorStatus = errorData.error?.status || response.status;
      
      throw new Error(`[${errorStatus}] ${errorMessage}`);
    }

    const data = await response.json();
    console.log('✅ Gemini API 응답 성공');

    // 응답에서 텍스트 추출
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('응답에서 텍스트를 찾을 수 없습니다.');
    }

    return text;
  } catch (error) {
    console.error('❌ Gemini API 호출 중 오류 발생:', error);

    const errorMsg = error.message || '';

    // 에러 타입에 따라 다른 메시지 반환
    if (errorMsg.includes('API_KEY_INVALID') || errorMsg.includes('INVALID_ARGUMENT')) {
      throw new Error('❌ API 키가 유효하지 않습니다.\n\n해결 방법:\n1. Google AI Studio에서 새 API 키를 발급받으세요\n2. .env.local 파일의 VITE_GEMINI_API_KEY를 확인하세요');
    } else if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('⏰ API 할당량이 초과되었습니다.\n\n해결 방법:\n1. 1분 후 다시 시도해주세요 (무료 티어는 분당 15회 제한)\n2. Google AI Studio에서 새 API 키를 발급받으세요\n3. 유료 플랜으로 업그레이드를 고려해주세요');
    } else if (errorMsg.includes('403') || errorMsg.includes('PERMISSION_DENIED')) {
      throw new Error('🔒 접근 권한이 없습니다.\n\nAPI 키가 활성화되었는지 확인해주세요.');
    } else if (errorMsg.includes('404') || errorMsg.includes('NOT_FOUND')) {
      throw new Error('🔍 모델을 찾을 수 없습니다.\n\n사용 가능한 모델 (v1beta):\n- gemini-1.5-flash (권장)\n- gemini-1.5-pro\n- gemini-1.5-flash-8b\n\n현재 설정: ' + model);
    } else {
      throw new Error(`❌ ${errorMsg}\n\n콘솔(F12)에서 자세한 오류를 확인해주세요.`);
    }
  }
};

