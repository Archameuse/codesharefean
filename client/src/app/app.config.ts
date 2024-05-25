import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
import monaco_editor from 'monaco-editor'
import { provideHttpClient } from '@angular/common/http';

export function onMonacoLoad() {
  const monaco = (window as any).monaco as typeof monaco_editor
  if(!monaco) return
  monaco.editor.defineTheme('dark-theme', {
    inherit: true,
    base: 'vs-dark',
    rules: [],
    colors: {
        "editor.background": '#121826'
    }
})
monaco.editor.defineTheme('light-theme', {
    inherit: true,
    base: 'vs',
    rules: [],
    colors: {
        "editor.background": '#FFFFFE'
    },
})
}
const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(MonacoEditorModule.forRoot(monacoConfig)),
    provideHttpClient()
  ]
};
