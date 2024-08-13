export default abstract class DBWrapper {
    options: Record<string, any>;

    constructor(options: Record<string, any> = {}) {
        if (new.target === DBWrapper) {
            throw new Error('Cannot instantiate abstract class DBWrapper directly.');
        }
        this.options = options;
    }
    abstract connect(): Promise<void>;
}
