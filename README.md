# LRUCache
A Simple Javascript Least Recently Used (LRU) Cache with finite capacity that organizes items in the order they were last accessed. Less used items are evicted to make room for newer items.

## Design
LRU Cache combines two data structures for **super-fast** cache item *access* and *updates* at any size.
- A doubly linked list with a head an tail
- A hash map for fast item access O(1).

![Diagram of LRU Cache](https://www.interviewcake.com/images/svgs/lru_cache__doubly_linked_list.svg?bust=204)

Inspiration & Image Source: https://www.interviewcake.com/concept/java/lru-cache

Built with Javascript, Flow, Babel and Jest.
