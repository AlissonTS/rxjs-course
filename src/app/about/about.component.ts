import { Component, OnInit } from '@angular/core';
import { of, concat, interval, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const source1$ = of(1, 2, 3);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);

    // const result$ = concat(source1$, source2$, source3$);

    // result$.subscribe(val => console.log(val));

    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(
    //   map(val => val * 10)
    // );

    // const result$ = merge(interval1$, interval2$);

    // result$.subscribe(val => console.log(val));
  }
}
