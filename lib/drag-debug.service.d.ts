import { BehaviorSubject } from 'rxjs';
export declare class DragDebugService {
    debugInfo: BehaviorSubject<any[]>;
    enabled: boolean;
    constructor();
    log(info: any[]): void;
    reset(): void;
}
