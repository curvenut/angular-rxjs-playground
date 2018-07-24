import $ from 'jquery';
import { Component, ElementRef } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  private person: AppNs.Person = {
    name: 'Elon Musk',
    hobby: 'Rocket',
  };

  private _ngUnsubscribe$$: Subject<void> = new Subject<void>();
  constructor(private _elementRef: ElementRef) {

  }

  public testNgClick(e) {
    alert('fired from NgClick, data: \n' + JSON.stringify(this.person));
    console.log(e, 'fired from NgClick', this.person);
  }

  ngOnInit() {

    Observable.fromEvent($(this._elementRef.nativeElement).find('#fromEvent')[0], 'click')
      .takeUntil(this._ngUnsubscribe$$)
      .subscribe(
      (e) => {
        alert('fired from rxjs.fromEvent, data: \n' + JSON.stringify(this.person));
        console.log(e, 'fired from rxjs.fromEvent', this.person);
      }
      );


  }

  ngOnDestroy(): void {
    this._ngUnsubscribe$$.next();
    this._ngUnsubscribe$$.complete();
  }

}
