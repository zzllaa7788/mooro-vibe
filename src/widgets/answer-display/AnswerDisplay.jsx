import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LoadingSpinner, ErrorMessage, Button } from '../../shared/ui';
import './AnswerDisplay.css';

export const AnswerDisplay = ({
  result,
  isLoading,
  error,
  onRetry,
  onCopy,
}) => {
  if (!isLoading && !result && !error) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      onCopy && onCopy();
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div className="answer-display">
      <div className="answer-display__container">
        {isLoading && <LoadingSpinner text="AI가 답변을 생성하고 있어요..." />}

        {error && <ErrorMessage message={error} />}

        {result && !isLoading && (
          <>
            <div className="answer-display__header">
              <h3 className="answer-display__title">💡 AI 답변</h3>
            </div>

            <div className="answer-display__content markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          borderRadius: '12px',
                          padding: '1.25em',
                          fontSize: '14px',
                          margin: '1em 0',
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={`inline-code ${className || ''}`} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {result}
              </ReactMarkdown>
            </div>

            <div className="answer-display__actions">
              <Button onClick={handleCopy} variant="outline">
                📋 복사하기
              </Button>
              <Button onClick={onRetry} variant="secondary">
                🔄 다른 답변 보기
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
