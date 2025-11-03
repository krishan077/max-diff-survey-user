import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress/progress.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    ProgressComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ProgressComponent,CardComponent]
})
export class UiModuleModule { }
