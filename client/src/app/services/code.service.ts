import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  codeSignal = signal<string>(
    window.localStorage.getItem('code')??'null'
  )
  langSignal = signal<string>(
    window.localStorage.getItem('lang')??'null'
  )
  setCode(value:string) {
    this.codeSignal.update(() => value)
  }
  setLang(value:string) {
    this.langSignal.update(() => value)
  }
  constructor() {
    effect(() => {
      window.localStorage.setItem('code', this.codeSignal())
      window.localStorage.setItem('lang', this.langSignal())
    })
  }
}
