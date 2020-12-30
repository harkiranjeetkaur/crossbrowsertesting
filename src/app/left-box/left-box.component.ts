import {Component, OnInit} from '@angular/core';
import {Item, ScreenshotsService} from '../service/screenshots.service';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

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
    private screenshotsService: ScreenshotsService,
    private authService: AuthService
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

  updateAllComplete(): void {
    this.allComplete = this.pageList != null && this.pageList.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.pageList == null) {
      return false;
    }
    return this.pageList.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): void {
    this.allComplete = completed;
    this.pageList.forEach(t => t.completed = completed);
  }

  onSelectPage(item: Item): void {
    this.router.navigate([`/item/${item.id}`]).then();
  }

  onRun(): void {
    const checkedPageList = this.pageList.filter(p => p.completed);

    checkedPageList.forEach(item => {
      this.screenshotsService.runScreenshotTest(item);
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
