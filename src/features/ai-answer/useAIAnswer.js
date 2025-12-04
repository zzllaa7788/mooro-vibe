import { useState, useEffect, useRef } from 'react';
import { generateAnswer } from '../../shared/api';

/**
 * AI 답변 생성을 위한 커스텀 훅
 * @returns {Object} AI 답변 관련 상태 및 함수
 */
export const useAIAnswer = () => {
  const [result, setResult] = useState('');
  const [displayedResult, setDisplayedResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 타이핑 효과를 위한 ref
  const typingTimeoutRef = useRef(null);
  const currentIndexRef = useRef(0);

  // ✨ 타이핑 효과: 답변이 한 글자씩 나타나는 애니메이션
  useEffect(() => {
    // 이전 타이핑 효과 정리
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (!result) {
      setDisplayedResult('');
      currentIndexRef.current = 0;
      return;
    }

    // 결과가 있으면 타이핑 효과 시작
    currentIndexRef.current = 0;
    setDisplayedResult('');

    const typeCharacter = () => {
      if (currentIndexRef.current < result.length) {
        // 한 번에 여러 글자씩 타이핑 (더 자연스러운 속도)
        const charsPerTick = Math.floor(Math.random() * 3) + 2; // 2-4글자씩
        const nextIndex = Math.min(
          currentIndexRef.current + charsPerTick,
          result.length
        );
        
        setDisplayedResult(result.slice(0, nextIndex));
        currentIndexRef.current = nextIndex;

        // 다음 타이핑까지의 딜레이 (10-30ms로 빠르게)
        const delay = Math.floor(Math.random() * 20) + 10;
        typingTimeoutRef.current = setTimeout(typeCharacter, delay);
      }
    };

    // 약간의 지연 후 타이핑 시작
    typingTimeoutRef.current = setTimeout(typeCharacter, 100);

    // 클린업 함수
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [result]);

  // 🔄 로딩 상태 변경 시 displayedResult 동기화
  useEffect(() => {
    if (isLoading) {
      // 로딩 시작 시 타이핑 효과 정리
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setDisplayedResult('');
      currentIndexRef.current = 0;
    }
  }, [isLoading]);

  /**
   * 질문을 Gemini API에 전송하고 답변을 받아옴
   * @param {string} prompt - 사용자 질문
   */
  const generateAIAnswer = async (prompt) => {
    if (!prompt?.trim()) {
      setError('질문을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult('');
    setDisplayedResult('');

    try {
      const answer = await generateAnswer(prompt);
      setResult(answer);
    } catch (err) {
      setError(err.message);
      console.error('AI 답변 생성 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 상태 초기화
   */
  const reset = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setResult('');
    setDisplayedResult('');
    setError(null);
    setIsLoading(false);
    currentIndexRef.current = 0;
  };

  /**
   * 타이핑 효과 스킵 (전체 결과 즉시 표시)
   */
  const skipTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setDisplayedResult(result);
    currentIndexRef.current = result.length;
  };

  return {
    result,
    displayedResult,
    isLoading,
    error,
    generateAIAnswer,
    reset,
    skipTyping,
  };
};
