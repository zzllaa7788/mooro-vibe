# API Layer

## 📝 개요

외부 API와의 통신을 담당하는 레이어입니다.

## 📂 파일 구조

```
api/
├── gemini.js       # Gemini API 클라이언트 및 호출 함수
└── index.js        # API 함수 export
```

## 🔧 Gemini API

### generateAnswer

사용자의 질문을 Gemini API에 전송하고 답변을 받아옵니다.

```javascript
import { generateAnswer } from '../../shared/api';

// 기본 사용
const answer = await generateAnswer('오늘 점심 뭐 먹을까?');

// 모델 지정
const answer = await generateAnswer(
  '오늘 점심 뭐 먹을까?',
  'gemini-2.5-flash'
);
```

### 매개변수

- `prompt` (string, 필수): 사용자 질문
- `model` (string, 선택): 사용할 Gemini 모델 (기본값: 'gemini-2.5-flash')

### 반환값

- `Promise<string>`: 생성된 답변 텍스트

### 에러 처리

다음과 같은 에러 메시지를 반환합니다:

- API 키 오류: "API 키가 유효하지 않습니다. 설정을 확인해주세요."
- 할당량 초과: "API 할당량을 초과했습니다. 나중에 다시 시도해주세요."
- 일반 오류: "AI 답변 생성에 실패했습니다. 다시 시도해주세요."

## 🔐 환경 변수

`.env.local` 파일에 다음 환경 변수가 설정되어 있어야 합니다:

```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com
```

