import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../model/course';
import { createHttpObservable } from './util';
import { tap, map, filter } from 'rxjs/operators';
import { saveCourse } from '../../../server/save-course.route';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
    providedIn: 'root' // creates only one store in the application
})
export class Store {

    private subject = new BehaviorSubject<Course[]>([]); // Ensure latest subscribers get latest values

    courses$: Observable<Course[]> = this.subject.asObservable();

    init(): void {
        const http$ = createHttpObservable('/api/courses');

        http$.pipe(
            tap(() => console.log("HTTP request executed")),
            map(res => Object.values(res["payload"]) )
        ).subscribe(courses => this.subject.next(courses));
    }

    selectBeginnerCourses() {
        return this.filterByCategory('BEGINNER');
    }

    selectAdvancedCourses() {
        return this.filterByCategory('ADVANCED');
    }

    selectCourseById(courseId: number) {
        return this.courses$.pipe(
            map(courses => courses.find(course => course.id == courseId)),
            filter(course => !!course)
        );
    }

    filterByCategory(category: string) {
        return this.courses$.pipe(
            map(courses => courses.filter(course => course.category == category))
        );
    }

    saveCourse(courseId: number, changes: any): Observable<any> {
        const courses = this.subject.getValue();

        const courseIndex = courses.findIndex(course => course.id == courseId);

        const newCourses = courses.slice(0); // creates a copy with slice

        newCourses[courseIndex] = {
            ...courses[courseIndex],
            ...changes
        };

        this.subject.next(newCourses);

        return fromPromise(fetch(`/api/courses/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(changes),
            headers: {
                'content-type': 'application/json'
            }
        }));
    }
}
