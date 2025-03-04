// Console Handler
import { Handler } from ".";

export class ConsoleHandler extends Handler {
    protected emit(message: string): void {
        console.log(message);
    }
}