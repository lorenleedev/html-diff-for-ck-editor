import {EditorConfig as EditorConfigForCK} from "ckeditor5/src/core.js";
import {Essentials} from "@ckeditor/ckeditor5-essentials";
import {Paragraph} from "@ckeditor/ckeditor5-paragraph";
import {Alignment} from "@ckeditor/ckeditor5-alignment";
import {Font, FontBackgroundColor, FontFamily} from "@ckeditor/ckeditor5-font";
import {Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline} from "@ckeditor/ckeditor5-basic-styles";
import {Heading} from "@ckeditor/ckeditor5-heading";
import {
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText
} from "@ckeditor/ckeditor5-special-characters";
import {List} from "@ckeditor/ckeditor5-list";
import {Indent, IndentBlock} from "@ckeditor/ckeditor5-indent";
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
import {BlockQuote} from "@ckeditor/ckeditor5-block-quote";
import {Link, LinkImage} from "@ckeditor/ckeditor5-link";
import {MediaEmbed} from "@ckeditor/ckeditor5-media-embed";
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office";
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar
} from "@ckeditor/ckeditor5-table";
import {TextTransformation} from "@ckeditor/ckeditor5-typing";
import {CloudServices} from "@ckeditor/ckeditor5-cloud-services";
import {Autoformat} from "@ckeditor/ckeditor5-autoformat";
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar, ImageUpload
} from "@ckeditor/ckeditor5-image";
import {Base64UploadAdapter} from "@ckeditor/ckeditor5-upload";
import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic';
import CustomFigureAttributes from "./CustomFigureAttributes.js"

// TODO: ../package/main.ts를 완성 후 변경
import diff from "../sample/temp.ts";

export interface InitEditorResponse {
  editor: ClassicEditor | null;
}

export interface EditorConfig {
  targetId: string;
  lang?: 'ko' | 'en';
  initialData?: string;
  placeholder?: string;
  onContentChange?: (content: string) => void;
  debounceDelay?: number;
  onBlur?: (content: string) => void;
  onFocus?: (bool: boolean) => void;
}

export interface DiffModeEditorConfig {
  targetId: string;
  lang?: 'ko' | 'en';
  // diff 를 비교할 두 개의 텍스트
  beforeText?: string;
  afterText?: string;
}


const defaultToolbarItems = [
  'undo',
  'redo',
  '|',
  'heading',
  'fontSize',
  'fontFamily',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'code',
  'fontColor',
  'fontBackgroundColor',
  'superscript',
  'subscript',
  '|',
  'alignment',
  'numberedList',
  'bulletedList',
  'outdent',
  'indent',
  '|',
  'horizontalLine',
  'blockQuote',
  'link',
  '|',
  'insertImage',
  'insertTable',
  'specialCharacters'
];

const defaultEditorOptions: EditorConfigForCK = {
  language: 'en',
  placeholder: 'Please enter content',
  fontSize: {
    options: [
      8, 9, 10, 11, 12, 14, 'default', 18, 20, 22, 24, 26, 28, 36, 48, 72
    ]
  },
  heading: {
    options: [
      {model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph'},
      {model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1'},
      {model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2'},
      {model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3'},
    ]
  },
  toolbar: {
    items: defaultToolbarItems,
    shouldNotGroupWhenFull: false
  },
  image: {
    toolbar: [
      'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
      'toggleImageCaption', 'imageTextAlternative'
    ],
  },
  table: {
    contentToolbar: [ 'tableRow', 'tableColumn', 'tableProperties', 'tableCellProperties', 'mergeTableCells',  ],
  },
  alignment: {
    options: ['left', 'center', 'right', 'justify']
  },
  plugins: [
    Essentials,
    Paragraph,
    Alignment,
    Font,
    Bold,
    Code,
    Italic,
    Strikethrough,
    Subscript,
    Superscript,
    Underline,
    Heading,
    FontBackgroundColor,
    FontFamily,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    List,
    IndentBlock,
    Indent,
    HorizontalLine,
    BlockQuote,
    Link,
    MediaEmbed,
    PasteFromOffice,
    Table,
    TableToolbar,
    TableColumnResize,
    TableCaption,
    TableCellProperties,
    TableProperties,
    TextTransformation,
    CloudServices,
    Autoformat,
    AutoImage,
    ImageInsert,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    LinkImage,
    ImageUpload,
    Base64UploadAdapter
  ],
  extraPlugins: [CustomFigureAttributes]
}

const initEditor = async ({
                      targetId,
                      initialData = '',
                      placeholder = '',
                    }: EditorConfig) => {
  const element = document.getElementById(targetId);

  const editorOptions: EditorConfigForCK = {
    ...defaultEditorOptions,
    initialData,
    placeholder,
  };

  const editor = await ClassicEditor
    .create(element, editorOptions)
    .then(editor => {
      return editor;
    })
    .catch(error => {
      console.error('[CKEditor Error] An error occurred while initializing the editor.', error);
      return null;
    });

  return {editor};
}

const initDiffModeEditor = async ({
                                    targetId,
                                    beforeText = '',
                                    afterText = '',
                                  }: DiffModeEditorConfig): Promise<InitEditorResponse | null> => {
  const element = document.getElementById(targetId);

  const result = diff(beforeText, afterText);

  const editorOptions: EditorConfigForCK = {
    ...defaultEditorOptions,
    initialData: result,
  };

  const editor = await ClassicEditor
    .create(element, editorOptions)
    .then(editor => {
      editor.enableReadOnlyMode('');
      editor.ui.view.toolbar.element!.style.display = 'none';
      return editor;
    })
    .catch(error => {
      console.error('[CKEditor Error] An error occurred while initializing the editor.', error);
      return null;
    });

  return {editor};
}

const initialize= async () => {
  const {editor:diffEditor} = await initDiffModeEditor({
    targetId: 'sample-diff-editor',
    beforeText: 'Your content, removed this!!',
    afterText: 'Your content, added this!!'
  });

  const {editor: beforeEditor} = await initEditor({
    targetId: 'sample-diff-editor-before',
    initialData: 'Your content, removed this!!'
  });

  const {editor: afterEditor} = await initEditor({
    targetId: 'sample-diff-editor-after',
    placeholder: 'Please enter content',
    initialData: 'Your content, added this!!'
  });

  return {
    diffEditor, beforeEditor, afterEditor
  }
}

(async () => {
  const {afterEditor, diffEditor, beforeEditor} = await initialize();
  const diffButton = document.getElementById('diff-button');
  diffButton.addEventListener('click', async () => {
    const previousContent = beforeEditor.getData();
    const currentContent = afterEditor.getData();
    console.log('previousContent', previousContent);
    console.log('currentContent', currentContent)
    const diffContent = diff(previousContent, currentContent);
    console.log('diff content', diffContent)
    diffEditor.setData(diffContent);
  });
})();



