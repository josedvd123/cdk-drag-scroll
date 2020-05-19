/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ DragDebugService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DragDebugService_Factory() { return new DragDebugService(); }, token: DragDebugService, providedIn: "root" });
    return DragDebugService;
}());
export { DragDebugService };
if (false) {
    /** @type {?} */
    DragDebugService.prototype.debugInfo;
    /** @type {?} */
    DragDebugService.prototype.enabled;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kZWJ1Zy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY2RrLWRyYWctc2Nyb2xsLyIsInNvdXJjZXMiOlsibGliL2RyYWctZGVidWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUVuRDtJQU9FO1FBSEEsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFRLElBQUksQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFFRCxDQUFDOzs7OztJQUVoQiw4QkFBRzs7OztJQUFILFVBQUksSUFBVztRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxnQ0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDOztnQkFmRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OzsyQkFMRDtDQW1CQyxBQWhCRCxJQWdCQztTQWJZLGdCQUFnQjs7O0lBQzNCLHFDQUE2Qzs7SUFDN0MsbUNBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERyYWdEZWJ1Z1NlcnZpY2Uge1xyXG4gIGRlYnVnSW5mbyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55W10+KG51bGwpO1xyXG4gIGVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBsb2coaW5mbzogYW55W10pIHtcclxuICAgIHRoaXMuZGVidWdJbmZvLm5leHQoaW5mbyk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMuZGVidWdJbmZvLm5leHQobnVsbCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==