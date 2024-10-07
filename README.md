# ENGLISH Version

### PROJECT DESCRIPTION
This is a library that compares and visually renders the contents of [CK-Editor](https://ckeditor.com/)

<br/>

### DEMO
[Link](https://lorenleedev.github.io/html-diff-for-ck-editor)  

<img width="1425" alt="스크린샷 2024-10-07 오후 8 29 41" src="https://github.com/user-attachments/assets/07ef731e-ce8a-4d92-874e-c3ac79bdf334">

<br/><br/>
### HOW TO USE
```javascript
import diff from "@lorenleedev/html-diff-for-ck-editor";

const before = '<p>Your content, removed this!!</p>';
const after = '<p>Your content, added this!!</p>';

const resultStringHTML = diff(before, after);

// your ck-editor code
const editor = await ClassicEditor.create(element, {
  ... // your ck-editor options
  initialData: resultStringHTML 
});
```

<br/><br/><br/><br/>
---

# KOREAN Version

### 프로젝트 설명
[CK-Editor](https://ckeditor.com/)의 내용을 비교해 시각적으로 렌더링해주는 라이브러리입니다.

<br/>

### 데모
[Link](https://lorenleedev.github.io/html-diff-for-ck-editor)  

<img width="1422" alt="스크린샷 2024-10-07 오후 9 15 09" src="https://github.com/user-attachments/assets/dbdda159-3a4d-41a2-829d-43a4fdfc0ef5">

<br/><br/>
### 사용방법
```javascript
import diff from "@lorenleedev/html-diff-for-ck-editor";

const before = '<p>에디터 내용이 삭제되었습니다!</p>';
const after = '<p>에디터 내용이 추가되었습니다!</p>';

const resultStringHTML = diff(before, after);

// ck-editor 코드에서 이렇게 사용합니다.
const editor = await ClassicEditor.create(element, {
  ... // your ck-editor options
  initialData: resultStringHTML 
});
```
