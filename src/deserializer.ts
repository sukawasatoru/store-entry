export class Deserializer<T> {
    static readonly string = new Deserializer<string>(value => value);
    static readonly stringArray = new Deserializer<string[]>(
        value => Deserializer.json.deserialize(value) as string[]
    );
    static readonly boolean = new Deserializer<boolean>(
        s => !!s && s.toLowerCase() === "true"
    );
    static readonly number = new Deserializer<number>(value => {
        const ret = Number(value);
        if (isNaN(ret) || !isFinite(ret)) {
            return undefined;
        }
        return ret;
    });
    static readonly json = new Deserializer<object>(value => {
        if (!value || value === "null") {
            return undefined;
        }
        try {
            return JSON.parse(value);
        } catch (e) {
            console.warn(`failed to parse value: ${e}`);
            return undefined;
        }
    });

    readonly deserialize: (value: string) => T | undefined;

    constructor(deserializer: (value: string) => T | undefined) {
        this.deserialize = deserializer;
    }
}
