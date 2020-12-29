import {Component, OnInit} from '@angular/core';
import {Item, ScreenshotsService} from '../service/screenshots.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-left-box',
  templateUrl: './left-box.component.html',
  styleUrls: ['./left-box.component.css']
})
export class LeftBoxComponent implements OnInit {
  allComplete = false;
  pageList: Item[] = [];

  constructor(
    private router: Router,
    private screenshotsService: ScreenshotsService
  ) {}

  ngOnInit(): void {
    this.screenshotsService.loadData()
      .subscribe(data => {
        this.pageList = data;
        this.pageList.forEach(e => {
          e.completed = false;
        });
      });
  }

  updateAllComplete() {
    this.allComplete = this.pageList != null && this.pageList.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.pageList == null) {
      return false;
    }
    return this.pageList.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    this.pageList.forEach(t => t.completed = completed);
  }

  onSelectPage(item: Item) {
    this.router.navigate([`/item/${item.id}`]);
  }

  onRun() {
    const checkedPageList = this.pageList.filter(p => p.completed);

    checkedPageList.forEach(item => {
      this.screenshotsService.runScreenshotTest(item);
    });
  }
}
