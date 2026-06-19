import { db } from '../firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

/**
 * ==========================================
 * FIRESTORE COLLECTIONS REFERENCE
 * ==========================================
 * Defining collections here acts as a central registry.
 * This ensures consistency and prevents typos across the app.
 */
export const collections = {
  users: collection(db, 'users'),
  chatHistory: collection(db, 'chat_history'),
  faqs: collection(db, 'faqs')
};

/**
 * ==========================================
 * CHAT HISTORY HELPER FUNCTIONS
 * ==========================================
 */

/**
 * Adds a new chat message to the 'chat_history' collection.
 * 
 * @param {string} userId - The ID of the user (can be "anonymous" for now).
 * @param {string} sessionId - An ID grouping messages of the same conversation.
 * @param {Object} messageData - Object containing text and sender ('user' or 'bot').
 * @returns {Promise<string>} The ID of the newly created document.
 */
export const addChatMessage = async (userId, sessionId, messageData) => {
  try {
    const docRef = await addDoc(collections.chatHistory, {
      userId,
      sessionId,
      text: messageData.text,
      sender: messageData.sender, // 'user' or 'bot'
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString() // Fallback string for easy reading
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding chat message:", error);
    throw error;
  }
};

/**
 * Retrieves the chat history for a specific session, ordered chronologically.
 * 
 * @param {string} userId - The ID of the user.
 * @param {string} sessionId - The session ID.
 * @returns {Promise<Array>} Array of message objects.
 */
export const getChatHistory = async (userId, sessionId) => {
  try {
    const q = query(
      collections.chatHistory, 
      where("userId", "==", userId),
      where("sessionId", "==", sessionId),
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    throw error;
  }
};

/**
 * ==========================================
 * FAQs HELPER FUNCTIONS
 * ==========================================
 */

/**
 * Adds a new FAQ entry to the 'faqs' collection.
 * 
 * @param {Object} faqData - Object containing question, answer, and category.
 * @returns {Promise<string>} The ID of the newly created document.
 */
export const addFAQ = async (faqData) => {
  try {
    const docRef = await addDoc(collections.faqs, {
      question: faqData.question,
      answer: faqData.answer,
      category: faqData.category || 'General',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding FAQ:", error);
    throw error;
  }
};

/**
 * Retrieves all FAQs, ordered by creation date (newest first).
 * 
 * @returns {Promise<Array>} Array of FAQ objects.
 */
export const getFAQs = async () => {
  try {
    const q = query(
      collections.faqs, 
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};

/**
 * ==========================================
 * USER HELPER FUNCTIONS (Prepared for later)
 * ==========================================
 */

/**
 * Creates or updates a user document in the 'users' collection.
 * Used when Authentication is implemented later.
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(collections.users, userId);
    await setDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    throw error;
  }
};
