import { useEffect, useRef } from 'react';
import { TextArea } from '../../shared/ui';
import { Button } from '../../shared/ui';
import './QuestionInput.css';

const STORAGE_KEY = 'mooro_draft_question';

export const QuestionInput = ({ prompt, onPromptChange, onSubmit, isLoading }) => {
  const textAreaRef = useRef(null);

  // 🎯 자동 포커스: 페이지 로드 시 입력창에 포커스
  useEffect(() => {
    if (textAreaRef.current && !isLoading) {
      textAreaRef.current.focus();
    }
  }, []);

  // 💾 자동 저장: 입력 중인 질문을 localStorage에 저장 (디바운스)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (prompt.trim()) {
        localStorage.setItem(STORAGE_KEY, prompt);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }, 500); // 500ms 디바운스

    return () => clearTimeout(timeoutId);
  }, [prompt]);

  // 📥 복원: 페이지 로드 시 저장된 질문 복원
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft && !prompt) {
      onPromptChange(savedDraft);
    }
  }, []);

  // ⌨️ 키보드 단축키: Ctrl+Enter 또는 Cmd+Enter로 제출
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Enter 또는 Cmd+Enter로 제출
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
          handleSubmit();
        }
      }
      // Escape로 입력 초기화
      if (e.key === 'Escape' && document.activeElement === textAreaRef.current) {
        onPromptChange('');
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prompt, isLoading]);

  const handleSubmit = () => {
    if (prompt.trim()) {
      // 제출 성공 시 저장된 초안 삭제
      localStorage.removeItem(STORAGE_KEY);
      onSubmit();
    }
  };

  return (
    <div className="question-input">
      <div className="question-input__header">
        <h2 className="question-input__title">무엇이든 물어보세요! 💡 </h2>
        <p className="question-input__description">
          일상의 사소한 고민부터 창의적인 아이디어까지, AI가 재치있게 답해드려요
        </p>
      </div>

      <div className="question-input__content">
        <TextArea
          ref={textAreaRef}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="예: 오늘 점심 메뉴로 마라탕 vs 돈까스 중에 골라줘"
          disabled={isLoading}
          rows={6}
        />

        <div className="question-input__footer">
          <span className="question-input__shortcut">
            💡 Ctrl + Enter로 빠르게 질문하기
          </span>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !prompt.trim()}
            variant="primary"
          >
            {isLoading ? '생각하는 중...' : '물어보기! 🚀'}
          </Button>
        </div>
      </div>
    </div>
  );
};
