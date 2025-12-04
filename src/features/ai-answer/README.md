# AI 답변 생성 기능 (ai-answer)

## 📝 개요

Gemini API를 사용하여 사용자의 질문에 대한 AI 답변을 생성하는 기능입니다.

## 🎯 주요 기능

- Gemini API 호출 및 응답 처리
- 로딩 상태 관리
- 에러 처리 및 사용자 친화적인 에러 메시지 제공

## 🔧 사용 방법

### useAIAnswer Hook

```javascript
import { useAIAnswer } from '../../features/ai-answer';

function MyComponent() {
  const { result, isLoading, error, generateAIAnswer, reset } = useAIAnswer();

  const handleSubmit = async (question) => {
    await generateAIAnswer(question);
  };

  return (
    <div>
      {isLoading && <p>로딩 중...</p>}
      {error && <p>에러: {error}</p>}
      {result && <p>답변: {result}</p>}
    </div>
  );
}
```

## 📦 반환값

| 속성 | 타입 | 설명 |
|------|------|------|
| `result` | string | AI가 생성한 답변 텍스트 |
| `isLoading` | boolean | 로딩 상태 |
| `error` | string \| null | 에러 메시지 |
| `generateAIAnswer` | function | 질문을 전송하고 답변을 받는 함수 |
| `reset` | function | 모든 상태를 초기화하는 함수 |

## 🔗 의존성

- `@google/genai` - Google Gemini AI SDK
- `src/shared/api/gemini.js` - Gemini API 클라이언트

