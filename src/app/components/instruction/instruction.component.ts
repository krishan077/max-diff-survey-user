import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrl: './instruction.component.css'
})
export class InstructionComponent {

  constructor(private routes: ActivatedRoute, private _api: ApiService, private router: Router) {
    routes.queryParams.subscribe((params) => {
      console.log(params);
      if(params['cnt_id']){
        localStorage.setItem('survey_params', JSON.stringify(params))
        this.getAudeince(params);
      }
    })
  }

  getAudeince(params: any) {
    let payload = {
      cnt_id: Number(params.cnt_id),
      md_id: Number(params.md_id),
      // uni_user: params.uni_user
    };

    this._api.postApi(`api/md-audience`, payload).subscribe((res: any) => {
      console.log(res);
      if(!res.error){
        localStorage.setItem('mo_id', res.response.mo_id);
        localStorage.setItem('pre_survey', res.response.pre);
        localStorage.setItem('post_survey', res.response.post);
        if(res.response.pre == 1){
          this.router.navigate(['/pre-survey'])
        }else{
          this.router.navigate(['/survey-instructions'])
        }
      }else{
        console.error("api error");
        
      }

    })
  }

}
