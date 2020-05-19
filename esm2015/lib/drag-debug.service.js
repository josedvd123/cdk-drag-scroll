/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class DragDebugService {
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
/** @nocollapse */ DragDebugService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DragDebugService_Factory() { return new DragDebugService(); }, token: DragDebugService, providedIn: "root" });
if (false) {
    /** @type {?} */
    DragDebugService.prototype.debugInfo;
    /** @type {?} */
    DragDebugService.prototype.enabled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kZWJ1Zy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY2RrLWRyYWctc2Nyb2xsLyIsInNvdXJjZXMiOlsibGliL2RyYWctZGVidWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUtuRCxNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCO1FBSEEsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFRLElBQUksQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFFRCxDQUFDOzs7OztJQUVoQixHQUFHLENBQUMsSUFBVztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7O1lBZkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7O0lBRUMscUNBQTZDOztJQUM3QyxtQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHJhZ0RlYnVnU2VydmljZSB7XHJcbiAgZGVidWdJbmZvID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnlbXT4obnVsbCk7XHJcbiAgZW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGxvZyhpbmZvOiBhbnlbXSkge1xyXG4gICAgdGhpcy5kZWJ1Z0luZm8ubmV4dChpbmZvKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCkge1xyXG4gICAgdGhpcy5kZWJ1Z0luZm8ubmV4dChudWxsKTtcclxuICB9XHJcbn1cclxuIl19