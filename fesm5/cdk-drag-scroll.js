import { __spread, __assign } from 'tslib';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { Injectable, ɵɵdefineInjectable, Directive, NgZone, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutoScroll = /** @class */ (function () {
    function AutoScroll(container, scrollCallback) {
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
    AutoScroll.prototype.onMove = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        var _this = this;
        this.point = point;
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = requestAnimationFrame((/**
         * @return {?}
         */
        function () { return _this.scrollTick(); }));
    };
    /**
     * @return {?}
     */
    AutoScroll.prototype.scrollTick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        cancelAnimationFrame(this.animationFrame);
        if (this.autoScroll()) {
            this.animationFrame = requestAnimationFrame((/**
             * @return {?}
             */
            function () { return _this.scrollTick(); }));
        }
    };
    /**
     * @return {?}
     */
    AutoScroll.prototype.autoScroll = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var scrollx;
        /** @type {?} */
        var scrolly;
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
        function () {
            if (scrolly) {
                _this.scrollY(scrolly);
            }
            if (scrollx) {
                _this.scrollX(scrollx);
            }
        }));
        return scrollx || scrolly;
    };
    /**
     * @param {?} amount
     * @return {?}
     */
    AutoScroll.prototype.scrollY = /**
     * @param {?} amount
     * @return {?}
     */
    function (amount) {
        // ToDo for window: window.scrollTo(window.pageXOffset, window.pageYOffset + amount);
        this.container.scrollTop += amount;
        if (this.scrollCallback) {
            this.scrollCallback({ x: 0, y: amount });
        }
    };
    /**
     * @param {?} amount
     * @return {?}
     */
    AutoScroll.prototype.scrollX = /**
     * @param {?} amount
     * @return {?}
     */
    function (amount) {
        // ToDo for window: window.scrollTo(window.pageXOffset + amount, window.pageYOffset);
        this.container.scrollLeft += amount;
        if (this.scrollCallback) {
            this.scrollCallback({
                x: amount,
                y: 0
            });
        }
    };
    /**
     * @return {?}
     */
    AutoScroll.prototype.destroy = /**
     * @return {?}
     */
    function () {
        cancelAnimationFrame(this.animationFrame);
    };
    return AutoScroll;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DragDebugService = /** @class */ (function () {
    function DragDebugService() {
        this.debugInfo = new BehaviorSubject(null);
        this.enabled = false;
    }
    /**
     * @param {?} info
     * @return {?}
     */
    DragDebugService.prototype.log = /**
     * @param {?} info
     * @return {?}
     */
    function (info) {
        this.debugInfo.next(info);
    };
    /**
     * @return {?}
     */
    DragDebugService.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.debugInfo.next(null);
    };
    DragDebugService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    DragDebugService.ctorParameters = function () { return []; };
    /** @nocollapse */ DragDebugService.ngInjectableDef = ɵɵdefineInjectable({ factory: function DragDebugService_Factory() { return new DragDebugService(); }, token: DragDebugService, providedIn: "root" });
    return DragDebugService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        var draws = __spread(dropListRef._itemPositions.map((/**
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
        dropListRef._itemPositions = __spread(oldPositions);
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
            it.clientRect = __assign({}, it.clientRect, { left: it.clientRect.left - deltaX, right: it.clientRect.right - deltaX, top: it.clientRect.top - deltaY, bottom: it.clientRect.bottom - deltaY });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DragScrollModule = /** @class */ (function () {
    function DragScrollModule() {
    }
    DragScrollModule.decorators = [
        { type: NgModule, args: [{
                    imports: [DragDropModule],
                    declarations: [DragScrollDirective],
                    exports: [DragScrollDirective]
                },] }
    ];
    return DragScrollModule;
}());

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
