# 🔧 문제 해결 가이드

## ⏰ "API 할당량 초과" 에러

### 원인
Gemini API 무료 티어의 사용 제한:
- **분당 요청 제한**: 15회
- **일일 요청 제한**: 1,500회

### 해결 방법

#### 1️⃣ 즉시 해결 (권장)
**1분 정도 기다린 후 다시 시도하세요.**

무료 API는 분당 15회 제한이 있으므로, 짧은 시간에 여러 번 요청하면 제한에 걸립니다.

#### 2️⃣ 새 API 키 발급
1. [Google AI Studio](https://aistudio.google.com/app/apikey) 접속
2. 기존 키 삭제 후 "Create API Key" 클릭
3. 새 키를 `.env.local`에 입력
4. 개발 서버 재시작

```env
VITE_GEMINI_API_KEY=새로발급받은키
```

#### 3️⃣ 다른 Google 계정 사용
다른 Google 계정으로 로그인하여 새 API 키를 발급받으세요.

#### 4️⃣ 유료 플랜 고려
더 많은 요청이 필요하다면 [Google Cloud Console](https://console.cloud.google.com/)에서 유료 플랜으로 업그레이드하세요.

---

## ❌ "API 키가 유효하지 않습니다" 에러

### 해결 방법

#### 1. API 키 확인
`.env.local` 파일을 열어서:
```env
VITE_GEMINI_API_KEY=AIzaSy로시작하는39자리키
```

- API 키는 `AIzaSy`로 시작해야 합니다
- 공백이나 따옴표가 없어야 합니다
- 정확히 39자리여야 합니다

#### 2. API 키 활성화 확인
1. [Google AI Studio](https://aistudio.google.com/app/apikey) 접속
2. API 키 상태 확인 (활성화되어 있는지)
3. 비활성화되어 있다면 새 키 발급

#### 3. 개발 서버 재시작
환경 변수 변경 후 **반드시** 서버 재시작:
```bash
# Ctrl + C로 종료 후
npm run dev
```

---

## 🔍 디버깅 방법

### 브라우저 콘솔 확인
1. **F12** 키를 눌러 개발자 도구 열기
2. **Console** 탭 클릭
3. 질문 전송 후 로그 확인:
   - `🚀 Gemini API 호출 시작` - 요청 시작
   - `✅ Gemini API 응답 성공` - 성공
   - `❌ API 응답 오류` - 에러 발생

### 환경 변수 확인
브라우저 콘솔에 다음 입력:
```javascript
console.log(import.meta.env.VITE_GEMINI_API_KEY);
```

- `undefined` 나오면 → `.env.local` 파일 확인 및 서버 재시작
- API 키가 보이면 → 키가 올바르게 설정됨

---

## 📞 추가 도움

여전히 문제가 해결되지 않는다면:
1. 브라우저 콘솔의 전체 에러 메시지 복사
2. `.env.local` 파일 내용 확인 (키는 가리고)
3. 어떤 에러가 발생하는지 상세히 공유


