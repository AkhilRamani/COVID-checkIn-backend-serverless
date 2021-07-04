export const res = (body: {} | string) => {
    const payload = typeof body === 'object' ? body : { message: body }

    return {
        _200: () => ({
            statusCode: 200,
            body: JSON.stringify(payload, null, 2)
        }),
        err: (code: number) => ({
            statusCode: code,
            body: JSON.stringify(payload, null, 2)
        })
    }
}