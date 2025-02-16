import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private firestore: Firestore) {}

  async submitQuiz(answers: string[], score: number) {
    const storedUser = sessionStorage.getItem('registeredUser');
    const userData = storedUser ? JSON.parse(storedUser) : null;

    const quizData = {
      answers: answers,
      score: score,
      user: userData,
      submittedAt: new Date(),
    };

    try {
      const quizCollection = collection(this.firestore, 'quizAnswers');
      const docRef = await addDoc(quizCollection, quizData);
      const storedDocRef = doc(this.firestore, 'quizAnswers', docRef.id);
      const storedDocSnap = await getDoc(storedDocRef);

      if (storedDocSnap.exists()) {
        return { id: docRef.id, ...storedDocSnap.data() };
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      console.error('Network error', error);
      throw error;
    }
  }
}
