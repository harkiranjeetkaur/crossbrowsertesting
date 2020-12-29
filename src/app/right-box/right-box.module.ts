import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RightBoxComponent} from './right-box.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
  ],
  declarations: [
    RightBoxComponent,
  ],
  entryComponents: [RightBoxComponent]
})
export class RightboxModule {}
