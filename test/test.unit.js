import assert from 'assert'

describe('test', function() {
    it('should', function() {
        assert(true)
    })

    it('should not', function() {
        try {
            assert(false)
        } catch (e) {
            assert(true)
        }
    })
})
