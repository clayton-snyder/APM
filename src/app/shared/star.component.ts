import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";

@Component
({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges
{
    @Input() rating: number;
    starWidth: number;
    @Output() notify: EventEmitter<number>;

    constructor()
    {
        this.notify = new EventEmitter<number>();
    }

    ngOnChanges(): void
    {
        this.starWidth = this.rating * 90 / 5;
    }

    onClick(): void
    {
        this.notify.emit();
    }
}