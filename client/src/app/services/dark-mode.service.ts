import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  darkModeSignal = signal<string>(
    JSON.parse(window.localStorage.getItem('darkMode')??'null')
  )
  setMode(mode:string) {
    this.darkModeSignal.update(() => {
      return mode.toLowerCase()==='dark'?'dark':'null'
    })
  }
  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode',JSON.stringify(this.darkModeSignal()))
    })
  }
}
