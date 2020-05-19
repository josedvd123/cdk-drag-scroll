import { CdkDrag, DragRef } from '@angular/cdk/drag-drop';
import { OnDestroy, NgZone, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { AutoScroll } from './auto-scroll';
import { DragDebugService } from './drag-debug.service';
export declare class DragScrollDirective<T = any> implements OnDestroy, OnChanges {
    private cdkDrag;
    private dragDebugService;
    private zone;
    private changeDetectorRef;
    destroy$: Subject<void>;
    stopDragging$: Subject<void>;
    dragRef: DragRef<CdkDrag<T>>;
    autoScroll: AutoScroll;
    lastScroll: {
        top: number;
        left: number;
    };
    dragConnectedIds: string[];
    scrollContainer: HTMLElement;
    constructor(cdkDrag: CdkDrag, dragDebugService: DragDebugService, zone: NgZone, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    started(): void;
    ended(): void;
    entered(): void;
    exited(): void;
    private handleScroll;
    private destroyAutoScroll;
    private getDropListRef;
    private addDebugInfo;
    private dragFixContainer;
    private syncSiblings;
    private syncItems;
    private adjustContainers;
    private adjustItems;
    private log;
}
