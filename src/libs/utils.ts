export const pick = (object: Record<string, any>, keys: string[]) => {
    return keys.reduce((obj, key) => {
        if (object && object.hasOwnProperty(key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
}

export const equal = (val1: any, val2: any) => val1 === val2