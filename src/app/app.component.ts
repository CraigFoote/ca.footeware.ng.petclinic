import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule, MatToolbarModule, MatMenuModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true
})
export class AppComponent {
}
