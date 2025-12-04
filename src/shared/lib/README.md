# Shared Library (lib)

## 📝 개요

프로젝트 전체에서 재사용 가능한 유틸리티 함수와 헬퍼를 제공합니다.

## 📂 파일 구조

```
lib/
├── promptTemplates.js    # AI 프롬프트 템플릿
├── index.js             # Export 모음
└── README.md            # 문서
```

## 🎯 프롬프트 템플릿 (promptTemplates.js)

AI에게 더 좋은 답변을 받기 위한 구조화된 프롬프트 템플릿입니다.

### createAnswerPrompt

기본 답변 생성을 위한 프롬프트

```javascript
import { createAnswerPrompt } from '../../shared/lib';

const prompt = createAnswerPrompt('오늘 점심 뭐 먹을까?');
// 결과: "당신은 친근하고 재치있는 AI 어시스턴트입니다..."
```

**특징:**
- 친근하고 재치있는 톤
- 실용적인 답변 요청
- 이모지 활용

### createRetryPrompt

다른 관점의 답변을 위한 프롬프트 (재시도용)

```javascript
import { createRetryPrompt } from '../../shared/lib';

const prompt = createRetryPrompt('오늘 점심 뭐 먹을까?');
```

**특징:**
- 창의적인 관점
- 이전과 다른 답변 유도
- 생동감있는 표현

### createChoicePrompt

선택지 추천을 위한 프롬프트 (A vs B)

```javascript
import { createChoicePrompt } from '../../shared/lib';

const prompt = createChoicePrompt('마라탕 vs 돈까스 중에 골라줘');
```

**특징:**
- 결정 도움에 특화
- 장단점 분석
- 유머러스한 추천

### createIdeaPrompt

창의적 아이디어를 위한 프롬프트

```javascript
import { createIdeaPrompt } from '../../shared/lib';

const prompt = createIdeaPrompt('주말에 뭐하면 좋을까?');
```

**특징:**
- 혁신적인 아이디어 요청
- 다양한 관점 제시
- 실행 가능한 제안

## 📚 사용 예시

### MainPage.jsx에서 사용

```javascript
import { createAnswerPrompt, createRetryPrompt } from '../../shared/lib';

const handleSubmit = async () => {
  const structuredPrompt = createAnswerPrompt(userQuestion);
  await generateAIAnswer(structuredPrompt);
};
```

## 🎨 프롬프트 엔지니어링 원칙

1. **명확한 역할 정의**: AI의 역할과 톤을 명시
2. **구체적인 지시사항**: 원하는 답변 형식 설명
3. **맥락 제공**: 사용자 질문과 함께 맥락 전달
4. **일관성 유지**: 모든 프롬프트에 동일한 구조 사용

## 🔧 새 템플릿 추가하기

새로운 프롬프트 템플릿을 추가하려면:

1. `promptTemplates.js`에 함수 작성
2. `index.js`에 export 추가
3. JSDoc 주석으로 문서화

```javascript
/**
 * 새로운 프롬프트 템플릿 설명
 * @param {string} userQuestion - 사용자 질문
 * @returns {string} 구조화된 프롬프트
 */
export const createNewPrompt = (userQuestion) => {
  return `...`;
};
```

