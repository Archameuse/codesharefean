import { Component, inject, OnInit } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import moncaoType from 'monaco-editor'
import { FormsModule } from '@angular/forms';
import { DarkModeService } from '../services/dark-mode.service';
import { Subject, debounceTime } from 'rxjs';
import { CodeService } from '../services/code.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FetchService } from '../services/fetch.service';


@Component({
  selector: 'app-editor',
  host: {
    'class':'contents'
  },
  standalone: true,
  imports: [MonacoEditorModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  id:string|undefined;
  active:boolean = false;
  languages:string[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'JSON',
  ]
  router = inject(Router)
  fetchService = inject(FetchService)
  darkModeService: DarkModeService = inject(DarkModeService)
  codeService: CodeService = inject(CodeService)
  theme = this.darkModeService.darkModeSignal()==='dark'?'Dark':'Light'
  lang = this.codeService.langSignal()??'html'
  options = {
    theme: this.theme.toLowerCase()+'-theme',
    automaticLayout: true,
    language: this.lang.toLowerCase(),
    
  } as moncaoType.editor.IStandaloneEditorConstructionOptions
  code: string = (!this.codeService.codeSignal().length||this.codeService.codeSignal()==='null')?`<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CCA3A3;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample... visit devChallengs.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`:this.codeService.codeSignal()
  themeChange = (e:Event) => {
    this.theme = ((<HTMLSelectElement>e.target).value)
    this.options = {
      ...this.options,
      theme: this.theme.toLowerCase()+'-theme'
    }
    this.darkModeService.setMode(this.theme)
  }
  langChange = (e:Event) => {
    this.lang = ((<HTMLSelectElement>e.target).value)
    this.active = true
    if(!this.id) this.codeService.setLang(this.lang.toLowerCase())
    this.options = {
      ...this.options,
      language: this.lang.toLowerCase()
    }
  }
  codeChanged = new Subject<void>()
  constructor(private route: ActivatedRoute) {
    this.codeChanged.pipe(debounceTime(1000)).subscribe(() => {
      if(!this.id) this.codeService.setCode(this.code)
    })
  }
  codeChange(){
    if(!this.id&&this.active) this.codeChanged.next()
    if(this.id) this.active = true
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.active = !this.id
    })
    this.fetchData()
    
  }
  fetchData() {
    if(!this.id) return
    this.route.data.subscribe(data => {
      data = data?.[0]
      if(!data) return
      this.code=(<any>data).code
      this.lang = (<any>data).language.toLowerCase()
      this.options = {...this.options, language: this.lang}
    }, error => {
      console.log(error)
    })
  }
  copy():void {
    const textArea = document.createElement('textarea')
    textArea.value = this.id||''
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      alert('Copied')
    } catch (e) {
      alert('Unable to copy to clipboard')
    }
    document.body.removeChild(textArea)
  }
  async share():Promise<void> {
    if(!this.active) return
    this.active = false
    const prevId = this.id
    this.id = undefined
    this.fetchService.postCode(this.code,this.lang.toLowerCase()).subscribe(data => {
      this.id = data||''
      this.router.navigate([`/${this.id}`])
    }, error => {
      this.active = true
      this.id = prevId
      console.error(error)
    })
  }
}
