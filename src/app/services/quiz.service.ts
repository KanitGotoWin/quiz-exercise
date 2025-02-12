import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private firestore: Firestore) {}

  submitQuiz(answers: string[]) {
    const quizCollection = collection(this.firestore, 'quizAnswers');
    return addDoc(quizCollection, { answers: answers, submittedAt: new Date() });
  }
}