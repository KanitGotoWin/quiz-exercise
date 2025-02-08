import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-exercise';

  ngOnInit(): void{
    
  }

  onActivate(): void{
    console.log(777);
    
  }

  onDeactivate(): void{
    console.log("HAHA GONE!");
  }
}
