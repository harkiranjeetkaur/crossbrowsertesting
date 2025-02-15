import { Component, OnInit } from '@angular/core';
import {Details, ScreenshotsService} from '../service/screenshots.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-right-box',
  templateUrl: './right-box.component.html',
  styleUrls: ['./right-box.component.css']
})

export class RightBoxComponent implements OnInit {
  title: any;
  url = '';
  showResultsUrl = '';
  showComparisonUrl = '';
  details: Details[] = [];
  displayedColumns: string[] = ['os', 'device', 'browser', 'resolution', 'date','thumb'];
  dataSource: Details[] = [];
  constructor(
    private screenshotsService: ScreenshotsService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this.screenshotsService.loadData().toPromise();
    this.activatedRoute.params.subscribe((params) => {
      const item = this.screenshotsService.getItem(params.id);
      this.title = item?.page || '';
      this.details = [];
      if (!!item) {
        this.screenshotsService.getTestResult(item).subscribe(r => {
           this.url = r.url;
           this.showResultsUrl = r.versions[0].show_results_public_url;
           this.showComparisonUrl = r.versions[0].show_comparisons_public_url;
           const results = r.versions[0].results;
          // tslint:disable-next-line:prefer-for-of
           for (let i = 0; i < results.length; i++) {
             const finishDate = new Date(results[i].finish_date);
             const a = {
               os: results[i].os.name,
               device: results[i].os.device,
               browser: results[i].browser.name,
               resolution: results[i].resolution.name,
               date: finishDate.toLocaleDateString('en-CA',{hour: '2-digit', minute:'2-digit'} ),
               thumb: results[i].thumbs.windowed,
               fullpage: results[i].images.fullpage
             } ;
             this.details.push(a);
           }
           this.dataSource = this.details;
        });
      }
    });
  }
}
