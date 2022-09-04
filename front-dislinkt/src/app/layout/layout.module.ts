import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule} from '@angular/material/select'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatListModule} from '@angular/material/list'; 
import { MatDividerModule} from '@angular/material/divider'; 
import { FormContainerComponent } from './form-container/form-container.component';
import { CenterContainerComponent } from './center-container/center-container.component';
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import { ImageComponent } from './image/image.component';
import { ProfileShortComponent } from './profile-short/profile-short.component';


@NgModule({
  declarations: [
    FormContainerComponent,
    CenterContainerComponent,
    SpinnerButtonComponent,
    ImageComponent,
    ProfileShortComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    FormContainerComponent,
    SpinnerButtonComponent,
    CenterContainerComponent,
    ImageComponent,
    ProfileShortComponent,

    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatTableModule,
    MatListModule,
    MatDividerModule,
    MatNativeDateModule
  ]
})
export class LayoutModule { }
