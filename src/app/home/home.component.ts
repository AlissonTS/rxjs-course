import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, Observable, of, throwError, timer} from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap, filter, share, finalize } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() { }

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');

        const courses$ = http$.pipe(
            tap(() => console.log('requesting data')),
            map(value => Object.values(value['payload'])),
            shareReplay(), // share() could be used as well
        );

        this.beginnerCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter(course => course.category === 'BEGINNER'))
        );

        this.advancedCourses$ = courses$.pipe(
            map((courses: Course[]) => courses.filter(course => course.category === 'ADVANCED'))
        );
    }

}
