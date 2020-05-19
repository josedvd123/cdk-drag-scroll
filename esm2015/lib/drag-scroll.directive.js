/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Directive, NgZone, Input, ChangeDetectorRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { AutoScroll } from './auto-scroll';
import { DragDebugService } from './drag-debug.service';
/**
 * @template T
 */
export class DragScrollDirective {
    /**
     * @param {?} cdkDrag
     * @param {?} dragDebugService
     * @param {?} zone
     * @param {?} changeDetectorRef
     */
    constructor(cdkDrag, dragDebugService, zone, changeDetectorRef) {
        this.cdkDrag = cdkDrag;
        this.dragDebugService = dragDebugService;
        this.zone = zone;
        this.changeDetectorRef = changeDetectorRef;
        this.destroy$ = new Subject();
        this.stopDragging$ = new Subject();
        this.lastScroll = {
            top: 0,
            left: 0
        };
        this.dragRef = this.cdkDrag['_dragRef'];
        if (this.dragRef) {
            this.zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                this.dragRef.started.pipe(takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    this.log('Started', event, this.dragRef.isDragging());
                    this.started();
                }));
                this.dragRef.ended.pipe(takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    this.log('Ended', event);
                    this.ended();
                }));
                this.dragRef.entered.pipe(takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    this.log('Entered', event);
                    this.entered();
                }));
                this.dragRef.exited.pipe(takeUntil(this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    this.log('Exited', event);
                    this.exited();
                }));
            }));
        }
        else {
            this.log('CdkDrag not found', this.cdkDrag, this.dragRef);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.dragConnectedIds) {
            if (this.dragRef.isDragging()) {
                // https://github.com/angular/material2/issues/15343
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    this.syncSiblings();
                }));
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.stopDragging$.next();
        this.stopDragging$.complete();
        this.destroyAutoScroll();
    }
    /**
     * @return {?}
     */
    started() {
        if (!this.scrollContainer) {
            return;
        }
        this.destroyAutoScroll();
        this.addDebugInfo();
        this.autoScroll = new AutoScroll(this.scrollContainer);
        this.lastScroll.top = this.scrollContainer.scrollTop;
        this.lastScroll.left = this.scrollContainer.scrollLeft;
        fromEvent(this.scrollContainer, 'scroll')
            .pipe(takeUntil(this.stopDragging$))
            .subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const deltaX = this.scrollContainer.scrollLeft - this.lastScroll.left;
            /** @type {?} */
            const deltaY = this.scrollContainer.scrollTop - this.lastScroll.top;
            if (deltaX || deltaY) {
                this.handleScroll(deltaX, deltaY);
            }
            this.lastScroll.top = this.scrollContainer.scrollTop;
            this.lastScroll.left = this.scrollContainer.scrollLeft;
        }));
        this.dragRef.moved
            .pipe(debounceTime(10), takeUntil(this.stopDragging$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            this.autoScroll.onMove(e.pointerPosition);
        }));
    }
    /**
     * @return {?}
     */
    ended() {
        this.destroyAutoScroll();
        this.stopDragging$.next();
        this.dragDebugService.reset();
    }
    /**
     * @return {?}
     */
    entered() {
        this.dragFixContainer();
    }
    /**
     * @return {?}
     */
    exited() {
        this.dragFixContainer();
    }
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    handleScroll(x, y) {
        /** @type {?} */
        const dropListRef = this.getDropListRef();
        // adjust containers
        this.adjustContainers();
        // adjust items
        this.adjustItems(x, y);
        // ToDo: better condition for changed items
        if (dropListRef._draggables.length > dropListRef._itemPositions.length) {
            this.syncItems();
        }
        this.addDebugInfo();
    }
    /**
     * @private
     * @return {?}
     */
    destroyAutoScroll() {
        if (this.autoScroll) {
            this.autoScroll.destroy();
            this.autoScroll = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    getDropListRef() {
        return this.dragRef['_dropContainer'];
    }
    /**
     * @private
     * @return {?}
     */
    addDebugInfo() {
        if (!this.dragDebugService.enabled) {
            return;
        }
        /** @type {?} */
        const dropListRef = this.getDropListRef();
        /** @type {?} */
        const draws = [
            ...dropListRef._itemPositions.map((/**
             * @param {?} it
             * @return {?}
             */
            it => ({
                clientRect: it.clientRect,
                color: 'blue',
                id: it.drag.data.data.name
            }))),
            ...dropListRef._siblings.map((/**
             * @param {?} it
             * @return {?}
             */
            it => ({
                clientRect: it._clientRect,
                color: 'green',
                id: ''
            }))),
            {
                clientRect: dropListRef._clientRect,
                color: '#2FD1BB',
                id: ''
            }
        ];
        this.dragDebugService.log(draws.filter((/**
         * @param {?} d
         * @return {?}
         */
        d => d.clientRect)));
    }
    /**
     * @private
     * @return {?}
     */
    dragFixContainer() {
        // https://github.com/angular/material2/issues/15227
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const dropListRef = this.getDropListRef();
            dropListRef._cacheOwnPosition();
            this.addDebugInfo();
        }));
        // fix for issue when classes is not resetted
        this.changeDetectorRef.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    syncSiblings() {
        /** @type {?} */
        const dropListRef = this.getDropListRef();
        this.log('syncSiblings before', dropListRef._siblings.length);
        dropListRef.beforeStarted.next();
        this.log('syncSiblings after', dropListRef._siblings.length);
        this.adjustContainers();
    }
    /**
     * @private
     * @return {?}
     */
    syncItems() {
        /** @type {?} */
        const dropListRef = this.getDropListRef();
        /** @type {?} */
        const oldPositions = dropListRef._itemPositions;
        dropListRef._activeDraggables = dropListRef._draggables.slice();
        dropListRef._cacheItemPositions();
        /** @type {?} */
        const newPositions = dropListRef._itemPositions;
        dropListRef._itemPositions = [...oldPositions];
        newPositions.forEach((/**
         * @param {?} p
         * @return {?}
         */
        p => {
            if (!oldPositions.find((/**
             * @param {?} p1
             * @return {?}
             */
            p1 => p.drag === p1.drag))) {
                dropListRef._itemPositions.push(p);
            }
        }));
        dropListRef._activeDraggables.push(this.dragRef);
    }
    /**
     * @private
     * @return {?}
     */
    adjustContainers() {
        /** @type {?} */
        const dropListRef = this.getDropListRef();
        dropListRef._cacheOwnPosition();
        dropListRef._siblings.forEach((/**
         * @param {?} sibling
         * @return {?}
         */
        sibling => {
            sibling._cacheOwnPosition();
        }));
    }
    /**
     * @private
     * @param {?} deltaX
     * @param {?} deltaY
     * @return {?}
     */
    adjustItems(deltaX, deltaY) {
        /** @type {?} */
        const dropListRef = this.getDropListRef();
        dropListRef._itemPositions.forEach((/**
         * @param {?} it
         * @return {?}
         */
        it => {
            it.originalRect = it.originalRect || it.clientRect;
            it.clientRect = Object.assign({}, it.clientRect, { left: it.clientRect.left - deltaX, right: it.clientRect.right - deltaX, top: it.clientRect.top - deltaY, bottom: it.clientRect.bottom - deltaY });
        }));
    }
    /**
     * @private
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    log(message, ...optionalParams) {
        if (this.dragDebugService.enabled) {
            console.log(message, optionalParams);
        }
    }
}
DragScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vsDragScroll]',
                exportAs: 'vsDragScroll'
            },] }
];
/** @nocollapse */
DragScrollDirective.ctorParameters = () => [
    { type: CdkDrag },
    { type: DragDebugService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
DragScrollDirective.propDecorators = {
    dragConnectedIds: [{ type: Input, args: ['vsDragScrollConnectedTo',] }],
    scrollContainer: [{ type: Input, args: ['vsDragScrollContainer',] }]
};
if (false) {
    /** @type {?} */
    DragScrollDirective.prototype.destroy$;
    /** @type {?} */
    DragScrollDirective.prototype.stopDragging$;
    /** @type {?} */
    DragScrollDirective.prototype.dragRef;
    /** @type {?} */
    DragScrollDirective.prototype.autoScroll;
    /** @type {?} */
    DragScrollDirective.prototype.lastScroll;
    /** @type {?} */
    DragScrollDirective.prototype.dragConnectedIds;
    /** @type {?} */
    DragScrollDirective.prototype.scrollContainer;
    /**
     * @type {?}
     * @private
     */
    DragScrollDirective.prototype.cdkDrag;
    /**
     * @type {?}
     * @private
     */
    DragScrollDirective.prototype.dragDebugService;
    /**
     * @type {?}
     * @private
     */
    DragScrollDirective.prototype.zone;
    /**
     * @type {?}
     * @private
     */
    DragScrollDirective.prototype.changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY2RrLWRyYWctc2Nyb2xsLyIsInNvdXJjZXMiOlsibGliL2RyYWctc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBVyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFDTCxTQUFTLEVBRVQsTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFHbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7O0FBTXhELE1BQU0sT0FBTyxtQkFBbUI7Ozs7Ozs7SUFhOUIsWUFDVSxPQUFnQixFQUNoQixnQkFBa0MsRUFDbEMsSUFBWSxFQUNaLGlCQUFvQztRQUhwQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFoQjlDLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUdwQyxlQUFVLEdBQUc7WUFDWCxHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQztRQVdBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUI7OztZQUFDLEdBQUcsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7O2dCQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2pCLENBQUMsRUFBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztnQkFBQyxLQUFLLENBQUMsRUFBRTtvQkFDbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDZixDQUFDLEVBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7Z0JBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3BFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2pCLENBQUMsRUFBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztnQkFBQyxLQUFLLENBQUMsRUFBRTtvQkFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFDLENBQUM7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUM3QixvREFBb0Q7Z0JBQ3BELFVBQVU7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN0QixDQUFDLEVBQUMsQ0FBQzthQUNKO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7UUFFdkQsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDO2FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ25DLFNBQVM7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ1IsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTs7a0JBQy9ELE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFFbkUsSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO2dCQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNuQztZQUVELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1lBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1FBQ3pELENBQUMsRUFBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2FBQ2YsSUFBSSxDQUNILFlBQVksQ0FBQyxFQUFFLENBQUMsRUFDaEIsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FDOUI7YUFDQSxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELE1BQU07UUFDSixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7Ozs7O0lBRU8sWUFBWSxDQUFDLENBQVMsRUFBRSxDQUFTOztjQUNqQyxXQUFXLEdBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUU5QyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsZUFBZTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZCLDJDQUEyQztRQUMzQyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ3RFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVPLGlCQUFpQjtRQUN2QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7O0lBRU8sY0FBYztRQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7OztJQUVPLFlBQVk7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDbEMsT0FBTztTQUNSOztjQUNLLFdBQVcsR0FBUSxJQUFJLENBQUMsY0FBYyxFQUFFOztjQUN4QyxLQUFLLEdBQUc7WUFDWixHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRzs7OztZQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVO2dCQUN6QixLQUFLLEVBQUUsTUFBTTtnQkFDYixFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7YUFDM0IsQ0FBQyxFQUFDO1lBQ0gsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUc7Ozs7WUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLFVBQVUsRUFBRSxFQUFFLENBQUMsV0FBVztnQkFDMUIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsRUFBRSxFQUFFLEVBQUU7YUFDUCxDQUFDLEVBQUM7WUFDSDtnQkFDRSxVQUFVLEVBQUUsV0FBVyxDQUFDLFdBQVc7Z0JBQ25DLEtBQUssRUFBRSxTQUFTO2dCQUNoQixFQUFFLEVBQUUsRUFBRTthQUNQO1NBQ0Y7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVPLGdCQUFnQjtRQUN0QixvREFBb0Q7UUFDcEQsVUFBVTs7O1FBQUMsR0FBRyxFQUFFOztrQkFDUixXQUFXLEdBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUM5QyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7UUFFSCw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRU8sWUFBWTs7Y0FDWixXQUFXLEdBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFTyxTQUFTOztjQUNULFdBQVcsR0FBUSxJQUFJLENBQUMsY0FBYyxFQUFFOztjQUV4QyxZQUFZLEdBQUcsV0FBVyxDQUFDLGNBQWM7UUFDL0MsV0FBVyxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFaEUsV0FBVyxDQUFDLG1CQUFtQixFQUFFLENBQUM7O2NBQzVCLFlBQVksR0FBRyxXQUFXLENBQUMsY0FBYztRQUMvQyxXQUFXLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUMvQyxZQUFZLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSTs7OztZQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUU7Z0JBQ2hELFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7OztJQUVPLGdCQUFnQjs7Y0FDaEIsV0FBVyxHQUFRLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFFOUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDaEMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBRU8sV0FBVyxDQUFDLE1BQWMsRUFBRSxNQUFjOztjQUMxQyxXQUFXLEdBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUM5QyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU87Ozs7UUFBQyxFQUFFLENBQUMsRUFBRTtZQUN0QyxFQUFFLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNuRCxFQUFFLENBQUMsVUFBVSxxQkFDUixFQUFFLENBQUMsVUFBVSxJQUNoQixJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUNqQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxFQUNuQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsTUFBTSxFQUMvQixNQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxHQUN0QyxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7O0lBRU8sR0FBRyxDQUFDLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBQ2pELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7OztZQWpQRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7YUFDekI7Ozs7WUFsQlEsT0FBTztZQWFQLGdCQUFnQjtZQVR2QixNQUFNO1lBRU4saUJBQWlCOzs7K0JBdUJoQixLQUFLLFNBQUMseUJBQXlCOzhCQUMvQixLQUFLLFNBQUMsdUJBQXVCOzs7O0lBVjlCLHVDQUErQjs7SUFDL0IsNENBQW9DOztJQUNwQyxzQ0FBNkI7O0lBQzdCLHlDQUF1Qjs7SUFDdkIseUNBR0U7O0lBRUYsK0NBQTZEOztJQUM3RCw4Q0FBNkQ7Ozs7O0lBRzNELHNDQUF3Qjs7Ozs7SUFDeEIsK0NBQTBDOzs7OztJQUMxQyxtQ0FBb0I7Ozs7O0lBQ3BCLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWcsIERyYWdSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE5nWm9uZSxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEF1dG9TY3JvbGwgfSBmcm9tICcuL2F1dG8tc2Nyb2xsJztcclxuaW1wb3J0IHsgRHJhZ0RlYnVnU2VydmljZSB9IGZyb20gJy4vZHJhZy1kZWJ1Zy5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3ZzRHJhZ1Njcm9sbF0nLFxyXG4gIGV4cG9ydEFzOiAndnNEcmFnU2Nyb2xsJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ1Njcm9sbERpcmVjdGl2ZTxUID0gYW55PiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgc3RvcERyYWdnaW5nJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgZHJhZ1JlZjogRHJhZ1JlZjxDZGtEcmFnPFQ+PjtcclxuICBhdXRvU2Nyb2xsOiBBdXRvU2Nyb2xsO1xyXG4gIGxhc3RTY3JvbGwgPSB7XHJcbiAgICB0b3A6IDAsXHJcbiAgICBsZWZ0OiAwXHJcbiAgfTtcclxuXHJcbiAgQElucHV0KCd2c0RyYWdTY3JvbGxDb25uZWN0ZWRUbycpIGRyYWdDb25uZWN0ZWRJZHM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgndnNEcmFnU2Nyb2xsQ29udGFpbmVyJykgc2Nyb2xsQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNka0RyYWc6IENka0RyYWcsXHJcbiAgICBwcml2YXRlIGRyYWdEZWJ1Z1NlcnZpY2U6IERyYWdEZWJ1Z1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRyYWdSZWYgPSB0aGlzLmNka0RyYWdbJ19kcmFnUmVmJ107XHJcblxyXG4gICAgaWYgKHRoaXMuZHJhZ1JlZikge1xyXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZHJhZ1JlZi5zdGFydGVkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2coJ1N0YXJ0ZWQnLCBldmVudCwgdGhpcy5kcmFnUmVmLmlzRHJhZ2dpbmcoKSk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0ZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmFnUmVmLmVuZGVkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2coJ0VuZGVkJywgZXZlbnQpO1xyXG4gICAgICAgICAgdGhpcy5lbmRlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmRyYWdSZWYuZW50ZXJlZC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nKCdFbnRlcmVkJywgZXZlbnQpO1xyXG4gICAgICAgICAgdGhpcy5lbnRlcmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ1JlZi5leGl0ZWQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZygnRXhpdGVkJywgZXZlbnQpO1xyXG4gICAgICAgICAgdGhpcy5leGl0ZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZygnQ2RrRHJhZyBub3QgZm91bmQnLCB0aGlzLmNka0RyYWcsIHRoaXMuZHJhZ1JlZik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5kcmFnQ29ubmVjdGVkSWRzKSB7XHJcbiAgICAgIGlmICh0aGlzLmRyYWdSZWYuaXNEcmFnZ2luZygpKSB7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xNTM0M1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zeW5jU2libGluZ3MoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcclxuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcclxuICAgIHRoaXMuc3RvcERyYWdnaW5nJC5uZXh0KCk7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZyQuY29tcGxldGUoKTtcclxuICAgIHRoaXMuZGVzdHJveUF1dG9TY3JvbGwoKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0ZWQoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2Nyb2xsQ29udGFpbmVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlc3Ryb3lBdXRvU2Nyb2xsKCk7XHJcblxyXG4gICAgdGhpcy5hZGREZWJ1Z0luZm8oKTtcclxuXHJcbiAgICB0aGlzLmF1dG9TY3JvbGwgPSBuZXcgQXV0b1Njcm9sbCh0aGlzLnNjcm9sbENvbnRhaW5lcik7XHJcblxyXG4gICAgdGhpcy5sYXN0U2Nyb2xsLnRvcCA9IHRoaXMuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcDtcclxuICAgIHRoaXMubGFzdFNjcm9sbC5sZWZ0ID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdDtcclxuXHJcbiAgICBmcm9tRXZlbnQodGhpcy5zY3JvbGxDb250YWluZXIsICdzY3JvbGwnKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5zdG9wRHJhZ2dpbmckKSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdCAtIHRoaXMubGFzdFNjcm9sbC5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IHRoaXMuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCAtIHRoaXMubGFzdFNjcm9sbC50b3A7XHJcblxyXG4gICAgICAgIGlmIChkZWx0YVggfHwgZGVsdGFZKSB7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbChkZWx0YVgsIGRlbHRhWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhc3RTY3JvbGwudG9wID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wO1xyXG4gICAgICAgIHRoaXMubGFzdFNjcm9sbC5sZWZ0ID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5kcmFnUmVmLm1vdmVkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlVGltZSgxMCksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuc3RvcERyYWdnaW5nJClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b1Njcm9sbC5vbk1vdmUoZS5wb2ludGVyUG9zaXRpb24pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGVuZGVkKCkge1xyXG4gICAgdGhpcy5kZXN0cm95QXV0b1Njcm9sbCgpO1xyXG4gICAgdGhpcy5zdG9wRHJhZ2dpbmckLm5leHQoKTtcclxuICAgIHRoaXMuZHJhZ0RlYnVnU2VydmljZS5yZXNldCgpO1xyXG4gIH1cclxuXHJcbiAgZW50ZXJlZCgpIHtcclxuICAgIHRoaXMuZHJhZ0ZpeENvbnRhaW5lcigpO1xyXG4gIH1cclxuXHJcbiAgZXhpdGVkKCkge1xyXG4gICAgdGhpcy5kcmFnRml4Q29udGFpbmVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVNjcm9sbCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgY29uc3QgZHJvcExpc3RSZWY6IGFueSA9IHRoaXMuZ2V0RHJvcExpc3RSZWYoKTtcclxuXHJcbiAgICAvLyBhZGp1c3QgY29udGFpbmVyc1xyXG4gICAgdGhpcy5hZGp1c3RDb250YWluZXJzKCk7XHJcblxyXG4gICAgLy8gYWRqdXN0IGl0ZW1zXHJcbiAgICB0aGlzLmFkanVzdEl0ZW1zKHgsIHkpO1xyXG5cclxuICAgIC8vIFRvRG86IGJldHRlciBjb25kaXRpb24gZm9yIGNoYW5nZWQgaXRlbXNcclxuICAgIGlmIChkcm9wTGlzdFJlZi5fZHJhZ2dhYmxlcy5sZW5ndGggPiBkcm9wTGlzdFJlZi5faXRlbVBvc2l0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5zeW5jSXRlbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZERlYnVnSW5mbygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZXN0cm95QXV0b1Njcm9sbCgpIHtcclxuICAgIGlmICh0aGlzLmF1dG9TY3JvbGwpIHtcclxuICAgICAgdGhpcy5hdXRvU2Nyb2xsLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5hdXRvU2Nyb2xsID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RHJvcExpc3RSZWYoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kcmFnUmVmWydfZHJvcENvbnRhaW5lciddO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREZWJ1Z0luZm8oKSB7XHJcbiAgICBpZiAoIXRoaXMuZHJhZ0RlYnVnU2VydmljZS5lbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGRyb3BMaXN0UmVmOiBhbnkgPSB0aGlzLmdldERyb3BMaXN0UmVmKCk7XHJcbiAgICBjb25zdCBkcmF3cyA9IFtcclxuICAgICAgLi4uZHJvcExpc3RSZWYuX2l0ZW1Qb3NpdGlvbnMubWFwKGl0ID0+ICh7XHJcbiAgICAgICAgY2xpZW50UmVjdDogaXQuY2xpZW50UmVjdCxcclxuICAgICAgICBjb2xvcjogJ2JsdWUnLFxyXG4gICAgICAgIGlkOiBpdC5kcmFnLmRhdGEuZGF0YS5uYW1lXHJcbiAgICAgIH0pKSxcclxuICAgICAgLi4uZHJvcExpc3RSZWYuX3NpYmxpbmdzLm1hcChpdCA9PiAoe1xyXG4gICAgICAgIGNsaWVudFJlY3Q6IGl0Ll9jbGllbnRSZWN0LFxyXG4gICAgICAgIGNvbG9yOiAnZ3JlZW4nLFxyXG4gICAgICAgIGlkOiAnJ1xyXG4gICAgICB9KSksXHJcbiAgICAgIHtcclxuICAgICAgICBjbGllbnRSZWN0OiBkcm9wTGlzdFJlZi5fY2xpZW50UmVjdCxcclxuICAgICAgICBjb2xvcjogJyMyRkQxQkInLFxyXG4gICAgICAgIGlkOiAnJ1xyXG4gICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMuZHJhZ0RlYnVnU2VydmljZS5sb2coZHJhd3MuZmlsdGVyKGQgPT4gZC5jbGllbnRSZWN0KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYWdGaXhDb250YWluZXIoKSB7XHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzE1MjI3XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgZHJvcExpc3RSZWY6IGFueSA9IHRoaXMuZ2V0RHJvcExpc3RSZWYoKTtcclxuICAgICAgZHJvcExpc3RSZWYuX2NhY2hlT3duUG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5hZGREZWJ1Z0luZm8oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGZpeCBmb3IgaXNzdWUgd2hlbiBjbGFzc2VzIGlzIG5vdCByZXNldHRlZFxyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3luY1NpYmxpbmdzKCkge1xyXG4gICAgY29uc3QgZHJvcExpc3RSZWY6IGFueSA9IHRoaXMuZ2V0RHJvcExpc3RSZWYoKTtcclxuICAgIHRoaXMubG9nKCdzeW5jU2libGluZ3MgYmVmb3JlJywgZHJvcExpc3RSZWYuX3NpYmxpbmdzLmxlbmd0aCk7XHJcbiAgICBkcm9wTGlzdFJlZi5iZWZvcmVTdGFydGVkLm5leHQoKTtcclxuICAgIHRoaXMubG9nKCdzeW5jU2libGluZ3MgYWZ0ZXInLCBkcm9wTGlzdFJlZi5fc2libGluZ3MubGVuZ3RoKTtcclxuICAgIHRoaXMuYWRqdXN0Q29udGFpbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzeW5jSXRlbXMoKSB7XHJcbiAgICBjb25zdCBkcm9wTGlzdFJlZjogYW55ID0gdGhpcy5nZXREcm9wTGlzdFJlZigpO1xyXG5cclxuICAgIGNvbnN0IG9sZFBvc2l0aW9ucyA9IGRyb3BMaXN0UmVmLl9pdGVtUG9zaXRpb25zO1xyXG4gICAgZHJvcExpc3RSZWYuX2FjdGl2ZURyYWdnYWJsZXMgPSBkcm9wTGlzdFJlZi5fZHJhZ2dhYmxlcy5zbGljZSgpO1xyXG5cclxuICAgIGRyb3BMaXN0UmVmLl9jYWNoZUl0ZW1Qb3NpdGlvbnMoKTtcclxuICAgIGNvbnN0IG5ld1Bvc2l0aW9ucyA9IGRyb3BMaXN0UmVmLl9pdGVtUG9zaXRpb25zO1xyXG4gICAgZHJvcExpc3RSZWYuX2l0ZW1Qb3NpdGlvbnMgPSBbLi4ub2xkUG9zaXRpb25zXTtcclxuICAgIG5ld1Bvc2l0aW9ucy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICBpZiAoIW9sZFBvc2l0aW9ucy5maW5kKHAxID0+IHAuZHJhZyA9PT0gcDEuZHJhZykpIHtcclxuICAgICAgICBkcm9wTGlzdFJlZi5faXRlbVBvc2l0aW9ucy5wdXNoKHApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGRyb3BMaXN0UmVmLl9hY3RpdmVEcmFnZ2FibGVzLnB1c2godGhpcy5kcmFnUmVmKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRqdXN0Q29udGFpbmVycygpIHtcclxuICAgIGNvbnN0IGRyb3BMaXN0UmVmOiBhbnkgPSB0aGlzLmdldERyb3BMaXN0UmVmKCk7XHJcblxyXG4gICAgZHJvcExpc3RSZWYuX2NhY2hlT3duUG9zaXRpb24oKTtcclxuICAgIGRyb3BMaXN0UmVmLl9zaWJsaW5ncy5mb3JFYWNoKHNpYmxpbmcgPT4ge1xyXG4gICAgICBzaWJsaW5nLl9jYWNoZU93blBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRqdXN0SXRlbXMoZGVsdGFYOiBudW1iZXIsIGRlbHRhWTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkcm9wTGlzdFJlZjogYW55ID0gdGhpcy5nZXREcm9wTGlzdFJlZigpO1xyXG4gICAgZHJvcExpc3RSZWYuX2l0ZW1Qb3NpdGlvbnMuZm9yRWFjaChpdCA9PiB7XHJcbiAgICAgIGl0Lm9yaWdpbmFsUmVjdCA9IGl0Lm9yaWdpbmFsUmVjdCB8fCBpdC5jbGllbnRSZWN0O1xyXG4gICAgICBpdC5jbGllbnRSZWN0ID0ge1xyXG4gICAgICAgIC4uLml0LmNsaWVudFJlY3QsXHJcbiAgICAgICAgbGVmdDogaXQuY2xpZW50UmVjdC5sZWZ0IC0gZGVsdGFYLFxyXG4gICAgICAgIHJpZ2h0OiBpdC5jbGllbnRSZWN0LnJpZ2h0IC0gZGVsdGFYLFxyXG4gICAgICAgIHRvcDogaXQuY2xpZW50UmVjdC50b3AgLSBkZWx0YVksXHJcbiAgICAgICAgYm90dG9tOiBpdC5jbGllbnRSZWN0LmJvdHRvbSAtIGRlbHRhWVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pIHtcclxuICAgIGlmICh0aGlzLmRyYWdEZWJ1Z1NlcnZpY2UuZW5hYmxlZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==