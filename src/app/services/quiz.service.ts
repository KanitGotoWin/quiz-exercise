import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizCollection;

  constructor(private firestore: Firestore) {
    this.quizCollection = collection(this.firestore, 'quizAnswers');
  }

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
      const docRef = await addDoc(this.quizCollection, quizData);
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

  getData(): Observable<any[]> {
    const data = collectionData(this.quizCollection, { idField: 'id' }); 
    return data;
  }
}
