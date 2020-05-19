/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class AutoScroll {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1zY3JvbGwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jZGstZHJhZy1zY3JvbGwvIiwic291cmNlcyI6WyJsaWIvYXV0by1zY3JvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU0sT0FBTyxVQUFVOzs7OztJQU9yQixZQUNVLFNBQXNCLEVBQ3RCLGNBQStCO1FBRC9CLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBUnpDLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFDWixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsVUFBSyxHQUE2QixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBTS9DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQzdELENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEtBQStCO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQjs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFDLENBQUM7SUFDdkUsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxxQkFBcUI7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQyxDQUFDO1NBQ3RFO0lBQ0gsQ0FBQzs7OztJQUVELFVBQVU7O1lBQ0osT0FBTzs7WUFBRSxPQUFPO1FBRXBCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcs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LEVBQUUsTUFBTTtnQkFDVCxDQUFDLEVBQUUsQ0FBQzthQUNMLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUMsQ0FBQztDQUNGOzs7SUFsR0MsNEJBQVk7O0lBQ1osOEJBQWM7O0lBQ2Qsb0NBQW9COztJQUNwQixrQ0FBeUI7O0lBQ3pCLDJCQUFpRDs7Ozs7SUFHL0MsK0JBQThCOzs7OztJQUM5QixvQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJ0eXBlIFNjcm9sbENhbGxiYWNrID0gKGV2ZW50OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pID0+IHZvaWQ7XHJcblxyXG5leHBvcnQgY2xhc3MgQXV0b1Njcm9sbCB7XHJcbiAgbWFyZ2luID0gMzA7XHJcbiAgbWF4U3BlZWQgPSAyNTtcclxuICBhbmltYXRpb25GcmFtZTogYW55O1xyXG4gIGJvdW5kYXJ5UmVjdDogQ2xpZW50UmVjdDtcclxuICBwb2ludDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9ID0geyB4OiAwLCB5OiAwIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50LFxyXG4gICAgcHJpdmF0ZSBzY3JvbGxDYWxsYmFjaz86IFNjcm9sbENhbGxiYWNrXHJcbiAgKSB7XHJcbiAgICB0aGlzLmJvdW5kYXJ5UmVjdCA9IHRoaXMuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIH1cclxuXHJcbiAgb25Nb3ZlKHBvaW50OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0pIHtcclxuICAgIHRoaXMucG9pbnQgPSBwb2ludDtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWUpO1xyXG4gICAgdGhpcy5hbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnNjcm9sbFRpY2soKSk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUaWNrKCkge1xyXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25GcmFtZSk7XHJcbiAgICBpZiAodGhpcy5hdXRvU2Nyb2xsKCkpIHtcclxuICAgICAgdGhpcy5hbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLnNjcm9sbFRpY2soKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdXRvU2Nyb2xsKCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHNjcm9sbHgsIHNjcm9sbHk7XHJcblxyXG4gICAgaWYgKHRoaXMucG9pbnQueCA8IHRoaXMuYm91bmRhcnlSZWN0LmxlZnQgKyB0aGlzLm1hcmdpbikge1xyXG4gICAgICBzY3JvbGx4ID0gTWF0aC5mbG9vcihcclxuICAgICAgICBNYXRoLm1heChcclxuICAgICAgICAgIC0xLFxyXG4gICAgICAgICAgKHRoaXMucG9pbnQueCAtIHRoaXMuYm91bmRhcnlSZWN0LmxlZnQpIC8gdGhpcy5tYXJnaW4gLSAxXHJcbiAgICAgICAgKSAqIHRoaXMubWF4U3BlZWRcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wb2ludC54ID4gdGhpcy5ib3VuZGFyeVJlY3QucmlnaHQgLSB0aGlzLm1hcmdpbikge1xyXG4gICAgICBzY3JvbGx4ID0gTWF0aC5jZWlsKFxyXG4gICAgICAgIE1hdGgubWluKFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgICh0aGlzLnBvaW50LnggLSB0aGlzLmJvdW5kYXJ5UmVjdC5yaWdodCkgLyB0aGlzLm1hcmdpbiArIDFcclxuICAgICAgICApICogdGhpcy5tYXhTcGVlZFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2Nyb2xseCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucG9pbnQueSA8IHRoaXMuYm91bmRhcnlSZWN0LnRvcCArIHRoaXMubWFyZ2luKSB7XHJcbiAgICAgIHNjcm9sbHkgPSBNYXRoLmZsb29yKFxyXG4gICAgICAgIE1hdGgubWF4KC0xLCAodGhpcy5wb2ludC55IC0gdGhpcy5ib3VuZGFyeVJlY3QudG9wKSAvIHRoaXMubWFyZ2luIC0gMSkgKlxyXG4gICAgICAgICAgdGhpcy5tYXhTcGVlZFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnBvaW50LnkgPiB0aGlzLmJvdW5kYXJ5UmVjdC5ib3R0b20gLSB0aGlzLm1hcmdpbikge1xyXG4gICAgICBzY3JvbGx5ID0gTWF0aC5jZWlsKFxyXG4gICAgICAgIE1hdGgubWluKFxyXG4gICAgICAgICAgMSxcclxuICAgICAgICAgICh0aGlzLnBvaW50LnkgLSB0aGlzLmJvdW5kYXJ5UmVjdC5ib3R0b20pIC8gdGhpcy5tYXJnaW4gKyAxXHJcbiAgICAgICAgKSAqIHRoaXMubWF4U3BlZWRcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNjcm9sbHkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAoc2Nyb2xseSkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsWShzY3JvbGx5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNjcm9sbHgpIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFgoc2Nyb2xseCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBzY3JvbGx4IHx8IHNjcm9sbHk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxZKGFtb3VudDogbnVtYmVyKSB7XHJcbiAgICAvLyBUb0RvIGZvciB3aW5kb3c6IHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQsIHdpbmRvdy5wYWdlWU9mZnNldCArIGFtb3VudCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5zY3JvbGxUb3AgKz0gYW1vdW50O1xyXG4gICAgaWYgKHRoaXMuc2Nyb2xsQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5zY3JvbGxDYWxsYmFjayh7IHg6IDAsIHk6IGFtb3VudCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjcm9sbFgoYW1vdW50KSB7XHJcbiAgICAvLyBUb0RvIGZvciB3aW5kb3c6IHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cucGFnZVhPZmZzZXQgKyBhbW91bnQsIHdpbmRvdy5wYWdlWU9mZnNldCk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5zY3JvbGxMZWZ0ICs9IGFtb3VudDtcclxuICAgIGlmICh0aGlzLnNjcm9sbENhbGxiYWNrKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsQ2FsbGJhY2soe1xyXG4gICAgICAgIHg6IGFtb3VudCxcclxuICAgICAgICB5OiAwXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uRnJhbWUpO1xyXG4gIH1cclxufVxyXG4iXX0=