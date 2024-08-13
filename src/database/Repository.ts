export default abstract class Repository<T> {
    constructor() {
        if (new.target === Repository) {
            throw new Error('Cannot instantiate abstract class Repository directly.');
        }
    }

    abstract parse(entity: T | null): T | null;

    abstract add(entity: Partial<T>): Promise<T>;

    abstract findOne(id: string, projection?: any): Promise<T | null>;

    abstract findAll(projection?: any): Promise<T[]>;

    abstract get(id: string, projection?: any): Promise<T>;

    abstract remove(id: string): Promise<T | null>;
}
