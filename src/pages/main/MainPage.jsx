import { useState, useEffect } from 'react';
import { QuestionInput } from '../../features/question-input';
import { AnswerDisplay } from '../../widgets/answer-display';
import { useAIAnswer } from '../../features/ai-answer';
import { createAnswerPrompt, createRetryPrompt } from '../../shared/lib';
import './MainPage.css';

const HISTORY_STORAGE_KEY = 'mooro_qa_history';
const MAX_HISTORY_COUNT = 10;

export const MainPage = () => {
  // 질문 입력 상태
  const [prompt, setPrompt] = useState('');
  
  // 히스토리 상태
  const [history, setHistory] = useState([]);

  // AI 답변 생성 커스텀 훅 사용
  const { result, isLoading, error, generateAIAnswer, displayedResult } = useAIAnswer();

  // 📜 히스토리 로드: 페이지 로드 시 localStorage에서 히스토리 복원
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.error('히스토리 로드 실패:', err);
    }
  }, []);

  // 💾 히스토리 저장: 새로운 질문/답변 쌍을 히스토리에 저장
  useEffect(() => {
    if (result && prompt && !isLoading) {
      const newEntry = {
        id: Date.now(),
        question: prompt,
        answer: result,
        timestamp: new Date().toISOString(),
      };

      setHistory((prev) => {
        const updated = [newEntry, ...prev].slice(0, MAX_HISTORY_COUNT);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  }, [result]);

  // 🏷️ 브라우저 타이틀 동적 변경
  useEffect(() => {
    const originalTitle = '🔮 물어봐이브 - AI에게 무엇이든 물어보세요!';
    
    if (isLoading) {
      document.title = '🤔 생각하는 중... | 물어봐이브';
    } else if (error) {
      document.title = '❌ 오류 발생 | 물어봐이브';
    } else if (result) {
      document.title = '✨ 답변 완료! | 물어봐이브';
    } else {
      document.title = originalTitle;
    }

    // 컴포넌트 언마운트 시 원래 타이틀로 복원
    return () => {
      document.title = originalTitle;
    };
  }, [isLoading, error, result]);

  // 👁️ 페이지 가시성 변경 감지: 탭 전환 시 타이틀 업데이트
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isLoading) {
        document.title = '🤔 아직 생각 중... | 물어봐이브';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isLoading]);

  // AI 답변 생성 함수
  const handleSubmit = async () => {
    // 프롬프트 템플릿 사용
    const structuredPrompt = createAnswerPrompt(prompt);
    await generateAIAnswer(structuredPrompt);
  };

  // 다른 답변 보기 (같은 질문 재전송)
  const handleRetry = () => {
    // 재시도 프롬프트 템플릿 사용
    const retryPrompt = createRetryPrompt(prompt);
    generateAIAnswer(retryPrompt);
  };

  // 복사 성공 알림
  const handleCopy = () => {
    alert('답변이 복사되었습니다! 📋');
  };

  // 히스토리에서 질문 불러오기
  const handleLoadFromHistory = (historyItem) => {
    setPrompt(historyItem.question);
  };

  return (
    <div className="main-page">
      {/* 배경 애니메이션 */}
      <div className="main-page__bg-effects">
        <div className="floating-bubble bubble-1"></div>
        <div className="floating-bubble bubble-2"></div>
        <div className="floating-bubble bubble-3"></div>
        <div className="floating-bubble bubble-4"></div>
        <div className="floating-bubble bubble-5"></div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="main-page__container">
        <QuestionInput
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <AnswerDisplay
          result={displayedResult || result}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
          onCopy={handleCopy}
        />

        {/* 히스토리 섹션 */}
        {history.length > 0 && !isLoading && !result && (
          <div className="main-page__history">
            <h3 className="main-page__history-title">
              <span className="history-icon">📚</span>
              최근 질문
            </h3>
            <ul className="main-page__history-list">
              {history.slice(0, 5).map((item, index) => (
                <li 
                  key={item.id} 
                  className="main-page__history-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <button
                    className="main-page__history-button"
                    onClick={() => handleLoadFromHistory(item)}
                  >
                    <span className="main-page__history-question">
                      {item.question.length > 50
                        ? item.question.slice(0, 50) + '...'
                        : item.question}
                    </span>
                    <span className="main-page__history-date">
                      {new Date(item.timestamp).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
