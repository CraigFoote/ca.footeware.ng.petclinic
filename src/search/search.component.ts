import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor(private petService: PetService) { }

  onSubmit(searchTerm: string) {
    const term = searchTerm.trim();
    if (term.length > 0) {
      this.petService.search(term).subscribe((value: any[]) => {
        console.log(value);
      });
    }
  }
}
