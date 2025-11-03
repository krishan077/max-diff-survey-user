import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  @Input() currentStage:any;
  @Input() currentSetIndex:any;
  @Input() sets:any;
  @Input() progress:any
}