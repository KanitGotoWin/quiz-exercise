export interface Quiz {
    id: number;
    question: string;
}

export const quizData: Quiz[] = [
    {
        id: 1,
        question: "ผลลัพธ์ของสมการด้านล่าง คืออะไร? (อธิบายตามหลักคณิตศาสตร์) var result =  (10 / 5 + 2 * 2 - 1) % 1;",
    },
    {
        id: 2,
        question: "หากเราพิมพ์ https://www.sanook.com บน URL จะเกิดอะไรขึ้นบ้างที่ทำให้ Browsers แสดงเว็บ Sanook ขึ้นมา จงอธิบายตามความเข้าใจ",
    },
    {
        id: 3,
        question: "ผลลัพธ์ของสมการด้านล่าง คืออะไร? (อธิบายตามหลักคณิตศาสตร์)",
    },
    {
        id: 4,
        question: "ช่วยอธิบายในมุมมองการสร้าง Software ให้สามารถดูแลได้ในระยะยาว"
    }
];