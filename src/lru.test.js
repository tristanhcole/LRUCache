const lruCache = require('./lru');

describe('LRU Cache', () => {

    test('Test adding single item', () => {
        const lru = new lruCache(3);

        lru.put('foo', 1);
        expect(lru.head.value).toBe(1);
        expect(lru.tail.value).toBe(1);
        expect(Array.from(lru._cacheMap.keys())).toStrictEqual(['foo'])
    });

    test('Test adding 3 items', () => {
        const lru = new lruCache(3);

        lru.put('foo', 1);
        lru.put('bar', 2);
        lru.put('faz', 3);
        expect(lru.head.value).toBe(3);
        expect(lru.tail.value).toBe(1);
        expect(Array.from(lru._cacheMap.keys())).toStrictEqual(['foo', 'bar', 'faz'])
    });

    test('Test adding 4 items to 3 item cache', () => {
        const lru = new lruCache(3);

        lru.put('foo', 1);
        lru.put('bar', 2);
        lru.put('faz', 3);
        lru.put('baz', 4);
        expect(lru.head.value).toBe(4);
        expect(lru.head.next.value).toBe(3);
        expect(lru.head.prev).toBe(null);

        expect(lru.tail.value).toBe(2);
        expect(lru.tail.prev.value).toBe(3);
        expect(lru.tail.next).toBe(null);
    });

    test('Test retrieving an item from cache', () => {
        const lru = new lruCache(3);

        lru.put('foo', 1);
        lru.put('bar', 2);
        lru.put('faz', 3);
        lru.get('bar');

        expect(lru.head.value).toBe(2);
        expect(lru.head.next.value).toBe(3);
        expect(lru.tail.value).toBe(1);
        expect(lru.tail.prev.value).toBe(3);
    });
});
