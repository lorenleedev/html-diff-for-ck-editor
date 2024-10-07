# ENGLISH Version

### Project Description
---
This is a library that compares and visually renders the contents of [CK-Editor](https://ckeditor.com/)

<br/>

### Demo
---
[Link](https://lorenleedev.github.io/html-diff-for-ck-editor)  

<img width="1425" alt="스크린샷 2024-10-07 오후 8 29 41" src="https://github.com/user-attachments/assets/07ef731e-ce8a-4d92-874e-c3ac79bdf334">

<br/><br/>
### How To Use
---
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

<br/><br/>
### For Image Diff
---
```css
/*
* add thie code on your style
*/
.Diff-Editor-Image-Insert {
    background: rgba(102, 229, 119, .35);
    padding: 10px;
}

.Diff-Editor-Image-Delete {
    background: rgba(229, 102, 134,.35);
    padding: 10px;
}

```
ck-editor wraps image tags with figure tags. The FigureAttribute extension is needed to allow inserting classes into figure tags.
Please refer to src/sample/CustomFigureAttributes.js in this repository for instructions on how to extend it.
<br/><br/><br/><br/>


# KOREAN Version

### 프로젝트 설명
---
[CK-Editor](https://ckeditor.com/)의 내용을 비교해 시각적으로 렌더링해주는 라이브러리입니다.

<br/>

### 데모
---
[Link](https://lorenleedev.github.io/html-diff-for-ck-editor)  

<img width="1422" alt="스크린샷 2024-10-07 오후 9 15 09" src="https://github.com/user-attachments/assets/dbdda159-3a4d-41a2-829d-43a4fdfc0ef5">

<br/><br/>
### 사용방법
---
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


<br/><br/>
### 이미지 비교를 위해 추가해야하는 로직
---
```css
/*
* ck-editor를 사용하는 페이지에 아래 css를 추가하세요.
*/
.Diff-Editor-Image-Insert {
    background: rgba(102, 229, 119, .35);
    padding: 10px;
}

.Diff-Editor-Image-Delete {
    background: rgba(229, 102, 134,.35);
    padding: 10px;
}

```

ck-editor는 이미지 태그를 figure tag로 감싸고 있습니다. figure 태그에 class를 삽입할 수 있도록 FigureAttribute확장이 필요합니다.
확장하는 방법은 이 레파지토리의 src/sample/CustomFigureAttributes.js를 참고하세요.
