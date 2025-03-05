import { Handler } from "../handlers";


export class ConsoleHandler extends Handler {
    protected emit(message: string): void {
        console.log(message);
    }
}