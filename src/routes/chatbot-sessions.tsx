import { RouteObject } from 'react-router-dom';
import ChatbotSessions from '@/pages/ChatbotSessions';

/**
 * Chatbot Sessions monitoring route configuration
 */
export const chatbotSessionsRoute: RouteObject = {
  path: 'chatbot-sessions',
  element: <ChatbotSessions />,
};
