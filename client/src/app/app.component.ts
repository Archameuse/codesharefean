import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { DarkModeService } from './services/dark-mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EditorComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  darkModeService: DarkModeService = inject(DarkModeService)
}
