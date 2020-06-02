export class Serializer<T> {
    static readonly string = new Serializer<string>(value => value);
    static readonly stringArray = new Serializer<string[]>(value =>
        Serializer.json.serialize(value)
    );
    static readonly boolean = new Serializer<boolean>(value => String(value));
    static readonly number = new Serializer<number>(value => String(value));
    static readonly json = new Serializer<object>(value => JSON.stringify(value));

    readonly serialize: (value: T) => string | undefined;

    constructor(serializer: (value: T) => string | undefined) {
        this.serialize = serializer;
    }
}
