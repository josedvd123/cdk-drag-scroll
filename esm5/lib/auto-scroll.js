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
export { AutoScroll };
if (false) {
    /** @type {?} */
    AutoScroll.prototype.margin;
    /** @type {?} */
    AutoScroll.prototype.maxSpeed;
    /** @type {?} */
    AutoScroll.prototype.animationFrame;
    /** @type {?} */
    AutoScroll.prototype.boundaryRect;
    /** @type {?} */
    AutoScroll.prototype.point;
    /**
     * @type {?}
     * @private
     */
    AutoScroll.prototype.container;
    /**
     * @type {?}
     * @private
     */
    AutoScroll.prototype.scrollCallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jZGstZHJhZy1zY3JvbGwvIiwic291cmNlcyI6WyJsaWIvYXV0by1zY3JvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBO0lBT0Usb0JBQ1UsU0FBc0IsRUFDdEIsY0FBK0I7UUFEL0IsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUN0QixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFSekMsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFHZCxVQUFLLEdBQTZCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFNL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDN0QsQ0FBQzs7Ozs7SUFFRCwyQkFBTTs7OztJQUFOLFVBQU8sS0FBK0I7UUFBdEMsaUJBSUM7UUFIQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUI7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztJQUN2RSxDQUFDOzs7O0lBRUQsK0JBQVU7OztJQUFWO1FBQUEsaUJBS0M7UUFKQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUI7OztZQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7Ozs7SUFFRCwrQkFBVTs7O0lBQVY7UUFBQSxpQkFnREM7O1lBL0NLLE9BQU87O1lBQUUsT0FBTztRQUVwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ2xCLElBQUksQ0FBQyxHQUFHLENBQ04sQ0FBQyxDQUFDLEVBQ0YsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUMxRCxHQUFHLElBQUksQ0FBQyxRQUFRLENBQ2xCLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMvRCxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDakIsSUFBSSxDQUFDLEdBQUcsQ0FDTixDQUFDLEVBQ0QsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUMzRCxHQUFHLElBQUksQ0FBQyxRQUFRLENBQ2xCLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3RELE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxDQUFDLFFBQVEsQ0FDaEIsQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hFLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUNqQixJQUFJLENBQUMsR0FBRyxDQUNOLENBQUMsRUFDRCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQzVELEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FDbEIsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7UUFFRCxVQUFVOzs7UUFBQztZQUNULElBQUksT0FBTyxFQUFFO2dCQUNYLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkI7WUFFRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sSUFBSSxPQUFPLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCw0QkFBTzs7OztJQUFQLFVBQVEsTUFBYztRQUNwQixxRkFBcUY7UUFDckYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7Ozs7O0lBRUQsNEJBQU87Ozs7SUFBUCxVQUFRLE1BQU07UUFDWixxRkFBcUY7UUFDckYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNsQixDQUFDLEVBQUUsTUFBTTtnQkFDVCxDQUFDLEVBQUUsQ0FBQzthQUNMLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVELDRCQUFPOzs7SUFBUDtRQUNFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBbkdELElBbUdDOzs7O0lBbEdDLDRCQUFZOztJQUNaLDhCQUFjOztJQUNkLG9DQUFvQjs7SUFDcEIsa0NBQXlCOztJQUN6QiwyQkFBaUQ7Ozs7O0lBRy9DLCtCQUE4Qjs7Ozs7SUFDOUIsb0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBTY3JvbGxDYWxsYmFjayA9IChldmVudDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSA9PiB2b2lkO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF1dG9TY3JvbGwge1xyXG4gIG1hcmdpbiA9IDMwO1xyXG4gIG1heFNwZWVkID0gMjU7XHJcbiAgYW5pbWF0aW9uRnJhbWU6IGFueTtcclxuICBib3VuZGFyeVJlY3Q6IENsaWVudFJlY3Q7XHJcbiAgcG9pbnQ6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSA9IHsgeDogMCwgeTogMCB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcclxuICAgIHByaXZhdGUgc2Nyb2xsQ2FsbGJhY2s/OiBTY3JvbGxDYWxsYmFja1xyXG4gICkge1xyXG4gICAgdGhpcy5ib3VuZGFyeVJlY3QgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICB9XHJcblxyXG4gIG9uTW92ZShwb2ludDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9KSB7XHJcbiAgICB0aGlzLnBvaW50ID0gcG9pbnQ7XHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lKTtcclxuICAgIHRoaXMuYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5zY3JvbGxUaWNrKCkpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVGljaygpIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWUpO1xyXG4gICAgaWYgKHRoaXMuYXV0b1Njcm9sbCgpKSB7XHJcbiAgICAgIHRoaXMuYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5zY3JvbGxUaWNrKCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXV0b1Njcm9sbCgpOiBib29sZWFuIHtcclxuICAgIGxldCBzY3JvbGx4LCBzY3JvbGx5O1xyXG5cclxuICAgIGlmICh0aGlzLnBvaW50LnggPCB0aGlzLmJvdW5kYXJ5UmVjdC5sZWZ0ICsgdGhpcy5tYXJnaW4pIHtcclxuICAgICAgc2Nyb2xseCA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgTWF0aC5tYXgoXHJcbiAgICAgICAgICAtMSxcclxuICAgICAgICAgICh0aGlzLnBvaW50LnggLSB0aGlzLmJvdW5kYXJ5UmVjdC5sZWZ0KSAvIHRoaXMubWFyZ2luIC0gMVxyXG4gICAgICAgICkgKiB0aGlzLm1heFNwZWVkXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9pbnQueCA+IHRoaXMuYm91bmRhcnlSZWN0LnJpZ2h0IC0gdGhpcy5tYXJnaW4pIHtcclxuICAgICAgc2Nyb2xseCA9IE1hdGguY2VpbChcclxuICAgICAgICBNYXRoLm1pbihcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICAodGhpcy5wb2ludC54IC0gdGhpcy5ib3VuZGFyeVJlY3QucmlnaHQpIC8gdGhpcy5tYXJnaW4gKyAxXHJcbiAgICAgICAgKSAqIHRoaXMubWF4U3BlZWRcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNjcm9sbHggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnBvaW50LnkgPCB0aGlzLmJvdW5kYXJ5UmVjdC50b3AgKyB0aGlzLm1hcmdpbikge1xyXG4gICAgICBzY3JvbGx5ID0gTWF0aC5mbG9vcihcclxuICAgICAgICBNYXRoLm1heCgtMSwgKHRoaXMucG9pbnQueSAtIHRoaXMuYm91bmRhcnlSZWN0LnRvcCkgLyB0aGlzLm1hcmdpbiAtIDEpICpcclxuICAgICAgICAgIHRoaXMubWF4U3BlZWRcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wb2ludC55ID4gdGhpcy5ib3VuZGFyeVJlY3QuYm90dG9tIC0gdGhpcy5tYXJnaW4pIHtcclxuICAgICAgc2Nyb2xseSA9IE1hdGguY2VpbChcclxuICAgICAgICBNYXRoLm1pbihcclxuICAgICAgICAgIDEsXHJcbiAgICAgICAgICAodGhpcy5wb2ludC55IC0gdGhpcy5ib3VuZGFyeVJlY3QuYm90dG9tKSAvIHRoaXMubWFyZ2luICsgMVxyXG4gICAgICAgICkgKiB0aGlzLm1heFNwZWVkXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzY3JvbGx5ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHNjcm9sbHkpIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFkoc2Nyb2xseSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzY3JvbGx4KSB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxYKHNjcm9sbHgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gc2Nyb2xseCB8fCBzY3JvbGx5O1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsWShhbW91bnQ6IG51bWJlcikge1xyXG4gICAgLy8gVG9EbyBmb3Igd2luZG93OiB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0LCB3aW5kb3cucGFnZVlPZmZzZXQgKyBhbW91bnQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuc2Nyb2xsVG9wICs9IGFtb3VudDtcclxuICAgIGlmICh0aGlzLnNjcm9sbENhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsQ2FsbGJhY2soeyB4OiAwLCB5OiBhbW91bnQgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzY3JvbGxYKGFtb3VudCkge1xyXG4gICAgLy8gVG9EbyBmb3Igd2luZG93OiB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnBhZ2VYT2Zmc2V0ICsgYW1vdW50LCB3aW5kb3cucGFnZVlPZmZzZXQpO1xyXG4gICAgdGhpcy5jb250YWluZXIuc2Nyb2xsTGVmdCArPSBhbW91bnQ7XHJcbiAgICBpZiAodGhpcy5zY3JvbGxDYWxsYmFjaykge1xyXG4gICAgICB0aGlzLnNjcm9sbENhbGxiYWNrKHtcclxuICAgICAgICB4OiBhbW91bnQsXHJcbiAgICAgICAgeTogMFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lKTtcclxuICB9XHJcbn1cclxuIl19