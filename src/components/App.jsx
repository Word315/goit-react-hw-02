 import { useEffect,useState } from 'react';
import Description from './Description';
import Options from './Options';
import './App.css';
import Feedback from './Feedback';

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem("feedbackData");
    return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("feedbackData", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positiveFeedback =
    feedback.good + feedback.bad > 0
      ? Math.round((feedback.good / (feedback.good + feedback.bad)) * 100)
      : 0;

  return (
    <div>
      
      <Description />
      <Options
        onFeedback={updateFeedback}
        onReset={resetFeedback}
        hasFeedback={totalFeedback > 0}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ): "No feedback yet"}
    </div>
  );
};

export default App;