/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Directive, NgZone, Input, ChangeDetectorRef } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { AutoScroll } from './auto-scroll';
import { DragDebugService } from './drag-debug.service';
/**
 * @template T
 */
var DragScrollDirective = /** @class */ (function () {
    function DragScrollDirective(cdkDrag, dragDebugService, zone, changeDetectorRef) {
        var _this = this;
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
            function () {
                _this.dragRef.started.pipe(takeUntil(_this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    _this.log('Started', event, _this.dragRef.isDragging());
                    _this.started();
                }));
                _this.dragRef.ended.pipe(takeUntil(_this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    _this.log('Ended', event);
                    _this.ended();
                }));
                _this.dragRef.entered.pipe(takeUntil(_this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    _this.log('Entered', event);
                    _this.entered();
                }));
                _this.dragRef.exited.pipe(takeUntil(_this.destroy$)).subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    _this.log('Exited', event);
                    _this.exited();
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
    DragScrollDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.dragConnectedIds) {
            if (this.dragRef.isDragging()) {
                // https://github.com/angular/material2/issues/15343
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.syncSiblings();
                }));
            }
        }
    };
    /**
     * @return {?}
     */
    DragScrollDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
        this.stopDragging$.next();
        this.stopDragging$.complete();
        this.destroyAutoScroll();
    };
    /**
     * @return {?}
     */
    DragScrollDirective.prototype.started = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            /** @type {?} */
            var deltaX = _this.scrollContainer.scrollLeft - _this.lastScroll.left;
            /** @type {?} */
            var deltaY = _this.scrollContainer.scrollTop - _this.lastScroll.top;
            if (deltaX || deltaY) {
                _this.handleScroll(deltaX, deltaY);
            }
            _this.lastScroll.top = _this.scrollContainer.scrollTop;
            _this.lastScroll.left = _this.scrollContainer.scrollLeft;
        }));
        this.dragRef.moved
            .pipe(debounceTime(10), takeUntil(this.stopDragging$))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.autoScroll.onMove(e.pointerPosition);
        }));
    };
    /**
     * @return {?}
     */
    DragScrollDirective.prototype.ended = /**
     * @return {?}
     */
    function () {
        this.destroyAutoScroll();
        this.stopDragging$.next();
        this.dragDebugService.reset();
    };
    /**
     * @return {?}
     */
    DragScrollDirective.prototype.entered = /**
     * @return {?}
     */
    function () {
        this.dragFixContainer();
    };
    /**
     * @return {?}
     */
    DragScrollDirective.prototype.exited = /**
     * @return {?}
     */
    function () {
        this.dragFixContainer();
    };
    /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    DragScrollDirective.prototype.handleScroll = /**
     * @private
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        /** @type {?} */
        var dropListRef = this.getDropListRef();
        // adjust containers
        this.adjustContainers();
        // adjust items
        this.adjustItems(x, y);
        // ToDo: better condition for changed items
        if (dropListRef._draggables.length > dropListRef._itemPositions.length) {
            this.syncItems();
        }
        this.addDebugInfo();
    };
    /**
     * @private
     * @return {?}
     */
    DragScrollDirective.prototype.destroyAutoScroll = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.autoScroll) {
            this.autoScroll.destroy();
            this.autoScroll = null;
        }
    };
    /**
     * @private
     * @return {?}
     */
    DragScrollDirective.prototype.getDropListRef = /**
     * @private
     * @return {?}
     */
    function () {
        return this.dragRef['_dropContainer'];
    };
    /**
     * @private
     * @return {?}
     */
    DragScrollDirective.prototype.addDebugInfo = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.dragDebugService.enabled) {
            return;
        }
        /** @type {?} */
        var dropListRef = this.getDropListRef();
        /** @type {?} */
        var draws = tslib_1.__spread(dropListRef._itemPositions.map((/**
         * @param {?} it
         * @return {?}
         */
        function (it) { return ({
            clientRect: it.clientRect,
            color: 'blue',
            id: it.drag.data.data.name
        }); })), dropListRef._siblings.map((/**
         * @param {?} it
         * @return {?}
         */
        function (it) { return ({
            clientRect: it._clientRect,
            color: 'green',
            id: ''
        }); })), [
            {
                clientRect: dropListRef._clientRect,
                color: '#2FD1BB',
                id: ''
            }
        ]);
        this.dragDebugService.log(draws.filter((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d.clientRect; })));
    };
    /**
     * @private
     * @return {?}
     */
    DragScrollDirective.prototype.dragFixContainer = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // https://github.com/angular/material2/issues/15227
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var dropListRef = _this.getDropListRef();
            dropListRef._cacheOwnPosition();
            _this.addDebugInfo();
        }));
        // fix for issue when classes is not resetted
        this.changeDetectorRef.markForCheck();
    };
    /**
     * @private
     * @return {?}
     */
    DragScrollDirective.prototype.syncSiblings = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dropListRef = this.getDropListRef();
        this.log('syncSiblings before', dropListRef._siblings.length);
        dropListRef.beforeStarted.next();
        this.log('syncSiblings after', dropListRef._siblings.length);
        this.adjustContainers();
    };
    /**
     * @private
     * @return {?}
     */
    DragScrollDirective.prototype.syncItems = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dropListRef = this.getDropListRef();
        /** @type {?} */
        var oldPositions = dropListRef._itemPositions;
        dropListRef._activeDraggables = dropListRef._draggables.slice();
        dropListRef._cacheItemPositions();
        /** @type {?} */
        var newPositions = dropListRef._itemPositions;
        dropListRef._itemPositions = tslib_1.__spread(oldPositions);
        newPositions.forEach((/**
         * @param {?} p
         * @return {?}
         */
        function (p) {
            if (!oldPositions.find((/**
             * @param {?} p1
             * @return {?}
             */
            function (p1) { return p.drag === p1.drag; }))) {
                dropListRef._itemPositions.push(p);
            }
        }));
        dropListRef._activeDraggables.push(this.dragRef);
    };
    /**
     * @private
     * @return {?}
     */
    DragScrollDirective.prototype.adjustContainers = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dropListRef = this.getDropListRef();
        dropListRef._cacheOwnPosition();
        dropListRef._siblings.forEach((/**
         * @param {?} sibling
         * @return {?}
         */
        function (sibling) {
            sibling._cacheOwnPosition();
        }));
    };
    /**
     * @private
     * @param {?} deltaX
     * @param {?} deltaY
     * @return {?}
     */
    DragScrollDirective.prototype.adjustItems = /**
     * @private
     * @param {?} deltaX
     * @param {?} deltaY
     * @return {?}
     */
    function (deltaX, deltaY) {
        /** @type {?} */
        var dropListRef = this.getDropListRef();
        dropListRef._itemPositions.forEach((/**
         * @param {?} it
         * @return {?}
         */
        function (it) {
            it.originalRect = it.originalRect || it.clientRect;
            it.clientRect = tslib_1.__assign({}, it.clientRect, { left: it.clientRect.left - deltaX, right: it.clientRect.right - deltaX, top: it.clientRect.top - deltaY, bottom: it.clientRect.bottom - deltaY });
        }));
    };
    /**
     * @private
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    DragScrollDirective.prototype.log = /**
     * @private
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (this.dragDebugService.enabled) {
            console.log(message, optionalParams);
        }
    };
    DragScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[vsDragScroll]',
                    exportAs: 'vsDragScroll'
                },] }
    ];
    /** @nocollapse */
    DragScrollDirective.ctorParameters = function () { return [
        { type: CdkDrag },
        { type: DragDebugService },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
    DragScrollDirective.propDecorators = {
        dragConnectedIds: [{ type: Input, args: ['vsDragScrollConnectedTo',] }],
        scrollContainer: [{ type: Input, args: ['vsDragScrollContainer',] }]
    };
    return DragScrollDirective;
}());
export { DragScrollDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY2RrLWRyYWctc2Nyb2xsLyIsInNvdXJjZXMiOlsibGliL2RyYWctc2Nyb2xsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsU0FBUyxFQUVULE1BQU0sRUFDTixLQUFLLEVBQ0wsaUJBQWlCLEVBR2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUV4RDtJQWlCRSw2QkFDVSxPQUFnQixFQUNoQixnQkFBa0MsRUFDbEMsSUFBWSxFQUNaLGlCQUFvQztRQUo5QyxpQkFpQ0M7UUFoQ1MsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBaEI5QyxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMvQixrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFHcEMsZUFBVSxHQUFHO1lBQ1gsR0FBRyxFQUFFLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQztTQUNSLENBQUM7UUFXQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJ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QkFBaUI7OzttQ0F1QmhCLEtBQUssU0FBQyx5QkFBeUI7a0NBQy9CLEtBQUssU0FBQyx1QkFBdUI7O0lBbU9oQywwQkFBQztDQUFBLEFBbFBELElBa1BDO1NBOU9ZLG1CQUFtQjs7O0lBQzlCLHVDQUErQjs7SUFDL0IsNENBQW9DOztJQUNwQyxzQ0FBNkI7O0lBQzdCLHlDQUF1Qjs7SUFDdkIseUNBR0U7O0lBRUYsK0NBQTZEOztJQUM3RCw4Q0FBNkQ7Ozs7O0lBRzNELHNDQUF3Qjs7Ozs7SUFDeEIsK0NBQTBDOzs7OztJQUMxQyxtQ0FBb0I7Ozs7O0lBQ3BCLGdEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWcsIERyYWdSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHtcclxuICBEaXJlY3RpdmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE5nWm9uZSxcclxuICBJbnB1dCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIE9uQ2hhbmdlc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFrZVVudGlsLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEF1dG9TY3JvbGwgfSBmcm9tICcuL2F1dG8tc2Nyb2xsJztcclxuaW1wb3J0IHsgRHJhZ0RlYnVnU2VydmljZSB9IGZyb20gJy4vZHJhZy1kZWJ1Zy5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3ZzRHJhZ1Njcm9sbF0nLFxyXG4gIGV4cG9ydEFzOiAndnNEcmFnU2Nyb2xsJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ1Njcm9sbERpcmVjdGl2ZTxUID0gYW55PiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICBkZXN0cm95JCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgc3RvcERyYWdnaW5nJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcbiAgZHJhZ1JlZjogRHJhZ1JlZjxDZGtEcmFnPFQ+PjtcclxuICBhdXRvU2Nyb2xsOiBBdXRvU2Nyb2xsO1xyXG4gIGxhc3RTY3JvbGwgPSB7XHJcbiAgICB0b3A6IDAsXHJcbiAgICBsZWZ0OiAwXHJcbiAgfTtcclxuXHJcbiAgQElucHV0KCd2c0RyYWdTY3JvbGxDb25uZWN0ZWRUbycpIGRyYWdDb25uZWN0ZWRJZHM6IHN0cmluZ1tdO1xyXG4gIEBJbnB1dCgndnNEcmFnU2Nyb2xsQ29udGFpbmVyJykgc2Nyb2xsQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNka0RyYWc6IENka0RyYWcsXHJcbiAgICBwcml2YXRlIGRyYWdEZWJ1Z1NlcnZpY2U6IERyYWdEZWJ1Z1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcclxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICB0aGlzLmRyYWdSZWYgPSB0aGlzLmNka0RyYWdbJ19kcmFnUmVmJ107XHJcblxyXG4gICAgaWYgKHRoaXMuZHJhZ1JlZikge1xyXG4gICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZHJhZ1JlZi5zdGFydGVkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2coJ1N0YXJ0ZWQnLCBldmVudCwgdGhpcy5kcmFnUmVmLmlzRHJhZ2dpbmcoKSk7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0ZWQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmFnUmVmLmVuZGVkLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xyXG4gICAgICAgICAgdGhpcy5sb2coJ0VuZGVkJywgZXZlbnQpO1xyXG4gICAgICAgICAgdGhpcy5lbmRlZCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmRyYWdSZWYuZW50ZXJlZC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcclxuICAgICAgICAgIHRoaXMubG9nKCdFbnRlcmVkJywgZXZlbnQpO1xyXG4gICAgICAgICAgdGhpcy5lbnRlcmVkKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhZ1JlZi5leGl0ZWQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZShldmVudCA9PiB7XHJcbiAgICAgICAgICB0aGlzLmxvZygnRXhpdGVkJywgZXZlbnQpO1xyXG4gICAgICAgICAgdGhpcy5leGl0ZWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxvZygnQ2RrRHJhZyBub3QgZm91bmQnLCB0aGlzLmNka0RyYWcsIHRoaXMuZHJhZ1JlZik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5kcmFnQ29ubmVjdGVkSWRzKSB7XHJcbiAgICAgIGlmICh0aGlzLmRyYWdSZWYuaXNEcmFnZ2luZygpKSB7XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xNTM0M1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zeW5jU2libGluZ3MoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcclxuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcclxuICAgIHRoaXMuc3RvcERyYWdnaW5nJC5uZXh0KCk7XHJcbiAgICB0aGlzLnN0b3BEcmFnZ2luZyQuY29tcGxldGUoKTtcclxuICAgIHRoaXMuZGVzdHJveUF1dG9TY3JvbGwoKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0ZWQoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2Nyb2xsQ29udGFpbmVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlc3Ryb3lBdXRvU2Nyb2xsKCk7XHJcblxyXG4gICAgdGhpcy5hZGREZWJ1Z0luZm8oKTtcclxuXHJcbiAgICB0aGlzLmF1dG9TY3JvbGwgPSBuZXcgQXV0b1Njcm9sbCh0aGlzLnNjcm9sbENvbnRhaW5lcik7XHJcblxyXG4gICAgdGhpcy5sYXN0U2Nyb2xsLnRvcCA9IHRoaXMuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcDtcclxuICAgIHRoaXMubGFzdFNjcm9sbC5sZWZ0ID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdDtcclxuXHJcbiAgICBmcm9tRXZlbnQodGhpcy5zY3JvbGxDb250YWluZXIsICdzY3JvbGwnKVxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5zdG9wRHJhZ2dpbmckKSlcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVsdGFYID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdCAtIHRoaXMubGFzdFNjcm9sbC5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IHRoaXMuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCAtIHRoaXMubGFzdFNjcm9sbC50b3A7XHJcblxyXG4gICAgICAgIGlmIChkZWx0YVggfHwgZGVsdGFZKSB7XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZVNjcm9sbChkZWx0YVgsIGRlbHRhWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhc3RTY3JvbGwudG9wID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wO1xyXG4gICAgICAgIHRoaXMubGFzdFNjcm9sbC5sZWZ0ID0gdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsTGVmdDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5kcmFnUmVmLm1vdmVkXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGRlYm91bmNlVGltZSgxMCksXHJcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuc3RvcERyYWdnaW5nJClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKGUgPT4ge1xyXG4gICAgICAgIHRoaXMuYXV0b1Njcm9sbC5vbk1vdmUoZS5wb2ludGVyUG9zaXRpb24pO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGVuZGVkKCkge1xyXG4gICAgdGhpcy5kZXN0cm95QXV0b1Njcm9sbCgpO1xyXG4gICAgdGhpcy5zdG9wRHJhZ2dpbmckLm5leHQoKTtcclxuICAgIHRoaXMuZHJhZ0RlYnVnU2VydmljZS5yZXNldCgpO1xyXG4gIH1cclxuXHJcbiAgZW50ZXJlZCgpIHtcclxuICAgIHRoaXMuZHJhZ0ZpeENvbnRhaW5lcigpO1xyXG4gIH1cclxuXHJcbiAgZXhpdGVkKCkge1xyXG4gICAgdGhpcy5kcmFnRml4Q29udGFpbmVyKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhhbmRsZVNjcm9sbCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgY29uc3QgZHJvcExpc3RSZWY6IGFueSA9IHRoaXMuZ2V0RHJvcExpc3RSZWYoKTtcclxuXHJcbiAgICAvLyBhZGp1c3QgY29udGFpbmVyc1xyXG4gICAgdGhpcy5hZGp1c3RDb250YWluZXJzKCk7XHJcblxyXG4gICAgLy8gYWRqdXN0IGl0ZW1zXHJcbiAgICB0aGlzLmFkanVzdEl0ZW1zKHgsIHkpO1xyXG5cclxuICAgIC8vIFRvRG86IGJldHRlciBjb25kaXRpb24gZm9yIGNoYW5nZWQgaXRlbXNcclxuICAgIGlmIChkcm9wTGlzdFJlZi5fZHJhZ2dhYmxlcy5sZW5ndGggPiBkcm9wTGlzdFJlZi5faXRlbVBvc2l0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5zeW5jSXRlbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZERlYnVnSW5mbygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZXN0cm95QXV0b1Njcm9sbCgpIHtcclxuICAgIGlmICh0aGlzLmF1dG9TY3JvbGwpIHtcclxuICAgICAgdGhpcy5hdXRvU2Nyb2xsLmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5hdXRvU2Nyb2xsID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RHJvcExpc3RSZWYoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kcmFnUmVmWydfZHJvcENvbnRhaW5lciddO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREZWJ1Z0luZm8oKSB7XHJcbiAgICBpZiAoIXRoaXMuZHJhZ0RlYnVnU2VydmljZS5lbmFibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGRyb3BMaXN0UmVmOiBhbnkgPSB0aGlzLmdldERyb3BMaXN0UmVmKCk7XHJcbiAgICBjb25zdCBkcmF3cyA9IFtcclxuICAgICAgLi4uZHJvcExpc3RSZWYuX2l0ZW1Qb3NpdGlvbnMubWFwKGl0ID0+ICh7XHJcbiAgICAgICAgY2xpZW50UmVjdDogaXQuY2xpZW50UmVjdCxcclxuICAgICAgICBjb2xvcjogJ2JsdWUnLFxyXG4gICAgICAgIGlkOiBpdC5kcmFnLmRhdGEuZGF0YS5uYW1lXHJcbiAgICAgIH0pKSxcclxuICAgICAgLi4uZHJvcExpc3RSZWYuX3NpYmxpbmdzLm1hcChpdCA9PiAoe1xyXG4gICAgICAgIGNsaWVudFJlY3Q6IGl0Ll9jbGllbnRSZWN0LFxyXG4gICAgICAgIGNvbG9yOiAnZ3JlZW4nLFxyXG4gICAgICAgIGlkOiAnJ1xyXG4gICAgICB9KSksXHJcbiAgICAgIHtcclxuICAgICAgICBjbGllbnRSZWN0OiBkcm9wTGlzdFJlZi5fY2xpZW50UmVjdCxcclxuICAgICAgICBjb2xvcjogJyMyRkQxQkInLFxyXG4gICAgICAgIGlkOiAnJ1xyXG4gICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMuZHJhZ0RlYnVnU2VydmljZS5sb2coZHJhd3MuZmlsdGVyKGQgPT4gZC5jbGllbnRSZWN0KSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRyYWdGaXhDb250YWluZXIoKSB7XHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzE1MjI3XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgZHJvcExpc3RSZWY6IGFueSA9IHRoaXMuZ2V0RHJvcExpc3RSZWYoKTtcclxuICAgICAgZHJvcExpc3RSZWYuX2NhY2hlT3duUG9zaXRpb24oKTtcclxuICAgICAgdGhpcy5hZGREZWJ1Z0luZm8oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGZpeCBmb3IgaXNzdWUgd2hlbiBjbGFzc2VzIGlzIG5vdCByZXNldHRlZFxyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3luY1NpYmxpbmdzKCkge1xyXG4gICAgY29uc3QgZHJvcExpc3RSZWY6IGFueSA9IHRoaXMuZ2V0RHJvcExpc3RSZWYoKTtcclxuICAgIHRoaXMubG9nKCdzeW5jU2libGluZ3MgYmVmb3JlJywgZHJvcExpc3RSZWYuX3NpYmxpbmdzLmxlbmd0aCk7XHJcbiAgICBkcm9wTGlzdFJlZi5iZWZvcmVTdGFydGVkLm5leHQoKTtcclxuICAgIHRoaXMubG9nKCdzeW5jU2libGluZ3MgYWZ0ZXInLCBkcm9wTGlzdFJlZi5fc2libGluZ3MubGVuZ3RoKTtcclxuICAgIHRoaXMuYWRqdXN0Q29udGFpbmVycygpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzeW5jSXRlbXMoKSB7XHJcbiAgICBjb25zdCBkcm9wTGlzdFJlZjogYW55ID0gdGhpcy5nZXREcm9wTGlzdFJlZigpO1xyXG5cclxuICAgIGNvbnN0IG9sZFBvc2l0aW9ucyA9IGRyb3BMaXN0UmVmLl9pdGVtUG9zaXRpb25zO1xyXG4gICAgZHJvcExpc3RSZWYuX2FjdGl2ZURyYWdnYWJsZXMgPSBkcm9wTGlzdFJlZi5fZHJhZ2dhYmxlcy5zbGljZSgpO1xyXG5cclxuICAgIGRyb3BMaXN0UmVmLl9jYWNoZUl0ZW1Qb3NpdGlvbnMoKTtcclxuICAgIGNvbnN0IG5ld1Bvc2l0aW9ucyA9IGRyb3BMaXN0UmVmLl9pdGVtUG9zaXRpb25zO1xyXG4gICAgZHJvcExpc3RSZWYuX2l0ZW1Qb3NpdGlvbnMgPSBbLi4ub2xkUG9zaXRpb25zXTtcclxuICAgIG5ld1Bvc2l0aW9ucy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICBpZiAoIW9sZFBvc2l0aW9ucy5maW5kKHAxID0+IHAuZHJhZyA9PT0gcDEuZHJhZykpIHtcclxuICAgICAgICBkcm9wTGlzdFJlZi5faXRlbVBvc2l0aW9ucy5wdXNoKHApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGRyb3BMaXN0UmVmLl9hY3RpdmVEcmFnZ2FibGVzLnB1c2godGhpcy5kcmFnUmVmKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRqdXN0Q29udGFpbmVycygpIHtcclxuICAgIGNvbnN0IGRyb3BMaXN0UmVmOiBhbnkgPSB0aGlzLmdldERyb3BMaXN0UmVmKCk7XHJcblxyXG4gICAgZHJvcExpc3RSZWYuX2NhY2hlT3duUG9zaXRpb24oKTtcclxuICAgIGRyb3BMaXN0UmVmLl9zaWJsaW5ncy5mb3JFYWNoKHNpYmxpbmcgPT4ge1xyXG4gICAgICBzaWJsaW5nLl9jYWNoZU93blBvc2l0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRqdXN0SXRlbXMoZGVsdGFYOiBudW1iZXIsIGRlbHRhWTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBkcm9wTGlzdFJlZjogYW55ID0gdGhpcy5nZXREcm9wTGlzdFJlZigpO1xyXG4gICAgZHJvcExpc3RSZWYuX2l0ZW1Qb3NpdGlvbnMuZm9yRWFjaChpdCA9PiB7XHJcbiAgICAgIGl0Lm9yaWdpbmFsUmVjdCA9IGl0Lm9yaWdpbmFsUmVjdCB8fCBpdC5jbGllbnRSZWN0O1xyXG4gICAgICBpdC5jbGllbnRSZWN0ID0ge1xyXG4gICAgICAgIC4uLml0LmNsaWVudFJlY3QsXHJcbiAgICAgICAgbGVmdDogaXQuY2xpZW50UmVjdC5sZWZ0IC0gZGVsdGFYLFxyXG4gICAgICAgIHJpZ2h0OiBpdC5jbGllbnRSZWN0LnJpZ2h0IC0gZGVsdGFYLFxyXG4gICAgICAgIHRvcDogaXQuY2xpZW50UmVjdC50b3AgLSBkZWx0YVksXHJcbiAgICAgICAgYm90dG9tOiBpdC5jbGllbnRSZWN0LmJvdHRvbSAtIGRlbHRhWVxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGxvZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pIHtcclxuICAgIGlmICh0aGlzLmRyYWdEZWJ1Z1NlcnZpY2UuZW5hYmxlZCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==