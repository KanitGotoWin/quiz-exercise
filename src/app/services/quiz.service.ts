import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private firestore: Firestore) {}

  submitQuiz(answers: string[]) {
       const storedUser = sessionStorage.getItem('registeredUser');
       const userData = storedUser ? JSON.parse(storedUser) : null;
   
       const quizData = {
         answers: answers,
         user: userData,
         submittedAt: new Date(),
       };

       const quizCollection = collection(this.firestore, 'quizAnswers');
       return addDoc(quizCollection, quizData);
  }
}