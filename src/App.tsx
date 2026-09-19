import React, { useState } from 'react';
import { QUESTION_STEPS, STORY_STEPS } from './data/mockData';
import { ScreenId, OnboardingAnswers } from './types';
import { Topbar } from './components/Topbar';
import { OnboardingQuestionScreen } from './components/OnboardingQuestionScreen';
import { StoryCard } from './components/StoryCard';
import { TagsScreen } from './components/TagsScreen';
import { LessonsScreen } from './components/LessonsScreen';
import { QuizScreen } from './components/QuizScreen';
import { AccountScreen } from './components/AccountScreen';
import { OfferScreen } from './components/OfferScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { WorkspaceScreen } from './components/WorkspaceScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { Toast } from './components/Toast';
import { ContinueButton } from './components/ContinueButton';

export const App: React.FC = () => {
  // Starts from the beginning of the app (q1)
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('q1');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>([]);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [activeProjectTitle, setActiveProjectTitle] = useState<string>('Foundations of Web Dev');
  const [userEmail, setUserEmail] = useState<string | null>('nathanielqimadiyi@gmail.com');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const navigateTo = (nextScreen: ScreenId) => {
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(nextScreen);
  };

  const handleBack = () => {
    if (screenHistory.length === 0) return;
    const prev = screenHistory[screenHistory.length - 1];
    setScreenHistory((prevHistory) => prevHistory.slice(0, -1));
    setCurrentScreen(prev);
  };

  const resetToStart = () => {
    setScreenHistory([]);
    setAnswers({});
    setCurrentScreen('q1');
    triggerToast('Restarted onboarding');
  };

  // Find question or story step metadata
  const activeQuestion = QUESTION_STEPS.find((q) => q.id === currentScreen);
  const activeStory = STORY_STEPS.find((s) => s.id === currentScreen);

  // Compute progress for Topbar
  let progressPercent = 0;
  if (activeQuestion) {
    progressPercent = activeQuestion.progressPercent;
  } else if (activeStory) {
    progressPercent = activeStory.progressPercent;
  } else if (currentScreen === 'tags') {
    progressPercent = 64.7;
  } else if (currentScreen === 'lessons') {
    progressPercent = 70.6;
  } else if (currentScreen === 'quiz') {
    progressPercent = 76.5;
  } else if (currentScreen === 'account') {
    progressPercent = 88.2;
  } else if (currentScreen === 'offer') {
    progressPercent = 100;
  }

  const isOnboardingFlow =
    activeQuestion !== undefined ||
    activeStory !== undefined ||
    ['tags', 'lessons', 'quiz', 'account', 'offer'].includes(currentScreen);

  return (
    <div className="w-full min-h-[100dvh] bg-[#14151D] text-[#F4F5FA] font-sans antialiased overflow-x-hidden flex flex-col selection:bg-[#8B7CF6]/30">
      {/* Topbar for Onboarding Steps */}
      {isOnboardingFlow && (
        <Topbar
          progressPercent={progressPercent}
          onBack={handleBack}
          canGoBack={screenHistory.length > 0}
          isOnLight={currentScreen === 'offer'}
          onSkip={
            currentScreen === 'account'
              ? undefined
              : currentScreen === 'offer'
              ? () => navigateTo('home')
              : () => navigateTo('account')
          }
        />
      )}

      {/* Question Screens (q1 - q6) */}
      {activeQuestion && (
        <>
          <OnboardingQuestionScreen
            step={activeQuestion}
            selectedValue={answers[activeQuestion.fieldKey]}
            onSelectOption={(val) => {
              setAnswers((prev) => ({ ...prev, [activeQuestion.fieldKey]: val }));
            }}
          />
          <ContinueButton
            onClick={() => navigateTo(activeQuestion.nextId)}
            isDim={!answers[activeQuestion.fieldKey]}
            onDeny={() => triggerToast('Please select an option to continue')}
          />
        </>
      )}

      {/* Story Highlight Screens (h1 - h5) */}
      {activeStory && (
        <>
          <StoryCard step={activeStory} />
          <ContinueButton onClick={() => navigateTo(activeStory.nextId)} />
        </>
      )}

      {/* Tags Screen */}
      {currentScreen === 'tags' && (
        <>
          <TagsScreen />
          <ContinueButton onClick={() => navigateTo('lessons')} />
        </>
      )}

      {/* Bite-sized Lessons Screen */}
      {currentScreen === 'lessons' && (
        <>
          <LessonsScreen />
          <ContinueButton onClick={() => navigateTo('quiz')} />
        </>
      )}

      {/* Quiz Screen */}
      {currentScreen === 'quiz' && (
        <>
          <QuizScreen
            selectedAnswer={answers.quizAnswer}
            onSelectAnswer={(val) => {
              setAnswers((prev) => ({ ...prev, quizAnswer: val }));
            }}
          />
          <ContinueButton
            onClick={() => navigateTo('account')}
            isDim={!answers.quizAnswer}
            onDeny={() => triggerToast('Please choose an answer')}
          />
        </>
      )}

      {/* Account Creation Screen */}
      {currentScreen === 'account' && (
        <AccountScreen
          onContinueGoogle={(email) => {
            if (email) setUserEmail(email);
            triggerToast(`Signed in with Google as ${email || 'nathanielqimadiyi@gmail.com'}`);
            navigateTo('offer');
          }}
          onContinueApple={(email) => {
            if (email) setUserEmail(email);
            triggerToast(`Signed in with Apple as ${email || 'nathaniel@icloud.com'}`);
            navigateTo('offer');
          }}
          onLoginClick={() => {
            triggerToast(`Signed in as ${userEmail || 'nathanielqimadiyi@gmail.com'}`);
            navigateTo('home');
          }}
        />
      )}

      {/* Premium Trial Offer Screen */}
      {currentScreen === 'offer' && (
        <OfferScreen onClaimTrial={() => navigateTo('home')} />
      )}

      {/* Dashboard / Home Screen */}
      {currentScreen === 'home' && (
        <DashboardScreen
          onOpenSettings={() => navigateTo('settings')}
          onOpenWorkspace={(topic) => {
            if (topic) setActiveProjectTitle(topic);
            navigateTo('workspace');
          }}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Workspace / NotebookLM Screen */}
      {currentScreen === 'workspace' && (
        <WorkspaceScreen
          projectTitle={activeProjectTitle}
          onBack={() => {
            // Return back to Home
            navigateTo('home');
          }}
          onOpenSettings={() => navigateTo('settings')}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Settings Screen */}
      {currentScreen === 'settings' && (
        <SettingsScreen
          userEmail={userEmail}
          onClose={() => {
            if (screenHistory.length > 0) {
              handleBack();
            } else {
              setCurrentScreen('home');
            }
          }}
          onLogout={() => {
            setUserEmail(null);
            resetToStart();
          }}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Toast Notification Layer */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
