# components structure

## **Table of responsibilities in each layer**

|           | API | State | Style | dependence       |
| --------- | --- | ----- | ----- | ---------------- |
| Parts     | ×   | ×     | 〇    | Parts            |
| Templates | △   | 〇    | 〇    | Parts, Templates |
| Pages     | 〇  | 〇    | △     | Parts, Templates |
| Layouts   | 〇  | ×     | ×     | Pages            |
