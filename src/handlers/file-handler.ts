import { Handler } from "../handlers";
import * as path from "path";
import * as fs from "fs"
import { exit } from "process";

export class FileHandler extends Handler {
    private filepath: string;
    private isPackageRootDir: Boolean = false;
    private rootDir: string;

    constructor(filepath?: string) {
        super();
        this.filepath = filepath ? filepath : `${this.getProjectRootDir()}/logs/app.log`
    }

    isPackageDir(): void {
        for (const item of __dirname.split('/')) {
            if (item === 'node_modules') {
                this.isPackageRootDir = true;
            }
        }
    }

    handlePackageRootDir(): void {
        let basePath = "/";
        for (const item of __dirname.split("/")) {
            if (item === "node_modules") {
                basePath = path.join(basePath, item);
                this.rootDir = basePath;
                break;
            }
            basePath = path.join(basePath, item);
        }
    }

    handleLocalRootDir(): void {
        let basePath = "/";
        for (const item of __dirname.split("/")) {
            if (item === "njslog") {
                basePath = path.join(basePath, item);
                this.rootDir = basePath;
                break;
            }
            basePath = path.join(basePath, item);
        }
    }

    getProjectRootDir(): string {
        this.isPackageDir()
        if (this.isPackageRootDir) {
            this.handlePackageRootDir()
            return this.rootDir
        }
        this.handleLocalRootDir()
        return this.rootDir
    }

    protected emit(message: string): void {
        // check either file path exist or not 
        if (!fs.existsSync(this.filepath)) {
            fs.mkdirSync(path.dirname(this.filepath), { recursive: true });
            fs.writeFileSync(this.filepath, '');
        }

        const writer = fs.createWriteStream(this.filepath, {
            flags: 'a'
        })
        writer.write(message + "\n");
    }
}




