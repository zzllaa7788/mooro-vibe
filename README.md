# 🔮 물어봐이브 (Mureo-Vibe)

> 일상의 사소한 고민부터 창의적인 아이디어까지, 무엇이든 물어보면 AI가 재치있게 답해주는 인터랙티브 웹 앱

## 📚 기술 스택

- **프레임워크:** React 19 + Vite
- **언어:** JavaScript (ES6+)
- **AI API:** Google Gemini
- **스타일:** CSS
- **코드 포맷터:** Prettier
- **배포:** Netlify

## 🏗️ 프로젝트 구조

이 프로젝트는 **FSD (Feature-Sliced Design)** 아키텍처를 따릅니다.

```
src/
├── app/          # 애플리케이션 레벨 (전역 설정)
├── pages/        # 페이지
├── widgets/      # 복합 UI 블록
├── features/     # 기능 단위
└── shared/       # 공유 리소스 (UI, API, utils)
```

자세한 구조는 [STRUCTURE.md](./STRUCTURE.md) 파일을 참고하세요.

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Gemini API 키 발급

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속하세요
2. "Create API Key" 버튼을 클릭하여 API 키를 발급받으세요

### 3. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 발급받은 API 키를 추가하세요:

```env
VITE_GEMINI_API_KEY=실제_발급받은_API_키를_여기에_입력
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com
```

⚠️ **중요:** `.env.local` 파일은 절대 GitHub에 커밋하지 마세요! (이미 `.gitignore`에 추가되어 있습니다)

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

## 📜 사용 가능한 스크립트

- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run preview` - 빌드된 결과물 미리보기
- `npm run format` - 코드 자동 포맷팅
- `npm run format:check` - 포맷 검사
- `npm run lint` - ESLint 검사

## 🎯 주요 기능

- ✨ 자유로운 질문 입력
- 🤖 AI 기반 답변 생성 (Gemini API)
- 📋 답변 복사하기
- 🔄 다른 답변 보기
- 💫 로딩 애니메이션

## 📝 라이센스

MIT License
