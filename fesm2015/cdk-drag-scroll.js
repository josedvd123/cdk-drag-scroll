import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { Injectable, ɵɵdefineInjectable, Directive, NgZone, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutoScroll {
    /**
     * @param {?} container
     * @param {?=} scrollCallback
     */
    constructor(container, scrollCallback) {
        this.container = container;
        this.scrollCallback = scrollCallback;
        this.margin = 30;
        this.maxSpeed = 25;
        this.point = { x: 0, y: 0 };
        this.boundaryRect = this.container.getBoundingClientRect();
    }
    /**
     * @param {?} point
     * @return {?}
     */
    onMove(point) {
        this.point = point;
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame((/**
         * @return {?}
         */
        () => this.scrollTick()));
    }
    /**
     * @return {?}
     */
    scrollTick() {
        cancelAnimationFrame(this.animationFrame);
        if (this.autoScroll()) {
            this.animationFrame = requestAnimationFrame((/**
             * @return {?}
             */
            () => this.scrollTick()));
        }
    }
    /**
     * @return {?}
     */
    autoScroll() {
        /** @type {?} */
        let scrollx;
        /** @type {?} */
        let scrolly;
        if (this.point.x < this.boundaryRect.left + this.margin) {
            scrollx = Math.floor(Math.max(-1, (this.point.x - this.boundaryRect.left) / this.margin - 1) * this.maxSpeed);
        }
        else if (this.point.x > this.boundaryRect.right - this.margin) {
            scrollx = Math.ceil(Math.min(1, (this.point.x - this.boundaryRect.right) / this.margin + 1) * this.maxSpeed);
        }
        else {
            scrollx = 0;
        }
        if (this.point.y < this.boundaryRect.top + this.margin) {
            scrolly = Math.floor(Math.max(-1, (this.point.y - this.boundaryRect.top) / this.margin - 1) *
                this.maxSpeed);
        }
        else if (this.point.y > this.boundaryRect.bottom - this.margin) {
            scrolly = Math.ceil(Math.min(1, (this.point.y - this.boundaryRect.bottom) / this.margin + 1) * this.maxSpeed);
        }
        else {
            scrolly = 0;
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (scrolly) {
                this.scrollY(scrolly);
            }
            if (scrollx) {
                this.scrollX(scrollx);
            }
        }));
        return scrollx || scrolly;
    }
    /**
     * @param {?} amount
     * @return {?}
     */
    scrollY(amount) {
        // ToDo for window: window.scrollTo(window.pageXOffset, window.pageYOffset + amount);
        this.container.scrollTop += amount;
        if (this.scrollCallback) {
            this.scrollCallback({ x: 0, y: amount });
        }
    }
    /**
     * @param {?} amount
     * @return {?}
     */
    scrollX(amount) {
        // ToDo for window: window.scrollTo(window.pageXOffset + amount, window.pageYOffset);
        this.container.scrollLeft += amount;
        if (this.scrollCallback) {
            this.scrollCallback({
                x: amount,
                y: 0
            });
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        cancelAnimationFrame(this.animationFrame);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragDebugService {
    constructor() {
        this.debugInfo = new BehaviorSubject(null);
        this.enabled = false;
    }
    /**
     * @param {?} info
     * @return {?}
     */
    log(info) {
        this.debugInfo.next(info);
    }
    /**
     * @return {?}
     */
    reset() {
        this.debugInfo.next(null);
    }
}
DragDebugService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DragDebugService.ctorParameters = () => [];
/** @nocollapse */ DragDebugService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DragDebugService_Factory() { return new DragDebugService(); }, token: DragDebugService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class DragScrollDirective {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DragScrollModule {
}
DragScrollModule.decorators = [
    { type: NgModule, args: [{
                imports: [DragDropModule],
                declarations: [DragScrollDirective],
                exports: [DragScrollDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AutoScroll, DragDebugService, DragScrollDirective, DragScrollModule };
//# sourceMappingURL=cdk-drag-scroll.js.map
