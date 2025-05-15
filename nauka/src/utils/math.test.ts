import { add, isEven } from "./math";

describe("add", () => {
    it("adds two numbers", () => {
        expect(add(2, 3)).toBe(5);
    })
})

describe("isEven", () => {
    it("returns true for even number", () => {
        expect(isEven(4)).toBe(true);
    })

    it("returns false for odd number", () => {
        expect(isEven(5)).toBe(false);
    })
})