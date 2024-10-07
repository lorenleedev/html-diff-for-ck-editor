import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
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
    beforeText?: string;
    afterText?: string;
}
