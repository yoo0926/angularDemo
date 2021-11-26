import { Component, OnInit, Input } from '@angular/core';
import { RequestParam, ResponseParam } from '../api/config.models';

import { ConfigService } from '../api/config.service';

@Component({
  selector: 'app-kino',
  templateUrl: './kino.component.html',
  styleUrls: ['./kino.component.scss']
})
export class KinoComponent implements OnInit {
  @Input() res?: ResponseParam;

  constructor(
    private apiCall: ConfigService,
    ) { }

  ngOnInit(): void {
    this.GET_TEST();
  }

  GET_TEST(body?: RequestParam): void {
    this.apiCall.httpGet('/test', body)
      .toPromise()
      .then((res:any) => {
        if(res){
          this.res = res;
        }else{
          console.warn('response null !!!');
        }

      })
      .catch((err: any) => {
        console.error(`error !!!! : ${err}`)
      });
  }


}
