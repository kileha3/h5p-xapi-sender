(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["h5p-xapi-sender"] = factory();
	else
		root["H5PXapiSender"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/builtin-status-codes/browser.js":
/*!******************************************************!*\
  !*** ./node_modules/builtin-status-codes/browser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Unordered Collection",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
}


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/h5p-standalone/dist/main.bundle.js":
/*!*********************************************************!*\
  !*** ./node_modules/h5p-standalone/dist/main.bundle.js ***!
  \*********************************************************/
/***/ ((module) => {

/*! For license information please see main.bundle.js.LICENSE.txt */
!function(e,t){ true?module.exports=t():0}(self,(function(){return(()=>{var e={757:(e,t,n)=>{e.exports=n(666)},666:e=>{var t=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(e){c=function(e,t,n){return e[t]=n}}function l(e,t,n,r){var i=t&&t.prototype instanceof v?t:v,o=Object.create(i.prototype),a=new D(r||[]);return o._invoke=function(e,t,n){var r=d;return function(i,o){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===i)throw o;return A()}for(n.method=i,n.arg=o;;){var a=n.delegate;if(a){var s=T(a,n);if(s){if(s===g)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var c=u(e,t,n);if("normal"===c.type){if(r=n.done?h:f,c.arg===g)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=h,n.method="throw",n.arg=c.arg)}}}(e,n,a),o}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=l;var d="suspendedStart",f="suspendedYield",p="executing",h="completed",g={};function v(){}function m(){}function y(){}var b={};b[o]=function(){return this};var x=Object.getPrototypeOf,w=x&&x(x(k([])));w&&w!==n&&r.call(w,o)&&(b=w);var C=y.prototype=v.prototype=Object.create(b);function P(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function S(e,t){function n(i,o,a,s){var c=u(e[i],e,o);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"==typeof d&&r.call(d,"__await")?t.resolve(d.__await).then((function(e){n("next",e,a,s)}),(function(e){n("throw",e,a,s)})):t.resolve(d).then((function(e){l.value=e,a(l)}),(function(e){return n("throw",e,a,s)}))}s(c.arg)}var i;this._invoke=function(e,r){function o(){return new t((function(t,i){n(e,r,t,i)}))}return i=i?i.then(o,o):o()}}function T(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(n.method="return",n.arg=t,T(e,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=u(r,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var o=i.arg;return o?o.done?(n[e.resultName]=o.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function E(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function I(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function D(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(E,this),this.reset(!0)}function k(e){if(e){var n=e[o];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,a=function n(){for(;++i<e.length;)if(r.call(e,i))return n.value=e[i],n.done=!1,n;return n.value=t,n.done=!0,n};return a.next=a}}return{next:A}}function A(){return{value:t,done:!0}}return m.prototype=C.constructor=y,y.constructor=m,m.displayName=c(y,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,c(e,s,"GeneratorFunction")),e.prototype=Object.create(C),e},e.awrap=function(e){return{__await:e}},P(S.prototype),S.prototype[a]=function(){return this},e.AsyncIterator=S,e.async=function(t,n,r,i,o){void 0===o&&(o=Promise);var a=new S(l(t,n,r,i),o);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},P(C),c(C,s,"Generator"),C[o]=function(){return this},C.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=k,D.prototype={constructor:D,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(I),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function i(r,i){return s.type="throw",s.arg=e,n.next=r,i&&(n.method="next",n.arg=t),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),I(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;I(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:k(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}},714:function(e,t){var n,r;void 0===(r="function"==typeof(n=function(e,t){"use strict";var n=function(){function e(){(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,e),this.edges=[],this.Toposort=e}return e.prototype.add=function(e,t){if("string"!=typeof e||!e)throw new TypeError("Dependent name must be given as a not empty string");if((t=Array.isArray(t)?t:[t]).length>0){var n=t,r=Array.isArray(n),i=0;for(n=r?n:n[Symbol.iterator]();;){var o;if(r){if(i>=n.length)break;o=n[i++]}else{if((i=n.next()).done)break;o=i.value}var a=o;if("string"!=typeof a||!a)throw new TypeError("Dependency name must be given as a not empty string");this.edges.push([e,a])}}else this.edges.push([e]);return this},e.prototype.sort=function(){var e=this,t=[],n=this.edges,r=Array.isArray(n),i=0;for(n=r?n:n[Symbol.iterator]();;){var o;if(r){if(i>=n.length)break;o=n[i++]}else{if((i=n.next()).done)break;o=i.value}var a=b=o,s=Array.isArray(a),c=0;for(a=s?a:a[Symbol.iterator]();;){var l;if(s){if(c>=a.length)break;l=a[c++]}else{if((c=a.next()).done)break;l=c.value}var u=l;-1===t.indexOf(u)&&t.push(u)}}for(var d=t.length,f=new Array(t.length),p=function n(r,i){if(0!==i.length&&-1!==i.indexOf(r))throw new Error("Cyclic dependency found. "+r+" is dependent of itself.\nDependency chain: "+i.join(" -> ")+" => "+r);var o=t.indexOf(r);if(-1!==o){var a=!1;t[o]=!1;var s=e.edges,c=Array.isArray(s),l=0;for(s=c?s:s[Symbol.iterator]();;){var u;if(c){if(l>=s.length)break;u=s[l++]}else{if((l=s.next()).done)break;u=l.value}var p=u;p[0]===r&&(a=a||i.concat([r]),n(p[1],a))}f[--d]=r}},h=0;h<t.length;h++)if(!1!==(u=t[h])){t[h]=!1;var g=this.edges,v=Array.isArray(g),m=0;for(g=v?g:g[Symbol.iterator]();;){var y,b;if(v){if(m>=g.length)break;y=g[m++]}else{if((m=g.next()).done)break;y=m.value}(b=y)[0]===u&&p(b[1],[u])}f[--d]=u}return f},e.prototype.clear=function(){return this.edges=[],this},e}();t.exports=n})?n.apply(t,[t,e]):n)||(e.exports=r)},295:(e,t,n)=>{e.exports=n(714)},798:()=>{H5P.ContentType=function(e){function t(){}return t.prototype=new H5P.EventDispatcher,t.prototype.isRoot=function(){return e},t.prototype.getLibraryFilePath=function(e){return H5P.getLibraryPath(this.libraryInfo.versionedNameNoSpaces)+"/"+e},t}},449:()=>{var e=window.H5P=window.H5P||{};e.Event=function(e,t,n){this.type=e,this.data=t;var r=!1,i=!1,o=!1;void 0===n&&(n={}),!0===n.bubbles&&(r=!0),!0===n.external&&(i=!0),this.preventBubbling=function(){r=!1},this.getBubbles=function(){return r},this.scheduleForExternal=function(){return!(!i||o||(o=!0,0))}},e.EventDispatcher=function(){var t=this,n={};this.on=function(e,r,i){if("function"!=typeof r)throw TypeError("listener must be a function");t.trigger("newListener",{type:e,listener:r});var o={listener:r,thisArg:i};n[e]?n[e].push(o):n[e]=[o]},this.once=function(e,n,r){if(!(n instanceof Function))throw TypeError("listener must be a function");var i=function(e){t.off(e.type,i),n.call(this,e)};t.on(e,i,r)},this.off=function(e,r){if(void 0!==r&&!(r instanceof Function))throw TypeError("listener must be a function");if(void 0!==n[e]){if(void 0===r)return delete n[e],void t.trigger("removeListener",e);for(var i=0;i<n[e].length;i++)if(n[e][i].listener===r){n[e].splice(i,1),t.trigger("removeListener",e,{listener:r});break}n[e].length||delete n[e]}};var r=function(e,t){if(void 0!==n[e])for(var r=n[e].slice(),i=0;i<r.length;i++){var o=r[i],a=o.thisArg?o.thisArg:this;o.listener.call(a,t)}};this.trigger=function(n,i,o){if(void 0!==n){n instanceof String||"string"==typeof n?n=new e.Event(n,i,o):void 0!==i&&(n.data=i);var a=n.scheduleForExternal();r.call(this,n.type,n),r.call(this,"*",n),n.getBubbles()&&t.parent instanceof e.EventDispatcher&&(t.parent.trigger instanceof Function||"function"==typeof t.parent.trigger)&&t.parent.trigger(n),a&&e.externalDispatcher.trigger.call(this,n)}}}},2:()=>{var e=window.H5P=window.H5P||{};e.XAPIEvent=function(){e.Event.call(this,"xAPI",{statement:{}},{bubbles:!0,external:!0})},e.XAPIEvent.prototype=Object.create(e.Event.prototype),e.XAPIEvent.prototype.constructor=e.XAPIEvent,e.XAPIEvent.prototype.setScoredResult=function(e,t,n,r,i){if(this.data.statement.result={},void 0!==e&&(void 0===t?this.data.statement.result.score={raw:e}:(this.data.statement.result.score={min:0,max:t,raw:e},t>0&&(this.data.statement.result.score.scaled=Math.round(e/t*1e4)/1e4))),this.data.statement.result.completion=void 0===r?"completed"===this.getVerb()||"answered"===this.getVerb():r,void 0!==i&&(this.data.statement.result.success=i),n&&n.activityStartTime){var o=Math.round((Date.now()-n.activityStartTime)/10)/100;this.data.statement.result.duration="PT"+o+"S"}},e.XAPIEvent.prototype.setVerb=function(t){-1!==e.jQuery.inArray(t,e.XAPIEvent.allowedXAPIVerbs)?this.data.statement.verb={id:"http://adlnet.gov/expapi/verbs/"+t,display:{"en-US":t}}:void 0!==t.id&&(this.data.statement.verb=t)},e.XAPIEvent.prototype.getVerb=function(e){var t=this.data.statement;return"verb"in t?!0===e?t.verb:t.verb.id.slice(31):null},e.XAPIEvent.prototype.setObject=function(t){if(t.contentId)if(this.data.statement.object={id:this.getContentXAPIId(t),objectType:"Activity",definition:{extensions:{"http://h5p.org/x-api/h5p-local-content-id":t.contentId}}},t.subContentId)this.data.statement.object.definition.extensions["http://h5p.org/x-api/h5p-subContentId"]=t.subContentId,"function"==typeof t.getTitle&&(this.data.statement.object.definition.name={"en-US":t.getTitle()});else{var n=e.getContentForInstance(t.contentId);n&&n.metadata&&n.metadata.title&&(this.data.statement.object.definition.name={"en-US":e.createTitle(n.metadata.title)})}else this.data.statement.object={definition:{}}},e.XAPIEvent.prototype.setContext=function(e){e.parent&&(e.parent.contentId||e.parent.subContentId)&&(this.data.statement.context={contextActivities:{parent:[{id:this.getContentXAPIId(e.parent),objectType:"Activity"}]}}),e.libraryInfo&&(void 0===this.data.statement.context&&(this.data.statement.context={contextActivities:{}}),this.data.statement.context.contextActivities.category=[{id:"http://h5p.org/libraries/"+e.libraryInfo.versionedNameNoSpaces,objectType:"Activity"}])},e.XAPIEvent.prototype.setActor=function(){if(void 0!==H5PIntegration.user)this.data.statement.actor={name:H5PIntegration.user.name,mbox:"mailto:"+H5PIntegration.user.mail,objectType:"Agent"};else{var t;try{localStorage.H5PUserUUID?t=localStorage.H5PUserUUID:(t=e.createUUID(),localStorage.H5PUserUUID=t)}catch(n){t="not-trackable-"+e.createUUID()}this.data.statement.actor={account:{name:t,homePage:H5PIntegration.siteUrl},objectType:"Agent"}}},e.XAPIEvent.prototype.getMaxScore=function(){return this.getVerifiedStatementValue(["result","score","max"])},e.XAPIEvent.prototype.getScore=function(){return this.getVerifiedStatementValue(["result","score","raw"])},e.XAPIEvent.prototype.getContentXAPIId=function(e){var t;return e.contentId&&H5PIntegration&&H5PIntegration.contents&&H5PIntegration.contents["cid-"+e.contentId]&&(t=H5PIntegration.contents["cid-"+e.contentId].url,e.subContentId&&(t+="?subContentId="+e.subContentId)),t},e.XAPIEvent.prototype.isFromChild=function(){var e=this.getVerifiedStatementValue(["context","contextActivities","parent",0,"id"]);return!e||-1===e.indexOf("subContentId")},e.XAPIEvent.prototype.getVerifiedStatementValue=function(e){for(var t=this.data.statement,n=0;n<e.length;n++){if(void 0===t[e[n]])return null;t=t[e[n]]}return t},e.XAPIEvent.allowedXAPIVerbs=["answered","asked","attempted","attended","commented","completed","exited","experienced","failed","imported","initialized","interacted","launched","mastered","passed","preferred","progressed","registered","responded","resumed","scored","shared","suspended","terminated","voided","downloaded","copied","accessed-reuse","accessed-embed","accessed-copyright"]},268:()=>{var e=window.H5P=window.H5P||{};e.externalDispatcher=new e.EventDispatcher,e.EventDispatcher.prototype.triggerXAPI=function(e,t){this.trigger(this.createXAPIEventTemplate(e,t))},e.EventDispatcher.prototype.createXAPIEventTemplate=function(t,n){var r=new e.XAPIEvent;if(r.setActor(),r.setVerb(t),void 0!==n)for(var i in n)r.data.statement[i]=n[i];return"object"in r.data.statement||r.setObject(this),"context"in r.data.statement||r.setContext(this),r},e.EventDispatcher.prototype.triggerXAPICompleted=function(e,t,n){this.triggerXAPIScored(e,t,"completed",!0,n)},e.EventDispatcher.prototype.triggerXAPIScored=function(e,t,n,r,i){var o=this.createXAPIEventTemplate(n);o.setScoredResult(e,t,this,r,i),this.trigger(o)},e.EventDispatcher.prototype.setActivityStarted=function(){void 0===this.activityStartTime&&(void 0!==this.contentId&&void 0!==H5PIntegration.contents&&void 0!==H5PIntegration.contents["cid-"+this.contentId]&&this.triggerXAPI("attempted"),this.activityStartTime=Date.now())},e.xAPICompletedListener=function(t){if(("completed"===t.getVerb()||"answered"===t.getVerb())&&!t.getVerifiedStatementValue(["context","contextActivities","parent"])){var n=t.getScore(),r=t.getMaxScore(),i=t.getVerifiedStatementValue(["object","definition","extensions","http://h5p.org/x-api/h5p-local-content-id"]);e.setFinished(i,n,r)}}},357:function(e,t){var n;!function(t,n){"use strict";"object"==typeof e.exports?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return n(e)}:n(t)}("undefined"!=typeof window?window:this,(function(r,i){"use strict";var o=[],a=Object.getPrototypeOf,s=o.slice,c=o.flat?function(e){return o.flat.call(e)}:function(e){return o.concat.apply([],e)},l=o.push,u=o.indexOf,d={},f=d.toString,p=d.hasOwnProperty,h=p.toString,g=h.call(Object),v={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},y=function(e){return null!=e&&e===e.window},b=r.document,x={type:!0,src:!0,nonce:!0,noModule:!0};function w(e,t,n){var r,i,o=(n=n||b).createElement("script");if(o.text=e,t)for(r in x)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function C(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?d[f.call(e)]||"object":typeof e}var P="3.5.1",S=function(e,t){return new S.fn.init(e,t)};function T(e){var t=!!e&&"length"in e&&e.length,n=C(e);return!m(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}S.fn=S.prototype={jquery:P,constructor:S,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=S.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return S.each(this,e)},map:function(e){return this.pushStack(S.map(this,(function(t,n){return e.call(t,n,t)})))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(S.grep(this,(function(e,t){return(t+1)%2})))},odd:function(){return this.pushStack(S.grep(this,(function(e,t){return t%2})))},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:l,sort:o.sort,splice:o.splice},S.extend=S.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,c=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===c&&(a=this,s--);s<c;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(S.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||S.isPlainObject(n)?n:{},i=!1,a[t]=S.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},S.extend({expando:"jQuery"+(P+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==f.call(e)||(t=a(e))&&("function"!=typeof(n=p.call(t,"constructor")&&t.constructor)||h.call(n)!==g))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t,n){w(e,{nonce:t&&t.nonce},n)},each:function(e,t){var n,r=0;if(T(e))for(n=e.length;r<n&&!1!==t.call(e[r],r,e[r]);r++);else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},makeArray:function(e,t){var n=t||[];return null!=e&&(T(Object(e))?S.merge(n,"string"==typeof e?[e]:e):l.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(T(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return c(a)},guid:1,support:v}),"function"==typeof Symbol&&(S.fn[Symbol.iterator]=o[Symbol.iterator]),S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),(function(e,t){d["[object "+t+"]"]=t.toLowerCase()}));var E=function(e){var t,n,r,i,o,a,s,c,l,u,d,f,p,h,g,v,m,y,b,x="sizzle"+1*new Date,w=e.document,C=0,P=0,S=ce(),T=ce(),E=ce(),I=ce(),D=function(e,t){return e===t&&(d=!0),0},k={}.hasOwnProperty,A=[],j=A.pop,H=A.push,N=A.push,L=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},F="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",q="[\\x20\\t\\r\\n\\f]",R="(?:\\\\[\\da-fA-F]{1,6}"+q+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",M="\\["+q+"*("+R+")(?:"+q+"*([*^$|!~]?=)"+q+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+q+"*\\]",B=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",U=new RegExp(q+"+","g"),z=new RegExp("^"+q+"+|((?:^|[^\\\\])(?:\\\\.)*)"+q+"+$","g"),V=new RegExp("^"+q+"*,"+q+"*"),$=new RegExp("^"+q+"*([>+~]|"+q+")"+q+"*"),_=new RegExp(q+"|>"),X=new RegExp(B),W=new RegExp("^"+R+"$"),Q={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+B),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+q+"*(even|odd|(([+-]|)(\\d*)n|)"+q+"*(?:([+-]|)"+q+"*(\\d+)|))"+q+"*\\)|)","i"),bool:new RegExp("^(?:"+F+")$","i"),needsContext:new RegExp("^"+q+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+q+"*((?:-\\d)?\\d*)"+q+"*\\)|)(?=[^-]|$)","i")},J=/HTML$/i,Y=/^(?:input|select|textarea|button)$/i,G=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\[\\da-fA-F]{1,6}"+q+"?|\\\\([^\\r\\n\\f])","g"),ne=function(e,t){var n="0x"+e.slice(1)-65536;return t||(n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320))},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){f()},ae=xe((function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()}),{dir:"parentNode",next:"legend"});try{N.apply(A=L.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(t){N={apply:A.length?function(e,t){H.apply(e,L.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}function se(e,t,r,i){var o,s,l,u,d,h,m,y=t&&t.ownerDocument,w=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==w&&9!==w&&11!==w)return r;if(!i&&(f(t),t=t||p,g)){if(11!==w&&(d=Z.exec(e)))if(o=d[1]){if(9===w){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(y&&(l=y.getElementById(o))&&b(t,l)&&l.id===o)return r.push(l),r}else{if(d[2])return N.apply(r,t.getElementsByTagName(e)),r;if((o=d[3])&&n.getElementsByClassName&&t.getElementsByClassName)return N.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!I[e+" "]&&(!v||!v.test(e))&&(1!==w||"object"!==t.nodeName.toLowerCase())){if(m=e,y=t,1===w&&(_.test(e)||$.test(e))){for((y=ee.test(e)&&me(t.parentNode)||t)===t&&n.scope||((u=t.getAttribute("id"))?u=u.replace(re,ie):t.setAttribute("id",u=x)),s=(h=a(e)).length;s--;)h[s]=(u?"#"+u:":scope")+" "+be(h[s]);m=h.join(",")}try{return N.apply(r,y.querySelectorAll(m)),r}catch(t){I(e,!0)}finally{u===x&&t.removeAttribute("id")}}}return c(e.replace(z,"$1"),t,r,i)}function ce(){var e=[];return function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}}function le(e){return e[x]=!0,e}function ue(e){var t=p.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function de(e,t){for(var n=e.split("|"),i=n.length;i--;)r.attrHandle[n[i]]=t}function fe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function pe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function he(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ge(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ae(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function ve(e){return le((function(t){return t=+t,le((function(n,r){for(var i,o=e([],n.length,t),a=o.length;a--;)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))}))}))}function me(e){return e&&void 0!==e.getElementsByTagName&&e}for(t in n=se.support={},o=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!J.test(t||n&&n.nodeName||"HTML")},f=se.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!=p&&9===a.nodeType&&a.documentElement&&(h=(p=a).documentElement,g=!o(p),w!=p&&(i=p.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",oe,!1):i.attachEvent&&i.attachEvent("onunload",oe)),n.scope=ue((function(e){return h.appendChild(e).appendChild(p.createElement("div")),void 0!==e.querySelectorAll&&!e.querySelectorAll(":scope fieldset div").length})),n.attributes=ue((function(e){return e.className="i",!e.getAttribute("className")})),n.getElementsByTagName=ue((function(e){return e.appendChild(p.createComment("")),!e.getElementsByTagName("*").length})),n.getElementsByClassName=K.test(p.getElementsByClassName),n.getById=ue((function(e){return h.appendChild(e).id=x,!p.getElementsByName||!p.getElementsByName(x).length})),n.getById?(r.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(te,ne);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if(void 0!==t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];for(i=t.getElementsByName(e),r=0;o=i[r++];)if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){for(;n=o[i++];)1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&g)return t.getElementsByClassName(e)},m=[],v=[],(n.qsa=K.test(p.querySelectorAll))&&(ue((function(e){var t;h.appendChild(e).innerHTML="<a id='"+x+"'></a><select id='"+x+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+q+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+q+"*(?:value|"+F+")"),e.querySelectorAll("[id~="+x+"-]").length||v.push("~="),(t=p.createElement("input")).setAttribute("name",""),e.appendChild(t),e.querySelectorAll("[name='']").length||v.push("\\["+q+"*name"+q+"*="+q+"*(?:''|\"\")"),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+x+"+*").length||v.push(".#.+[+~]"),e.querySelectorAll("\\\f"),v.push("[\\r\\n\\f]")})),ue((function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=p.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+q+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")}))),(n.matchesSelector=K.test(y=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue((function(e){n.disconnectedMatch=y.call(e,"*"),y.call(e,"[s!='']:x"),m.push("!=",B)})),v=v.length&&new RegExp(v.join("|")),m=m.length&&new RegExp(m.join("|")),t=K.test(h.compareDocumentPosition),b=t||K.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return d=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)==(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e==p||e.ownerDocument==w&&b(w,e)?-1:t==p||t.ownerDocument==w&&b(w,t)?1:u?O(u,e)-O(u,t):0:4&r?-1:1)}:function(e,t){if(e===t)return d=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e==p?-1:t==p?1:i?-1:o?1:u?O(u,e)-O(u,t):0;if(i===o)return fe(e,t);for(n=e;n=n.parentNode;)a.unshift(n);for(n=t;n=n.parentNode;)s.unshift(n);for(;a[r]===s[r];)r++;return r?fe(a[r],s[r]):a[r]==w?-1:s[r]==w?1:0}),p},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if(f(e),n.matchesSelector&&g&&!I[t+" "]&&(!m||!m.test(t))&&(!v||!v.test(t)))try{var r=y.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){I(t,!0)}return 0<se(t,p,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!=p&&f(e),b(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!=p&&f(e);var i=r.attrHandle[t.toLowerCase()],o=i&&k.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,r=[],i=0,o=0;if(d=!n.detectDuplicates,u=!n.sortStable&&e.slice(0),e.sort(D),d){for(;t=e[o++];)t===e[o]&&(i=r.push(o));for(;i--;)e.splice(r[i],1)}return u=null,e},i=se.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else for(;t=e[r++];)n+=i(t);return n},(r=se.selectors={cacheLength:50,createPseudo:le,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=S[e+" "];return t||(t=new RegExp("(^|"+q+")"+e+"("+q+"|$)"))&&S(e,(function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")}))},ATTR:function(e,t,n){return function(r){var i=se.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&-1<i.indexOf(n):"$="===t?n&&i.slice(-n.length)===n:"~="===t?-1<(" "+i.replace(U," ")+" ").indexOf(n):"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,c){var l,u,d,f,p,h,g=o!==a?"nextSibling":"previousSibling",v=t.parentNode,m=s&&t.nodeName.toLowerCase(),y=!c&&!s,b=!1;if(v){if(o){for(;g;){for(f=t;f=f[g];)if(s?f.nodeName.toLowerCase()===m:1===f.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?v.firstChild:v.lastChild],a&&y){for(b=(p=(l=(u=(d=(f=v)[x]||(f[x]={}))[f.uniqueID]||(d[f.uniqueID]={}))[e]||[])[0]===C&&l[1])&&l[2],f=p&&v.childNodes[p];f=++p&&f&&f[g]||(b=p=0)||h.pop();)if(1===f.nodeType&&++b&&f===t){u[e]=[C,p,b];break}}else if(y&&(b=p=(l=(u=(d=(f=t)[x]||(f[x]={}))[f.uniqueID]||(d[f.uniqueID]={}))[e]||[])[0]===C&&l[1]),!1===b)for(;(f=++p&&f&&f[g]||(b=p=0)||h.pop())&&((s?f.nodeName.toLowerCase()!==m:1!==f.nodeType)||!++b||(y&&((u=(d=f[x]||(f[x]={}))[f.uniqueID]||(d[f.uniqueID]={}))[e]=[C,b]),f!==t)););return(b-=i)===r||b%r==0&&0<=b/r}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return i[x]?i(t):1<i.length?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?le((function(e,n){for(var r,o=i(e,t),a=o.length;a--;)e[r=O(e,o[a])]=!(n[r]=o[a])})):function(e){return i(e,0,n)}):i}},pseudos:{not:le((function(e){var t=[],n=[],r=s(e.replace(z,"$1"));return r[x]?le((function(e,t,n,i){for(var o,a=r(e,null,i,[]),s=e.length;s--;)(o=a[s])&&(e[s]=!(t[s]=o))})):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}})),has:le((function(e){return function(t){return 0<se(e,t).length}})),contains:le((function(e){return e=e.replace(te,ne),function(t){return-1<(t.textContent||i(t)).indexOf(e)}})),lang:le((function(e){return W.test(e||"")||se.error("unsupported lang: "+e),e=e.replace(te,ne).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}})),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return G.test(e.nodeName)},input:function(e){return Y.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve((function(){return[0]})),last:ve((function(e,t){return[t-1]})),eq:ve((function(e,t,n){return[n<0?n+t:n]})),even:ve((function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e})),odd:ve((function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e})),lt:ve((function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e})),gt:ve((function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e}))}}).pseudos.nth=r.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=pe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=he(t);function ye(){}function be(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function xe(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=P++;return t.first?function(t,n,i){for(;t=t[r];)if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,c){var l,u,d,f=[C,s];if(c){for(;t=t[r];)if((1===t.nodeType||a)&&e(t,n,c))return!0}else for(;t=t[r];)if(1===t.nodeType||a)if(u=(d=t[x]||(t[x]={}))[t.uniqueID]||(d[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=u[o])&&l[0]===C&&l[1]===s)return f[2]=l[2];if((u[o]=f)[2]=e(t,n,c))return!0}return!1}}function we(e){return 1<e.length?function(t,n,r){for(var i=e.length;i--;)if(!e[i](t,n,r))return!1;return!0}:e[0]}function Ce(e,t,n,r,i){for(var o,a=[],s=0,c=e.length,l=null!=t;s<c;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Pe(e,t,n,r,i,o){return r&&!r[x]&&(r=Pe(r)),i&&!i[x]&&(i=Pe(i,o)),le((function(o,a,s,c){var l,u,d,f=[],p=[],h=a.length,g=o||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(t||"*",s.nodeType?[s]:s,[]),v=!e||!o&&t?g:Ce(g,f,e,s,c),m=n?i||(o?e:h||r)?[]:a:v;if(n&&n(v,m,s,c),r)for(l=Ce(m,p),r(l,[],s,c),u=l.length;u--;)(d=l[u])&&(m[p[u]]=!(v[p[u]]=d));if(o){if(i||e){if(i){for(l=[],u=m.length;u--;)(d=m[u])&&l.push(v[u]=d);i(null,m=[],l,c)}for(u=m.length;u--;)(d=m[u])&&-1<(l=i?O(o,d):f[u])&&(o[l]=!(a[l]=d))}}else m=Ce(m===a?m.splice(h,m.length):m),i?i(null,a,m,c):N.apply(a,m)}))}function Se(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[" "],c=a?1:0,u=xe((function(e){return e===t}),s,!0),d=xe((function(e){return-1<O(t,e)}),s,!0),f=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?u(e,n,r):d(e,n,r));return t=null,i}];c<o;c++)if(n=r.relative[e[c].type])f=[xe(we(f),n)];else{if((n=r.filter[e[c].type].apply(null,e[c].matches))[x]){for(i=++c;i<o&&!r.relative[e[i].type];i++);return Pe(1<c&&we(f),1<c&&be(e.slice(0,c-1).concat({value:" "===e[c-2].type?"*":""})).replace(z,"$1"),n,c<i&&Se(e.slice(c,i)),i<o&&Se(e=e.slice(i)),i<o&&be(e))}f.push(n)}return we(f)}return ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=se.tokenize=function(e,t){var n,i,o,a,s,c,l,u=T[e+" "];if(u)return t?0:u.slice(0);for(s=e,c=[],l=r.preFilter;s;){for(a in n&&!(i=V.exec(s))||(i&&(s=s.slice(i[0].length)||s),c.push(o=[])),n=!1,(i=$.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(z," ")}),s=s.slice(n.length)),r.filter)!(i=Q[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?se.error(e):T(e,c).slice(0)},s=se.compile=function(e,t){var n,i,o,s,c,u,d=[],h=[],v=E[e+" "];if(!v){for(t||(t=a(e)),n=t.length;n--;)(v=Se(t[n]))[x]?d.push(v):h.push(v);(v=E(e,(i=h,s=0<(o=d).length,c=0<i.length,u=function(e,t,n,a,u){var d,h,v,m=0,y="0",b=e&&[],x=[],w=l,P=e||c&&r.find.TAG("*",u),S=C+=null==w?1:Math.random()||.1,T=P.length;for(u&&(l=t==p||t||u);y!==T&&null!=(d=P[y]);y++){if(c&&d){for(h=0,t||d.ownerDocument==p||(f(d),n=!g);v=i[h++];)if(v(d,t||p,n)){a.push(d);break}u&&(C=S)}s&&((d=!v&&d)&&m--,e&&b.push(d))}if(m+=y,s&&y!==m){for(h=0;v=o[h++];)v(b,x,t,n);if(e){if(0<m)for(;y--;)b[y]||x[y]||(x[y]=j.call(a));x=Ce(x)}N.apply(a,x),u&&!e&&0<x.length&&1<m+o.length&&se.uniqueSort(a)}return u&&(C=S,l=w),b},s?le(u):u))).selector=e}return v},c=se.select=function(e,t,n,i){var o,c,l,u,d,f="function"==typeof e&&e,p=!i&&a(e=f.selector||e);if(n=n||[],1===p.length){if(2<(c=p[0]=p[0].slice(0)).length&&"ID"===(l=c[0]).type&&9===t.nodeType&&g&&r.relative[c[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(te,ne),t)||[])[0]))return n;f&&(t=t.parentNode),e=e.slice(c.shift().value.length)}for(o=Q.needsContext.test(e)?0:c.length;o--&&(l=c[o],!r.relative[u=l.type]);)if((d=r.find[u])&&(i=d(l.matches[0].replace(te,ne),ee.test(c[0].type)&&me(t.parentNode)||t))){if(c.splice(o,1),!(e=i.length&&be(c)))return N.apply(n,i),n;break}}return(f||s(e,p))(i,t,!g,n,!t||ee.test(e)&&me(t.parentNode)||t),n},n.sortStable=x.split("").sort(D).join("")===x,n.detectDuplicates=!!d,f(),n.sortDetached=ue((function(e){return 1&e.compareDocumentPosition(p.createElement("fieldset"))})),ue((function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")}))||de("type|href|height|width",(function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)})),n.attributes&&ue((function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")}))||de("value",(function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue})),ue((function(e){return null==e.getAttribute("disabled")}))||de(F,(function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null})),se}(r);S.find=E,S.expr=E.selectors,S.expr[":"]=S.expr.pseudos,S.uniqueSort=S.unique=E.uniqueSort,S.text=E.getText,S.isXMLDoc=E.isXML,S.contains=E.contains,S.escapeSelector=E.escape;var I=function(e,t,n){for(var r=[],i=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(i&&S(e).is(n))break;r.push(e)}return r},D=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},k=S.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var j=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function H(e,t,n){return m(t)?S.grep(e,(function(e,r){return!!t.call(e,r,e)!==n})):t.nodeType?S.grep(e,(function(e){return e===t!==n})):"string"!=typeof t?S.grep(e,(function(e){return-1<u.call(t,e)!==n})):S.filter(t,e,n)}S.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?S.find.matchesSelector(r,e)?[r]:[]:S.find.matches(e,S.grep(t,(function(e){return 1===e.nodeType})))},S.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(S(e).filter((function(){for(t=0;t<r;t++)if(S.contains(i[t],this))return!0})));for(n=this.pushStack([]),t=0;t<r;t++)S.find(e,i[t],n);return 1<r?S.uniqueSort(n):n},filter:function(e){return this.pushStack(H(this,e||[],!1))},not:function(e){return this.pushStack(H(this,e||[],!0))},is:function(e){return!!H(this,"string"==typeof e&&k.test(e)?S(e):e||[],!1).length}});var N,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(S.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||N,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof S?t[0]:t,S.merge(this,S.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:b,!0)),j.test(r[1])&&S.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=b.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(S):S.makeArray(e,this)}).prototype=S.fn,N=S(b);var O=/^(?:parents|prev(?:Until|All))/,F={children:!0,contents:!0,next:!0,prev:!0};function q(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}S.fn.extend({has:function(e){var t=S(e,this),n=t.length;return this.filter((function(){for(var e=0;e<n;e++)if(S.contains(this,t[e]))return!0}))},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&S(e);if(!k.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&S.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?S.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(S(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(S.uniqueSort(S.merge(this.get(),S(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),S.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return I(e,"parentNode")},parentsUntil:function(e,t,n){return I(e,"parentNode",n)},next:function(e){return q(e,"nextSibling")},prev:function(e){return q(e,"previousSibling")},nextAll:function(e){return I(e,"nextSibling")},prevAll:function(e){return I(e,"previousSibling")},nextUntil:function(e,t,n){return I(e,"nextSibling",n)},prevUntil:function(e,t,n){return I(e,"previousSibling",n)},siblings:function(e){return D((e.parentNode||{}).firstChild,e)},children:function(e){return D(e.firstChild)},contents:function(e){return null!=e.contentDocument&&a(e.contentDocument)?e.contentDocument:(A(e,"template")&&(e=e.content||e),S.merge([],e.childNodes))}},(function(e,t){S.fn[e]=function(n,r){var i=S.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=S.filter(r,i)),1<this.length&&(F[e]||S.uniqueSort(i),O.test(e)&&i.reverse()),this.pushStack(i)}}));var R=/[^\x20\t\r\n\f]+/g;function M(e){return e}function B(e){throw e}function U(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}S.Callbacks=function(e){var t,n;e="string"==typeof e?(t=e,n={},S.each(t.match(R)||[],(function(e,t){n[t]=!0})),n):S.extend({},e);var r,i,o,a,s=[],c=[],l=-1,u=function(){for(a=a||e.once,o=r=!0;c.length;l=-1)for(i=c.shift();++l<s.length;)!1===s[l].apply(i[0],i[1])&&e.stopOnFalse&&(l=s.length,i=!1);e.memory||(i=!1),r=!1,a&&(s=i?[]:"")},d={add:function(){return s&&(i&&!r&&(l=s.length-1,c.push(i)),function t(n){S.each(n,(function(n,r){m(r)?e.unique&&d.has(r)||s.push(r):r&&r.length&&"string"!==C(r)&&t(r)}))}(arguments),i&&!r&&u()),this},remove:function(){return S.each(arguments,(function(e,t){for(var n;-1<(n=S.inArray(t,s,n));)s.splice(n,1),n<=l&&l--})),this},has:function(e){return e?-1<S.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=c=[],s=i="",this},disabled:function(){return!s},lock:function(){return a=c=[],i||r||(s=i=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],c.push(t),r||u()),this},fire:function(){return d.fireWith(this,arguments),this},fired:function(){return!!o}};return d},S.extend({Deferred:function(e){var t=[["notify","progress",S.Callbacks("memory"),S.Callbacks("memory"),2],["resolve","done",S.Callbacks("once memory"),S.Callbacks("once memory"),0,"resolved"],["reject","fail",S.Callbacks("once memory"),S.Callbacks("once memory"),1,"rejected"]],n="pending",i={state:function(){return n},always:function(){return o.done(arguments).fail(arguments),this},catch:function(e){return i.then(null,e)},pipe:function(){var e=arguments;return S.Deferred((function(n){S.each(t,(function(t,r){var i=m(e[r[4]])&&e[r[4]];o[r[1]]((function(){var e=i&&i.apply(this,arguments);e&&m(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this,i?[e]:arguments)}))})),e=null})).promise()},then:function(e,n,i){var o=0;function a(e,t,n,i){return function(){var s=this,c=arguments,l=function(){var r,l;if(!(e<o)){if((r=n.apply(s,c))===t.promise())throw new TypeError("Thenable self-resolution");l=r&&("object"==typeof r||"function"==typeof r)&&r.then,m(l)?i?l.call(r,a(o,t,M,i),a(o,t,B,i)):(o++,l.call(r,a(o,t,M,i),a(o,t,B,i),a(o,t,M,t.notifyWith))):(n!==M&&(s=void 0,c=[r]),(i||t.resolveWith)(s,c))}},u=i?l:function(){try{l()}catch(r){S.Deferred.exceptionHook&&S.Deferred.exceptionHook(r,u.stackTrace),o<=e+1&&(n!==B&&(s=void 0,c=[r]),t.rejectWith(s,c))}};e?u():(S.Deferred.getStackHook&&(u.stackTrace=S.Deferred.getStackHook()),r.setTimeout(u))}}return S.Deferred((function(r){t[0][3].add(a(0,r,m(i)?i:M,r.notifyWith)),t[1][3].add(a(0,r,m(e)?e:M)),t[2][3].add(a(0,r,m(n)?n:B))})).promise()},promise:function(e){return null!=e?S.extend(e,i):i}},o={};return S.each(t,(function(e,r){var a=r[2],s=r[5];i[r[1]]=a.add,s&&a.add((function(){n=s}),t[3-e][2].disable,t[3-e][3].disable,t[0][2].lock,t[0][3].lock),a.add(r[3].fire),o[r[0]]=function(){return o[r[0]+"With"](this===o?void 0:this,arguments),this},o[r[0]+"With"]=a.fireWith})),i.promise(o),e&&e.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=s.call(arguments),o=S.Deferred(),a=function(e){return function(n){r[e]=this,i[e]=1<arguments.length?s.call(arguments):n,--t||o.resolveWith(r,i)}};if(t<=1&&(U(e,o.done(a(n)).resolve,o.reject,!t),"pending"===o.state()||m(i[n]&&i[n].then)))return o.then();for(;n--;)U(i[n],a(n),o.reject);return o.promise()}});var z=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;S.Deferred.exceptionHook=function(e,t){r.console&&r.console.warn&&e&&z.test(e.name)&&r.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},S.readyException=function(e){r.setTimeout((function(){throw e}))};var V=S.Deferred();function $(){b.removeEventListener("DOMContentLoaded",$),r.removeEventListener("load",$),S.ready()}S.fn.ready=function(e){return V.then(e).catch((function(e){S.readyException(e)})),this},S.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--S.readyWait:S.isReady)||(S.isReady=!0)!==e&&0<--S.readyWait||V.resolveWith(b,[S])}}),S.ready.then=V.then,"complete"===b.readyState||"loading"!==b.readyState&&!b.documentElement.doScroll?r.setTimeout(S.ready):(b.addEventListener("DOMContentLoaded",$),r.addEventListener("load",$));var _=function(e,t,n,r,i,o,a){var s=0,c=e.length,l=null==n;if("object"===C(n))for(s in i=!0,n)_(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(S(e),n)})),t))for(;s<c;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):c?t(e[0],n):o},X=/^-ms-/,W=/-([a-z])/g;function Q(e,t){return t.toUpperCase()}function J(e){return e.replace(X,"ms-").replace(W,Q)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function G(){this.expando=S.expando+G.uid++}G.uid=1,G.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[J(t)]=n;else for(r in t)i[J(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][J(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(J):(t=J(t))in r?[t]:t.match(R)||[]).length;for(;n--;)delete r[t[n]]}(void 0===t||S.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!S.isEmptyObject(t)}};var K=new G,Z=new G,ee=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,te=/[A-Z]/g;function ne(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(te,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:ee.test(i)?JSON.parse(i):i)}catch(e){}Z.set(e,t,n)}else n=void 0;return n}S.extend({hasData:function(e){return Z.hasData(e)||K.hasData(e)},data:function(e,t,n){return Z.access(e,t,n)},removeData:function(e,t){Z.remove(e,t)},_data:function(e,t,n){return K.access(e,t,n)},_removeData:function(e,t){K.remove(e,t)}}),S.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=Z.get(o),1===o.nodeType&&!K.get(o,"hasDataAttrs"))){for(n=a.length;n--;)a[n]&&0===(r=a[n].name).indexOf("data-")&&(r=J(r.slice(5)),ne(o,r,i[r]));K.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each((function(){Z.set(this,e)})):_(this,(function(t){var n;if(o&&void 0===t)return void 0!==(n=Z.get(o,e))||void 0!==(n=ne(o,e))?n:void 0;this.each((function(){Z.set(this,e,t)}))}),null,t,1<arguments.length,null,!0)},removeData:function(e){return this.each((function(){Z.remove(this,e)}))}}),S.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=K.get(e,t),n&&(!r||Array.isArray(n)?r=K.access(e,t,S.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=S.queue(e,t),r=n.length,i=n.shift(),o=S._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,(function(){S.dequeue(e,t)}),o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return K.get(e,n)||K.access(e,n,{empty:S.Callbacks("once memory").add((function(){K.remove(e,[t+"queue",n])}))})}}),S.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?S.queue(this[0],e):void 0===t?this:this.each((function(){var n=S.queue(this,e,t);S._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&S.dequeue(this,e)}))},dequeue:function(e){return this.each((function(){S.dequeue(this,e)}))},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=S.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)(n=K.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+re+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],ae=b.documentElement,se=function(e){return S.contains(e.ownerDocument,e)},ce={composed:!0};ae.getRootNode&&(se=function(e){return S.contains(e.ownerDocument,e)||e.getRootNode(ce)===e.ownerDocument});var le=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&se(e)&&"none"===S.css(e,"display")};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return S.css(e,t,"")},c=s(),l=n&&n[3]||(S.cssNumber[t]?"":"px"),u=e.nodeType&&(S.cssNumber[t]||"px"!==l&&+c)&&ie.exec(S.css(e,t));if(u&&u[3]!==l){for(c/=2,l=l||u[3],u=+c||1;a--;)S.style(e,t,u+l),(1-o)*(1-(o=s()/c||.5))<=0&&(a=0),u/=o;u*=2,S.style(e,t,u+l),n=n||[]}return n&&(u=+u||+c||0,i=n[1]?u+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=u,r.end=i)),i}var de={};function fe(e,t){for(var n,r,i,o,a,s,c,l=[],u=0,d=e.length;u<d;u++)(r=e[u]).style&&(n=r.style.display,t?("none"===n&&(l[u]=K.get(r,"display")||null,l[u]||(r.style.display="")),""===r.style.display&&le(r)&&(l[u]=(c=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(c=de[s])||(o=a.body.appendChild(a.createElement(s)),c=S.css(o,"display"),o.parentNode.removeChild(o),"none"===c&&(c="block"),de[s]=c)))):"none"!==n&&(l[u]="none",K.set(r,"display",n)));for(u=0;u<d;u++)null!=l[u]&&(e[u].style.display=l[u]);return e}S.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each((function(){le(this)?S(this).show():S(this).hide()}))}});var pe,he,ge=/^(?:checkbox|radio)$/i,ve=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,me=/^$|^module$|\/(?:java|ecma)script/i;pe=b.createDocumentFragment().appendChild(b.createElement("div")),(he=b.createElement("input")).setAttribute("type","radio"),he.setAttribute("checked","checked"),he.setAttribute("name","t"),pe.appendChild(he),v.checkClone=pe.cloneNode(!0).cloneNode(!0).lastChild.checked,pe.innerHTML="<textarea>x</textarea>",v.noCloneChecked=!!pe.cloneNode(!0).lastChild.defaultValue,pe.innerHTML="<option></option>",v.option=!!pe.lastChild;var ye={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function be(e,t){var n;return n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?S.merge([e],n):n}function xe(e,t){for(var n=0,r=e.length;n<r;n++)K.set(e[n],"globalEval",!t||K.get(t[n],"globalEval"))}ye.tbody=ye.tfoot=ye.colgroup=ye.caption=ye.thead,ye.th=ye.td,v.option||(ye.optgroup=ye.option=[1,"<select multiple='multiple'>","</select>"]);var we=/<|&#?\w+;/;function Ce(e,t,n,r,i){for(var o,a,s,c,l,u,d=t.createDocumentFragment(),f=[],p=0,h=e.length;p<h;p++)if((o=e[p])||0===o)if("object"===C(o))S.merge(f,o.nodeType?[o]:o);else if(we.test(o)){for(a=a||d.appendChild(t.createElement("div")),s=(ve.exec(o)||["",""])[1].toLowerCase(),c=ye[s]||ye._default,a.innerHTML=c[1]+S.htmlPrefilter(o)+c[2],u=c[0];u--;)a=a.lastChild;S.merge(f,a.childNodes),(a=d.firstChild).textContent=""}else f.push(t.createTextNode(o));for(d.textContent="",p=0;o=f[p++];)if(r&&-1<S.inArray(o,r))i&&i.push(o);else if(l=se(o),a=be(d.appendChild(o),"script"),l&&xe(a),n)for(u=0;o=a[u++];)me.test(o.type||"")&&n.push(o);return d}var Pe=/^key/,Se=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Te=/^([^.]*)(?:\.(.+)|)/;function Ee(){return!0}function Ie(){return!1}function De(e,t){return e===function(){try{return b.activeElement}catch(e){}}()==("focus"===t)}function ke(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)ke(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Ie;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return S().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=S.guid++)),e.each((function(){S.event.add(this,t,i,r,n)}))}function Ae(e,t,n){n?(K.set(e,t,!1),S.event.add(e,t,{namespace:!1,handler:function(e){var r,i,o=K.get(this,t);if(1&e.isTrigger&&this[t]){if(o.length)(S.event.special[t]||{}).delegateType&&e.stopPropagation();else if(o=s.call(arguments),K.set(this,t,o),r=n(this,t),this[t](),o!==(i=K.get(this,t))||r?K.set(this,t,!1):i={},o!==i)return e.stopImmediatePropagation(),e.preventDefault(),i.value}else o.length&&(K.set(this,t,{value:S.event.trigger(S.extend(o[0],S.Event.prototype),o.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===K.get(e,t)&&S.event.add(e,t,Ee)}S.event={global:{},add:function(e,t,n,r,i){var o,a,s,c,l,u,d,f,p,h,g,v=K.get(e);if(Y(e))for(n.handler&&(n=(o=n).handler,i=o.selector),i&&S.find.matchesSelector(ae,i),n.guid||(n.guid=S.guid++),(c=v.events)||(c=v.events=Object.create(null)),(a=v.handle)||(a=v.handle=function(t){return void 0!==S&&S.event.triggered!==t.type?S.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(R)||[""]).length;l--;)p=g=(s=Te.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),p&&(d=S.event.special[p]||{},p=(i?d.delegateType:d.bindType)||p,d=S.event.special[p]||{},u=S.extend({type:p,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&S.expr.match.needsContext.test(i),namespace:h.join(".")},o),(f=c[p])||((f=c[p]=[]).delegateCount=0,d.setup&&!1!==d.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(p,a)),d.add&&(d.add.call(e,u),u.handler.guid||(u.handler.guid=n.guid)),i?f.splice(f.delegateCount++,0,u):f.push(u),S.event.global[p]=!0)},remove:function(e,t,n,r,i){var o,a,s,c,l,u,d,f,p,h,g,v=K.hasData(e)&&K.get(e);if(v&&(c=v.events)){for(l=(t=(t||"").match(R)||[""]).length;l--;)if(p=g=(s=Te.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),p){for(d=S.event.special[p]||{},f=c[p=(r?d.delegateType:d.bindType)||p]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=f.length;o--;)u=f[o],!i&&g!==u.origType||n&&n.guid!==u.guid||s&&!s.test(u.namespace)||r&&r!==u.selector&&("**"!==r||!u.selector)||(f.splice(o,1),u.selector&&f.delegateCount--,d.remove&&d.remove.call(e,u));a&&!f.length&&(d.teardown&&!1!==d.teardown.call(e,h,v.handle)||S.removeEvent(e,p,v.handle),delete c[p])}else for(p in c)S.event.remove(e,p+t[l],n,r,!0);S.isEmptyObject(c)&&K.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=new Array(arguments.length),c=S.event.fix(e),l=(K.get(this,"events")||Object.create(null))[c.type]||[],u=S.event.special[c.type]||{};for(s[0]=c,t=1;t<arguments.length;t++)s[t]=arguments[t];if(c.delegateTarget=this,!u.preDispatch||!1!==u.preDispatch.call(this,c)){for(a=S.event.handlers.call(this,c,l),t=0;(i=a[t++])&&!c.isPropagationStopped();)for(c.currentTarget=i.elem,n=0;(o=i.handlers[n++])&&!c.isImmediatePropagationStopped();)c.rnamespace&&!1!==o.namespace&&!c.rnamespace.test(o.namespace)||(c.handleObj=o,c.data=o.data,void 0!==(r=((S.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,s))&&!1===(c.result=r)&&(c.preventDefault(),c.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,c),c.result}},handlers:function(e,t){var n,r,i,o,a,s=[],c=t.delegateCount,l=e.target;if(c&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<c;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<S(i,this).index(l):S.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,c<t.length&&s.push({elem:l,handlers:t.slice(c)}),s},addProp:function(e,t){Object.defineProperty(S.Event.prototype,e,{enumerable:!0,configurable:!0,get:m(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[S.expando]?e:new S.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return ge.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click",Ee),!1},trigger:function(e){var t=this||e;return ge.test(t.type)&&t.click&&A(t,"input")&&Ae(t,"click"),!0},_default:function(e){var t=e.target;return ge.test(t.type)&&t.click&&A(t,"input")&&K.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},S.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},S.Event=function(e,t){if(!(this instanceof S.Event))return new S.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:Ie,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&S.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[S.expando]=!0},S.Event.prototype={constructor:S.Event,isDefaultPrevented:Ie,isPropagationStopped:Ie,isImmediatePropagationStopped:Ie,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},S.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Pe.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Se.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},S.event.addProp),S.each({focus:"focusin",blur:"focusout"},(function(e,t){S.event.special[e]={setup:function(){return Ae(this,e,De),!1},trigger:function(){return Ae(this,e),!0},delegateType:t}})),S.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},(function(e,t){S.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=e.relatedTarget,i=e.handleObj;return r&&(r===this||S.contains(this,r))||(e.type=i.origType,n=i.handler.apply(this,arguments),e.type=t),n}}})),S.fn.extend({on:function(e,t,n,r){return ke(this,e,t,n,r)},one:function(e,t,n,r){return ke(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,S(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Ie),this.each((function(){S.event.remove(this,e,n,t)}))}});var je=/<script|<style|<link/i,He=/checked\s*(?:[^=]|=\s*.checked.)/i,Ne=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&S(e).children("tbody")[0]||e}function Oe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Fe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function qe(e,t){var n,r,i,o,a,s;if(1===t.nodeType){if(K.hasData(e)&&(s=K.get(e).events))for(i in K.remove(t,"handle events"),s)for(n=0,r=s[i].length;n<r;n++)S.event.add(t,i,s[i][n]);Z.hasData(e)&&(o=Z.access(e),a=S.extend({},o),Z.set(t,a))}}function Re(e,t,n,r){t=c(t);var i,o,a,s,l,u,d=0,f=e.length,p=f-1,h=t[0],g=m(h);if(g||1<f&&"string"==typeof h&&!v.checkClone&&He.test(h))return e.each((function(i){var o=e.eq(i);g&&(t[0]=h.call(this,i,o.html())),Re(o,t,n,r)}));if(f&&(o=(i=Ce(t,e[0].ownerDocument,!1,e,r)).firstChild,1===i.childNodes.length&&(i=o),o||r)){for(s=(a=S.map(be(i,"script"),Oe)).length;d<f;d++)l=i,d!==p&&(l=S.clone(l,!0,!0),s&&S.merge(a,be(l,"script"))),n.call(e[d],l,d);if(s)for(u=a[a.length-1].ownerDocument,S.map(a,Fe),d=0;d<s;d++)l=a[d],me.test(l.type||"")&&!K.access(l,"globalEval")&&S.contains(u,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?S._evalUrl&&!l.noModule&&S._evalUrl(l.src,{nonce:l.nonce||l.getAttribute("nonce")},u):w(l.textContent.replace(Ne,""),l,u))}return e}function Me(e,t,n){for(var r,i=t?S.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||S.cleanData(be(r)),r.parentNode&&(n&&se(r)&&xe(be(r,"script")),r.parentNode.removeChild(r));return e}S.extend({htmlPrefilter:function(e){return e},clone:function(e,t,n){var r,i,o,a,s,c,l,u=e.cloneNode(!0),d=se(e);if(!(v.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||S.isXMLDoc(e)))for(a=be(u),r=0,i=(o=be(e)).length;r<i;r++)s=o[r],"input"===(l=(c=a[r]).nodeName.toLowerCase())&&ge.test(s.type)?c.checked=s.checked:"input"!==l&&"textarea"!==l||(c.defaultValue=s.defaultValue);if(t)if(n)for(o=o||be(e),a=a||be(u),r=0,i=o.length;r<i;r++)qe(o[r],a[r]);else qe(e,u);return 0<(a=be(u,"script")).length&&xe(a,!d&&be(e,"script")),u},cleanData:function(e){for(var t,n,r,i=S.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[K.expando]){if(t.events)for(r in t.events)i[r]?S.event.remove(n,r):S.removeEvent(n,r,t.handle);n[K.expando]=void 0}n[Z.expando]&&(n[Z.expando]=void 0)}}}),S.fn.extend({detach:function(e){return Me(this,e,!0)},remove:function(e){return Me(this,e)},text:function(e){return _(this,(function(e){return void 0===e?S.text(this):this.empty().each((function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)}))}),null,e,arguments.length)},append:function(){return Re(this,arguments,(function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)}))},prepend:function(){return Re(this,arguments,(function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}}))},before:function(){return Re(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this)}))},after:function(){return Re(this,arguments,(function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)}))},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(S.cleanData(be(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map((function(){return S.clone(this,e,t)}))},html:function(e){return _(this,(function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!je.test(e)&&!ye[(ve.exec(e)||["",""])[1].toLowerCase()]){e=S.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(S.cleanData(be(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)}),null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,(function(t){var n=this.parentNode;S.inArray(this,e)<0&&(S.cleanData(be(this)),n&&n.replaceChild(t,this))}),e)}}),S.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},(function(e,t){S.fn[e]=function(e){for(var n,r=[],i=S(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),S(i[a])[t](n),l.apply(r,n.get());return this.pushStack(r)}}));var Be=new RegExp("^("+re+")(?!px)[a-z%]+$","i"),Ue=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=r),t.getComputedStyle(e)},ze=function(e,t,n){var r,i,o={};for(i in t)o[i]=e.style[i],e.style[i]=t[i];for(i in r=n.call(e),t)e.style[i]=o[i];return r},Ve=new RegExp(oe.join("|"),"i");function $e(e,t,n){var r,i,o,a,s=e.style;return(n=n||Ue(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||se(e)||(a=S.style(e,t)),!v.pixelBoxStyles()&&Be.test(a)&&Ve.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ae.appendChild(l).appendChild(u);var e=r.getComputedStyle(u);n="1%"!==e.top,c=12===t(e.marginLeft),u.style.right="60%",a=36===t(e.right),i=36===t(e.width),u.style.position="absolute",o=12===t(u.offsetWidth/3),ae.removeChild(l),u=null}}function t(e){return Math.round(parseFloat(e))}var n,i,o,a,s,c,l=b.createElement("div"),u=b.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",v.clearCloneStyle="content-box"===u.style.backgroundClip,S.extend(v,{boxSizingReliable:function(){return e(),i},pixelBoxStyles:function(){return e(),a},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),c},scrollboxSize:function(){return e(),o},reliableTrDimensions:function(){var e,t,n,i;return null==s&&(e=b.createElement("table"),t=b.createElement("tr"),n=b.createElement("div"),e.style.cssText="position:absolute;left:-11111px",t.style.height="1px",n.style.height="9px",ae.appendChild(e).appendChild(t).appendChild(n),i=r.getComputedStyle(t),s=3<parseInt(i.height),ae.removeChild(e)),s}}))}();var Xe=["Webkit","Moz","ms"],We=b.createElement("div").style,Qe={};function Je(e){return S.cssProps[e]||Qe[e]||(e in We?e:Qe[e]=function(e){for(var t=e[0].toUpperCase()+e.slice(1),n=Xe.length;n--;)if((e=Xe[n]+t)in We)return e}(e)||e)}var Ye=/^(none|table(?!-c[ea]).+)/,Ge=/^--/,Ke={position:"absolute",visibility:"hidden",display:"block"},Ze={letterSpacing:"0",fontWeight:"400"};function et(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function tt(e,t,n,r,i,o){var a="width"===t?1:0,s=0,c=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(c+=S.css(e,n+oe[a],!0,i)),r?("content"===n&&(c-=S.css(e,"padding"+oe[a],!0,i)),"margin"!==n&&(c-=S.css(e,"border"+oe[a]+"Width",!0,i))):(c+=S.css(e,"padding"+oe[a],!0,i),"padding"!==n?c+=S.css(e,"border"+oe[a]+"Width",!0,i):s+=S.css(e,"border"+oe[a]+"Width",!0,i));return!r&&0<=o&&(c+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-c-s-.5))||0),c}function nt(e,t,n){var r=Ue(e),i=(!v.boxSizingReliable()||n)&&"border-box"===S.css(e,"boxSizing",!1,r),o=i,a=$e(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if(Be.test(a)){if(!n)return a;a="auto"}return(!v.boxSizingReliable()&&i||!v.reliableTrDimensions()&&A(e,"tr")||"auto"===a||!parseFloat(a)&&"inline"===S.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===S.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+tt(e,t,n||(i?"border":"content"),o,r,a)+"px"}function rt(e,t,n,r,i){return new rt.prototype.init(e,t,n,r,i)}S.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=$e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=J(t),c=Ge.test(t),l=e.style;if(c||(t=Je(s)),a=S.cssHooks[t]||S.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||c||(n+=i&&i[3]||(S.cssNumber[s]?"":"px")),v.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(c?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=J(t);return Ge.test(t)||(t=Je(s)),(a=S.cssHooks[t]||S.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=$e(e,t,r)),"normal"===i&&t in Ze&&(i=Ze[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),S.each(["height","width"],(function(e,t){S.cssHooks[t]={get:function(e,n,r){if(n)return!Ye.test(S.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?nt(e,t,r):ze(e,Ke,(function(){return nt(e,t,r)}))},set:function(e,n,r){var i,o=Ue(e),a=!v.scrollboxSize()&&"absolute"===o.position,s=(a||r)&&"border-box"===S.css(e,"boxSizing",!1,o),c=r?tt(e,t,r,s,o):0;return s&&a&&(c-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-tt(e,t,"border",!1,o)-.5)),c&&(i=ie.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=S.css(e,t)),et(0,n,c)}}})),S.cssHooks.marginLeft=_e(v.reliableMarginLeft,(function(e,t){if(t)return(parseFloat($e(e,"marginLeft"))||e.getBoundingClientRect().left-ze(e,{marginLeft:0},(function(){return e.getBoundingClientRect().left})))+"px"})),S.each({margin:"",padding:"",border:"Width"},(function(e,t){S.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(S.cssHooks[e+t].set=et)})),S.fn.extend({css:function(e,t){return _(this,(function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Ue(e),i=t.length;a<i;a++)o[t[a]]=S.css(e,t[a],!1,r);return o}return void 0!==n?S.style(e,t,n):S.css(e,t)}),e,t,1<arguments.length)}}),((S.Tween=rt).prototype={constructor:rt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||S.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(S.cssNumber[n]?"":"px")},cur:function(){var e=rt.propHooks[this.prop];return e&&e.get?e.get(this):rt.propHooks._default.get(this)},run:function(e){var t,n=rt.propHooks[this.prop];return this.options.duration?this.pos=t=S.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rt.propHooks._default.set(this),this}}).init.prototype=rt.prototype,(rt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=S.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){S.fx.step[e.prop]?S.fx.step[e.prop](e):1!==e.elem.nodeType||!S.cssHooks[e.prop]&&null==e.elem.style[Je(e.prop)]?e.elem[e.prop]=e.now:S.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=rt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},S.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},S.fx=rt.prototype.init,S.fx.step={};var it,ot,at,st,ct=/^(?:toggle|show|hide)$/,lt=/queueHooks$/;function ut(){ot&&(!1===b.hidden&&r.requestAnimationFrame?r.requestAnimationFrame(ut):r.setTimeout(ut,S.fx.interval),S.fx.tick())}function dt(){return r.setTimeout((function(){it=void 0})),it=Date.now()}function ft(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=oe[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function pt(e,t,n){for(var r,i=(ht.tweeners[t]||[]).concat(ht.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ht(e,t,n){var r,i,o=0,a=ht.prefilters.length,s=S.Deferred().always((function(){delete c.elem})),c=function(){if(i)return!1;for(var t=it||dt(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:S.extend({},t),opts:S.extend(!0,{specialEasing:{},easing:S.easing._default},n),originalProperties:t,originalOptions:n,startTime:it||dt(),duration:n.duration,tweens:[],createTween:function(t,n){var r=S.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),u=l.props;for(function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=J(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=S.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(u,l.opts.specialEasing);o<a;o++)if(r=ht.prefilters[o].call(l,e,u,l.opts))return m(r.stop)&&(S._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return S.map(u,pt,l),m(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),S.fx.timer(S.extend(c,{elem:e,anim:l,queue:l.opts.queue})),l}S.Animation=S.extend(ht,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(R);for(var n,r=0,i=e.length;r<i;r++)n=e[r],ht.tweeners[n]=ht.tweeners[n]||[],ht.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,c,l,u,d="width"in t||"height"in t,f=this,p={},h=e.style,g=e.nodeType&&le(e),v=K.get(e,"fxshow");for(r in n.queue||(null==(a=S._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,f.always((function(){f.always((function(){a.unqueued--,S.queue(e,"fx").length||a.empty.fire()}))}))),t)if(i=t[r],ct.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}p[r]=v&&v[r]||S.style(e,r)}if((c=!S.isEmptyObject(t))||!S.isEmptyObject(p))for(r in d&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=K.get(e,"display")),"none"===(u=S.css(e,"display"))&&(l?u=l:(fe([e],!0),l=e.style.display||l,u=S.css(e,"display"),fe([e]))),("inline"===u||"inline-block"===u&&null!=l)&&"none"===S.css(e,"float")&&(c||(f.done((function(){h.display=l})),null==l&&(u=h.display,l="none"===u?"":u)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",f.always((function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]}))),c=!1,p)c||(v?"hidden"in v&&(g=v.hidden):v=K.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&fe([e],!0),f.done((function(){for(r in g||fe([e]),K.remove(e,"fxshow"),p)S.style(e,r,p[r])}))),c=pt(g?v[r]:0,r,f),r in v||(v[r]=c.start,g&&(c.end=c.start,c.start=0))}],prefilter:function(e,t){t?ht.prefilters.unshift(e):ht.prefilters.push(e)}}),S.speed=function(e,t,n){var r=e&&"object"==typeof e?S.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return S.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in S.fx.speeds?r.duration=S.fx.speeds[r.duration]:r.duration=S.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&S.dequeue(this,r.queue)},r},S.fn.extend({fadeTo:function(e,t,n,r){return this.filter(le).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=S.isEmptyObject(e),o=S.speed(t,n,r),a=function(){var t=ht(this,S.extend({},e),o);(i||K.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&this.queue(e||"fx",[]),this.each((function(){var t=!0,i=null!=e&&e+"queueHooks",o=S.timers,a=K.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&lt.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||S.dequeue(this,e)}))},finish:function(e){return!1!==e&&(e=e||"fx"),this.each((function(){var t,n=K.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=S.timers,a=r?r.length:0;for(n.finish=!0,S.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish}))}}),S.each(["toggle","show","hide"],(function(e,t){var n=S.fn[t];S.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ft(t,!0),e,r,i)}})),S.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},(function(e,t){S.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}})),S.timers=[],S.fx.tick=function(){var e,t=0,n=S.timers;for(it=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||S.fx.stop(),it=void 0},S.fx.timer=function(e){S.timers.push(e),S.fx.start()},S.fx.interval=13,S.fx.start=function(){ot||(ot=!0,ut())},S.fx.stop=function(){ot=null},S.fx.speeds={slow:600,fast:200,_default:400},S.fn.delay=function(e,t){return e=S.fx&&S.fx.speeds[e]||e,t=t||"fx",this.queue(t,(function(t,n){var i=r.setTimeout(t,e);n.stop=function(){r.clearTimeout(i)}}))},at=b.createElement("input"),st=b.createElement("select").appendChild(b.createElement("option")),at.type="checkbox",v.checkOn=""!==at.value,v.optSelected=st.selected,(at=b.createElement("input")).value="t",at.type="radio",v.radioValue="t"===at.value;var gt,vt=S.expr.attrHandle;S.fn.extend({attr:function(e,t){return _(this,S.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each((function(){S.removeAttr(this,e)}))}}),S.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return void 0===e.getAttribute?S.prop(e,t,n):(1===o&&S.isXMLDoc(e)||(i=S.attrHooks[t.toLowerCase()]||(S.expr.match.bool.test(t)?gt:void 0)),void 0!==n?null===n?void S.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=S.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!v.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(R);if(i&&1===e.nodeType)for(;n=i[r++];)e.removeAttribute(n)}}),gt={set:function(e,t,n){return!1===t?S.removeAttr(e,n):e.setAttribute(n,n),n}},S.each(S.expr.match.bool.source.match(/\w+/g),(function(e,t){var n=vt[t]||S.find.attr;vt[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=vt[a],vt[a]=i,i=null!=n(e,t,r)?a:null,vt[a]=o),i}}));var mt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;function bt(e){return(e.match(R)||[]).join(" ")}function xt(e){return e.getAttribute&&e.getAttribute("class")||""}function wt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}S.fn.extend({prop:function(e,t){return _(this,S.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each((function(){delete this[S.propFix[e]||e]}))}}),S.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&S.isXMLDoc(e)||(t=S.propFix[t]||t,i=S.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=S.find.attr(e,"tabindex");return t?parseInt(t,10):mt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),v.optSelected||(S.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),S.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],(function(){S.propFix[this.toLowerCase()]=this})),S.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,c=0;if(m(e))return this.each((function(t){S(this).addClass(e.call(this,t,xt(this)))}));if((t=wt(e)).length)for(;n=this[c++];)if(i=xt(n),r=1===n.nodeType&&" "+bt(i)+" "){for(a=0;o=t[a++];)r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=bt(r))&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,c=0;if(m(e))return this.each((function(t){S(this).removeClass(e.call(this,t,xt(this)))}));if(!arguments.length)return this.attr("class","");if((t=wt(e)).length)for(;n=this[c++];)if(i=xt(n),r=1===n.nodeType&&" "+bt(i)+" "){for(a=0;o=t[a++];)for(;-1<r.indexOf(" "+o+" ");)r=r.replace(" "+o+" "," ");i!==(s=bt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):m(e)?this.each((function(n){S(this).toggleClass(e.call(this,n,xt(this),t),t)})):this.each((function(){var t,i,o,a;if(r)for(i=0,o=S(this),a=wt(e);t=a[i++];)o.hasClass(t)?o.removeClass(t):o.addClass(t);else void 0!==e&&"boolean"!==n||((t=xt(this))&&K.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":K.get(this,"__className__")||""))}))},hasClass:function(e){var t,n,r=0;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&-1<(" "+bt(xt(n))+" ").indexOf(t))return!0;return!1}});var Ct=/\r/g;S.fn.extend({val:function(e){var t,n,r,i=this[0];return arguments.length?(r=m(e),this.each((function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,S(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=S.map(i,(function(e){return null==e?"":e+""}))),(t=S.valHooks[this.type]||S.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))}))):i?(t=S.valHooks[i.type]||S.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(Ct,""):null==n?"":n:void 0}}),S.extend({valHooks:{option:{get:function(e){var t=S.find.attr(e,"value");return null!=t?t:bt(S.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],c=a?o+1:i.length;for(r=o<0?c:a?o:0;r<c;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=S(n).val(),a)return t;s.push(t)}return s},set:function(e,t){for(var n,r,i=e.options,o=S.makeArray(t),a=i.length;a--;)((r=i[a]).selected=-1<S.inArray(S.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),S.each(["radio","checkbox"],(function(){S.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<S.inArray(S(e).val(),t)}},v.checkOn||(S.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})})),v.focusin="onfocusin"in r;var Pt=/^(?:focusinfocus|focusoutblur)$/,St=function(e){e.stopPropagation()};S.extend(S.event,{trigger:function(e,t,n,i){var o,a,s,c,l,u,d,f,h=[n||b],g=p.call(e,"type")?e.type:e,v=p.call(e,"namespace")?e.namespace.split("."):[];if(a=f=s=n=n||b,3!==n.nodeType&&8!==n.nodeType&&!Pt.test(g+S.event.triggered)&&(-1<g.indexOf(".")&&(g=(v=g.split(".")).shift(),v.sort()),l=g.indexOf(":")<0&&"on"+g,(e=e[S.expando]?e:new S.Event(g,"object"==typeof e&&e)).isTrigger=i?2:3,e.namespace=v.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+v.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:S.makeArray(t,[e]),d=S.event.special[g]||{},i||!d.trigger||!1!==d.trigger.apply(n,t))){if(!i&&!d.noBubble&&!y(n)){for(c=d.delegateType||g,Pt.test(c+g)||(a=a.parentNode);a;a=a.parentNode)h.push(a),s=a;s===(n.ownerDocument||b)&&h.push(s.defaultView||s.parentWindow||r)}for(o=0;(a=h[o++])&&!e.isPropagationStopped();)f=a,e.type=1<o?c:d.bindType||g,(u=(K.get(a,"events")||Object.create(null))[e.type]&&K.get(a,"handle"))&&u.apply(a,t),(u=l&&a[l])&&u.apply&&Y(a)&&(e.result=u.apply(a,t),!1===e.result&&e.preventDefault());return e.type=g,i||e.isDefaultPrevented()||d._default&&!1!==d._default.apply(h.pop(),t)||!Y(n)||l&&m(n[g])&&!y(n)&&((s=n[l])&&(n[l]=null),S.event.triggered=g,e.isPropagationStopped()&&f.addEventListener(g,St),n[g](),e.isPropagationStopped()&&f.removeEventListener(g,St),S.event.triggered=void 0,s&&(n[l]=s)),e.result}},simulate:function(e,t,n){var r=S.extend(new S.Event,n,{type:e,isSimulated:!0});S.event.trigger(r,null,t)}}),S.fn.extend({trigger:function(e,t){return this.each((function(){S.event.trigger(e,t,this)}))},triggerHandler:function(e,t){var n=this[0];if(n)return S.event.trigger(e,t,n,!0)}}),v.focusin||S.each({focus:"focusin",blur:"focusout"},(function(e,t){var n=function(e){S.event.simulate(t,e.target,S.event.fix(e))};S.event.special[t]={setup:function(){var r=this.ownerDocument||this.document||this,i=K.access(r,t);i||r.addEventListener(e,n,!0),K.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this.document||this,i=K.access(r,t)-1;i?K.access(r,t,i):(r.removeEventListener(e,n,!0),K.remove(r,t))}}}));var Tt=r.location,Et={guid:Date.now()},It=/\?/;S.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new r.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||S.error("Invalid XML: "+e),t};var Dt=/\[\]$/,kt=/\r?\n/g,At=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function Ht(e,t,n,r){var i;if(Array.isArray(t))S.each(t,(function(t,i){n||Dt.test(e)?r(e,i):Ht(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)}));else if(n||"object"!==C(t))r(e,t);else for(i in t)Ht(e+"["+i+"]",t[i],n,r)}S.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!S.isPlainObject(e))S.each(e,(function(){i(this.name,this.value)}));else for(n in e)Ht(n,e[n],t,i);return r.join("&")},S.fn.extend({serialize:function(){return S.param(this.serializeArray())},serializeArray:function(){return this.map((function(){var e=S.prop(this,"elements");return e?S.makeArray(e):this})).filter((function(){var e=this.type;return this.name&&!S(this).is(":disabled")&&jt.test(this.nodeName)&&!At.test(e)&&(this.checked||!ge.test(e))})).map((function(e,t){var n=S(this).val();return null==n?null:Array.isArray(n)?S.map(n,(function(e){return{name:t.name,value:e.replace(kt,"\r\n")}})):{name:t.name,value:n.replace(kt,"\r\n")}})).get()}});var Nt=/%20/g,Lt=/#.*$/,Ot=/([?&])_=[^&]*/,Ft=/^(.*?):[ \t]*([^\r\n]*)$/gm,qt=/^(?:GET|HEAD)$/,Rt=/^\/\//,Mt={},Bt={},Ut="*/".concat("*"),zt=b.createElement("a");function Vt(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(R)||[];if(m(n))for(;r=o[i++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function $t(e,t,n,r){var i={},o=e===Bt;function a(s){var c;return i[s]=!0,S.each(e[s]||[],(function(e,s){var l=s(t,n,r);return"string"!=typeof l||o||i[l]?o?!(c=l):void 0:(t.dataTypes.unshift(l),a(l),!1)})),c}return a(t.dataTypes[0])||!i["*"]&&a("*")}function _t(e,t){var n,r,i=S.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&S.extend(!0,e,r),e}zt.href=Tt.href,S.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Tt.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Ut,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":S.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_t(_t(e,S.ajaxSettings),t):_t(S.ajaxSettings,e)},ajaxPrefilter:Vt(Mt),ajaxTransport:Vt(Bt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var n,i,o,a,s,c,l,u,d,f,p=S.ajaxSetup({},t),h=p.context||p,g=p.context&&(h.nodeType||h.jquery)?S(h):S.event,v=S.Deferred(),m=S.Callbacks("once memory"),y=p.statusCode||{},x={},w={},C="canceled",P={readyState:0,getResponseHeader:function(e){var t;if(l){if(!a)for(a={};t=Ft.exec(o);)a[t[1].toLowerCase()+" "]=(a[t[1].toLowerCase()+" "]||[]).concat(t[2]);t=a[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return l?o:null},setRequestHeader:function(e,t){return null==l&&(e=w[e.toLowerCase()]=w[e.toLowerCase()]||e,x[e]=t),this},overrideMimeType:function(e){return null==l&&(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(l)P.always(e[P.status]);else for(t in e)y[t]=[y[t],e[t]];return this},abort:function(e){var t=e||C;return n&&n.abort(t),T(0,t),this}};if(v.promise(P),p.url=((e||p.url||Tt.href)+"").replace(Rt,Tt.protocol+"//"),p.type=t.method||t.type||p.method||p.type,p.dataTypes=(p.dataType||"*").toLowerCase().match(R)||[""],null==p.crossDomain){c=b.createElement("a");try{c.href=p.url,c.href=c.href,p.crossDomain=zt.protocol+"//"+zt.host!=c.protocol+"//"+c.host}catch(e){p.crossDomain=!0}}if(p.data&&p.processData&&"string"!=typeof p.data&&(p.data=S.param(p.data,p.traditional)),$t(Mt,p,t,P),l)return P;for(d in(u=S.event&&p.global)&&0==S.active++&&S.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!qt.test(p.type),i=p.url.replace(Lt,""),p.hasContent?p.data&&p.processData&&0===(p.contentType||"").indexOf("application/x-www-form-urlencoded")&&(p.data=p.data.replace(Nt,"+")):(f=p.url.slice(i.length),p.data&&(p.processData||"string"==typeof p.data)&&(i+=(It.test(i)?"&":"?")+p.data,delete p.data),!1===p.cache&&(i=i.replace(Ot,"$1"),f=(It.test(i)?"&":"?")+"_="+Et.guid+++f),p.url=i+f),p.ifModified&&(S.lastModified[i]&&P.setRequestHeader("If-Modified-Since",S.lastModified[i]),S.etag[i]&&P.setRequestHeader("If-None-Match",S.etag[i])),(p.data&&p.hasContent&&!1!==p.contentType||t.contentType)&&P.setRequestHeader("Content-Type",p.contentType),P.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Ut+"; q=0.01":""):p.accepts["*"]),p.headers)P.setRequestHeader(d,p.headers[d]);if(p.beforeSend&&(!1===p.beforeSend.call(h,P,p)||l))return P.abort();if(C="abort",m.add(p.complete),P.done(p.success),P.fail(p.error),n=$t(Bt,p,t,P)){if(P.readyState=1,u&&g.trigger("ajaxSend",[P,p]),l)return P;p.async&&0<p.timeout&&(s=r.setTimeout((function(){P.abort("timeout")}),p.timeout));try{l=!1,n.send(x,T)}catch(e){if(l)throw e;T(-1,e)}}else T(-1,"No Transport");function T(e,t,a,c){var d,f,b,x,w,C=t;l||(l=!0,s&&r.clearTimeout(s),n=void 0,o=c||"",P.readyState=0<e?4:0,d=200<=e&&e<300||304===e,a&&(x=function(e,t,n){for(var r,i,o,a,s=e.contents,c=e.dataTypes;"*"===c[0];)c.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){c.unshift(i);break}if(c[0]in n)o=c[0];else{for(i in n){if(!c[0]||e.converters[i+" "+c[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==c[0]&&c.unshift(o),n[o]}(p,P,a)),!d&&-1<S.inArray("script",p.dataTypes)&&(p.converters["text script"]=function(){}),x=function(e,t,n,r){var i,o,a,s,c,l={},u=e.dataTypes.slice();if(u[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];for(o=u.shift();o;)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!c&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),c=o,o=u.shift())if("*"===o)o=c;else if("*"!==c&&c!==o){if(!(a=l[c+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[c+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],u.unshift(s[1]));break}if(!0!==a)if(a&&e.throws)t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+c+" to "+o}}}return{state:"success",data:t}}(p,x,P,d),d?(p.ifModified&&((w=P.getResponseHeader("Last-Modified"))&&(S.lastModified[i]=w),(w=P.getResponseHeader("etag"))&&(S.etag[i]=w)),204===e||"HEAD"===p.type?C="nocontent":304===e?C="notmodified":(C=x.state,f=x.data,d=!(b=x.error))):(b=C,!e&&C||(C="error",e<0&&(e=0))),P.status=e,P.statusText=(t||C)+"",d?v.resolveWith(h,[f,C,P]):v.rejectWith(h,[P,C,b]),P.statusCode(y),y=void 0,u&&g.trigger(d?"ajaxSuccess":"ajaxError",[P,p,d?f:b]),m.fireWith(h,[P,C]),u&&(g.trigger("ajaxComplete",[P,p]),--S.active||S.event.trigger("ajaxStop")))}return P},getJSON:function(e,t,n){return S.get(e,t,n,"json")},getScript:function(e,t){return S.get(e,void 0,t,"script")}}),S.each(["get","post"],(function(e,t){S[t]=function(e,n,r,i){return m(n)&&(i=i||r,r=n,n=void 0),S.ajax(S.extend({url:e,type:t,dataType:i,data:n,success:r},S.isPlainObject(e)&&e))}})),S.ajaxPrefilter((function(e){var t;for(t in e.headers)"content-type"===t.toLowerCase()&&(e.contentType=e.headers[t]||"")})),S._evalUrl=function(e,t,n){return S.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){S.globalEval(e,t,n)}})},S.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=S(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map((function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e})).append(this)),this},wrapInner:function(e){return m(e)?this.each((function(t){S(this).wrapInner(e.call(this,t))})):this.each((function(){var t=S(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)}))},wrap:function(e){var t=m(e);return this.each((function(n){S(this).wrapAll(t?e.call(this,n):e)}))},unwrap:function(e){return this.parent(e).not("body").each((function(){S(this).replaceWith(this.childNodes)})),this}}),S.expr.pseudos.hidden=function(e){return!S.expr.pseudos.visible(e)},S.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},S.ajaxSettings.xhr=function(){try{return new r.XMLHttpRequest}catch(e){}};var Xt={0:200,1223:204},Wt=S.ajaxSettings.xhr();v.cors=!!Wt&&"withCredentials"in Wt,v.ajax=Wt=!!Wt,S.ajaxTransport((function(e){var t,n;if(v.cors||Wt&&!e.crossDomain)return{send:function(i,o){var a,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)s[a]=e.xhrFields[a];for(a in e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest"),i)s.setRequestHeader(a,i[a]);t=function(e){return function(){t&&(t=n=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Xt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=t(),n=s.onerror=s.ontimeout=t("error"),void 0!==s.onabort?s.onabort=n:s.onreadystatechange=function(){4===s.readyState&&r.setTimeout((function(){t&&n()}))},t=t("abort");try{s.send(e.hasContent&&e.data||null)}catch(i){if(t)throw i}},abort:function(){t&&t()}}})),S.ajaxPrefilter((function(e){e.crossDomain&&(e.contents.script=!1)})),S.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return S.globalEval(e),e}}}),S.ajaxPrefilter("script",(function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")})),S.ajaxTransport("script",(function(e){var t,n;if(e.crossDomain||e.scriptAttrs)return{send:function(r,i){t=S("<script>").attr(e.scriptAttrs||{}).prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),b.head.appendChild(t[0])},abort:function(){n&&n()}}}));var Qt,Jt=[],Yt=/(=)\?(?=&|$)|\?\?/;S.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Jt.pop()||S.expando+"_"+Et.guid++;return this[e]=!0,e}}),S.ajaxPrefilter("json jsonp",(function(e,t,n){var i,o,a,s=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(s||"jsonp"===e.dataTypes[0])return i=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,s?e[s]=e[s].replace(Yt,"$1"+i):!1!==e.jsonp&&(e.url+=(It.test(e.url)?"&":"?")+e.jsonp+"="+i),e.converters["script json"]=function(){return a||S.error(i+" was not called"),a[0]},e.dataTypes[0]="json",o=r[i],r[i]=function(){a=arguments},n.always((function(){void 0===o?S(r).removeProp(i):r[i]=o,e[i]&&(e.jsonpCallback=t.jsonpCallback,Jt.push(i)),a&&m(o)&&o(a[0]),a=o=void 0})),"script"})),v.createHTMLDocument=((Qt=b.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Qt.childNodes.length),S.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(v.createHTMLDocument?((r=(t=b.implementation.createHTMLDocument("")).createElement("base")).href=b.location.href,t.head.appendChild(r)):t=b),o=!n&&[],(i=j.exec(e))?[t.createElement(i[1])]:(i=Ce([e],t,o),o&&o.length&&S(o).remove(),S.merge([],i.childNodes)));var r,i,o},S.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=bt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&S.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done((function(e){o=arguments,a.html(r?S("<div>").append(S.parseHTML(e)).find(r):e)})).always(n&&function(e,t){a.each((function(){n.apply(this,o||[e.responseText,t,e])}))}),this},S.expr.pseudos.animated=function(e){return S.grep(S.timers,(function(t){return e===t.elem})).length},S.offset={setOffset:function(e,t,n){var r,i,o,a,s,c,l=S.css(e,"position"),u=S(e),d={};"static"===l&&(e.style.position="relative"),s=u.offset(),o=S.css(e,"top"),c=S.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+c).indexOf("auto")?(a=(r=u.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(c)||0),m(t)&&(t=t.call(e,n,S.extend({},s))),null!=t.top&&(d.top=t.top-s.top+a),null!=t.left&&(d.left=t.left-s.left+i),"using"in t?t.using.call(e,d):("number"==typeof d.top&&(d.top+="px"),"number"==typeof d.left&&(d.left+="px"),u.css(d))}},S.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each((function(t){S.offset.setOffset(this,e,t)}));var t,n,r=this[0];return r?r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===S.css(r,"position"))t=r.getBoundingClientRect();else{for(t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===S.css(e,"position");)e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=S(e).offset()).top+=S.css(e,"borderTopWidth",!0),i.left+=S.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-S.css(r,"marginTop",!0),left:t.left-i.left-S.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map((function(){for(var e=this.offsetParent;e&&"static"===S.css(e,"position");)e=e.offsetParent;return e||ae}))}}),S.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},(function(e,t){var n="pageYOffset"===t;S.fn[e]=function(r){return _(this,(function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i}),e,r,arguments.length)}})),S.each(["top","left"],(function(e,t){S.cssHooks[t]=_e(v.pixelPosition,(function(e,n){if(n)return n=$e(e,t),Be.test(n)?S(e).position()[t]+"px":n}))})),S.each({Height:"height",Width:"width"},(function(e,t){S.each({padding:"inner"+e,content:t,"":"outer"+e},(function(n,r){S.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===o?"margin":"border");return _(this,(function(t,n,i){var o;return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?S.css(t,n,s):S.style(t,n,i,s)}),t,a?i:void 0,a)}}))})),S.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],(function(e,t){S.fn[t]=function(e){return this.on(t,e)}})),S.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),(function(e,t){S.fn[t]=function(e,n){return 0<arguments.length?this.on(t,null,e,n):this.trigger(t)}}));var Gt=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;S.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||S.guid++,i},S.holdReady=function(e){e?S.readyWait++:S.ready(!0)},S.isArray=Array.isArray,S.parseJSON=JSON.parse,S.nodeName=A,S.isFunction=m,S.isWindow=y,S.camelCase=J,S.type=C,S.now=Date.now,S.isNumeric=function(e){var t=S.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},S.trim=function(e){return null==e?"":(e+"").replace(Gt,"")},void 0===(n=function(){return S}.apply(t,[]))||(e.exports=n);var Kt=r.jQuery,Zt=r.$;return S.noConflict=function(e){return r.$===S&&(r.$=Zt),e&&r.jQuery===S&&(r.jQuery=Kt),S},void 0===i&&(r.jQuery=r.$=S),S}))}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";function e(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function t(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(n){for(var r=1;r<arguments.length;r++){var i=null!=arguments[r]?arguments[r]:{};r%2?t(Object(i),!0).forEach((function(t){e(n,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(i,e))}))}return n}n.d(r,{default:()=>b});var o={saveFreq:!1,postUserStatistics:!1,ajax:{setFinished:void 0,contentUserData:void 0},l10n:{H5P:{fullscreen:"Fullscreen",disableFullscreen:"Disable fullscreen",download:"Download",copyrights:"Rights of use",embed:"Embed",size:"Size",showAdvanced:"Show advanced",hideAdvanced:"Hide advanced",advancedHelp:"Include this script on your website if you want dynamic sizing of the embedded content:",copyrightInformation:"Rights of use",close:"Close",title:"Title",author:"Author",year:"Year",source:"Source",license:"License",thumbnail:"Thumbnail",noCopyrights:"No copyright information available for this content.",reuse:"Reuse",reuseContent:"Reuse Content",reuseDescription:"Reuse this content.",downloadDescription:"Download this content as a H5P file.",copyrightsDescription:"View copyright information for this content.",embedDescription:"View the embed code for this content.",h5pDescription:"Visit H5P.org to check out more cool content.",contentChanged:"This content has changed since you last used it.",startingOver:"You'll be starting over.",by:"by",showMore:"Show more",showLess:"Show less",subLevel:"Sublevel",confirmDialogHeader:"Confirm action",confirmDialogBody:"Please confirm that you wish to proceed. This action is not reversible.",cancelLabel:"Cancel",confirmLabel:"Confirm",licenseU:"Undisclosed",licenseCCBY:"Attribution",licenseCCBYSA:"Attribution-ShareAlike",licenseCCBYND:"Attribution-NoDerivs",licenseCCBYNC:"Attribution-NonCommercial",licenseCCBYNCSA:"Attribution-NonCommercial-ShareAlike",licenseCCBYNCND:"Attribution-NonCommercial-NoDerivs",licenseCC40:"4.0 International",licenseCC30:"3.0 Unported",licenseCC25:"2.5 Generic",licenseCC20:"2.0 Generic",licenseCC10:"1.0 Generic",licenseGPL:"General Public License",licenseV3:"Version 3",licenseV2:"Version 2",licenseV1:"Version 1",licensePD:"Public Domain",licenseCC010:"CC0 1.0 Universal (CC0 1.0) Public Domain Dedication",licensePDM:"Public Domain Mark",licenseC:"Copyright",contentType:"Content Type",licenseExtras:"License Extras",changes:"Changelog",contentCopied:"Content is copied to the clipboard",connectionLost:"Connection lost. Results will be stored and sent when you regain connection.",connectionReestablished:"Connection reestablished.",resubmitScores:"Attempting to submit stored results.",offlineDialogHeader:"Your connection to the server was lost",offlineDialogBody:"We were unable to send information about your completion of this task. Please check your internet connection.",offlineDialogRetryMessage:"Retrying in :num....",offlineDialogRetryButtonLabel:"Retry now",offlineSuccessfulSubmit:"Successfully submitted results."}}};function a(e,t,n,r,i,o,a){try{var s=e[o](a),c=s.value}catch(e){return void n(e)}s.done?t(c):Promise.resolve(c).then(r,i)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function s(e){a(o,r,i,s,c,"next",e)}function c(e){a(o,r,i,s,c,"throw",e)}s(void 0)}))}}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}window.H5PIntegration=window.H5PIntegration?i(i({},window.H5PIntegration),o):o;var l=n(757),u=n.n(l),d=n(295),f=n.n(d),p=n(357),h=n.n(p),g=window.H5P=window.H5P||{};g.jQuery=h().noConflict(!0),g.jQuery.fn.__originalLoad=g.jQuery.load,g.jQuery.fn.load=function(e,t,n){if("function"==typeof e){console.warn("You are using a deprecated H5P library. Please upgrade!");let e=Array.prototype.slice.call(arguments);return e.unshift("load"),g.jQuery.fn.on.apply(this,e)}return g.jQuery.fn.__originalLoad.apply(this,arguments)},g.isFramed=window.self!==window.parent,g.$window=g.jQuery(window),g.instances=[],document.documentElement.requestFullScreen?g.fullScreenBrowserPrefix="":document.documentElement.webkitRequestFullScreen?(g.safariBrowser=navigator.userAgent.match(/version\/([.\d]+)/i),g.safariBrowser=null===g.safariBrowser?0:parseInt(g.safariBrowser[1]),(0===g.safariBrowser||g.safariBrowser>6)&&(g.fullScreenBrowserPrefix="webkit")):document.documentElement.mozRequestFullScreen?g.fullScreenBrowserPrefix="moz":document.documentElement.msRequestFullscreen&&(g.fullScreenBrowserPrefix="ms"),g.opened={},g.init=function(e){void 0===g.$body&&(g.$body=g.jQuery(document.body)),void 0===g.fullscreenSupported&&(g.fullscreenSupported=!(H5PIntegration.fullscreenDisabled||g.fullscreenDisabled||g.isFramed&&!1!==g.externalEmbed&&!(document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled))),void 0===g.canHasFullScreen&&(g.canHasFullScreen=g.fullscreenSupported),g.jQuery(".h5p-content:not(.h5p-initialized)",e).each((function(){var e=g.jQuery(this).addClass("h5p-initialized"),t=g.jQuery('<div class="h5p-container"></div>').appendTo(e),n=e.data("content-id"),r=H5PIntegration.contents["cid-"+n];if(void 0===r)return g.error("No data for content id "+n+". Perhaps the library is gone?");var i={library:r.library,params:JSON.parse(r.jsonContent),metadata:r.metadata};g.getUserData(n,"state",(function(e,a){if(a)i.userDatas={state:a};else if(null===a&&H5PIntegration.saveFreq){delete r.contentUserData;var s=new g.Dialog("content-user-data-reset","Data Reset","<p>"+g.t("contentChanged")+"</p><p>"+g.t("startingOver")+'</p><div class="h5p-dialog-ok-button" tabIndex="0" role="button">OK</div>',t);g.jQuery(s).on("dialog-opened",(function(e,t){var r=function(e){"click"!==e.type&&32!==e.which||(s.close(),g.deleteUserData(n,"state",0))};t.find(".h5p-dialog-ok-button").click(r).keypress(r),g.trigger(o,"resize")})).on("dialog-closed",(function(){g.trigger(o,"resize")})),s.open()}}));var o=g.newRunnable(i,n,t,!0,{standalone:!0});g.offlineRequestQueue=new g.OfflineRequestQueue({instance:o}),1==r.fullScreen&&g.fullscreenSupported&&g.jQuery('<div class="h5p-content-controls"><div role="button" tabindex="0" class="h5p-enable-fullscreen" aria-label="'+g.t("fullscreen")+'" title="'+g.t("fullscreen")+'"></div></div>').prependTo(t).children().click((function(){g.fullScreen(t,o)})).keydown((function(e){if(32===e.which||13===e.which)return g.fullScreen(t,o),!1}));var a,s=r.displayOptions,c=!1;if(s.frame){if(s.copyright){var l=g.getCopyrights(o,i.params,n,i.metadata);l||(s.copyright=!1)}var u=new g.ActionBar(s),d=u.getDOMElement();u.on("reuse",(function(){g.openReuseDialog(d,r,i,o,n),o.triggerXAPI("accessed-reuse")})),u.on("copyrights",(function(){new g.Dialog("copyrights",g.t("copyrightInformation"),l,t).open(!0),o.triggerXAPI("accessed-copyright")})),u.on("embed",(function(){g.openEmbedDialog(d,r.embedCode,r.resizeCode,{width:e.width(),height:e.height()},o),o.triggerXAPI("accessed-embed")})),u.hasActions()&&(c=!0,d.insertAfter(t))}if(e.addClass(c?"h5p-frame":"h5p-no-frame"),g.opened[n]=new Date,g.on(o,"finish",(function(e){void 0!==e.data&&g.setFinished(n,e.data.score,e.data.maxScore,e.data.time)})),g.on(o,"xAPI",g.xAPICompletedListener),!1!==H5PIntegration.saveFreq&&(o.getCurrentState instanceof Function||"function"==typeof o.getCurrentState)){var f,p=function(){var e=o.getCurrentState();void 0!==e&&g.setUserData(n,"state",e,{deleteOnChange:!0}),H5PIntegration.saveFreq&&(f=setTimeout(p,1e3*H5PIntegration.saveFreq))};H5PIntegration.saveFreq&&(f=setTimeout(p,1e3*H5PIntegration.saveFreq)),g.on(o,"xAPI",(function(e){var t=e.getVerb();"completed"!==t&&"progressed"!==t||(clearTimeout(f),f=setTimeout(p,3e3))}))}if(g.isFramed)if(!1===g.externalEmbed){var h=window.frameElement;g.on(o,"resize",(function(){clearTimeout(a),a=setTimeout((function(){!function(){if(!window.parent.H5P.isFullscreen){var e=h.parentElement.style.height;h.parentElement.style.height=h.parentElement.clientHeight+"px",h.getBoundingClientRect(),h.style.height="1px",h.style.height=h.contentDocument.body.scrollHeight+"px",h.parentElement.style.height=e}}()}),1)}))}else if(g.communicator){var v=!1;g.communicator.on("ready",(function(){g.communicator.send("hello")})),g.communicator.on("hello",(function(){v=!0,document.body.style.height="auto",document.body.style.overflow="hidden",g.trigger(o,"resize")})),g.communicator.on("resizePrepared",(function(){g.communicator.send("resize",{scrollHeight:document.body.scrollHeight})})),g.communicator.on("resize",(function(){g.trigger(o,"resize")})),g.on(o,"resize",(function(){g.isFullscreen||(clearTimeout(a),a=setTimeout((function(){v?g.communicator.send("prepareResize",{scrollHeight:document.body.scrollHeight,clientHeight:document.body.clientHeight}):g.communicator.send("hello")}),0))}))}g.isFramed&&!1!==g.externalEmbed||g.jQuery(window.parent).resize((function(){window.parent.H5P.isFullscreen,g.trigger(o,"resize")})),g.instances.push(o),g.trigger(o,"resize"),e.addClass("using-mouse"),e.on("mousedown keydown keyup",(function(t){e.toggleClass("using-mouse","mousedown"===t.type)})),g.externalDispatcher&&g.externalDispatcher.trigger("initialized")})),g.jQuery("iframe.h5p-iframe:not(.h5p-initialized)",e).each((function(){var e=g.jQuery(this).addClass("h5p-initialized").data("content-id");const t=H5PIntegration.contents["cid-"+e],n=t&&t.metadata&&t.metadata.defaultLanguage?t.metadata.defaultLanguage:"en";this.contentDocument.open(),this.contentDocument.write('<!doctype html><html class="h5p-iframe" lang="'+n+'"><head>'+g.getHeadTags(e)+'</head><body><div class="h5p-content" data-content-id="'+e+'"/></body></html>'),this.contentDocument.close()}))},g.getHeadTags=function(e){var t=function(e){for(var t="",n=0;n<e.length;n++)t+='<link rel="stylesheet" href="'+e[n]+'">';return t},n=function(e){for(var t="",n=0;n<e.length;n++)t+='<script src="'+e[n]+'"><\/script>';return t};return'<base target="_parent">'+t(H5PIntegration.core.styles)+t(H5PIntegration.contents["cid-"+e].styles)+n(H5PIntegration.core.scripts)+n(H5PIntegration.contents["cid-"+e].scripts)+"<script>H5PIntegration = window.parent.H5PIntegration; var H5P = H5P || {}; H5P.externalEmbed = false;<\/script>"},g.communicator=window.postMessage&&window.addEventListener?new function(){var e={};window.addEventListener("message",(function(t){window.parent===t.source&&"h5p"===t.data.context&&void 0!==e[t.data.action]&&e[t.data.action](t.data)}),!1),this.on=function(t,n){e[t]=n},this.send=function(e,t){void 0===t&&(t={}),t.context="h5p",t.action=e,window.parent.postMessage(t,"*")}}:void 0,g.semiFullScreen=function(e,t,n,r){g.fullScreen(e,t,n,r,!0)},g.fullScreen=function(e,t,n,r,i){if(void 0===g.exitFullScreen){if(g.isFramed&&!1===g.externalEmbed)return window.parent.H5P.fullScreen(e,t,n,g.$body.get(),i),g.isFullscreen=!0,g.exitFullScreen=function(){window.parent.H5P.exitFullScreen()},void g.on(t,"exitFullScreen",(function(){g.isFullscreen=!1,g.exitFullScreen=void 0}));var o,a,s,c=e;if(void 0===r)s=g.$body;else{s=g.jQuery(r),o=s.add(e.get());var l="#h5p-iframe-"+e.parent().data("content-id");e=(a=g.jQuery(l)).parent()}o=e.add(g.$body).add(o);var u=function(e){o.addClass(e),void 0!==a&&a.css("height","")},d=function(){g.trigger(t,"resize"),g.trigger(t,"focus"),g.trigger(t,"enterFullScreen")},f=function(e){g.isFullscreen=!1,o.removeClass(e),g.trigger(t,"resize"),g.trigger(t,"focus"),g.exitFullScreen=void 0,void 0!==n&&n(),g.trigger(t,"exitFullScreen")};if(g.isFullscreen=!0,void 0===g.fullScreenBrowserPrefix||!0===i){if(g.isFramed)return;u("h5p-semi-fullscreen");var p,h,v,m=g.jQuery('<div role="button" tabindex="0" class="h5p-disable-fullscreen" title="'+g.t("disableFullscreen")+'" aria-label="'+g.t("disableFullscreen")+'"></div>').appendTo(c.find(".h5p-content-controls")),y=g.exitFullScreen=function(){h?v.content=h:w.removeChild(v),m.remove(),s.unbind("keyup",p),f("h5p-semi-fullscreen")};p=function(e){27===e.keyCode&&y()},m.click(y),s.keyup(p);for(var b=document.getElementsByTagName("meta"),x=0;x<b.length;x++)if("viewport"===b[x].name){v=b[x],h=v.content;break}if(h||((v=document.createElement("meta")).name="viewport"),v.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",!h){var w=document.getElementsByTagName("head")[0];w.appendChild(v)}d()}else{u("h5p-fullscreen");var C,P="ms"===g.fullScreenBrowserPrefix?"MSFullscreenChange":g.fullScreenBrowserPrefix+"fullscreenchange";if(document.addEventListener(P,(function(){if(void 0===C)return C=!1,void d();f("h5p-fullscreen"),document.removeEventListener(P,arguments.callee,!1)})),""===g.fullScreenBrowserPrefix)e[0].requestFullScreen();else{var S="ms"===g.fullScreenBrowserPrefix?"msRequestFullscreen":g.fullScreenBrowserPrefix+"RequestFullScreen",T="webkit"===g.fullScreenBrowserPrefix&&0===g.safariBrowser?Element.ALLOW_KEYBOARD_INPUT:void 0;e[0][S](T)}g.exitFullScreen=function(){""===g.fullScreenBrowserPrefix?document.exitFullscreen():"moz"===g.fullScreenBrowserPrefix?document.mozCancelFullScreen():document[g.fullScreenBrowserPrefix+"ExitFullscreen"]()}}}},function(){g.addQueryParameter=function(e,t){let n,r;const i=e.split("?");return i[1]?(r=i[1].split("#"),n=i[0]+"?"+r[0]+"&"):(r=i[0].split("#"),n=r[0]+"?"),n+=t,r[1]&&(n+="#"+r[1]),n},g.setSource=function(e,t,n){let r=t.path;const i=g.getCrossOrigin(t);i?(e.crossOrigin=i,H5PIntegration.crossoriginCacheBuster&&(r=g.addQueryParameter(r,H5PIntegration.crossoriginCacheBuster))):e.removeAttribute("crossorigin"),e.src=g.getPath(r,n)};var e=function(e){return e.match(/^[a-z0-9]+:\/\//i)};g.getCrossOrigin=function(t){return"object"!=typeof t?H5PIntegration.crossorigin&&H5PIntegration.crossoriginRegex&&t.match(H5PIntegration.crossoriginRegex)?H5PIntegration.crossorigin:null:H5PIntegration.crossorigin&&!e(t.path)?H5PIntegration.crossorigin:void 0},g.getPath=function(t,n){if(e(t))return t;var r,i="#tmp"===t.substr(-4,4);if(void 0===n||i){if(void 0===window.H5PEditor)return;r=H5PEditor.filesPath}else void 0!==H5PIntegration.contents&&H5PIntegration.contents["cid-"+n]&&(r=H5PIntegration.contents["cid-"+n].contentUrl),r||(r=H5PIntegration.url+"/content/"+n);return e(r)||(r=window.location.protocol+"//"+window.location.host+r),r+"/"+t}}(),g.getContentPath=function(e){return H5PIntegration.url+"/content/"+e},g.classFromName=function(e){var t=e.split(".");return this[t[t.length-1]]},g.newRunnable=function(e,t,n,r,i){var o,a,s,c;try{s=(o=e.library.split(" ",2))[0],a=o[1].split(".",2)}catch(t){return g.error("Invalid library string: "+e.library)}if(e.params instanceof Object!=1||e.params instanceof Array==1)return g.error("Invalid library params for: "+e.library),g.error(e.params);try{o=o[0].split("."),c=window;for(var l=0;l<o.length;l++)c=c[o[l]];if("function"!=typeof c)throw null}catch(t){return g.error("Unable to find constructor for: "+e.library)}void 0===i&&(i={}),e.subContentId&&(i.subContentId=e.subContentId),e.userDatas&&e.userDatas.state&&H5PIntegration.saveFreq&&(i.previousState=e.userDatas.state),e.metadata&&(i.metadata=e.metadata);var u,d=i.standalone||!1;return c.prototype=g.jQuery.extend({},g.ContentType(d).prototype,c.prototype),void 0===(u=g.jQuery.inArray(e.library,["H5P.CoursePresentation 1.0","H5P.CoursePresentation 1.1","H5P.CoursePresentation 1.2","H5P.CoursePresentation 1.3"])>-1?new c(e.params,t):new c(e.params,t,i)).$&&(u.$=g.jQuery(u)),void 0===u.contentId&&(u.contentId=t),void 0===u.subContentId&&e.subContentId&&(u.subContentId=e.subContentId),void 0===u.parent&&i&&i.parent&&(u.parent=i.parent),void 0===u.libraryInfo&&(u.libraryInfo={versionedName:e.library,versionedNameNoSpaces:s+"-"+a[0]+"."+a[1],machineName:s,majorVersion:a[0],minorVersion:a[1]}),void 0!==n&&(n.toggleClass("h5p-standalone",d),u.attach(n),g.trigger(u,"domChanged",{$target:n,library:s,key:"newLibrary"},{bubbles:!0,external:!0}),void 0!==r&&r||g.trigger(u,"resize")),u},g.error=function(e){void 0!==window.console&&void 0!==console.error&&console.error(e.stack?e.stack:e)},g.t=function(e,t,n){if(void 0===n&&(n="H5P"),void 0===H5PIntegration.l10n[n])return'[Missing translation namespace "'+n+'"]';if(void 0===H5PIntegration.l10n[n][e])return'[Missing translation "'+e+'" in "'+n+'"]';var r=H5PIntegration.l10n[n][e];if(void 0!==t)for(var i in t)r=r.replace(i,t[i]);return r},g.Dialog=function(e,t,n,r){var i=this,o=g.jQuery('<div class="h5p-popup-dialog h5p-'+e+'-dialog" role="dialog" tabindex="-1">                              <div class="h5p-inner">                                <h2>'+t+'</h2>                                <div class="h5p-scroll-content">'+n+'</div>                                <div class="h5p-close" role="button" tabindex="0" aria-label="'+g.t("close")+'" title="'+g.t("close")+'"></div>                              </div>                            </div>').insertAfter(r).click((function(e){e&&e.originalEvent&&e.originalEvent.preventClosing||i.close()})).children(".h5p-inner").click((function(e){e.originalEvent.preventClosing=!0})).find(".h5p-close").click((function(){i.close()})).keypress((function(e){if(13===e.which||32===e.which)return i.close(),!1})).end().find("a").click((function(e){e.stopPropagation()})).end().end();i.open=function(e){e&&o.css("height","100%"),setTimeout((function(){o.addClass("h5p-open"),g.jQuery(i).trigger("dialog-opened",[o]),o.focus()}),1)},i.close=function(){o.removeClass("h5p-open"),setTimeout((function(){o.remove(),g.jQuery(i).trigger("dialog-closed",[o]),r.attr("tabindex","-1"),r.focus()}),200)}},g.getCopyrights=function(e,t,n,r){var i;if(void 0!==e.getCopyrights)try{i=e.getCopyrights()}catch(e){}void 0===i&&(i=new g.ContentCopyrights,g.findCopyrights(i,t,n));var o=g.buildMetadataCopyrights(r,e.libraryInfo.machineName);return void 0!==o&&i.addMediaInFront(o),void 0!==i&&(i=i.toString()),i},g.findCopyrights=function(e,t,n,r){var i;for(var o in r&&(r.params=t,c(r,r.machineName,n)),t)if(t.hasOwnProperty(o))if("overrideSettings"!==o){var a=t[o];if(a&&a.library&&"string"==typeof a.library?i=a.library.split(" ")[0]:a&&a.library&&"object"==typeof a.library&&(i=a.library.library&&"string"==typeof a.library.library?a.library.library.split(" ")[0]:i),a instanceof Array)g.findCopyrights(e,a,n);else if(a instanceof Object)if(c(a,i,n),void 0===a.copyright||void 0===a.copyright.license||void 0===a.path||void 0===a.mime)g.findCopyrights(e,a,n);else{var s=new g.MediaCopyright(a.copyright);void 0!==a.width&&void 0!==a.height&&s.setThumbnail(new g.Thumbnail(g.getPath(a.path,n),a.width,a.height)),e.addMedia(s)}}else console.warn("The semantics field 'overrideSettings' is DEPRECATED and should not be used."),console.warn(t);function c(t,n,r){if(t.metadata){const i=g.buildMetadataCopyrights(t.metadata,n);if(void 0!==i){if(t.params&&"Image"===t.params.contentName&&t.params.file){const e=t.params.file.path,n=t.params.file.width,o=t.params.file.height;i.setThumbnail(new g.Thumbnail(g.getPath(e,r),n,o))}e.addMedia(i)}}}},g.buildMetadataCopyrights=function(e){if(e&&void 0!==e.license&&"U"!==e.license){var t={contentType:e.contentType,title:e.title,author:e.authors&&e.authors.length>0?e.authors.map((function(e){return e.role?e.name+" ("+e.role+")":e.name})).join(", "):void 0,source:e.source,year:e.yearFrom?e.yearFrom+(e.yearTo?"-"+e.yearTo:""):void 0,license:e.license,version:e.licenseVersion,licenseExtras:e.licenseExtras,changes:e.changes&&e.changes.length>0?e.changes.map((function(e){return e.log+(e.author?", "+e.author:"")+(e.date?", "+e.date:"")})).join(" / "):void 0};return new g.MediaCopyright(t)}},g.openReuseDialog=function(e,t,n,r,i){let o="";t.displayOptions.export&&(o+='<button type="button" class="h5p-big-button h5p-download-button"><div class="h5p-button-title">Download as an .h5p file</div><div class="h5p-button-description">.h5p files may be uploaded to any web-site where H5P content may be created.</div></button>'),t.displayOptions.export&&t.displayOptions.copy&&(o+='<div class="h5p-horizontal-line-text"><span>or</span></div>'),t.displayOptions.copy&&(o+='<button type="button" class="h5p-big-button h5p-copy-button"><div class="h5p-button-title">Copy content</div><div class="h5p-button-description">Copied content may be pasted anywhere this content type is supported on this website.</div></button>');const a=new g.Dialog("reuse",g.t("reuseContent"),o,e);g.jQuery(a).on("dialog-opened",(function(e,o){g.jQuery('<a href="https://h5p.org/node/442225" target="_blank">More Info</a>').click((function(e){e.stopPropagation()})).appendTo(o.find("h2")),o.find(".h5p-download-button").click((function(){window.location.href=t.exportUrl,r.triggerXAPI("downloaded"),a.close()})),o.find(".h5p-copy-button").click((function(){const e=new g.ClipboardItem(n);e.contentId=i,g.setClipboard(e),r.triggerXAPI("copied"),a.close(),g.attachToastTo(g.jQuery(".h5p-content:first")[0],g.t("contentCopied"),{position:{horizontal:"centered",vertical:"centered",noOverflowX:!0}})})),g.trigger(r,"resize")})).on("dialog-closed",(function(){g.trigger(r,"resize")})),a.open()},g.openEmbedDialog=function(e,t,n,r,i){var o=t+n,a=new g.Dialog("embed",g.t("embed"),'<textarea class="h5p-embed-code-container" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>'+g.t("size")+': <input type="text" value="'+Math.ceil(r.width)+'" class="h5p-embed-size"/> × <input type="text" value="'+Math.ceil(r.height)+'" class="h5p-embed-size"/> px<br/><div role="button" tabindex="0" class="h5p-expander">'+g.t("showAdvanced")+'</div><div class="h5p-expander-content"><p>'+g.t("advancedHelp")+'</p><textarea class="h5p-embed-code-container" autocorrect="off" autocapitalize="off" spellcheck="false">'+n+"</textarea></div>",e);g.jQuery(a).on("dialog-opened",(function(e,t){var n=t.find(".h5p-inner").find(".h5p-scroll-content"),a=(n.outerHeight(),n.innerHeight(),function(){g.trigger(i,"resize")}),s=t.find(".h5p-embed-size:eq(0)"),c=t.find(".h5p-embed-size:eq(1)"),l=function(e,t){var n=parseFloat(e.val());return isNaN(n)?t:Math.ceil(n)},u=function(){t.find(".h5p-embed-code-container:first").val(o.replace(":w",l(s,r.width)).replace(":h",l(c,r.height)))};s.change(u),c.change(u),u(),t.find(".h5p-embed-code-container").each((function(){g.jQuery(this).css("height",this.scrollHeight+"px").focus((function(){g.jQuery(this).select()}))})),t.find(".h5p-embed-code-container").eq(0).select(),a();var d=function(){var e=g.jQuery(this),n=e.next();n.is(":visible")?(e.removeClass("h5p-open").text(g.t("showAdvanced")).attr("aria-expanded","true"),n.hide()):(e.addClass("h5p-open").text(g.t("hideAdvanced")).attr("aria-expanded","false"),n.show()),t.find(".h5p-embed-code-container").each((function(){g.jQuery(this).css("height",this.scrollHeight+"px")})),a()};t.find(".h5p-expander").click(d).keypress((function(e){if(32===e.keyCode)return d.apply(this),!1}))})).on("dialog-closed",(function(){g.trigger(i,"resize")})),a.open()},g.attachToastTo=function(e,t,n){if(void 0===e||void 0===t)return;const r=function(t){var n,r,o;-1===(n=t,r=n.composedPath&&n.composedPath()||n.path,o=n.target,null!=r?r.indexOf(window)<0?r.concat(window):r:o===window?[window]:[o].concat(function e(t,n){n=n||[];var r=t.parentNode;return r?e(r,n.concat(r)):n}(o),window)).indexOf(e)&&(clearTimeout(c),i())},i=function(){document.removeEventListener("click",r),o.parentNode&&o.parentNode.removeChild(o)};(n=n||{}).style=n.style||"h5p-toast",n.duration=n.duration||3e3;const o=document.createElement("div");o.setAttribute("id",n.style),o.classList.add("h5p-toast-disabled"),o.classList.add(n.style);const a=document.createElement("span");a.innerHTML=t,o.appendChild(a),document.body.appendChild(o);const s=function(e,t,n){(n=n||{}).offsetHorizontal=n.offsetHorizontal||0,n.offsetVertical=n.offsetVertical||0;const r=t.getBoundingClientRect(),i=e.getBoundingClientRect();let o=0,a=0;switch(n.horizontal){case"before":o=i.left-r.width-n.offsetHorizontal;break;case"after":o=i.left+i.width+n.offsetHorizontal;break;case"left":o=i.left+n.offsetHorizontal;break;case"right":o=i.left+i.width-r.width-n.offsetHorizontal;break;case"centered":o=i.left+i.width/2-r.width/2+n.offsetHorizontal;break;default:o=i.left+i.width/2-r.width/2+n.offsetHorizontal}switch(n.vertical){case"above":a=i.top-r.height-n.offsetVertical;break;case"below":a=i.top+i.height+n.offsetVertical;break;case"top":a=i.top+n.offsetVertical;break;case"bottom":a=i.top+i.height-r.height-n.offsetVertical;break;case"centered":a=i.top+i.height/2-r.height/2+n.offsetVertical;break;default:a=i.top+i.height+n.offsetVertical}const s=document.body.getBoundingClientRect();return(n.noOverflowLeft||n.noOverflowX)&&o<s.x&&(o=s.x),(n.noOverflowRight||n.noOverflowX)&&o+r.width>s.x+s.width&&(o=s.x+s.width-r.width),(n.noOverflowTop||n.noOverflowY)&&a<s.y&&(a=s.y),(n.noOverflowBottom||n.noOverflowY)&&a+r.height>s.y+s.height&&(o=s.y+s.height-r.height),{left:o,top:a}}(e,o,n.position);o.style.left=Math.round(s.left)+"px",o.style.top=Math.round(s.top)+"px",o.classList.remove("h5p-toast-disabled");const c=setTimeout(i,n.duration);document.addEventListener("click",r)},g.ContentCopyrights=function(){var e,t=[],n=[];this.setLabel=function(t){e=t},this.addMedia=function(e){void 0!==e&&t.push(e)},this.addMediaInFront=function(e){void 0!==e&&t.unshift(e)},this.addContent=function(e){void 0!==e&&n.push(e)},this.toString=function(){for(var r="",i=0;i<t.length;i++)r+=t[i];for(i=0;i<n.length;i++)r+=n[i];return""!==r&&(void 0!==e&&(r="<h3>"+e+"</h3>"+r),r='<div class="h5p-content-copyrights">'+r+"</div>"),r}},g.MediaCopyright=function(e,t,n,r){var i,o=new g.DefinitionList,a=function(e){return void 0===t||void 0===t[e]?g.t(e):t[e]},s=function(e,t){var n,r,i=g.copyrightLicenses[e],o="";"PD"===e&&t||(o+=i.hasOwnProperty("label")?i.label:i),i.versions&&(!i.versions.default||t&&i.versions[t]||(t=i.versions.default),t&&i.versions[t]&&(n=i.versions[t])),n&&(o&&(o+=" "),o+=n.hasOwnProperty("label")?n.label:n),i.hasOwnProperty("link")?r=i.link.replace(":version",i.linkVersions?i.linkVersions[t]:t):n&&i.hasOwnProperty("link")&&(r=n.link),r&&(o='<a href="'+r+'" target="_blank">'+o+"</a>");var a="";return"PD"!==e&&"C"!==e&&(a+=e),t&&"CC0 1.0"!==t&&(a&&"GNU GPL"!==e&&(a+=" "),a+=t),a&&(o+=" ("+a+")"),"C"===e&&(o+=" &copy;"),o};if(void 0!==e){for(var c in r)r.hasOwnProperty(c)&&(e[c]=r[c]);void 0===n&&(n=["contentType","title","license","author","year","source","licenseExtras","changes"]);for(var l=0;l<n.length;l++){var u=n[l];if(void 0!==e[u]&&""!==e[u]){var d=e[u];"license"===u&&(d=s(e.license,e.version)),"source"===u&&(d=d?'<a href="'+d+'" target="_blank">'+d+"</a>":void 0),o.add(new g.Field(a(u),d))}}}this.setThumbnail=function(e){i=e},this.undisclosed=function(){if(1===o.size()){var e=o.get(0);if(e.getLabel()===a("license")&&e.getValue()===s("U"))return!0}return!1},this.toString=function(){var e="";return this.undisclosed()||(void 0!==i&&(e+=i),""!==(e+=o)&&(e='<div class="h5p-media-copyright">'+e+"</div>")),e}},g.Thumbnail=function(e,t,n){var r;void 0!==t&&(r=Math.round(t/n*100)),this.toString=function(){return'<img src="'+e+'" alt="'+g.t("thumbnail")+'" class="h5p-thumbnail" height="100"'+(void 0===r?"":' width="'+r+'"')+"/>"}},g.Field=function(e,t){this.getLabel=function(){return e},this.getValue=function(){return t}},g.DefinitionList=function(){var e=[];this.add=function(t){e.push(t)},this.size=function(){return e.length},this.get=function(t){return e[t]},this.toString=function(){for(var t="",n=0;n<e.length;n++){var r=e[n];t+="<dt>"+r.getLabel()+"</dt><dd>"+r.getValue()+"</dd>"}return""===t?t:'<dl class="h5p-definition-list">'+t+"</dl>"}},g.Coords=function(e,t,n,r){return this instanceof g.Coords?(this.x=0,this.y=0,this.w=1,this.h=1,"object"==typeof e?(this.x=e.x,this.y=e.y,this.w=e.w,this.h=e.h):(void 0!==e&&(this.x=e),void 0!==t&&(this.y=t),void 0!==n&&(this.w=n),void 0!==r&&(this.h=r)),this):new g.Coords(e,t,n,r)},g.libraryFromString=function(e){var t=/(.+)\s(\d+)\.(\d+)$/g.exec(e);return null!==t&&{machineName:t[1],majorVersion:parseInt(t[2]),minorVersion:parseInt(t[3])}},g.getLibraryPath=function(e){return void 0!==H5PIntegration.urlLibraries?H5PIntegration.urlLibraries+"/"+e:H5PIntegration.url+"/libraries/"+e},g.cloneObject=function(e,t){var n=e instanceof Array?[]:{};for(var r in e)e.hasOwnProperty(r)&&(void 0!==t&&t&&"object"==typeof e[r]?n[r]=g.cloneObject(e[r],t):n[r]=e[r]);return n},g.trim=function(e){return e.replace(/^\s+|\s+$/g,"")},g.jsLoaded=function(e){return H5PIntegration.loadedJs=H5PIntegration.loadedJs||[],-1!==g.jQuery.inArray(e,H5PIntegration.loadedJs)},g.cssLoaded=function(e){return H5PIntegration.loadedCss=H5PIntegration.loadedCss||[],-1!==g.jQuery.inArray(e,H5PIntegration.loadedCss)},g.shuffleArray=function(e){if(e instanceof Array){var t,n,r,i=e.length;if(0===i)return!1;for(;--i;)t=Math.floor(Math.random()*(i+1)),n=e[i],r=e[t],e[i]=r,e[t]=n;return e}},g.setFinished=function(e,t,n,r){if(("number"==typeof t||t instanceof Number)&&!0===H5PIntegration.postUserStatistics){var i=function(e){return Math.round(e.getTime()/1e3)};const o={contentId:e,score:t,maxScore:n,opened:i(g.opened[e]),finished:i(new Date),time:r};g.jQuery.post(H5PIntegration.ajax.setFinished,o).fail((function(){g.offlineRequestQueue.add(H5PIntegration.ajax.setFinished,o)}))}},Array.prototype.indexOf||(Array.prototype.indexOf=function(e){for(var t=0;t<this.length;t++)if(this[t]===e)return t;return-1}),void 0===String.prototype.trim&&(String.prototype.trim=function(){return g.trim(this)}),g.trigger=function(e,t,n,r){void 0!==e.trigger?e.trigger(t,n,r):void 0!==e.$&&void 0!==e.$.trigger&&e.$.trigger(t)},g.on=function(e,t,n){void 0!==e.on?e.on(t,n):void 0!==e.$&&void 0!==e.$.on&&e.$.on(t,n)},g.createUUID=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}))},g.createTitle=function(e,t){if(!e)return"";void 0===t&&(t=60);var n=g.jQuery("<div></div>").text(e.replace(/(<([^>]+)>)/gi,"")).text();return n.length>t&&(n=n.substr(0,t-3)+"..."),n},function(e){function t(t,n,r,i,o,a,s,c){if(void 0!==H5PIntegration.user){var l={url:H5PIntegration.ajax.contentUserData.replace(":contentId",t).replace(":dataType",n).replace(":subContentId",r||0),dataType:"json",async:void 0===c||c};void 0!==o?(l.type="POST",l.data={data:null===o?0:o,preload:a?1:0,invalidate:s?1:0}):l.type="GET",void 0!==i&&(l.error=function(e,t){i(t)},l.success=function(e){e.success?!1!==e.data&&void 0!==e.data?i(void 0,e.data):i():i(e.message)}),e.ajax(l)}else i("Not signed in.")}g.getUserData=function(e,n,r,i){i||(i=0),H5PIntegration.contents=H5PIntegration.contents||{};var o=H5PIntegration.contents["cid-"+e]||{},a=o.contentUserData;if(a&&a[i]&&void 0!==a[i][n]){if("RESET"===a[i][n])return void r(void 0,null);try{r(void 0,JSON.parse(a[i][n]))}catch(e){r(e)}}else t(e,n,i,(function(e,t){if(e||void 0===t)r(e,t);else{void 0===o.contentUserData&&(o.contentUserData=a={}),void 0===a[i]&&(a[i]={}),a[i][n]=t;try{r(void 0,JSON.parse(t))}catch(e){r(e)}}}))},g.setUserData=function(e,n,r,i){var o=g.jQuery.extend(!0,{},{subContentId:0,preloaded:!0,deleteOnChange:!1,async:!0},i);try{r=JSON.stringify(r)}catch(e){return void(o.errorCallback&&o.errorCallback(e))}var a=H5PIntegration.contents["cid-"+e];void 0===a&&(a=H5PIntegration.contents["cid-"+e]={}),a.contentUserData||(a.contentUserData={});var s=a.contentUserData;void 0===s[o.subContentId]&&(s[o.subContentId]={}),r!==s[o.subContentId][n]&&(s[o.subContentId][n]=r,t(e,n,o.subContentId,(function(e){o.errorCallback&&e&&o.errorCallback(e)}),r,o.preloaded,o.deleteOnChange,o.async))},g.deleteUserData=function(e,n,r){r||(r=0);var i=H5PIntegration.contents["cid-"+e].contentUserData;i&&i[r]&&i[r][n]&&delete i[r][n],t(e,n,r,void 0,null)},g.getContentForInstance=function(e){var t="cid-"+e;return H5PIntegration&&H5PIntegration.contents&&H5PIntegration.contents[t]?H5PIntegration.contents[t]:void 0},g.ClipboardItem=function(e,t,n){var r=this;t||(t="action",e={action:e}),r.specific=e,t&&e[t]&&(r.generic=t),n&&(r.from=n),window.H5PEditor&&H5PEditor.contentId&&(r.contentId=H5PEditor.contentId),r.specific.width||r.specific.height||function(){if(r.generic){var e=r.specific[r.generic];e.params.file&&e.params.file.width&&e.params.file.height&&(r.width=20,r.height=e.params.file.height/e.params.file.width*r.width)}}()},g.clipboardify=function(e){e instanceof g.ClipboardItem||(e=new g.ClipboardItem(e)),g.setClipboard(e)},g.getClipboard=function(){return n()},g.setClipboard=function(e){localStorage.setItem("h5pClipboard",JSON.stringify(e)),g.externalDispatcher.trigger("datainclipboard",{reset:!1})},g.getLibraryConfig=function(e){return H5PIntegration.libraryConfig&&H5PIntegration.libraryConfig[e]?H5PIntegration.libraryConfig[e]:{}};var n=function(){var e=localStorage.getItem("h5pClipboard");if(e){try{e=JSON.parse(e)}catch(e){return void console.error("Unable to parse JSON from clipboard.",e)}return r(e.specific,(function(t){return"#tmp"===t.substr(-4,4)||!e.contentId||t.match(/^https?:\/\//i)?t:H5PEditor.contentId?"../"+e.contentId+"/"+t:(H5PEditor.contentRelUrl?H5PEditor.contentRelUrl:"../content/")+e.contentId+"/"+t})),e.generic&&(e.generic=e.specific[e.generic]),e}},r=function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n]instanceof Object){var i=e[n];void 0!==i.path&&void 0!==i.mime?i.path=t(i.path):(void 0!==i.library&&void 0!==i.subContentId&&delete i.subContentId,r(i,t))}};e(document).ready((function(){window.addEventListener("storage",(function(e){"h5pClipboard"===e.key&&g.externalDispatcher.trigger("datainclipboard",{reset:null===e.newValue})}));var e={default:"4.0","4.0":g.t("licenseCC40"),"3.0":g.t("licenseCC30"),2.5:g.t("licenseCC25"),"2.0":g.t("licenseCC20"),"1.0":g.t("licenseCC10")};if(g.copyrightLicenses={U:g.t("licenseU"),"CC BY":{label:g.t("licenseCCBY"),link:"http://creativecommons.org/licenses/by/:version",versions:e},"CC BY-SA":{label:g.t("licenseCCBYSA"),link:"http://creativecommons.org/licenses/by-sa/:version",versions:e},"CC BY-ND":{label:g.t("licenseCCBYND"),link:"http://creativecommons.org/licenses/by-nd/:version",versions:e},"CC BY-NC":{label:g.t("licenseCCBYNC"),link:"http://creativecommons.org/licenses/by-nc/:version",versions:e},"CC BY-NC-SA":{label:g.t("licenseCCBYNCSA"),link:"http://creativecommons.org/licenses/by-nc-sa/:version",versions:e},"CC BY-NC-ND":{label:g.t("licenseCCBYNCND"),link:"http://creativecommons.org/licenses/by-nc-nd/:version",versions:e},"CC0 1.0":{label:g.t("licenseCC010"),link:"https://creativecommons.org/publicdomain/zero/1.0/"},"GNU GPL":{label:g.t("licenseGPL"),link:"http://www.gnu.org/licenses/gpl-:version-standalone.html",linkVersions:{v3:"3.0",v2:"2.0",v1:"1.0"},versions:{default:"v3",v3:g.t("licenseV3"),v2:g.t("licenseV2"),v1:g.t("licenseV1")}},PD:{label:g.t("licensePD"),versions:{"CC0 1.0":{label:g.t("licenseCC010"),link:"https://creativecommons.org/publicdomain/zero/1.0/"},"CC PDM":{label:g.t("licensePDM"),link:"https://creativecommons.org/publicdomain/mark/1.0/"}}},"ODC PDDL":'<a href="http://opendatacommons.org/licenses/pddl/1.0/" target="_blank">Public Domain Dedication and Licence</a>',"CC PDM":{label:g.t("licensePDM"),link:"https://creativecommons.org/publicdomain/mark/1.0/"},C:g.t("licenseC")},g.isFramed&&!1===g.externalEmbed&&g.externalDispatcher.on("*",(function(e){window.parent.H5P.externalDispatcher.trigger.call(this,e)})),g.preventInit||g.init(document.body),!1!==H5PIntegration.saveFreq){var t=0,n=function(){var e=(new Date).getTime();if(e-t>250){t=e;for(var n=0;n<g.instances.length;n++){var r=g.instances[n];if(r.getCurrentState instanceof Function||"function"==typeof r.getCurrentState){var i=r.getCurrentState();void 0!==i&&g.setUserData(r.contentId,"state",i,{deleteOnChange:!0,async:!1})}}}};g.$window.one("beforeunload unload",(function(){g.$window.off("pagehide beforeunload unload"),n()})),g.$window.on("pagehide",n)}}))}(g.jQuery);const v=g;function m(e){if((e=e.trim()).match(/^[a-z0-9]+:\/\//i))return e;if(e.startsWith("//"))return window.location.protocol+e;if(e.startsWith("/"))return window.location.origin+e;var t=window.location.protocol+"//"+window.location.host;return window.location.pathname.indexOf("/")>-1?t+=window.location.pathname.split("/").slice(0,-1).join("/"):t+=window.location.pathname,t+"/"+e}H5PIntegration=window.H5PIntegration;var y=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.id=n.id||Math.random().toString(36).substr(2,9),n.h5pJsonPath?this.h5pJsonPath=m(n.h5pJsonPath):this.h5pJsonPath=m("workspace"),n.librariesPath?this.librariesPath=m(n.librariesPath):this.librariesPath=this.h5pJsonPath,n.contentJsonPath?this.contentUrl=m(n.contentJsonPath):this.contentUrl=m("".concat(this.h5pJsonPath,"/content"));var r={displayOptions:{frame:n.frame,copyright:n.copyright,embed:n.embed,icon:n.icon,export:n.export},fullScreen:!1,url:window.location.href.split("?")[0].split("#")[0]};n.downloadUrl&&(r.exportUrl=m(n.downloadUrl)),n.metadata&&(r.metadata=n.metadata);var i={preventH5PInit:!!n.preventH5PInit&&n.preventH5PInit};n.frameJs?i.coreScripts=[m(n.frameJs)]:i.coreScripts=["./frame.bundle.js"],n.frameCss?i.coreStyles=[m(n.frameCss)]:i.coreStyles=[m("./styles/h5p.css")],n.fullScreen&&(r.fullScreen=n.fullScreen),n.xAPIObjectIRI&&(r.url=n.xAPIObjectIRI),n.embedCode&&(r.embedCode=n.embedCode,r.resizeCode=n.resizeCode||""),"string"==typeof n.customCss&&(n.customCss=[n.customCss]),"string"==typeof n.customJs&&(n.customJs=[n.customJs]);var o={customCss:(n.customCss||[]).map((function(e){return[m(e)]})),customJs:(n.customJs||[]).map((function(e){return[m(e)]}))};return n.contentUserData&&(r.contentUserData=n.contentUserData),n.saveFreq&&(H5PIntegration.saveFreq=n.saveFreq),n.postUserStatistics&&(H5PIntegration.postUserStatistics=!1),n.ajax&&n.ajax.setFinishedUrl&&(H5PIntegration.ajax.setFinished=n.ajax.setFinishedUrl),n.user&&(H5PIntegration.user=n.user),n.ajax&&n.ajax.contentUserDataUrl&&(H5PIntegration.ajax.contentUserData=n.ajax.contentUserDataUrl),this.initElement(t),this.initH5P(i,r,o)}var t,n,r,i,o,a;return t=e,(n=[{key:"initElement",value:function(e){if(!(e instanceof HTMLElement))throw new Error("createH5P must be passed an element");var t=document.createElement("div");t.classList.add("h5p-iframe-wrapper"),t.style.backgroundColor="#DDD;";var n=document.createElement("iframe");n.id="h5p-iframe-".concat(this.id),n.src="about:blank",n.classList.add("h5p-iframe"),n.setAttribute("scrolling","no"),n.setAttribute("data-content-id","".concat(this.id)),n.setAttribute("frameBorder",0),n.style.width="100%",n.style.height="100%",n.style.border="none",n.style.display="block",t.append(n),e.append(t),n.contentWindow.jQuery=null}},{key:"initH5P",value:(a=s(u().mark((function e(t,n,r){var i,o,a,s,c,l,d,f,p;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getJSON("".concat(this.h5pJsonPath,"/h5p.json"));case 2:return this.h5p=e.sent,e.next=5,this.getJSON("".concat(this.contentUrl,"/content.json"));case 5:return i=e.sent,e.next=8,this.checkIfPathIncludesVersion();case 8:return H5PIntegration.pathIncludesVersion=this.pathIncludesVersion=e.sent,e.next=11,this.findMainLibrary();case 11:return this.mainLibrary=e.sent,e.next=14,this.findAllDependencies();case 14:for(l in o=e.sent,a=this.sortDependencies(o,r),s=a.styles,c=a.scripts,H5PIntegration.urlLibraries=this.librariesPath,H5PIntegration.contents=H5PIntegration.contents?H5PIntegration.contents:{},H5PIntegration.core={styles:t.coreStyles,scripts:t.coreScripts},H5PIntegration.contents["cid-".concat(this.id)]={library:"".concat(this.mainLibrary.machineName," ").concat(this.mainLibrary.majorVersion,".").concat(this.mainLibrary.minorVersion),jsonContent:JSON.stringify(i),styles:s,scripts:c,displayOptions:n.displayOptions,contentUrl:this.contentUrl,metadata:{}},n)null==H5PIntegration.contents["cid-".concat(this.id)][l]&&(H5PIntegration.contents["cid-".concat(this.id)][l]=n[l]);for(d in this.h5p)void 0===(null===(f=H5PIntegration.contents["cid-".concat(this.id)])||void 0===f||null===(p=f.metadata)||void 0===p?void 0:p[d])&&(H5PIntegration.contents["cid-".concat(this.id)].metadata[d]=this.h5p[d]);t.preventH5PInit||v.init();case 23:case"end":return e.stop()}}),e,this)}))),function(e,t,n){return a.apply(this,arguments)})},{key:"getJSON",value:function(e){return fetch(e).then((function(e){return e.json()}))}},{key:"checkIfPathIncludesVersion",value:(o=s(u().mark((function e(){var t,n,r;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.h5p.preloadedDependencies[0],n=t.machineName+"-"+t.majorVersion+"."+t.minorVersion,e.prev=2,e.next=5,this.getJSON("".concat(this.librariesPath,"/").concat(n,"/library.json"));case 5:r=!0,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),r=!1;case 11:return e.abrupt("return",r);case 12:case"end":return e.stop()}}),e,this,[[2,8]])}))),function(){return o.apply(this,arguments)})},{key:"libraryPath",value:function(e){return e.machineName+(this.pathIncludesVersion?"-"+e.majorVersion+"."+e.minorVersion:"")}},{key:"findMainLibrary",value:function(){var e=this,t=this.h5p.preloadedDependencies.find((function(t){return t.machineName===e.h5p.mainLibrary}));return this.mainLibraryPath=this.h5p.mainLibrary+(this.pathIncludesVersion?"-"+t.majorVersion+"."+t.minorVersion:""),this.getJSON("".concat(this.librariesPath,"/").concat(this.mainLibraryPath,"/library.json"))}},{key:"findAllDependencies",value:function(){var e=this,t=this.h5p.preloadedDependencies.map((function(t){return e.libraryPath(t)}));return this.loadDependencies(t,[])}},{key:"loadDependencies",value:(i=s(u().mark((function e(t,n){var r,i,o,a=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n,i=[],e.next=4,Promise.all(t.map((function(e){return a.findLibraryDependencies(e)})));case 4:if((o=e.sent).forEach((function(e){r.push(e),e.dependencies.forEach((function(e){r.find((function(t){return t.libraryPath===e}))||o.find((function(t){return t.libraryPath===e}))||i.push(e)}))})),!(i.length>0)){e.next=8;break}return e.abrupt("return",this.loadDependencies(i,r));case 8:return e.abrupt("return",r);case 9:case"end":return e.stop()}}),e,this)}))),function(e,t){return i.apply(this,arguments)})},{key:"findLibraryDependencies",value:(r=s(u().mark((function e(t){var n,r,i,o=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getJSON("".concat(this.librariesPath,"/").concat(t,"/library.json"));case 2:return n=e.sent,r=this.libraryPath(n),i=[],n.preloadedDependencies&&(i=n.preloadedDependencies.map((function(e){return o.libraryPath(e)}))),e.abrupt("return",{libraryPath:r,dependencies:i,preloadedCss:n.preloadedCss,preloadedJs:n.preloadedJs});case 7:case"end":return e.stop()}}),e,this)}))),function(e){return r.apply(this,arguments)})},{key:"sortDependencies",value:function(e,t){var n=this,r=new(f()),i={},o={};e.forEach((function(e){r.add(e.libraryPath,e.dependencies),e.preloadedCss&&(i[e.libraryPath]=i[e.libraryPath]?i[e.libraryPath]:[],e.preloadedCss.forEach((function(t){i[e.libraryPath].push("".concat(n.librariesPath,"/").concat(e.libraryPath,"/").concat(t.path))}))),e.preloadedJs&&(o[e.libraryPath]=o[e.libraryPath]?o[e.libraryPath]:[],e.preloadedJs.forEach((function(t){o[e.libraryPath].push("".concat(n.librariesPath,"/").concat(e.libraryPath,"/").concat(t.path))})))}));var a=[],s=[];return r.sort().reverse().forEach((function(e){Array.prototype.push.apply(a,i[e]),Array.prototype.push.apply(s,o[e])})),a=a.concat(t.customCss),s=s.concat(t.customJs),{styles:a,scripts:s}}}])&&c(t.prototype,n),e}();n(449),n(268),n(2),n(798),window.H5P.preventInit=!0;const b={H5P:y}})(),r.default})()}));

/***/ }),

/***/ "./node_modules/https-browserify/index.js":
/*!************************************************!*\
  !*** ./node_modules/https-browserify/index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js")
var url = __webpack_require__(/*! url */ "./node_modules/url/url.js")

var https = module.exports

for (var key in http) {
  if (http.hasOwnProperty(key)) https[key] = http[key]
}

https.request = function (params, cb) {
  params = validateParams(params)
  return http.request.call(this, params, cb)
}

https.get = function (params, cb) {
  params = validateParams(params)
  return http.get.call(this, params, cb)
}

function validateParams (params) {
  if (typeof params === 'string') {
    params = url.parse(params)
  }
  if (!params.protocol) {
    params.protocol = 'https:'
  }
  if (params.protocol !== 'https:') {
    throw new Error('Protocol "' + params.protocol + '" not supported. Expected "https:"')
  }
  return params
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/os-browserify/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/os-browserify/browser.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/querystring/decode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ "./node_modules/querystring/encode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ "./node_modules/querystring/index.js":
/*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring/encode.js");


/***/ }),

/***/ "./node_modules/readable-stream/errors-browser.js":
/*!********************************************************!*\
  !*** ./node_modules/readable-stream/errors-browser.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;


/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_duplex.js":
/*!************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_duplex.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = __webpack_require__(/*! ./_stream_readable */ "./node_modules/readable-stream/lib/_stream_readable.js");

var Writable = __webpack_require__(/*! ./_stream_writable */ "./node_modules/readable-stream/lib/_stream_writable.js");

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_passthrough.js":
/*!*****************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_passthrough.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.


module.exports = PassThrough;

var Transform = __webpack_require__(/*! ./_stream_transform */ "./node_modules/readable-stream/lib/_stream_transform.js");

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_readable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_readable.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = (__webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter);

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/


var Buffer = (__webpack_require__(/*! buffer */ "./node_modules/buffer/index.js").Buffer);

var OurUint8Array = __webpack_require__.g.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = __webpack_require__(/*! util */ "?d17e");

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = __webpack_require__(/*! ./internal/streams/buffer_list */ "./node_modules/readable-stream/lib/internal/streams/buffer_list.js");

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");

var _require = __webpack_require__(/*! ./internal/streams/state */ "./node_modules/readable-stream/lib/internal/streams/state.js"),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = (__webpack_require__(/*! ../errors */ "./node_modules/readable-stream/errors-browser.js").codes),
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = (__webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder);
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = (__webpack_require__(/*! string_decoder/ */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder);
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = __webpack_require__(/*! ./internal/streams/async_iterator */ "./node_modules/readable-stream/lib/internal/streams/async_iterator.js");
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = __webpack_require__(/*! ./internal/streams/from */ "./node_modules/readable-stream/lib/internal/streams/from-browser.js");
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_transform.js":
/*!***************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_transform.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.


module.exports = Transform;

var _require$codes = (__webpack_require__(/*! ../errors */ "./node_modules/readable-stream/errors-browser.js").codes),
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

/***/ }),

/***/ "./node_modules/readable-stream/lib/_stream_writable.js":
/*!**************************************************************!*\
  !*** ./node_modules/readable-stream/lib/_stream_writable.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.


module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: __webpack_require__(/*! util-deprecate */ "./node_modules/util-deprecate/browser.js")
};
/*</replacement>*/

/*<replacement>*/

var Stream = __webpack_require__(/*! ./internal/streams/stream */ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js");
/*</replacement>*/


var Buffer = (__webpack_require__(/*! buffer */ "./node_modules/buffer/index.js").Buffer);

var OurUint8Array = __webpack_require__.g.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = __webpack_require__(/*! ./internal/streams/destroy */ "./node_modules/readable-stream/lib/internal/streams/destroy.js");

var _require = __webpack_require__(/*! ./internal/streams/state */ "./node_modules/readable-stream/lib/internal/streams/state.js"),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = (__webpack_require__(/*! ../errors */ "./node_modules/readable-stream/errors-browser.js").codes),
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

__webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js");
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(/*! ./_stream_duplex */ "./node_modules/readable-stream/lib/_stream_duplex.js"); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/async_iterator.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/async_iterator.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");


var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = __webpack_require__(/*! ./end-of-stream */ "./node_modules/readable-stream/lib/internal/streams/end-of-stream.js");

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/buffer_list.js":
/*!**************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/buffer_list.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js"),
    Buffer = _require.Buffer;

var _require2 = __webpack_require__(/*! util */ "?ed1b"),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/destroy.js":
/*!**********************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/destroy.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
 // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/end-of-stream.js":
/*!****************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/end-of-stream.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).


var ERR_STREAM_PREMATURE_CLOSE = (__webpack_require__(/*! ../../../errors */ "./node_modules/readable-stream/errors-browser.js").codes.ERR_STREAM_PREMATURE_CLOSE);

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/from-browser.js":
/*!***************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/from-browser.js ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};


/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/pipeline.js":
/*!***********************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/pipeline.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).


var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = (__webpack_require__(/*! ../../../errors */ "./node_modules/readable-stream/errors-browser.js").codes),
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = __webpack_require__(/*! ./end-of-stream */ "./node_modules/readable-stream/lib/internal/streams/end-of-stream.js");
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/state.js":
/*!********************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/state.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ERR_INVALID_OPT_VALUE = (__webpack_require__(/*! ../../../errors */ "./node_modules/readable-stream/errors-browser.js").codes.ERR_INVALID_OPT_VALUE);

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};

/***/ }),

/***/ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/readable-stream/lib/internal/streams/stream-browser.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;


/***/ }),

/***/ "./node_modules/readable-stream/readable-browser.js":
/*!**********************************************************!*\
  !*** ./node_modules/readable-stream/readable-browser.js ***!
  \**********************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ./lib/_stream_readable.js */ "./node_modules/readable-stream/lib/_stream_readable.js");
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(/*! ./lib/_stream_writable.js */ "./node_modules/readable-stream/lib/_stream_writable.js");
exports.Duplex = __webpack_require__(/*! ./lib/_stream_duplex.js */ "./node_modules/readable-stream/lib/_stream_duplex.js");
exports.Transform = __webpack_require__(/*! ./lib/_stream_transform.js */ "./node_modules/readable-stream/lib/_stream_transform.js");
exports.PassThrough = __webpack_require__(/*! ./lib/_stream_passthrough.js */ "./node_modules/readable-stream/lib/_stream_passthrough.js");
exports.finished = __webpack_require__(/*! ./lib/internal/streams/end-of-stream.js */ "./node_modules/readable-stream/lib/internal/streams/end-of-stream.js");
exports.pipeline = __webpack_require__(/*! ./lib/internal/streams/pipeline.js */ "./node_modules/readable-stream/lib/internal/streams/pipeline.js");


/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/stream-http/index.js":
/*!*******************************************!*\
  !*** ./node_modules/stream-http/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var ClientRequest = __webpack_require__(/*! ./lib/request */ "./node_modules/stream-http/lib/request.js")
var response = __webpack_require__(/*! ./lib/response */ "./node_modules/stream-http/lib/response.js")
var extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js")
var statusCodes = __webpack_require__(/*! builtin-status-codes */ "./node_modules/builtin-status-codes/browser.js")
var url = __webpack_require__(/*! url */ "./node_modules/url/url.js")

var http = exports

http.request = function (opts, cb) {
	if (typeof opts === 'string')
		opts = url.parse(opts)
	else
		opts = extend(opts)

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = __webpack_require__.g.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

http.get = function get (opts, cb) {
	var req = http.request(opts, cb)
	req.end()
	return req
}

http.ClientRequest = ClientRequest
http.IncomingMessage = response.IncomingMessage

http.Agent = function () {}
http.Agent.defaultMaxSockets = 4

http.globalAgent = new http.Agent()

http.STATUS_CODES = statusCodes

http.METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]

/***/ }),

/***/ "./node_modules/stream-http/lib/capability.js":
/*!****************************************************!*\
  !*** ./node_modules/stream-http/lib/capability.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.fetch = isFunction(__webpack_require__.g.fetch) && isFunction(__webpack_require__.g.ReadableStream)

exports.writableStream = isFunction(__webpack_require__.g.WritableStream)

exports.abortController = isFunction(__webpack_require__.g.AbortController)

// The xhr request to example.com may violate some restrictive CSP configurations,
// so if we're running in a browser that supports `fetch`, avoid calling getXHR()
// and assume support for certain features below.
var xhr
function getXHR () {
	// Cache the xhr value
	if (xhr !== undefined) return xhr

	if (__webpack_require__.g.XMLHttpRequest) {
		xhr = new __webpack_require__.g.XMLHttpRequest()
		// If XDomainRequest is available (ie only, where xhr might not work
		// cross domain), use the page location. Otherwise use example.com
		// Note: this doesn't actually make an http request.
		try {
			xhr.open('GET', __webpack_require__.g.XDomainRequest ? '/' : 'https://example.com')
		} catch(e) {
			xhr = null
		}
	} else {
		// Service workers don't have XHR
		xhr = null
	}
	return xhr
}

function checkTypeSupport (type) {
	var xhr = getXHR()
	if (!xhr) return false
	try {
		xhr.responseType = type
		return xhr.responseType === type
	} catch (e) {}
	return false
}

// If fetch is supported, then arraybuffer will be supported too. Skip calling
// checkTypeSupport(), since that calls getXHR().
exports.arraybuffer = exports.fetch || checkTypeSupport('arraybuffer')

// These next two tests unavoidably show warnings in Chrome. Since fetch will always
// be used if it's available, just return false for these to avoid the warnings.
exports.msstream = !exports.fetch && checkTypeSupport('ms-stream')
exports.mozchunkedarraybuffer = !exports.fetch && checkTypeSupport('moz-chunked-arraybuffer')

// If fetch is supported, then overrideMimeType will be supported too. Skip calling
// getXHR().
exports.overrideMimeType = exports.fetch || (getXHR() ? isFunction(getXHR().overrideMimeType) : false)

function isFunction (value) {
	return typeof value === 'function'
}

xhr = null // Help gc


/***/ }),

/***/ "./node_modules/stream-http/lib/request.js":
/*!*************************************************!*\
  !*** ./node_modules/stream-http/lib/request.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
var response = __webpack_require__(/*! ./response */ "./node_modules/stream-http/lib/response.js")
var stream = __webpack_require__(/*! readable-stream */ "./node_modules/readable-stream/readable-browser.js")

var IncomingMessage = response.IncomingMessage
var rStates = response.readyStates

function decideMode (preferBinary, useFetch) {
	if (capability.fetch && useFetch) {
		return 'fetch'
	} else if (capability.mozchunkedarraybuffer) {
		return 'moz-chunked-arraybuffer'
	} else if (capability.msstream) {
		return 'ms-stream'
	} else if (capability.arraybuffer && preferBinary) {
		return 'arraybuffer'
	} else {
		return 'text'
	}
}

var ClientRequest = module.exports = function (opts) {
	var self = this
	stream.Writable.call(self)

	self._opts = opts
	self._body = []
	self._headers = {}
	if (opts.auth)
		self.setHeader('Authorization', 'Basic ' + Buffer.from(opts.auth).toString('base64'))
	Object.keys(opts.headers).forEach(function (name) {
		self.setHeader(name, opts.headers[name])
	})

	var preferBinary
	var useFetch = true
	if (opts.mode === 'disable-fetch' || ('requestTimeout' in opts && !capability.abortController)) {
		// If the use of XHR should be preferred. Not typically needed.
		useFetch = false
		preferBinary = true
	} else if (opts.mode === 'prefer-streaming') {
		// If streaming is a high priority but binary compatibility and
		// the accuracy of the 'content-type' header aren't
		preferBinary = false
	} else if (opts.mode === 'allow-wrong-content-type') {
		// If streaming is more important than preserving the 'content-type' header
		preferBinary = !capability.overrideMimeType
	} else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
		// Use binary if text streaming may corrupt data or the content-type header, or for speed
		preferBinary = true
	} else {
		throw new Error('Invalid value for opts.mode')
	}
	self._mode = decideMode(preferBinary, useFetch)
	self._fetchTimer = null
	self._socketTimeout = null
	self._socketTimer = null

	self.on('finish', function () {
		self._onFinish()
	})
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var self = this
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1)
		return

	self._headers[lowerName] = {
		name: name,
		value: value
	}
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	var self = this
	delete self._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	var self = this

	if (self._destroyed)
		return
	var opts = self._opts

	if ('timeout' in opts && opts.timeout !== 0) {
		self.setTimeout(opts.timeout)
	}

	var headersObj = self._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
        body = new Blob(self._body, {
            type: (headersObj['content-type'] || {}).value || ''
        });
    }

	// create flattened list of headers
	var headersList = []
	Object.keys(headersObj).forEach(function (keyName) {
		var name = headersObj[keyName].name
		var value = headersObj[keyName].value
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				headersList.push([name, v])
			})
		} else {
			headersList.push([name, value])
		}
	})

	if (self._mode === 'fetch') {
		var signal = null
		if (capability.abortController) {
			var controller = new AbortController()
			signal = controller.signal
			self._fetchAbortController = controller

			if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
				self._fetchTimer = __webpack_require__.g.setTimeout(function () {
					self.emit('requestTimeout')
					if (self._fetchAbortController)
						self._fetchAbortController.abort()
				}, opts.requestTimeout)
			}
		}

		__webpack_require__.g.fetch(self._opts.url, {
			method: self._opts.method,
			headers: headersList,
			body: body || undefined,
			mode: 'cors',
			credentials: opts.withCredentials ? 'include' : 'same-origin',
			signal: signal
		}).then(function (response) {
			self._fetchResponse = response
			self._resetTimers(false)
			self._connect()
		}, function (reason) {
			self._resetTimers(true)
			if (!self._destroyed)
				self.emit('error', reason)
		})
	} else {
		var xhr = self._xhr = new __webpack_require__.g.XMLHttpRequest()
		try {
			xhr.open(self._opts.method, self._opts.url, true)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}

		// Can't set responseType on really old browsers
		if ('responseType' in xhr)
			xhr.responseType = self._mode

		if ('withCredentials' in xhr)
			xhr.withCredentials = !!opts.withCredentials

		if (self._mode === 'text' && 'overrideMimeType' in xhr)
			xhr.overrideMimeType('text/plain; charset=x-user-defined')

		if ('requestTimeout' in opts) {
			xhr.timeout = opts.requestTimeout
			xhr.ontimeout = function () {
				self.emit('requestTimeout')
			}
		}

		headersList.forEach(function (header) {
			xhr.setRequestHeader(header[0], header[1])
		})

		self._response = null
		xhr.onreadystatechange = function () {
			switch (xhr.readyState) {
				case rStates.LOADING:
				case rStates.DONE:
					self._onXHRProgress()
					break
			}
		}
		// Necessary for streaming in Firefox, since xhr.response is ONLY defined
		// in onprogress, not in onreadystatechange with xhr.readyState = 3
		if (self._mode === 'moz-chunked-arraybuffer') {
			xhr.onprogress = function () {
				self._onXHRProgress()
			}
		}

		xhr.onerror = function () {
			if (self._destroyed)
				return
			self._resetTimers(true)
			self.emit('error', new Error('XHR error'))
		}

		try {
			xhr.send(body)
		} catch (err) {
			process.nextTick(function () {
				self.emit('error', err)
			})
			return
		}
	}
}

/**
 * Checks if xhr.status is readable and non-zero, indicating no error.
 * Even though the spec says it should be available in readyState 3,
 * accessing it throws an exception in IE8
 */
function statusValid (xhr) {
	try {
		var status = xhr.status
		return (status !== null && status !== 0)
	} catch (e) {
		return false
	}
}

ClientRequest.prototype._onXHRProgress = function () {
	var self = this

	self._resetTimers(false)

	if (!statusValid(self._xhr) || self._destroyed)
		return

	if (!self._response)
		self._connect()

	self._response._onXHRProgress(self._resetTimers.bind(self))
}

ClientRequest.prototype._connect = function () {
	var self = this

	if (self._destroyed)
		return

	self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode, self._resetTimers.bind(self))
	self._response.on('error', function(err) {
		self.emit('error', err)
	})

	self.emit('response', self._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	var self = this

	self._body.push(chunk)
	cb()
}

ClientRequest.prototype._resetTimers = function (done) {
	var self = this

	__webpack_require__.g.clearTimeout(self._socketTimer)
	self._socketTimer = null

	if (done) {
		__webpack_require__.g.clearTimeout(self._fetchTimer)
		self._fetchTimer = null
	} else if (self._socketTimeout) {
		self._socketTimer = __webpack_require__.g.setTimeout(function () {
			self.emit('timeout')
		}, self._socketTimeout)
	}
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function (err) {
	var self = this
	self._destroyed = true
	self._resetTimers(true)
	if (self._response)
		self._response._destroyed = true
	if (self._xhr)
		self._xhr.abort()
	else if (self._fetchAbortController)
		self._fetchAbortController.abort()

	if (err)
		self.emit('error', err)
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	var self = this
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(self, data, encoding, cb)
}

ClientRequest.prototype.setTimeout = function (timeout, cb) {
	var self = this

	if (cb)
		self.once('timeout', cb)

	self._socketTimeout = timeout
	self._resetTimers(false)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]


/***/ }),

/***/ "./node_modules/stream-http/lib/response.js":
/*!**************************************************!*\
  !*** ./node_modules/stream-http/lib/response.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
var capability = __webpack_require__(/*! ./capability */ "./node_modules/stream-http/lib/capability.js")
var inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js")
var stream = __webpack_require__(/*! readable-stream */ "./node_modules/readable-stream/readable-browser.js")

var rStates = exports.readyStates = {
	UNSENT: 0,
	OPENED: 1,
	HEADERS_RECEIVED: 2,
	LOADING: 3,
	DONE: 4
}

var IncomingMessage = exports.IncomingMessage = function (xhr, response, mode, resetTimers) {
	var self = this
	stream.Readable.call(self)

	self._mode = mode
	self.headers = {}
	self.rawHeaders = []
	self.trailers = {}
	self.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	self.on('end', function () {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(function () {
			self.emit('close')
		})
	})

	if (mode === 'fetch') {
		self._fetchResponse = response

		self.url = response.url
		self.statusCode = response.status
		self.statusMessage = response.statusText
		
		response.headers.forEach(function (header, key){
			self.headers[key.toLowerCase()] = header
			self.rawHeaders.push(key, header)
		})

		if (capability.writableStream) {
			var writable = new WritableStream({
				write: function (chunk) {
					resetTimers(false)
					return new Promise(function (resolve, reject) {
						if (self._destroyed) {
							reject()
						} else if(self.push(Buffer.from(chunk))) {
							resolve()
						} else {
							self._resumeFetch = resolve
						}
					})
				},
				close: function () {
					resetTimers(true)
					if (!self._destroyed)
						self.push(null)
				},
				abort: function (err) {
					resetTimers(true)
					if (!self._destroyed)
						self.emit('error', err)
				}
			})

			try {
				response.body.pipeTo(writable).catch(function (err) {
					resetTimers(true)
					if (!self._destroyed)
						self.emit('error', err)
				})
				return
			} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
		}
		// fallback for when writableStream or pipeTo aren't available
		var reader = response.body.getReader()
		function read () {
			reader.read().then(function (result) {
				if (self._destroyed)
					return
				resetTimers(result.done)
				if (result.done) {
					self.push(null)
					return
				}
				self.push(Buffer.from(result.value))
				read()
			}).catch(function (err) {
				resetTimers(true)
				if (!self._destroyed)
					self.emit('error', err)
			})
		}
		read()
	} else {
		self._xhr = xhr
		self._pos = 0

		self.url = xhr.responseURL
		self.statusCode = xhr.status
		self.statusMessage = xhr.statusText
		var headers = xhr.getAllResponseHeaders().split(/\r?\n/)
		headers.forEach(function (header) {
			var matches = header.match(/^([^:]+):\s*(.*)/)
			if (matches) {
				var key = matches[1].toLowerCase()
				if (key === 'set-cookie') {
					if (self.headers[key] === undefined) {
						self.headers[key] = []
					}
					self.headers[key].push(matches[2])
				} else if (self.headers[key] !== undefined) {
					self.headers[key] += ', ' + matches[2]
				} else {
					self.headers[key] = matches[2]
				}
				self.rawHeaders.push(matches[1], matches[2])
			}
		})

		self._charset = 'x-user-defined'
		if (!capability.overrideMimeType) {
			var mimeType = self.rawHeaders['mime-type']
			if (mimeType) {
				var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/)
				if (charsetMatch) {
					self._charset = charsetMatch[1].toLowerCase()
				}
			}
			if (!self._charset)
				self._charset = 'utf-8' // best guess
		}
	}
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var self = this

	var resolve = self._resumeFetch
	if (resolve) {
		self._resumeFetch = null
		resolve()
	}
}

IncomingMessage.prototype._onXHRProgress = function (resetTimers) {
	var self = this

	var xhr = self._xhr

	var response = null
	switch (self._mode) {
		case 'text':
			response = xhr.responseText
			if (response.length > self._pos) {
				var newData = response.substr(self._pos)
				if (self._charset === 'x-user-defined') {
					var buffer = Buffer.alloc(newData.length)
					for (var i = 0; i < newData.length; i++)
						buffer[i] = newData.charCodeAt(i) & 0xff

					self.push(buffer)
				} else {
					self.push(newData, self._charset)
				}
				self._pos = response.length
			}
			break
		case 'arraybuffer':
			if (xhr.readyState !== rStates.DONE || !xhr.response)
				break
			response = xhr.response
			self.push(Buffer.from(new Uint8Array(response)))
			break
		case 'moz-chunked-arraybuffer': // take whole
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING || !response)
				break
			self.push(Buffer.from(new Uint8Array(response)))
			break
		case 'ms-stream':
			response = xhr.response
			if (xhr.readyState !== rStates.LOADING)
				break
			var reader = new __webpack_require__.g.MSStreamReader()
			reader.onprogress = function () {
				if (reader.result.byteLength > self._pos) {
					self.push(Buffer.from(new Uint8Array(reader.result.slice(self._pos))))
					self._pos = reader.result.byteLength
				}
			}
			reader.onload = function () {
				resetTimers(true)
				self.push(null)
			}
			// reader.onerror = ??? // TODO: this
			reader.readAsArrayBuffer(response)
			break
	}

	// The ms-stream case handles end separately in reader.onload()
	if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
		resetTimers(true)
		self.push(null)
	}
}


/***/ }),

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = (__webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer);
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "./node_modules/tincanjs/build/tincan-node.js":
/*!****************************************************!*\
  !*** ./node_modules/tincanjs/build/tincan-node.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"0.50.0";
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
d)).finalize(c)}}});var w=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;
    var C_enc = C.enc;

    /**
     * Base64 encoding strategy.
     */
    var Base64 = C_enc.Base64 = {
        /**
         * Converts a word array to a Base64 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Base64 string.
         *
         * @static
         *
         * @example
         *
         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
         */
        stringify: function (wordArray) {
            // Shortcuts
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;

            // Clamp excess bits
            wordArray.clamp();

            // Convert
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                }
            }

            // Add padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                while (base64Chars.length % 4) {
                    base64Chars.push(paddingChar);
                }
            }

            return base64Chars.join('');
        },

        /**
         * Converts a Base64 string to a word array.
         *
         * @param {string} base64Str The Base64 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
         */
        parse: function (base64Str) {
            // Shortcuts
            var base64StrLength = base64Str.length;
            var map = this._map;

            // Ignore padding
            var paddingChar = map.charAt(64);
            if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex != -1) {
                    base64StrLength = paddingIndex;
                }
            }

            // Convert
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
                if (i % 4) {
                    var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
                    var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
                    words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                    nBytes++;
                }
            }

            return WordArray.create(words, nBytes);
        },

        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    };
}());

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
    // Check if typed arrays are supported
    if (typeof ArrayBuffer != 'function') {
        return;
    }

    // Shortcuts
    var C = CryptoJS;
    var C_lib = C.lib;
    var WordArray = C_lib.WordArray;

    // Reference original init
    var superInit = WordArray.init;

    // Augment WordArray.init to handle typed arrays
    var subInit = WordArray.init = function (typedArray) {
        // Convert buffers to uint8
        if (typedArray instanceof ArrayBuffer) {
            typedArray = new Uint8Array(typedArray);
        }

        // Convert other array views to uint8
        if (
            typedArray instanceof Int8Array ||
            typedArray instanceof Uint8ClampedArray ||
            typedArray instanceof Int16Array ||
            typedArray instanceof Uint16Array ||
            typedArray instanceof Int32Array ||
            typedArray instanceof Uint32Array ||
            typedArray instanceof Float32Array ||
            typedArray instanceof Float64Array
        ) {
            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
        }

        // Handle Uint8Array
        if (typedArray instanceof Uint8Array) {
            // Shortcut
            var typedArrayByteLength = typedArray.byteLength;

            // Extract bytes
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) {
                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
            }

            // Initialize this word array
            superInit.call(this, words, typedArrayByteLength);
        } else {
            // Else call normal init
            superInit.apply(this, arguments);
        }
    };

    subInit.prototype = WordArray;
}());

/*!
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

TODO:

* Add statement queueing

@module TinCan
**/
var TinCan;

(function () {
    "use strict";
    var _reservedQSParams = {
        //
        // these are TC spec reserved words that may end up in queries to the endpoint
        //
        statementId:       true,
        voidedStatementId: true,
        verb:              true,
        object:            true,
        registration:      true,
        context:           true,
        actor:             true,
        since:             true,
        until:             true,
        limit:             true,
        authoritative:     true,
        sparse:            true,
        instructor:        true,
        ascending:         true,
        continueToken:     true,
        agent:             true,
        activityId:        true,
        stateId:           true,
        profileId:         true,

        //
        // these are suggested by the LMS launch spec addition that TinCanJS consumes
        //
        activity_platform: true,
        grouping:          true,
        "Accept-Language": true
    };

    /**
    @class TinCan
    @constructor
    @param {Object} [options] Configuration used to initialize.
        @param {String} [options.url] URL for determining launch provided
            configuration options
        @param {Array} [options.recordStores] list of pre-configured LRSes
        @param {Object|TinCan.Agent} [options.actor] default actor
        @param {Object|TinCan.Activity} [options.activity] default activity
        @param {String} [options.registration] default registration
        @param {Object|TinCan.Context} [options.context] default context
    **/
    TinCan = function (cfg) {
        this.log("constructor");

        /**
        @property recordStores
        @type Array
        */
        this.recordStores = [];

        /**
        Default actor used when preparing statements that
        don't yet have an actor set, and for saving state, etc.

        @property actor
        @type Object
        */
        this.actor = null;

        /**
        Default activity, may be used as a statement 'target'
        or incorporated into 'context'

        @property activity
        @type Object
        */
        this.activity = null;

        /**
        Default registration, included in default context when
        provided, otherwise used in statement queries

        @property registration
        @type String
        */
        this.registration = null;

        /**
        Default context used when preparing statements that
        don't yet have a context set, or mixed in when one
        has been provided, properties do NOT override on mixing

        @property context
        @type Object
        */
        this.context = null;

        this.init(cfg);
    };

    TinCan.prototype = {
        LOG_SRC: "TinCan",

        /**
        Safe version of logging, only displays when .DEBUG is true, and console.log
        is available

        @method log
        @param {String} msg Message to output
        */
        log: function (msg, src) {
            /* globals console */
            if (TinCan.DEBUG && typeof console !== "undefined" && console.log) {
                src = src || this.LOG_SRC || "TinCan";

                console.log("TinCan." + src + ": " + msg);
            }
        },

        /**
        @method init
        @param {Object} [options] Configuration used to initialize (see TinCan constructor).
        */
        init: function (cfg) {
            this.log("init");
            var i;

            cfg = cfg || {};

            if (cfg.hasOwnProperty("url") && cfg.url !== "") {
                this._initFromQueryString(cfg.url);
            }

            if (cfg.hasOwnProperty("recordStores") && cfg.recordStores !== undefined) {
                for (i = 0; i < cfg.recordStores.length; i += 1) {
                    this.addRecordStore(cfg.recordStores[i]);
                }
            }
            if (cfg.hasOwnProperty("activity")) {
                if (cfg.activity instanceof TinCan.Activity) {
                    this.activity = cfg.activity;
                }
                else {
                    this.activity = new TinCan.Activity (cfg.activity);
                }
            }
            if (cfg.hasOwnProperty("actor")) {
                if (cfg.actor instanceof TinCan.Agent) {
                    this.actor = cfg.actor;
                }
                else {
                    this.actor = new TinCan.Agent (cfg.actor);
                }
            }
            if (cfg.hasOwnProperty("context")) {
                if (cfg.context instanceof TinCan.Context) {
                    this.context = cfg.context;
                }
                else {
                    this.context = new TinCan.Context (cfg.context);
                }
            }
            if (cfg.hasOwnProperty("registration")) {
                this.registration = cfg.registration;
            }
        },

        /**
        @method _initFromQueryString
        @param {String} url
        @private
        */
        _initFromQueryString: function (url) {
            this.log("_initFromQueryString");

            var i,
                prop,
                qsParams = TinCan.Utils.parseURL(url).params,
                lrsProps = ["endpoint", "auth"],
                lrsCfg = {},
                contextCfg,
                extended = null
            ;

            if (qsParams.hasOwnProperty("actor")) {
                this.log("_initFromQueryString - found actor: " + qsParams.actor);
                try {
                    this.actor = TinCan.Agent.fromJSON(qsParams.actor);
                    delete qsParams.actor;
                }
                catch (ex) {
                    this.log("_initFromQueryString - failed to set actor: " + ex);
                }
            }

            if (qsParams.hasOwnProperty("activity_id")) {
                this.activity = new TinCan.Activity (
                    {
                        id: qsParams.activity_id
                    }
                );
                delete qsParams.activity_id;
            }

            if (
                qsParams.hasOwnProperty("activity_platform") ||
                qsParams.hasOwnProperty("registration") ||
                qsParams.hasOwnProperty("grouping")
            ) {
                contextCfg = {};

                if (qsParams.hasOwnProperty("activity_platform")) {
                    contextCfg.platform = qsParams.activity_platform;
                    delete qsParams.activity_platform;
                }
                if (qsParams.hasOwnProperty("registration")) {
                    //
                    // stored in two locations cause we always want it in the default
                    // context, but we also want to be able to get to it for Statement
                    // queries
                    //
                    contextCfg.registration = this.registration = qsParams.registration;
                    delete qsParams.registration;
                }
                if (qsParams.hasOwnProperty("grouping")) {
                    contextCfg.contextActivities = {};
                    contextCfg.contextActivities.grouping = qsParams.grouping;
                    delete qsParams.grouping;
                }

                this.context = new TinCan.Context (contextCfg);
            }

            //
            // order matters here, process the URL provided LRS last because it gets
            // all the remaining parameters so that they get passed through
            //
            if (qsParams.hasOwnProperty("endpoint")) {
                for (i = 0; i < lrsProps.length; i += 1) {
                    prop = lrsProps[i];
                    if (qsParams.hasOwnProperty(prop)) {
                        lrsCfg[prop] = qsParams[prop];
                        delete qsParams[prop];
                    }
                }

                // remove our reserved params so they don't end up  in the extended object
                for (i in qsParams) {
                    if (qsParams.hasOwnProperty(i)) {
                        if (_reservedQSParams.hasOwnProperty(i)) {
                            delete qsParams[i];
                        } else {
                            extended = extended || {};
                            extended[i] = qsParams[i];
                        }
                    }
                }
                if (extended !== null) {
                    lrsCfg.extended = extended;
                }

                lrsCfg.allowFail = false;

                this.addRecordStore(lrsCfg);
            }
        },

        /**
        @method addRecordStore
        @param {Object} Configuration data

         * TODO:
         * check endpoint for trailing '/'
         * check for unique endpoints
        */
        addRecordStore: function (cfg) {
            this.log("addRecordStore");
            var lrs;
            if (cfg instanceof TinCan.LRS) {
                lrs = cfg;
            }
            else {
                lrs = new TinCan.LRS (cfg);
            }
            this.recordStores.push(lrs);
        },

        /**
        @method prepareStatement
        @param {Object|TinCan.Statement} Base statement properties or
            pre-created TinCan.Statement instance
        @return {TinCan.Statement}
        */
        prepareStatement: function (stmt) {
            this.log("prepareStatement");
            if (! (stmt instanceof TinCan.Statement)) {
                stmt = new TinCan.Statement (stmt);
            }

            if (stmt.actor === null && this.actor !== null) {
                stmt.actor = this.actor;
            }
            if (stmt.target === null && this.activity !== null) {
                stmt.target = this.activity;
            }

            if (this.context !== null) {
                if (stmt.context === null) {
                    stmt.context = this.context;
                }
                else {
                    if (stmt.context.registration === null) {
                        stmt.context.registration = this.context.registration;
                    }
                    if (stmt.context.platform === null) {
                        stmt.context.platform = this.context.platform;
                    }

                    if (this.context.contextActivities !== null) {
                        if (stmt.context.contextActivities === null) {
                            stmt.context.contextActivities = this.context.contextActivities;
                        }
                        else {
                            if (this.context.contextActivities.grouping !== null && stmt.context.contextActivities.grouping === null) {
                                stmt.context.contextActivities.grouping = this.context.contextActivities.grouping;
                            }
                            if (this.context.contextActivities.parent !== null && stmt.context.contextActivities.parent === null) {
                                stmt.context.contextActivities.parent = this.context.contextActivities.parent;
                            }
                            if (this.context.contextActivities.other !== null && stmt.context.contextActivities.other === null) {
                                stmt.context.contextActivities.other = this.context.contextActivities.other;
                            }
                        }
                    }
                }
            }

            return stmt;
        },

        /**
        Calls saveStatement on each configured LRS, provide callback to make it asynchronous

        @method sendStatement
        @param {TinCan.Statement|Object} statement Send statement to LRS
        @param {Function} [callback] Callback function to execute on completion
        */
        sendStatement: function (stmt, callback) {
            this.log("sendStatement");

            // would prefer to use .bind instead of 'self'
            var self = this,
                lrs,
                statement = this.prepareStatement(stmt),
                rsCount = this.recordStores.length,
                i,
                results = [],
                callbackWrapper,
                callbackResults = []
            ;

            if (rsCount > 0) {
                /*
                   if there is a callback that is a function then we need
                   to wrap that function with a function that becomes
                   the new callback that reduces a closure count of the
                   requests that don't have allowFail set to true and
                   when that number hits zero then the original callback
                   is executed
                */
                if (typeof callback === "function") {
                    callbackWrapper = function (err, xhr) {
                        var args;

                        self.log("sendStatement - callbackWrapper: " + rsCount);
                        if (rsCount > 1) {
                            rsCount -= 1;
                            callbackResults.push(
                                {
                                    err: err,
                                    xhr: xhr
                                }
                            );
                        }
                        else if (rsCount === 1) {
                            callbackResults.push(
                                {
                                    err: err,
                                    xhr: xhr
                                }
                            );
                            args = [
                                callbackResults,
                                statement
                            ];
                            callback.apply(this, args);
                        }
                        else {
                            self.log("sendStatement - unexpected record store count: " + rsCount);
                        }
                    };
                }

                for (i = 0; i < rsCount; i += 1) {
                    lrs = this.recordStores[i];

                    results.push(
                        lrs.saveStatement(statement, { callback: callbackWrapper })
                    );
                }
            }
            else {
                this.log("[warning] sendStatement: No LRSs added yet (statement not sent)");
                if (typeof callback === "function") {
                    callback.apply(this, [ null, statement ]);
                }
            }

            return {
                statement: statement,
                results: results
            };
        },

        /**
        Calls retrieveStatement on the first LRS, provide callback to make it asynchronous

        @method getStatement
        @param {String} [stmtId] Statement ID to get
        @param {Function} [callback] Callback function to execute on completion
        @param {Object} [cfg] Configuration data
            @param {Object} [params] Query parameters
                @param {Boolean} [attachments] Include attachments in multipart response or don't (defualt: false)
        @return {Array|Result} Array of results, or single result

        TODO: make TinCan track statements it has seen in a local cache to be returned easily
        */
        getStatement: function (stmtId, callback, cfg) {
            this.log("getStatement");

            var lrs;

            cfg = cfg || {};
            cfg.params = cfg.params || {};

            if (this.recordStores.length > 0) {
                //
                // for statements (for now) we only need to read from the first LRS
                // in the future it may make sense to get all from all LRSes and
                // compare to remove duplicates or allow inspection of them for differences?
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                return lrs.retrieveStatement(stmtId, { callback: callback, params: cfg.params });
            }

            this.log("[warning] getStatement: No LRSs added yet (statement not retrieved)");
        },

        /**
        Creates a statement used for voiding the passed statement/statement ID and calls
        send statement with the voiding statement.

        @method voidStatement
        @param {TinCan.Statement|String} statement Statement or statement ID to void
        @param {Function} [callback] Callback function to execute on completion
        @param {Object} [options] Options used to build voiding statement
            @param {TinCan.Agent} [options.actor] Agent to be used as 'actor' in voiding statement
        */
        voidStatement: function (stmt, callback, options) {
            this.log("voidStatement");

            // would prefer to use .bind instead of 'self'
            var self = this,
                lrs,
                actor,
                voidingStatement,
                rsCount = this.recordStores.length,
                i,
                results = [],
                callbackWrapper,
                callbackResults = []
            ;

            if (stmt instanceof TinCan.Statement) {
                stmt = stmt.id;
            }

            if (typeof options.actor !== "undefined") {
                actor = options.actor;
            }
            else if (this.actor !== null) {
                actor = this.actor;
            }

            voidingStatement = new TinCan.Statement(
                {
                    actor: actor,
                    verb: {
                        id: "http://adlnet.gov/expapi/verbs/voided"
                    },
                    target: {
                        objectType: "StatementRef",
                        id: stmt
                    }
                }
            );

            if (rsCount > 0) {
                /*
                   if there is a callback that is a function then we need
                   to wrap that function with a function that becomes
                   the new callback that reduces a closure count of the
                   requests that don't have allowFail set to true and
                   when that number hits zero then the original callback
                   is executed
                */
                if (typeof callback === "function") {
                    callbackWrapper = function (err, xhr) {
                        var args;

                        self.log("voidStatement - callbackWrapper: " + rsCount);
                        if (rsCount > 1) {
                            rsCount -= 1;
                            callbackResults.push(
                                {
                                    err: err,
                                    xhr: xhr
                                }
                            );
                        }
                        else if (rsCount === 1) {
                            callbackResults.push(
                                {
                                    err: err,
                                    xhr: xhr
                                }
                            );
                            args = [
                                callbackResults,
                                voidingStatement
                            ];
                            callback.apply(this, args);
                        }
                        else {
                            self.log("voidStatement - unexpected record store count: " + rsCount);
                        }
                    };
                }

                for (i = 0; i < rsCount; i += 1) {
                    lrs = this.recordStores[i];

                    results.push(
                        lrs.saveStatement(voidingStatement, { callback: callbackWrapper })
                    );
                }
            }
            else {
                this.log("[warning] voidStatement: No LRSs added yet (statement not sent)");
                if (typeof callback === "function") {
                    callback.apply(this, [ null, voidingStatement ]);
                }
            }

            return {
                statement: voidingStatement,
                results: results
            };
        },

        /**
        Calls retrieveVoidedStatement on the first LRS, provide callback to make it asynchronous

        @method getVoidedStatement
        @param {String} statement Statement ID to get
        @param {Function} [callback] Callback function to execute on completion
        @return {Array|Result} Array of results, or single result

        TODO: make TinCan track voided statements it has seen in a local cache to be returned easily
        */
        getVoidedStatement: function (stmtId, callback) {
            this.log("getVoidedStatement");

            var lrs;

            if (this.recordStores.length > 0) {
                //
                // for statements (for now) we only need to read from the first LRS
                // in the future it may make sense to get all from all LRSes and
                // compare to remove duplicates or allow inspection of them for differences?
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                return lrs.retrieveVoidedStatement(stmtId, { callback: callback });
            }

            this.log("[warning] getVoidedStatement: No LRSs added yet (statement not retrieved)");
        },

        /**
        Calls saveStatements with list of prepared statements

        @method sendStatements
        @param {Array} Array of statements to send
        @param {Function} Callback function to execute on completion
        */
        sendStatements: function (stmts, callback) {
            this.log("sendStatements");
            var self = this,
                lrs,
                statements = [],
                rsCount = this.recordStores.length,
                i,
                results = [],
                callbackWrapper,
                callbackResults = []
            ;
            if (stmts.length === 0) {
                if (typeof callback === "function") {
                    callback.apply(this, [ null, statements ]);
                }
            }
            else {
                for (i = 0; i < stmts.length; i += 1) {
                    statements.push(
                        this.prepareStatement(stmts[i])
                    );
                }

                if (rsCount > 0) {
                    /*
                       if there is a callback that is a function then we need
                       to wrap that function with a function that becomes
                       the new callback that reduces a closure count of the
                       requests that don't have allowFail set to true and
                       when that number hits zero then the original callback
                       is executed
                    */

                    if (typeof callback === "function") {
                        callbackWrapper = function (err, xhr) {
                            var args;

                            self.log("sendStatements - callbackWrapper: " + rsCount);
                            if (rsCount > 1) {
                                rsCount -= 1;
                                callbackResults.push(
                                    {
                                        err: err,
                                        xhr: xhr
                                    }
                                );
                            }
                            else if (rsCount === 1) {
                                callbackResults.push(
                                    {
                                        err: err,
                                        xhr: xhr
                                    }
                                );
                                args = [
                                    callbackResults,
                                    statements
                                ];
                                callback.apply(this, args);
                            }
                            else {
                                self.log("sendStatements - unexpected record store count: " + rsCount);
                            }
                        };
                    }

                    for (i = 0; i < rsCount; i += 1) {
                        lrs = this.recordStores[i];

                        results.push(
                            lrs.saveStatements(statements, { callback: callbackWrapper })
                        );
                    }
                }
                else {
                    this.log("[warning] sendStatements: No LRSs added yet (statements not sent)");
                    if (typeof callback === "function") {
                        callback.apply(this, [ null, statements ]);
                    }
                }
            }

            return {
                statements: statements,
                results: results
            };
        },

        /**
        @method getStatements
        @param {Object} [cfg] Configuration for request
            @param {Boolean} [cfg.sendActor] Include default actor in query params
            @param {Boolean} [cfg.sendActivity] Include default activity in query params
            @param {Object} [cfg.params] Parameters used to filter.
                            These are the same as those accepted by the
                            <a href="TinCan.LRS.html#method_queryStatements">LRS.queryStatements</a>
                            method.

            @param {Function} [cfg.callback] Function to run at completion

        TODO: support multiple LRSs and flag to use single
        */
        getStatements: function (cfg) {
            this.log("getStatements");
            var queryCfg = {},
                lrs,
                params
            ;
            if (this.recordStores.length > 0) {
                //
                // for get (for now) we only get from one (as they should be the same)
                // but it may make sense to long term try to merge statements, perhaps
                // by using statementId as unique
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                // TODO: need a clone function?
                params = cfg.params || {};

                if (cfg.sendActor && this.actor !== null) {
                    if (lrs.version === "0.9" || lrs.version === "0.95") {
                        params.actor = this.actor;
                    }
                    else {
                        params.agent = this.actor;
                    }
                }
                if (cfg.sendActivity && this.activity !== null) {
                    if (lrs.version === "0.9" || lrs.version === "0.95") {
                        params.target = this.activity;
                    }
                    else {
                        params.activity = this.activity;
                    }
                }
                if (typeof params.registration === "undefined" && this.registration !== null) {
                    params.registration = this.registration;
                }

                queryCfg = {
                    params: params
                };
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.queryStatements(queryCfg);
            }

            this.log("[warning] getStatements: No LRSs added yet (statements not read)");
        },

        /**
        @method getState
        @param {String} key Key to retrieve from the state
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.agent] Agent used in query,
                defaults to 'actor' property if empty
            @param {Object} [cfg.activity] Activity used in query,
                defaults to 'activity' property if empty
            @param {Object} [cfg.registration] Registration used in query,
                defaults to 'registration' property if empty
            @param {Function} [cfg.callback] Function to run with state
        */
        getState: function (key, cfg) {
            this.log("getState");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for state (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    agent: (typeof cfg.agent !== "undefined" ? cfg.agent : this.actor),
                    activity: (typeof cfg.activity !== "undefined" ? cfg.activity : this.activity)
                };
                if (typeof cfg.registration !== "undefined") {
                    queryCfg.registration = cfg.registration;
                }
                else if (this.registration !== null) {
                    queryCfg.registration = this.registration;
                }
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.retrieveState(key, queryCfg);
            }

            this.log("[warning] getState: No LRSs added yet (state not retrieved)");
        },

        /**
        @method setState
        @param {String} key Key to store into the state
        @param {String|Object} val Value to store into the state, objects will be stringified to JSON
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.agent] Agent used in query,
                defaults to 'actor' property if empty
            @param {Object} [cfg.activity] Activity used in query,
                defaults to 'activity' property if empty
            @param {Object} [cfg.registration] Registration used in query,
                defaults to 'registration' property if empty
            @param {String} [cfg.lastSHA1] SHA1 of the previously seen existing state
            @param {String} [cfg.contentType] Content-Type to specify in headers
            @param {Boolean} [cfg.overwriteJSON] If the Content-Type is JSON, should a PUT be used? 
            @param {Function} [cfg.callback] Function to run with state
        */
        setState: function (key, val, cfg) {
            this.log("setState");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for state (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    agent: (typeof cfg.agent !== "undefined" ? cfg.agent : this.actor),
                    activity: (typeof cfg.activity !== "undefined" ? cfg.activity : this.activity)
                };
                if (typeof cfg.registration !== "undefined") {
                    queryCfg.registration = cfg.registration;
                }
                else if (this.registration !== null) {
                    queryCfg.registration = this.registration;
                }
                if (typeof cfg.lastSHA1 !== "undefined") {
                    queryCfg.lastSHA1 = cfg.lastSHA1;
                }
                if (typeof cfg.contentType !== "undefined") {
                    queryCfg.contentType = cfg.contentType;
                    if ((typeof cfg.overwriteJSON !== "undefined") && (! cfg.overwriteJSON) && (TinCan.Utils.isApplicationJSON(cfg.contentType))) {
                        queryCfg.method = "POST";
                    }
                }
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.saveState(key, val, queryCfg);
            }

            this.log("[warning] setState: No LRSs added yet (state not saved)");
        },

        /**
        @method deleteState
        @param {String|null} key Key to remove from the state, or null to clear all
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.agent] Agent used in query,
                defaults to 'actor' property if empty
            @param {Object} [cfg.activity] Activity used in query,
                defaults to 'activity' property if empty
            @param {Object} [cfg.registration] Registration used in query,
                defaults to 'registration' property if empty
            @param {Function} [cfg.callback] Function to run with state
        */
        deleteState: function (key, cfg) {
            this.log("deleteState");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for state (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    agent: (typeof cfg.agent !== "undefined" ? cfg.agent : this.actor),
                    activity: (typeof cfg.activity !== "undefined" ? cfg.activity : this.activity)
                };
                if (typeof cfg.registration !== "undefined") {
                    queryCfg.registration = cfg.registration;
                }
                else if (this.registration !== null) {
                    queryCfg.registration = this.registration;
                }
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.dropState(key, queryCfg);
            }

            this.log("[warning] deleteState: No LRSs added yet (state not deleted)");
        },

        /**
        @method getActivityProfile
        @param {String} key Key to retrieve from the profile
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.activity] Activity used in query,
                defaults to 'activity' property if empty
            @param {Function} [cfg.callback] Function to run with activity profile
        */
        getActivityProfile: function (key, cfg) {
            this.log("getActivityProfile");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for activity profiles (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    activity: (typeof cfg.activity !== "undefined" ? cfg.activity : this.activity)
                };
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.retrieveActivityProfile(key, queryCfg);
            }

            this.log("[warning] getActivityProfile: No LRSs added yet (activity profile not retrieved)");
        },

        /**
        @method setActivityProfile
        @param {String} key Key to store into the activity profile
        @param {String|Object} val Value to store into the activity profile, objects will be stringified to JSON
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.activity] Activity used in query,
                defaults to 'activity' property if empty
            @param {String} [cfg.lastSHA1] SHA1 of the previously seen existing profile
            @param {String} [cfg.contentType] Content-Type to specify in headers
            @param {Boolean} [cfg.overwriteJSON] If the Content-Type is JSON, should a PUT be used?
            @param {Function} [cfg.callback] Function to run with activity profile
        */
        setActivityProfile: function (key, val, cfg) {
            this.log("setActivityProfile");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for activity profile (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    activity: (typeof cfg.activity !== "undefined" ? cfg.activity : this.activity)
                };
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }
                if (typeof cfg.lastSHA1 !== "undefined") {
                    queryCfg.lastSHA1 = cfg.lastSHA1;
                }
                if (typeof cfg.contentType !== "undefined") {
                    queryCfg.contentType = cfg.contentType;
                    if ((typeof cfg.overwriteJSON !== "undefined") && (! cfg.overwriteJSON) && (TinCan.Utils.isApplicationJSON(cfg.contentType))) {
                        queryCfg.method = "POST";
                    }
                }

                return lrs.saveActivityProfile(key, val, queryCfg);
            }

            this.log("[warning] setActivityProfile: No LRSs added yet (activity profile not saved)");
        },

        /**
        @method deleteActivityProfile
        @param {String|null} key Key to remove from the activity profile, or null to clear all
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.activity] Activity used in query,
                defaults to 'activity' property if empty
            @param {Function} [cfg.callback] Function to run with activity profile
        */
        deleteActivityProfile: function (key, cfg) {
            this.log("deleteActivityProfile");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for activity profile (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    activity: (typeof cfg.activity !== "undefined" ? cfg.activity : this.activity)
                };
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.dropActivityProfile(key, queryCfg);
            }

            this.log("[warning] deleteActivityProfile: No LRSs added yet (activity profile not deleted)");
        },

        /**
        @method getAgentProfile
        @param {String} key Key to retrieve from the profile
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.agent] Agent used in query,
                defaults to 'actor' property if empty
            @param {Function} [cfg.callback] Function to run with agent profile
        */
        getAgentProfile: function (key, cfg) {
            this.log("getAgentProfile");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for agent profiles (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    agent: (typeof cfg.agent !== "undefined" ? cfg.agent : this.actor)
                };
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.retrieveAgentProfile(key, queryCfg);
            }

            this.log("[warning] getAgentProfile: No LRSs added yet (agent profile not retrieved)");
        },

        /**
        @method setAgentProfile
        @param {String} key Key to store into the agent profile
        @param {String|Object} val Value to store into the agent profile, objects will be stringified to JSON
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.agent] Agent used in query,
                defaults to 'actor' property if empty
            @param {String} [cfg.lastSHA1] SHA1 of the previously seen existing profile
            @param {String} [cfg.contentType] Content-Type to specify in headers
            @param {Boolean} [cfg.overwriteJSON] If the Content-Type is JSON, should a PUT be used?
            @param {Function} [cfg.callback] Function to run with agent profile
        */
        setAgentProfile: function (key, val, cfg) {
            this.log("setAgentProfile");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for agent profile (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    agent: (typeof cfg.agent !== "undefined" ? cfg.agent : this.actor)
                };
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }
                if (typeof cfg.lastSHA1 !== "undefined") {
                    queryCfg.lastSHA1 = cfg.lastSHA1;
                }
                if (typeof cfg.contentType !== "undefined") {
                    queryCfg.contentType = cfg.contentType;
                    if ((typeof cfg.overwriteJSON !== "undefined") && (! cfg.overwriteJSON) && (TinCan.Utils.isApplicationJSON(cfg.contentType))) {
                        queryCfg.method = "POST";
                    }
                }

                return lrs.saveAgentProfile(key, val, queryCfg);
            }

            this.log("[warning] setAgentProfile: No LRSs added yet (agent profile not saved)");
        },

        /**
        @method deleteAgentProfile
        @param {String|null} key Key to remove from the agent profile, or null to clear all
        @param {Object} [cfg] Configuration for request
            @param {Object} [cfg.agent] Agent used in query,
                defaults to 'actor' property if empty
            @param {Function} [cfg.callback] Function to run with agent profile
        */
        deleteAgentProfile: function (key, cfg) {
            this.log("deleteAgentProfile");
            var queryCfg,
                lrs
            ;

            if (this.recordStores.length > 0) {
                //
                // for agent profile (for now) we are only going to store to the first LRS
                // so only get from there too
                //
                // TODO: make this the first non-allowFail LRS but for now it should
                // be good enough to make it the first since we know the LMS provided
                // LRS is the first
                //
                lrs = this.recordStores[0];

                cfg = cfg || {};

                queryCfg = {
                    agent: (typeof cfg.agent !== "undefined" ? cfg.agent : this.actor)
                };
                if (typeof cfg.callback !== "undefined") {
                    queryCfg.callback = cfg.callback;
                }

                return lrs.dropAgentProfile(key, queryCfg);
            }

            this.log("[warning] deleteAgentProfile: No LRSs added yet (agent profile not deleted)");
        }
    };

    /**
    @property DEBUG
    @static
    @default false
    */
    TinCan.DEBUG = false;

    /**
    Turn on debug logging

    @method enableDebug
    @static
    */
    TinCan.enableDebug = function () {
        TinCan.DEBUG = true;
    };

    /**
    Turn off debug logging

    @method disableDebug
    @static
    */
    TinCan.disableDebug = function () {
        TinCan.DEBUG = false;
    };

    /**
    @method versions
    @return {Array} Array of supported version numbers
    @static
    */
    TinCan.versions = function () {
        // newest first so we can use the first as the default
        return [
            "1.0.2",
            "1.0.1",
            "1.0.0",
            "0.95",
            "0.9"
        ];
    };

    /*global module*/
    // Support the CommonJS method for exporting our single global
    if (true) {
        module.exports = TinCan;
    }
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Utils
**/
(function () {
    "use strict";

    /**
    @class TinCan.Utils
    */
    TinCan.Utils = {
        defaultEncoding: "utf8",

        /**
        Generates a UUIDv4 compliant string that should be reasonably unique

        @method getUUID
        @return {String} UUID
        @static

        Excerpt from: http://www.broofa.com/Tools/Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
        */
        getUUID: function () {
            /*jslint bitwise: true, eqeq: true */
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = Math.random() * 16|0, v = c == "x" ? r : (r&0x3|0x8);
                    return v.toString(16);
                }
            );
        },

        /**
        @method getISODateString
        @static
        @param {Date} date Date to stringify
        @return {String} ISO date String
        */
        getISODateString: function (d) {
            function pad (val, n) {
                var padder,
                    tempVal;
                if (typeof val === "undefined" || val === null) {
                    val = 0;
                }
                if (typeof n === "undefined" || n === null) {
                    n = 2;
                }
                padder = Math.pow(10, n-1);
                tempVal = val.toString();

                while (val < padder && padder > 1) {
                    tempVal = "0" + tempVal;
                    padder = padder / 10;
                }

                return tempVal;
            }

            return d.getUTCFullYear() + "-" +
                pad(d.getUTCMonth() + 1) + "-" +
                pad(d.getUTCDate()) + "T" +
                pad(d.getUTCHours()) + ":" +
                pad(d.getUTCMinutes()) + ":" +
                pad(d.getUTCSeconds()) + "." +
                pad(d.getUTCMilliseconds(), 3) + "Z";
        },

        /**
        @method convertISO8601DurationToMilliseconds
        @static
        @param {String} ISO8601Duration Duration in ISO8601 format
        @return {Int} Duration in milliseconds

        Note: does not handle input strings with years, months and days
        */
        convertISO8601DurationToMilliseconds: function (ISO8601Duration) {
            var isValueNegative = (ISO8601Duration.indexOf("-") >= 0),
                indexOfT = ISO8601Duration.indexOf("T"),
                indexOfH = ISO8601Duration.indexOf("H"),
                indexOfM = ISO8601Duration.indexOf("M"),
                indexOfS = ISO8601Duration.indexOf("S"),
                hours,
                minutes,
                seconds,
                durationInMilliseconds;

            if ((indexOfT === -1) || ((indexOfM !== -1) && (indexOfM < indexOfT)) || (ISO8601Duration.indexOf("D") !== -1) || (ISO8601Duration.indexOf("Y") !== -1)) {
                throw new Error("ISO 8601 timestamps including years, months and/or days are not currently supported");
            }

            if (indexOfH === -1) {
                indexOfH = indexOfT;
                hours = 0;
            }
            else {
                hours = parseInt(ISO8601Duration.slice(indexOfT + 1, indexOfH), 10);
            }

            if (indexOfM === -1) {
                indexOfM = indexOfT;
                minutes = 0;
            }
            else {
                minutes = parseInt(ISO8601Duration.slice(indexOfH + 1, indexOfM), 10);
            }

            seconds = parseFloat(ISO8601Duration.slice(indexOfM + 1, indexOfS));

            durationInMilliseconds = parseInt((((((hours * 60) + minutes) * 60) + seconds) * 1000), 10);
            if (isNaN(durationInMilliseconds)){
                durationInMilliseconds = 0;
            }
            if (isValueNegative) {
                durationInMilliseconds = durationInMilliseconds * -1;
            }

            return durationInMilliseconds;
        },

        /**
        @method convertMillisecondsToISO8601Duration
        @static
        @param {Int} inputMilliseconds Duration in milliseconds
        @return {String} Duration in ISO8601 format
        */
        convertMillisecondsToISO8601Duration: function (inputMilliseconds) {
            var hours,
                minutes,
                seconds,
                i_inputMilliseconds = parseInt(inputMilliseconds, 10),
                i_inputCentiseconds,
                inputIsNegative = "",
                rtnStr = "";

            //round to nearest 0.01 seconds
            i_inputCentiseconds = Math.round(i_inputMilliseconds / 10);

            if (i_inputCentiseconds < 0) {
                inputIsNegative = "-";
                i_inputCentiseconds = i_inputCentiseconds * -1;
            }

            hours = parseInt(((i_inputCentiseconds) / 360000), 10);
            minutes = parseInt((((i_inputCentiseconds) % 360000) / 6000), 10);
            seconds = (((i_inputCentiseconds) % 360000) % 6000) / 100;

            rtnStr = inputIsNegative + "PT";
            if (hours > 0) {
                rtnStr += hours + "H";
            }

            if (minutes > 0) {
                rtnStr += minutes + "M";
            }

            rtnStr += seconds + "S";

            return rtnStr;
        },

        /**
        @method getSHA1String
        @static
        @param {String} str Content to hash
        @return {String} SHA1 for contents
        */
        getSHA1String: function (str) {
            /*global CryptoJS*/

            return CryptoJS.SHA1(str).toString(CryptoJS.enc.Hex);
        },

        /**
        @method getSHA256String
        @static
        @param {ArrayBuffer|String} content Content to hash
        @return {String} SHA256 for contents
        */
        getSHA256String: function (content) {
            /*global CryptoJS*/

            if (Object.prototype.toString.call(content) === "[object ArrayBuffer]") {
                content = CryptoJS.lib.WordArray.create(content);
            }
            return CryptoJS.SHA256(content).toString(CryptoJS.enc.Hex);
        },

        /**
        @method getBase64String
        @static
        @param {String} str Content to encode
        @return {String} Base64 encoded contents
        */
        getBase64String: function (str) {
            /*global CryptoJS*/

            return CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Latin1.parse(str)
            );
        },

        /**
        Intended to be inherited by objects with properties that store
        display values in a language based "dictionary"

        @method getLangDictionaryValue
        @param {String} prop Property name storing the dictionary
        @param {String} [lang] Language to return
        @return {String}
        */
        getLangDictionaryValue: function (prop, lang) {
            var langDict = this[prop],
                key;

            if (typeof lang !== "undefined" && typeof langDict[lang] !== "undefined") {
                return langDict[lang];
            }
            if (typeof langDict.und !== "undefined") {
                return langDict.und;
            }
            if (typeof langDict["en-US"] !== "undefined") {
                return langDict["en-US"];
            }
            for (key in langDict) {
                if (langDict.hasOwnProperty(key)) {
                    return langDict[key];
                }
            }

            return "";
        },

        /**
        @method parseURL
        @param {String} url
        @param {Object} [options]
            @param {Boolean} [options.allowRelative] Option to allow relative URLs
        @return {Object} Object of values
        @private
        */
        parseURL: function (url, cfg) {
            //
            // see http://stackoverflow.com/a/21553982
            // and http://stackoverflow.com/a/2880929
            //
            var isRelative = url.charAt(0) === "/",
                _reURLInformation = [
                    "(/[^?#]*)", // pathname
                    "(\\?[^#]*|)", // search
                    "(#.*|)$" // hash
                ],
                reURLInformation,
                match,
                result,
                paramMatch,
                pl     = /\+/g,  // Regex for replacing addition symbol with a space
                search = /([^&=]+)=?([^&]*)/g,
                decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };

            cfg = cfg || {};

            //
            // this method in an earlier version supported relative URLs, mostly to provide
            // support to the `LRS.moreStatements` method, that functionality was removed and
            // subsequently restored but with the addition of the option for allowing relative
            // URLs to be accepted which is the reason for the "helpful" exception message here
            //
            if (! isRelative) {
                //
                // not relative so make sure they have a scheme, host, etc.
                //
                _reURLInformation.unshift(
                    "^(https?:)//", // scheme
                    "(([^:/?#]*)(?::([0-9]+))?)" // host (hostname and port)
                );

                //
                // our regex requires there to be a '/' for the detection of the start
                // of the path, we can detect a '/' using indexOf beyond the part of the
                // scheme, since we've restricted scheme to 'http' or 'https' and because
                // a hostname is guaranteed to be there we can detect beyond the '://'
                // based on position, then tack on a trailing '/' because it can't be
                // part of the path
                //
                if (url.indexOf("/", 8) === -1) {
                    url = url + "/";
                }
            }
            else {
                //
                // relative so make sure they allow that explicitly
                //
                if (typeof cfg.allowRelative === "undefined" || ! cfg.allowRelative) {
                    throw new Error("Refusing to parse relative URL without 'allowRelative' option");
                }
            }

            reURLInformation = new RegExp(_reURLInformation.join(""));
            match = url.match(reURLInformation);
            if (match === null) {
                throw new Error("Unable to parse URL regular expression did not match: '" + url + "'");
            }

            // 'path' is for backwards compatibility
            if (isRelative) {
                result = {
                    protocol: null,
                    host: null,
                    hostname: null,
                    port: null,
                    path: null,
                    pathname: match[1],
                    search: match[2],
                    hash: match[3],
                    params: {}
                };

                result.path = result.pathname;
            }
            else {
                result = {
                    protocol: match[1],
                    host: match[2],
                    hostname: match[3],
                    port: match[4],
                    pathname: match[5],
                    search: match[6],
                    hash: match[7],
                    params: {}
                };

                result.path = result.protocol + "//" + result.host + result.pathname;
            }

            if (result.search !== "") {
                // extra parens to let jshint know this is an expression
                while ((paramMatch = search.exec(result.search.substring(1)))) {
                    result.params[decode(paramMatch[1])] = decode(paramMatch[2]);
                }
            }

            return result;
        },

        /**
        @method getServerRoot
        @param {String} absoluteUrl
        @return {String} server root of url
        @private
        */
        getServerRoot: function (absoluteUrl) {
            var urlParts = absoluteUrl.split("/");
            return urlParts[0] + "//" + urlParts[2];
        },

        /**
        @method getContentTypeFromHeader
        @static
        @param {String} header Content-Type header value
        @return {String} Primary value from Content-Type
        */
        getContentTypeFromHeader: function (header) {
            return (String(header).split(";"))[0];
        },

        /**
        @method isApplicationJSON
        @static
        @param {String} header Content-Type header value
        @return {Boolean} whether "application/json" was matched
        */
        isApplicationJSON: function (header) {
            return TinCan.Utils.getContentTypeFromHeader(header).toLowerCase().indexOf("application/json") === 0;
        },

        /**
        @method stringToArrayBuffer
        @static
        @param {String} content String of content to convert to an ArrayBuffer
        @param {String} [encoding] Encoding to use for conversion
        @return {ArrayBuffer} Converted content
        */
        stringToArrayBuffer: function () {
            TinCan.prototype.log("stringToArrayBuffer not overloaded - no environment loaded?");
        },

        /**
        @method stringFromArrayBuffer
        @static
        @param {ArrayBuffer} content ArrayBuffer of content to convert to a String
        @param {String} [encoding] Encoding to use for conversion
        @return {String} Converted content
        */
        stringFromArrayBuffer: function () {
            TinCan.prototype.log("stringFromArrayBuffer not overloaded - no environment loaded?");
        }
    };
}());

/*
    Copyright 2012-2013 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.LRS
**/
(function () {
    "use strict";
    /**
    @class TinCan.LRS
    @constructor
    */
    var LRS = TinCan.LRS = function (cfg) {
        this.log("constructor");

        /**
        @property endpoint
        @type String
        */
        this.endpoint = null;

        /**
        @property version
        @type String
        */
        this.version = null;

        /**
        @property auth
        @type String
        */
        this.auth = null;

        /**
        @property allowFail
        @type Boolean
        @default true
        */
        this.allowFail = true;

        /**
        @property extended
        @type Object
        */
        this.extended = null;

        this.init(cfg);
    };
    LRS.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "LRS",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        */
        init: function (cfg) {
            this.log("init");

            var versions = TinCan.versions(),
                versionMatch = false,
                i
            ;

            cfg = cfg || {};

            if (cfg.hasOwnProperty("alertOnRequestFailure")) {
                this.log("'alertOnRequestFailure' is deprecated (alerts have been removed) no need to set it now");
            }

            if (! cfg.hasOwnProperty("endpoint") || cfg.endpoint === null || cfg.endpoint === "") {
                this.log("[error] LRS invalid: no endpoint");
                throw {
                    code: 3,
                    mesg: "LRS invalid: no endpoint"
                };
            }

            this.endpoint = String(cfg.endpoint);
            if (this.endpoint.slice(-1) !== "/") {
                this.log("adding trailing slash to endpoint");
                this.endpoint += "/";
            }

            if (cfg.hasOwnProperty("allowFail")) {
                this.allowFail = cfg.allowFail;
            }

            if (cfg.hasOwnProperty("auth")) {
                this.auth = cfg.auth;
            }
            else if (cfg.hasOwnProperty("username") && cfg.hasOwnProperty("password")) {
                this.auth = "Basic " + TinCan.Utils.getBase64String(cfg.username + ":" + cfg.password);
            }

            if (cfg.hasOwnProperty("extended")) {
                this.extended = cfg.extended;
            }

            //
            // provide a hook method that environments can override
            // to handle anything necessary in the initialization
            // process that is customized to them, such as cross domain
            // setup in browsers, default implementation is empty
            //
            // this hook must run prior to version detection so that
            // request handling can be set up before requesting the
            // LRS version via the /about resource
            //
            this._initByEnvironment(cfg);

            if (typeof cfg.version !== "undefined") {
                this.log("version: " + cfg.version);
                for (i = 0; i < versions.length; i += 1) {
                    if (versions[i] === cfg.version) {
                        versionMatch = true;
                        break;
                    }
                }
                if (! versionMatch) {
                    this.log("[error] LRS invalid: version not supported (" + cfg.version + ")");
                    throw {
                        code: 5,
                        mesg: "LRS invalid: version not supported (" + cfg.version + ")"
                    };
                }
                this.version = cfg.version;
            }
            else {
                //
                // assume max supported when not specified,
                // TODO: add detection of LRS from call to endpoint
                //
                this.version = versions[0];
            }
        },

        /**
        Creates and returns a boundary for separating parts in
        requests where the statement has an attachment

        @method _getBoundary
        @private
        */
        _getBoundary: function () {
            return TinCan.Utils.getUUID().replace(/-/g, "");
        },

        /**
        Method should be overloaded by an environment to do per
        environment specifics such that the LRS can make a call
        to set the version if not provided

        @method _initByEnvironment
        @private
        */
        _initByEnvironment: function () {
            this.log("_initByEnvironment not overloaded - no environment loaded?");
        },

        /**
        Method should be overloaded by an environment to do per
        environment specifics for sending requests to the LRS

        @method _makeRequest
        @private
        */
        _makeRequest: function () {
            this.log("_makeRequest not overloaded - no environment loaded?");
        },

        /**
        Method should be overloaded by an environment to do per
        environment specifics for building multipart request data

        @method _getMultipartRequestData
        @private
        */
        _getMultipartRequestData: function () {
            this.log("_getMultipartRequestData not overloaded - no environment loaded?");
        },

        /**
        Method is overloaded by the browser environment in order to test converting an
        HTTP request that is greater than a defined length

        @method _IEModeConversion
        @private
        */
        _IEModeConversion: function () {
            this.log("_IEModeConversion not overloaded - browser environment not loaded.");
        },

        _processGetStatementResult: function (xhr, params) {
            var boundary,
                parsedResponse,
                statement,
                attachmentMap = {},
                i;

            if (! params.attachments) {
                return TinCan.Statement.fromJSON(xhr.responseText);
            }

            boundary = xhr.getResponseHeader("Content-Type").split("boundary=")[1];

            parsedResponse = this._parseMultipart(boundary, xhr.response);
            statement = JSON.parse(parsedResponse[0].body);
            for (i = 1; i < parsedResponse.length; i += 1) {
                attachmentMap[parsedResponse[i].headers["X-Experience-API-Hash"]] = parsedResponse[i].body;
            }

            this._assignAttachmentContent([statement], attachmentMap);

            return new TinCan.Statement(statement);
        },

        /**
        Method used to send a request via browser objects to the LRS

        @method sendRequest
        @param {Object} cfg Configuration for request
            @param {String} cfg.url URL portion to add to endpoint
            @param {String} [cfg.method] GET, PUT, POST, etc.
            @param {Object} [cfg.params] Parameters to set on the querystring
            @param {String|ArrayBuffer} [cfg.data] Body content as a String or ArrayBuffer
            @param {Object} [cfg.headers] Additional headers to set in the request
            @param {Function} [cfg.callback] Function to run at completion
                @param {String|Null} cfg.callback.err If an error occurred, this parameter will contain the HTTP status code.
                    If the operation succeeded, err will be null.
                @param {Object} cfg.callback.xhr XHR object
            @param {Boolean} [cfg.ignore404] Whether 404 status codes should be considered an error
            @param {Boolean} [cfg.expectMultipart] Whether to expect the response to be a multipart response
        @return {Object} XHR if called in a synchronous way (in other words no callback)
        */
        sendRequest: function (cfg) {
            this.log("sendRequest");
            var fullUrl = this.endpoint + cfg.url,
                headers = {},
                prop
            ;

            // respect absolute URLs passed in
            if (cfg.url.indexOf("http") === 0) {
                fullUrl = cfg.url;
            }

            // add extended LMS-specified values to the params
            if (this.extended !== null) {
                cfg.params = cfg.params || {};

                for (prop in this.extended) {
                    if (this.extended.hasOwnProperty(prop)) {
                        // don't overwrite cfg.params values that have already been added to the request with our extended params
                        if (! cfg.params.hasOwnProperty(prop)) {
                            if (this.extended[prop] !== null) {
                                cfg.params[prop] = this.extended[prop];
                            }
                        }
                    }
                }
            }

            // consolidate headers
            headers.Authorization = this.auth;
            if (this.version !== "0.9") {
                headers["X-Experience-API-Version"] = this.version;
            }

            for (prop in cfg.headers) {
                if (cfg.headers.hasOwnProperty(prop)) {
                    headers[prop] = cfg.headers[prop];
                }
            }

            return this._makeRequest(fullUrl, headers, cfg);
        },

        /**
        Method used to determine the LRS version

        @method about
        @param {Object} cfg Configuration object for the about request
            @param {Function} [cfg.callback] Callback to execute upon receiving a response
            @param {Object} [cfg.params] this is needed, but can be empty
        @return {Object} About which holds the version, or asyncrhonously calls a specified callback
        */
        about: function (cfg) {
            this.log("about");
            var requestCfg,
                requestResult,
                callbackWrapper;

            cfg = cfg || {};

            requestCfg = {
                url: "about",
                method: "GET",
                params: {}
            };
            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        result = TinCan.About.fromJSON(xhr.responseText);
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);

            if (callbackWrapper) {
                return;
            }

            if (requestResult.err === null) {
                requestResult.xhr = TinCan.About.fromJSON(requestResult.xhr.responseText);
            }
            return requestResult;
        },

        /**
        Save a statement, when used from a browser sends to the endpoint using the RESTful interface.
        Use a callback to make the call asynchronous.

        @method saveStatement
        @param {TinCan.Statement} statement to send
        @param {Object} [cfg] Configuration used when saving
            @param {Function} [cfg.callback] Callback to execute on completion
        */
        saveStatement: function (stmt, cfg) {
            this.log("saveStatement");
            var requestCfg = {
                    url: "statements",
                    headers: {}
                },
                versionedStatement,
                requestAttachments = [],
                boundary,
                i;

            cfg = cfg || {};

            try {
                versionedStatement = stmt.asVersion( this.version );
            }
            catch (ex) {
                if (this.allowFail) {
                    this.log("[warning] statement could not be serialized in version (" + this.version + "): " + ex);
                    if (typeof cfg.callback !== "undefined") {
                        cfg.callback(null, null);
                        return;
                    }
                    return {
                        err: null,
                        xhr: null
                    };
                }

                this.log("[error] statement could not be serialized in version (" + this.version + "): " + ex);
                if (typeof cfg.callback !== "undefined") {
                    cfg.callback(ex, null);
                    return;
                }
                return {
                    err: ex,
                    xhr: null
                };
            }

            if (versionedStatement.hasOwnProperty("attachments") && stmt.hasAttachmentWithContent()) {
                boundary = this._getBoundary();

                requestCfg.headers["Content-Type"] = "multipart/mixed; boundary=" + boundary;

                for (i = 0; i < stmt.attachments.length; i += 1) {
                    if (stmt.attachments[i].content !== null) {
                        requestAttachments.push(stmt.attachments[i]);
                    }
                }

                try {
                    requestCfg.data = this._getMultipartRequestData(boundary, versionedStatement, requestAttachments);
                }
                catch (ex) {
                    if (this.allowFail) {
                        this.log("[warning] multipart request data could not be created (attachments probably not supported): " + ex);
                        if (typeof cfg.callback !== "undefined") {
                            cfg.callback(null, null);
                            return;
                        }
                        return {
                            err: null,
                            xhr: null
                        };
                    }

                    this.log("[error] multipart request data could not be created (attachments probably not supported): " + ex);
                    if (typeof cfg.callback !== "undefined") {
                        cfg.callback(ex, null);
                        return;
                    }
                    return {
                        err: ex,
                        xhr: null
                    };
                }
            }
            else {
                requestCfg.headers["Content-Type"] = "application/json";
                requestCfg.data = JSON.stringify(versionedStatement);
            }
            if (stmt.id !== null) {
                requestCfg.method = "PUT";
                requestCfg.params = {
                    statementId: stmt.id
                };
            }
            else {
                requestCfg.method = "POST";
            }

            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }

            return this.sendRequest(requestCfg);
        },

        /**
        Retrieve a statement, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveStatement
        @param {String} ID of statement to retrieve
        @param {Object} [cfg] Configuration options
            @param {Object} [cfg.params] Query parameters
                @param {Boolean} [cfg.params.attachments] Include attachments in multipart response or don't (default: false)
            @param {Function} [cfg.callback] Callback to execute on completion
        @return {TinCan.Statement} Statement retrieved
        */
        retrieveStatement: function (stmtId, cfg) {
            this.log("retrieveStatement");
            var requestCfg,
                requestResult,
                callbackWrapper,
                lrs = this;

            cfg = cfg || {};
            cfg.params = cfg.params || {};

            requestCfg = {
                url: "statements",
                method: "GET",
                params: {
                    statementId: stmtId
                }
            };
            if (cfg.params.attachments) {
                requestCfg.params.attachments = true;
                requestCfg.expectMultipart = true;
            }
            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        result = lrs._processGetStatementResult(xhr, cfg.params);
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.statement = null;
                if (requestResult.err === null) {
                    requestResult.statement = lrs._processGetStatementResult(requestResult.xhr, cfg.params);
                }
            }

            return requestResult;
        },

        /**
        Retrieve a voided statement, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveVoidedStatement
        @param {String} ID of voided statement to retrieve
        @param {Object} [cfg] Configuration options
            @param {Object} [cfg.params] Query parameters
                @param {Boolean} [cfg.params.attachments] Include attachments in multipart response or don't (default: false)
            @param {Function} [cfg.callback] Callback to execute on completion
        @return {TinCan.Statement} Statement retrieved
        */
        retrieveVoidedStatement: function (stmtId, cfg) {
            this.log("retrieveVoidedStatement");
            var requestCfg,
                requestResult,
                callbackWrapper,
                lrs = this;

            cfg = cfg || {};
            cfg.params = cfg.params || {};

            requestCfg = {
                url: "statements",
                method: "GET",
                params: {}
            };
            if (this.version === "0.9" || this.version === "0.95") {
                requestCfg.params.statementId = stmtId;
            }
            else {
                requestCfg.params.voidedStatementId = stmtId;
                if (cfg.params.attachments) {
                    requestCfg.params.attachments = true;
                    requestCfg.expectMultipart = true;
                }
            }

            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        result = lrs._processGetStatementResult(xhr, cfg.params);
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.statement = null;
                if (requestResult.err === null) {
                    requestResult.statement = lrs._processGetStatementResult(requestResult.xhr, cfg.params);
                }
            }

            return requestResult;
        },

        /**
        Save a set of statements, when used from a browser sends to the endpoint using the RESTful interface.
        Use a callback to make the call asynchronous.

        @method saveStatements
        @param {Array} Array of statements or objects convertable to statements
        @param {Object} [cfg] Configuration used when saving
            @param {Function} [cfg.callback] Callback to execute on completion
        */
        saveStatements: function (stmts, cfg) {
            this.log("saveStatements");
            var requestCfg = {
                    url: "statements",
                    method: "POST",
                    headers: {}
                },
                versionedStatement,
                versionedStatements = [],
                requestAttachments = [],
                boundary,
                i,
                j;

            cfg = cfg || {};

            if (stmts.length === 0) {
                if (typeof cfg.callback !== "undefined") {
                    cfg.callback(new Error("no statements"), null);
                    return;
                }
                return {
                    err: new Error("no statements"),
                    xhr: null
                };
            }

            for (i = 0; i < stmts.length; i += 1) {
                try {
                    versionedStatement = stmts[i].asVersion( this.version );
                }
                catch (ex) {
                    if (this.allowFail) {
                        this.log("[warning] statement could not be serialized in version (" + this.version + "): " + ex);
                        if (typeof cfg.callback !== "undefined") {
                            cfg.callback(null, null);
                            return;
                        }
                        return {
                            err: null,
                            xhr: null
                        };
                    }

                    this.log("[error] statement could not be serialized in version (" + this.version + "): " + ex);
                    if (typeof cfg.callback !== "undefined") {
                        cfg.callback(ex, null);
                        return;
                    }
                    return {
                        err: ex,
                        xhr: null
                    };
                }

                if (stmts[i].hasAttachmentWithContent()) {
                    for (j = 0; j < stmts[i].attachments.length; j += 1) {
                        if (stmts[i].attachments[j].content !== null) {
                            requestAttachments.push(stmts[i].attachments[j]);
                        }
                    }
                }

                versionedStatements.push(versionedStatement);
            }

            if (requestAttachments.length !== 0) {
                boundary = this._getBoundary();

                requestCfg.headers["Content-Type"] = "multipart/mixed; boundary=" + boundary;

                try {
                    requestCfg.data = this._getMultipartRequestData(boundary, versionedStatements, requestAttachments);
                }
                catch (ex) {
                    if (this.allowFail) {
                        this.log("[warning] multipart request data could not be created (attachments probably not supported): " + ex);
                        if (typeof cfg.callback !== "undefined") {
                            cfg.callback(null, null);
                            return;
                        }
                        return {
                            err: null,
                            xhr: null
                        };
                    }

                    this.log("[error] multipart request data could not be created (attachments probably not supported): " + ex);
                    if (typeof cfg.callback !== "undefined") {
                        cfg.callback(ex, null);
                        return;
                    }
                    return {
                        err: ex,
                        xhr: null
                    };
                }
            }
            else {
                requestCfg.headers["Content-Type"] = "application/json";
                requestCfg.data = JSON.stringify(versionedStatements);
            }

            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }

            return this.sendRequest(requestCfg);
        },

        /**
        Fetch a set of statements, when used from a browser sends to the endpoint using the
        RESTful interface.  Use a callback to make the call asynchronous.

        @method queryStatements
        @param {Object} [cfg] Configuration used to query
            @param {Object} [cfg.params] Query parameters
                @param {TinCan.Agent|TinCan.Group} [cfg.params.agent] Agent matches 'actor' or 'object'
                @param {TinCan.Verb|String} [cfg.params.verb] Verb (or verb ID) to query on
                @param {TinCan.Activity|String} [cfg.params.activity] Activity (or activity ID) to query on
                @param {String} [cfg.params.registration] Registration UUID
                @param {Boolean} [cfg.params.related_activities] Match related activities
                @param {Boolean} [cfg.params.related_agents] Match related agents
                @param {String} [cfg.params.since] Match statements stored since specified timestamp
                @param {String} [cfg.params.until] Match statements stored at or before specified timestamp
                @param {Integer} [cfg.params.limit] Number of results to retrieve
                @param {String} [cfg.params.format] One of "ids", "exact", "canonical" (default: "exact")
                @param {Boolean} [cfg.params.ascending] Return results in ascending order of stored time

                @param {TinCan.Agent} [cfg.params.actor] (Removed in 1.0.0, use 'agent' instead) Agent matches 'actor'
                @param {TinCan.Activity|TinCan.Agent|TinCan.Statement} [cfg.params.target] (Removed in 1.0.0, use 'activity' or 'agent' instead) Activity, Agent, or Statement matches 'object'
                @param {TinCan.Agent} [cfg.params.instructor] (Removed in 1.0.0, use 'agent' + 'related_agents' instead) Agent matches 'context:instructor'
                @param {Boolean} [cfg.params.context] (Removed in 1.0.0, use 'activity' instead) When filtering on target, include statements with matching context
                @param {Boolean} [cfg.params.authoritative] (Removed in 1.0.0) Get authoritative results
                @param {Boolean} [cfg.params.sparse] (Removed in 1.0.0, use 'format' instead) Get sparse results

            @param {Function} [cfg.callback] Callback to execute on completion
                @param {String|null} cfg.callback.err Error status or null if succcess
                @param {TinCan.StatementsResult|XHR} cfg.callback.response Receives a StatementsResult argument
        @return {Object} Request result
        */
        queryStatements: function (cfg) {
            this.log("queryStatements");
            var requestCfg,
                requestResult,
                callbackWrapper,
                lrs = this;

            cfg = cfg || {};
            cfg.params = cfg.params || {};

            //
            // if they misconfigured (possibly due to version mismatches) the
            // query then don't try to send a request at all, rather than give
            // them invalid results
            //
            try {
                requestCfg = this._queryStatementsRequestCfg(cfg);

                if (cfg.params.attachments) {
                    requestCfg.expectMultipart = true;
                }
            }
            catch (ex) {
                this.log("[error] Query statements failed - " + ex);
                if (typeof cfg.callback !== "undefined") {
                    cfg.callback(ex, {});
                }

                return {
                    err: ex,
                    statementsResult: null
                };
            }

            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr,
                        parsedResponse,
                        boundary,
                        statements,
                        attachmentMap = {},
                        i;

                    if (err === null) {
                        if (! cfg.params.attachments) {
                            result = TinCan.StatementsResult.fromJSON(xhr.responseText);
                        }
                        else {
                            boundary = xhr.getResponseHeader("Content-Type").split("boundary=")[1];

                            parsedResponse = lrs._parseMultipart(boundary, xhr.response);
                            statements = JSON.parse(parsedResponse[0].body);
                            for (i = 1; i < parsedResponse.length; i += 1) {
                                attachmentMap[parsedResponse[i].headers["X-Experience-API-Hash"]] = parsedResponse[i].body;
                            }

                            lrs._assignAttachmentContent(statements.statements, attachmentMap);
                            result = new TinCan.StatementsResult({ statements: statements.statements });

                            for (i = 0; i < result.statements.length; i += 1) {
                                if (! (result.statements[i] instanceof TinCan.Statement)) {
                                    result.statements[i] = new TinCan.Statement(result.statements[i]);
                                }
                            }
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            requestResult.config = requestCfg;

            if (! callbackWrapper) {
                requestResult.statementsResult = null;
                if (requestResult.err === null) {
                    requestResult.statementsResult = TinCan.StatementsResult.fromJSON(requestResult.xhr.responseText);
                }
            }

            return requestResult;
        },

        /**
        Build a request config object that can be passed to sendRequest() to make a query request

        @method _queryStatementsRequestCfg
        @private
        @param {Object} [cfg] See configuration for {{#crossLink "TinCan.LRS/queryStatements"}}{{/crossLink}}
        @return {Object} Request configuration object
        */
        _queryStatementsRequestCfg: function (cfg) {
            this.log("_queryStatementsRequestCfg");
            var params = {},
                returnCfg = {
                    url: "statements",
                    method: "GET",
                    params: params
                },
                jsonProps = [
                    "agent",
                    "actor",
                    "object",
                    "instructor"
                ],
                idProps = [
                    "verb",
                    "activity"
                ],
                valProps = [
                    "registration",
                    "context",
                    "since",
                    "until",
                    "limit",
                    "authoritative",
                    "sparse",
                    "ascending",
                    "related_activities",
                    "related_agents",
                    "format",
                    "attachments"
                ],
                i,
                prop,
                //
                // list of parameters that are supported in all versions (supported by
                // this library) of the spec
                //
                universal = {
                    verb: true,
                    registration: true,
                    since: true,
                    until: true,
                    limit: true,
                    ascending: true
                },
                //
                // future proofing here, "supported" is an object so that
                // in the future we can support a "deprecated" list to
                // throw warnings, hopefully the spec uses deprecation phases
                // for the removal of these things
                //
                compatibility = {
                    "0.9": {
                        supported: {
                            actor: true,
                            instructor: true,
                            target: true,
                            object: true,
                            context: true,
                            authoritative: true,
                            sparse: true
                        }
                    },
                    "1.0.0": {
                        supported: {
                            agent: true,
                            activity: true,
                            related_activities: true,
                            related_agents: true,
                            format: true,
                            attachments: true
                        }
                    }
                };

            compatibility["0.95"] = compatibility["0.9"];
            compatibility["1.0.1"] = compatibility["1.0.0"];
            compatibility["1.0.2"] = compatibility["1.0.0"];

            if (cfg.params.hasOwnProperty("target")) {
                cfg.params.object = cfg.params.target;
            }

            //
            // check compatibility tables, either the configured parameter is in
            // the universal list or the specific version, if not then throw an
            // error which at least for .queryStatements will prevent the request
            // and potentially alert the user
            //
            for (prop in cfg.params) {
                if (cfg.params.hasOwnProperty(prop)) {
                    if (typeof universal[prop] === "undefined" && typeof compatibility[this.version].supported[prop] === "undefined") {
                        throw "Unrecognized query parameter configured: " + prop;
                    }
                }
            }

            //
            // getting here means that all parameters are valid for this version
            // to make handling the output formats easier
            //

            for (i = 0; i < jsonProps.length; i += 1) {
                if (typeof cfg.params[jsonProps[i]] !== "undefined") {
                    params[jsonProps[i]] = JSON.stringify(cfg.params[jsonProps[i]].asVersion(this.version));
                }
            }

            for (i = 0; i < idProps.length; i += 1) {
                if (typeof cfg.params[idProps[i]] !== "undefined") {
                    if (typeof cfg.params[idProps[i]].id === "undefined") {
                        params[idProps[i]] = cfg.params[idProps[i]];
                    }
                    else {
                        params[idProps[i]] = cfg.params[idProps[i]].id;
                    }
                }
            }

            for (i = 0; i < valProps.length; i += 1) {
                if (typeof cfg.params[valProps[i]] !== "undefined" && cfg.params[valProps[i]] !== null) {
                    params[valProps[i]] = cfg.params[valProps[i]];
                }
            }

            return returnCfg;
        },

        /**
        Assigns attachment content to the correct attachment to create a StatementsResult object that is sent
        to the callback of queryStatements()

        @method _assignAttachmentContent
        @private
        @param {Array} [stmts] Array of TinCan.Statement JSON objects
        @param {Object} [attachmentMap] Map of the content to place into its attachment
        @return {Array} Array of TinCan.Statement JSON objects with correctly assigned attachment content
        */
        _assignAttachmentContent: function (stmts, attachmentMap) {
            var i,
                j;

            for (i = 0; i < stmts.length; i += 1) {
                if (stmts[i].hasOwnProperty("attachments") && stmts[i].attachments !== null) {
                    for (j = 0; j < stmts[i].attachments.length; j += 1) {
                        if (attachmentMap.hasOwnProperty(stmts[i].attachments[j].sha2)) {
                            stmts[i].attachments[j].content = attachmentMap[stmts[i].attachments[j].sha2];
                        }
                    }
                }
            }
        },

        /**
        Parses the different sections of a multipart/mixed response

        @method _parseMultipart
        @private
        @param {String} [boundary] Boundary used to mark off the sections of the response
        @param {ArrayBuffer} [response] Body of the response
        @return {Array} Array of objects containing the parsed headers and body of each part
        */
        _parseMultipart: function (boundary, response) {
            /* global Uint8Array */
            var __boundary = "--" + boundary,
                byteArray,
                bodyEncodedInString,
                fullBodyEnd,
                sliceStart,
                sliceEnd,
                headerStart,
                headerEnd,
                bodyStart,
                bodyEnd,
                headers,
                body,
                parts = [],
                CRLF = 2;

            //
            // treating the reponse as a stream of bytes and assuming that headers
            // and related mime boundaries are all US-ASCII (which is a safe assumption)
            // allows us to treat the whole response as a string when looking for offsets
            // but then slice on the raw array buffer
            //
            byteArray = new Uint8Array(response);
            bodyEncodedInString = this.__uint8ToString(byteArray);

            fullBodyEnd = bodyEncodedInString.indexOf(__boundary + "--");

            sliceStart = bodyEncodedInString.indexOf(__boundary);
            while (sliceStart !== -1) {
                sliceEnd = bodyEncodedInString.indexOf(__boundary, sliceStart + __boundary.length);

                headerStart = sliceStart + __boundary.length + CRLF;
                headerEnd = bodyEncodedInString.indexOf("\r\n\r\n", sliceStart);
                bodyStart = headerEnd + CRLF + CRLF;
                bodyEnd = sliceEnd - 2;

                headers = this._parseHeaders(
                    this.__uint8ToString(
                        new Uint8Array( response.slice(headerStart, headerEnd) )
                    )
                );
                body = response.slice(bodyStart, bodyEnd);

                //
                // we know the first slice is the statement, and we know it is a string in UTF-8 (spec requirement)
                //
                if (parts.length === 0) {
                    body = TinCan.Utils.stringFromArrayBuffer(body);
                }

                parts.push(
                    {
                        headers: headers,
                        body: body
                    }
                );

                if (sliceEnd === fullBodyEnd) {
                    sliceStart = -1;
                }
                else {
                    sliceStart = sliceEnd;
                }
            }

            return parts;
        },

        //
        // implemented as a function to avoid 'RangeError: Maximum call stack size exceeded'
        // when calling .fromCharCode on the full byteArray which results in a too long
        // argument list for large arrays
        //
        __uint8ToString: function (byteArray) {
            var result = "",
                len = byteArray.byteLength,
                i;

            for (i = 0; i < len; i += 1) {
                result += String.fromCharCode(byteArray[i]);
            }
            return result;
        },

        /**
        Parses the headers of a multipart/mixed response section

        @method _parseHeaders
        @private
        @param {String} [rawHeaders] String containing all the headers
        @return {Object} Map of the headers
        */
        _parseHeaders: function (rawHeaders) {
            var headers = {},
                headerList,
                key,
                h,
                i;

            headerList = rawHeaders.split("\n");
            for (i = 0; i < headerList.length; i += 1) {
                h = headerList[i].split(":", 2);

                if (h[1] !== null) {
                    headers[h[0]] = h[1].replace(/^\s+|\s+$/g, "");

                    key = h[0];
                }
                else {
                    if (h[0].substring(0, 1) === "\t") {
                        headers[h[0]] = h[1].replace(/^\s+|\s+$/g, "");
                    }
                }
            }

            return headers;
        },

        /**
        Fetch more statements from a previous query, when used from a browser sends to the endpoint using the
        RESTful interface.  Use a callback to make the call asynchronous.

        @method moreStatements
        @param {Object} [cfg] Configuration used to query
            @param {String} [cfg.url] More URL
            @param {Function} [cfg.callback] Callback to execute on completion
                @param {String|null} cfg.callback.err Error status or null if succcess
                @param {TinCan.StatementsResult|XHR} cfg.callback.response Receives a StatementsResult argument
        @return {Object} Request result
        */
        moreStatements: function (cfg) {
            this.log("moreStatements: " + cfg.url);
            var requestCfg,
                requestResult,
                callbackWrapper,
                parsedURL,
                serverRoot;

            cfg = cfg || {};

            // to support our interface (to support IE) we need to break apart
            // the more URL query params so that the request can be made properly later
            parsedURL = TinCan.Utils.parseURL(cfg.url, { allowRelative: true });

            // Respect a more URL that is relative to either the server root
            // or endpoint (though only the former is allowed in the spec)
            serverRoot = TinCan.Utils.getServerRoot(this.endpoint);
            if (parsedURL.path.indexOf("/statements") === 0){
                parsedURL.path = this.endpoint.replace(serverRoot, "") + parsedURL.path;
                this.log("converting non-standard more URL to " + parsedURL.path);
            }

            // The more relative URL might not start with a slash, add it if not
            if (parsedURL.path.indexOf("/") !== 0) {
                parsedURL.path = "/" + parsedURL.path;
            }

            requestCfg = {
                method: "GET",
                // For arbitrary more URLs to work, we need to make the URL absolute here
                url: serverRoot + parsedURL.path,
                params: parsedURL.params
            };
            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        result = TinCan.StatementsResult.fromJSON(xhr.responseText);
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            requestResult.config = requestCfg;

            if (! callbackWrapper) {
                requestResult.statementsResult = null;
                if (requestResult.err === null) {
                    requestResult.statementsResult = TinCan.StatementsResult.fromJSON(requestResult.xhr.responseText);
                }
            }

            return requestResult;
        },

        /**
        Retrieve a state value, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveState
        @param {String} key Key of state to retrieve
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {String} [cfg.registration] Registration
            @param {Function} [cfg.callback] Callback to execute on completion
                @param {Object|Null} cfg.callback.error
                @param {TinCan.State|null} cfg.callback.result null if state is 404
            @param {Object} [cfg.requestHeaders] Object containing additional headers to add to request
        @return {TinCan.State|Object} TinCan.State retrieved when synchronous, or result from sendRequest
        */
        retrieveState: function (key, cfg) {
            this.log("retrieveState");
            var requestParams = {},
                requestCfg = {},
                requestResult,
                callbackWrapper,
                requestHeaders,
                self = this;

            requestHeaders = cfg.requestHeaders || {};

            requestParams = {
                stateId: key,
                activityId: cfg.activity.id
            };
            if (this.version === "0.9") {
                requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if ((typeof cfg.registration !== "undefined") && (cfg.registration !== null)) {
                if (this.version === "0.9") {
                    requestParams.registrationId = cfg.registration;
                }
                else {
                    requestParams.registration = cfg.registration;
                }
            }

            requestCfg = {
                url: "activities/state",
                method: "GET",
                params: requestParams,
                ignore404: true,
                headers: requestHeaders
            };

            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        if (xhr.status === 404) {
                            result = null;
                        }
                        else {
                            result = new TinCan.State(
                                {
                                    id: key,
                                    contents: xhr.responseText
                                }
                            );
                            if (typeof xhr.getResponseHeader !== "undefined" && xhr.getResponseHeader("ETag") !== null && xhr.getResponseHeader("ETag") !== "") {
                                result.etag = xhr.getResponseHeader("ETag");
                            }
                            else {
                                //
                                // either XHR didn't have getResponseHeader (probably cause it is an IE
                                // XDomainRequest object which doesn't) or not populated by LRS so create
                                // the hash ourselves
                                //
                                // the LRS is responsible for quoting the Etag value so we need to mimic
                                // that behavior here as well
                                //
                                result.etag = "\"" + TinCan.Utils.getSHA1String(xhr.responseText) + "\"";
                            }

                            if (typeof xhr.contentType !== "undefined") {
                                // most likely an XDomainRequest which has .contentType,
                                // for the ones that it supports
                                result.contentType = xhr.contentType;
                            }
                            else if (typeof xhr.getResponseHeader !== "undefined" && xhr.getResponseHeader("Content-Type") !== null && xhr.getResponseHeader("Content-Type") !== "") {
                                result.contentType = xhr.getResponseHeader("Content-Type");
                            }

                            if (TinCan.Utils.isApplicationJSON(result.contentType)) {
                                try {
                                    result.contents = JSON.parse(result.contents);
                                } catch (ex) {
                                    self.log("retrieveState - failed to deserialize JSON: " + ex);
                                }
                            }
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.state = null;
                if (requestResult.err === null && requestResult.xhr.status !== 404) {
                    requestResult.state = new TinCan.State(
                        {
                            id: key,
                            contents: requestResult.xhr.responseText
                        }
                    );
                    if (typeof requestResult.xhr.getResponseHeader !== "undefined" && requestResult.xhr.getResponseHeader("ETag") !== null && requestResult.xhr.getResponseHeader("ETag") !== "") {
                        requestResult.state.etag = requestResult.xhr.getResponseHeader("ETag");
                    }
                    else {
                        //
                        // either XHR didn't have getResponseHeader (probably cause it is an IE
                        // XDomainRequest object which doesn't) or not populated by LRS so create
                        // the hash ourselves
                        //
                        // the LRS is responsible for quoting the Etag value so we need to mimic
                        // that behavior here as well
                        //
                        requestResult.state.etag = "\"" + TinCan.Utils.getSHA1String(requestResult.xhr.responseText) + "\"";
                    }
                    if (typeof requestResult.xhr.contentType !== "undefined") {
                        // most likely an XDomainRequest which has .contentType
                        // for the ones that it supports
                        requestResult.state.contentType = requestResult.xhr.contentType;
                    }
                    else if (typeof requestResult.xhr.getResponseHeader !== "undefined" && requestResult.xhr.getResponseHeader("Content-Type") !== null && requestResult.xhr.getResponseHeader("Content-Type") !== "") {
                        requestResult.state.contentType = requestResult.xhr.getResponseHeader("Content-Type");
                    }
                    if (TinCan.Utils.isApplicationJSON(requestResult.state.contentType)) {
                        try {
                            requestResult.state.contents = JSON.parse(requestResult.state.contents);
                        } catch (ex) {
                            this.log("retrieveState - failed to deserialize JSON: " + ex);
                        }
                    }
                }
            }

            return requestResult;
        },

        /**
        Retrieve the list of IDs for a state, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveStateIds
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {String} [cfg.registration] Registration
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {String} [cfg.since] Match activity profiles saved since given timestamp
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        @return {Object} requestResult Request result
        */
        retrieveStateIds: function (cfg) {
            this.log("retrieveStateIds");
            var requestParams = {},
                requestCfg,
                requestHeaders,
                requestResult,
                callbackWrapper;

            cfg = cfg || {};
            requestHeaders = cfg.requestHeaders || {};

            requestParams.activityId = cfg.activity.id;
            if (this.version === "0.9") {
                requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if ((typeof cfg.registration !== "undefined") && (cfg.registration !== null)) {
                if (this.version === "0.9") {
                    requestParams.registrationId = cfg.registration;
                }
                else {
                    requestParams.registration = cfg.registration;
                }
            }

            requestCfg = {
                url: "activities/state",
                method: "GET",
                params: requestParams,
                headers: requestHeaders,
                ignore404: true
            };
            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err !== null) {
                        cfg.callback(err, result);
                        return;
                    }

                    if (xhr.status === 404) {
                        result = [];
                    }
                    else {
                        try {
                            result = JSON.parse(xhr.responseText);
                        }
                        catch (ex) {
                            err = "Response JSON parse error: " + ex;
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }
            if (typeof cfg.since !== "undefined") {
                requestCfg.params.since = cfg.since;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.profileIds = null;
                if (requestResult.err !== null) {
                    return requestResult;
                }

                if (requestResult.xhr.status === 404) {
                    requestResult.profileIds = [];
                }
                else {
                    try {
                        requestResult.profileIds = JSON.parse(requestResult.xhr.responseText);
                    }
                    catch (ex) {
                        requestResult.err = "retrieveStateIds - JSON parse error: " + ex;
                    }
                }
            }
            return requestResult;
        },

        /**
        Save a state value, when used from a browser sends to the endpoint using the RESTful interface.

        @method saveState
        @param {String} key Key of state to save
        @param val Value to be stored
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {String} [cfg.registration] Registration
            @param {String} [cfg.lastSHA1] SHA1 of the previously seen existing state
            @param {String} [cfg.contentType] Content-Type to specify in headers (defaults to 'application/octet-stream')
            @param {String} [cfg.method] Method to use. Default: PUT
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        */
        saveState: function (key, val, cfg) {
            this.log("saveState");
            var requestParams,
                requestCfg,
                requestHeaders;

            requestHeaders = cfg.requestHeaders || {};

            if (typeof cfg.contentType === "undefined") {
                cfg.contentType = "application/octet-stream";
            }
            requestHeaders["Content-Type"] = cfg.contentType;

            if (typeof val === "object" && TinCan.Utils.isApplicationJSON(cfg.contentType)) {
                val = JSON.stringify(val);
            }

            if (typeof cfg.method === "undefined" || cfg.method !== "POST") {
                cfg.method = "PUT";
            }

            requestParams = {
                stateId: key,
                activityId: cfg.activity.id
            };
            if (this.version === "0.9") {
                requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if ((typeof cfg.registration !== "undefined") && (cfg.registration !== null)) {
                if (this.version === "0.9") {
                    requestParams.registrationId = cfg.registration;
                }
                else {
                    requestParams.registration = cfg.registration;
                }
            }

            requestCfg = {
                url: "activities/state",
                method: cfg.method,
                params: requestParams,
                data: val,
                headers: requestHeaders
            };

            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }
            if (typeof cfg.lastSHA1 !== "undefined" && cfg.lastSHA1 !== null) {
                requestCfg.headers["If-Match"] = cfg.lastSHA1;
            }

            return this.sendRequest(requestCfg);
        },

        /**
        Drop a state value or all of the state, when used from a browser sends to the endpoint using the RESTful interface.

        @method dropState
        @param {String|null} key Key of state to delete, or null for all
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {String} [cfg.registration] Registration
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        */
        dropState: function (key, cfg) {
            this.log("dropState");
            var requestParams,
                requestCfg,
                requestHeaders;

            requestHeaders = cfg.requestHeaders || {};

            requestParams = {
                activityId: cfg.activity.id
            };
            if (this.version === "0.9") {
                requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if (key !== null) {
                requestParams.stateId = key;
            }
            if ((typeof cfg.registration !== "undefined") && (cfg.registration !== null)) {
                if (this.version === "0.9") {
                    requestParams.registrationId = cfg.registration;
                }
                else {
                    requestParams.registration = cfg.registration;
                }
            }

            requestCfg = {
                url: "activities/state",
                method: "DELETE",
                params: requestParams,
                headers: requestHeaders
            };

            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }

            return this.sendRequest(requestCfg);
        },

        /**
        Retrieve an activity, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveActivity
        @param {String} activityId id of the Activity to retrieve
        @param {Object} cfg Configuration options
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        @return {Object} Value retrieved
        */
        retrieveActivity: function (activityId, cfg) {
            this.log("retrieveActivity");
            var requestCfg = {},
                requestResult,
                callbackWrapper,
                requestHeaders;

            requestHeaders = cfg.requestHeaders || {};

            requestCfg = {
                url: "activities",
                method: "GET",
                params: {
                    activityId: activityId
                },
                ignore404: true,
                headers: requestHeaders
            };

            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        //
                        // a 404 really shouldn't happen because the LRS can dynamically
                        // build the response based on what has been passed to it, but
                        // don't have the client fail in the condition that it does, because
                        // we can do the same thing
                        //
                        if (xhr.status === 404) {
                            result = new TinCan.Activity(
                                {
                                    id: activityId
                                }
                            );
                        }
                        else {
                            result = TinCan.Activity.fromJSON(xhr.responseText);
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.activity = null;
                if (requestResult.err === null) {
                    if (requestResult.xhr.status === 404) {
                        requestResult.activity = new TinCan.Activity(
                            {
                                id: activityId
                            }
                        );
                    }
                    else {
                        requestResult.activity = TinCan.Activity.fromJSON(requestResult.xhr.responseText);
                    }
                }
            }

            return requestResult;
        },

        /**
        Retrieve an activity profile value, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveActivityProfile
        @param {String} key Key of activity profile to retrieve
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        @return {Object} Value retrieved
        */
        retrieveActivityProfile: function (key, cfg) {
            this.log("retrieveActivityProfile");
            var requestCfg = {},
                requestResult,
                callbackWrapper,
                requestHeaders,
                self = this;

            requestHeaders = cfg.requestHeaders || {};

            requestCfg = {
                url: "activities/profile",
                method: "GET",
                params: {
                    profileId: key,
                    activityId: cfg.activity.id
                },
                ignore404: true,
                headers: requestHeaders
            };

            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        if (xhr.status === 404) {
                            result = null;
                        }
                        else {
                            result = new TinCan.ActivityProfile(
                                {
                                    id: key,
                                    activity: cfg.activity,
                                    contents: xhr.responseText
                                }
                            );
                            if (typeof xhr.getResponseHeader !== "undefined" && xhr.getResponseHeader("ETag") !== null && xhr.getResponseHeader("ETag") !== "") {
                                result.etag = xhr.getResponseHeader("ETag");
                            }
                            else {
                                //
                                // either XHR didn't have getResponseHeader (probably cause it is an IE
                                // XDomainRequest object which doesn't) or not populated by LRS so create
                                // the hash ourselves
                                //
                                // the LRS is responsible for quoting the Etag value so we need to mimic
                                // that behavior here as well
                                //
                                result.etag = "\"" + TinCan.Utils.getSHA1String(xhr.responseText) + "\"";
                            }
                            if (typeof xhr.contentType !== "undefined") {
                                // most likely an XDomainRequest which has .contentType
                                // for the ones that it supports
                                result.contentType = xhr.contentType;
                            }
                            else if (typeof xhr.getResponseHeader !== "undefined" && xhr.getResponseHeader("Content-Type") !== null && xhr.getResponseHeader("Content-Type") !== "") {
                                result.contentType = xhr.getResponseHeader("Content-Type");
                            }
                            if (TinCan.Utils.isApplicationJSON(result.contentType)) {
                                try {
                                    result.contents = JSON.parse(result.contents);
                                } catch (ex) {
                                    self.log("retrieveActivityProfile - failed to deserialize JSON: " + ex);
                                }
                            }
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.profile = null;
                if (requestResult.err === null && requestResult.xhr.status !== 404) {
                    requestResult.profile = new TinCan.ActivityProfile(
                        {
                            id: key,
                            activity: cfg.activity,
                            contents: requestResult.xhr.responseText
                        }
                    );
                    if (typeof requestResult.xhr.getResponseHeader !== "undefined" && requestResult.xhr.getResponseHeader("ETag") !== null && requestResult.xhr.getResponseHeader("ETag") !== "") {
                        requestResult.profile.etag = requestResult.xhr.getResponseHeader("ETag");
                    }
                    else {
                        //
                        // either XHR didn't have getResponseHeader (probably cause it is an IE
                        // XDomainRequest object which doesn't) or not populated by LRS so create
                        // the hash ourselves
                        //
                        // the LRS is responsible for quoting the Etag value so we need to mimic
                        // that behavior here as well
                        //
                        requestResult.profile.etag = "\"" + TinCan.Utils.getSHA1String(requestResult.xhr.responseText) + "\"";
                    }
                    if (typeof requestResult.xhr.contentType !== "undefined") {
                        // most likely an XDomainRequest which has .contentType
                        // for the ones that it supports
                        requestResult.profile.contentType = requestResult.xhr.contentType;
                    }
                    else if (typeof requestResult.xhr.getResponseHeader !== "undefined" && requestResult.xhr.getResponseHeader("Content-Type") !== null && requestResult.xhr.getResponseHeader("Content-Type") !== "") {
                        requestResult.profile.contentType = requestResult.xhr.getResponseHeader("Content-Type");
                    }
                    if (TinCan.Utils.isApplicationJSON(requestResult.profile.contentType)) {
                        try {
                            requestResult.profile.contents = JSON.parse(requestResult.profile.contents);
                        } catch (ex) {
                            this.log("retrieveActivityProfile - failed to deserialize JSON: " + ex);
                        }
                    }
                }
            }

            return requestResult;
        },

        /**
        Retrieve the list of IDs for an activity profile, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveActivityProfileIds
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {String} [cfg.since] Match activity profiles saved since given timestamp
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        @return {Array} List of ids for this Activity profile
        */
        retrieveActivityProfileIds: function (cfg) {
            this.log("retrieveActivityProfileIds");
            var requestCfg,
                requestHeaders,
                requestResult,
                callbackWrapper;

            cfg = cfg || {};
            requestHeaders = cfg.requestHeaders || {};

            requestCfg = {
                url: "activities/profile",
                method: "GET",
                params: {
                    activityId: cfg.activity.id
                },
                headers: requestHeaders,
                ignore404: true
            };
            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err !== null) {
                        cfg.callback(err, result);
                        return;
                    }

                    if (xhr.status === 404) {
                        result = [];
                    }
                    else {
                        try {
                            result = JSON.parse(xhr.responseText);
                        }
                        catch (ex) {
                            err = "Response JSON parse error: " + ex;
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }
            if (typeof cfg.since !== "undefined") {
                requestCfg.params.since = cfg.since;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.profileIds = null;
                if (requestResult.err !== null) {
                    return requestResult;
                }

                if (requestResult.xhr.status === 404) {
                    requestResult.profileIds = [];
                }
                else {
                    try {
                        requestResult.profileIds = JSON.parse(requestResult.xhr.responseText);
                    }
                    catch (ex) {
                        requestResult.err = "retrieveActivityProfileIds - JSON parse error: " + ex;
                    }
                }
            }
            return requestResult;
        },

        /**
        Save an activity profile value, when used from a browser sends to the endpoint using the RESTful interface.

        @method saveActivityProfile
        @param {String} key Key of activity profile to retrieve
        @param val Value to be stored
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {String} [cfg.lastSHA1] SHA1 of the previously seen existing profile
            @param {String} [cfg.contentType] Content-Type to specify in headers (defaults to 'application/octet-stream')
            @param {String} [cfg.method] Method to use. Default: PUT
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        */
        saveActivityProfile: function (key, val, cfg) {
            this.log("saveActivityProfile");
            var requestCfg,
                requestHeaders;

            requestHeaders = cfg.requestHeaders || {};

            if (typeof cfg.contentType === "undefined") {
                cfg.contentType = "application/octet-stream";
            }
            requestHeaders["Content-Type"] = cfg.contentType;

            if (typeof cfg.method === "undefined" || cfg.method !== "POST") {
                cfg.method = "PUT";
            }

            if (typeof val === "object" && TinCan.Utils.isApplicationJSON(cfg.contentType)) {
                val = JSON.stringify(val);
            }

            requestCfg = {
                url: "activities/profile",
                method: cfg.method,
                params: {
                    profileId: key,
                    activityId: cfg.activity.id
                },
                data: val,
                headers: requestHeaders
            };

            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }
            if (typeof cfg.lastSHA1 !== "undefined" && cfg.lastSHA1 !== null) {
                requestCfg.headers["If-Match"] = cfg.lastSHA1;
            }
            else {
                requestCfg.headers["If-None-Match"] = "*";
            }

            return this.sendRequest(requestCfg);
        },

        /**
        Drop an activity profile value, when used from a browser sends to the endpoint using the RESTful interface. Full activity profile
        delete is not supported by the spec.

        @method dropActivityProfile
        @param {String|null} key Key of activity profile to delete
        @param {Object} cfg Configuration options
            @param {TinCan.Activity} cfg.activity Activity in document identifier
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        */
        dropActivityProfile: function (key, cfg) {
            this.log("dropActivityProfile");
            var requestParams,
                requestCfg,
                requestHeaders;

            requestHeaders = cfg.requestHeaders || {};

            requestParams = {
                profileId: key,
                activityId: cfg.activity.id
            };

            requestCfg = {
                url: "activities/profile",
                method: "DELETE",
                params: requestParams,
                headers: requestHeaders
            };

            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }

            return this.sendRequest(requestCfg);
        },

        /**
        Retrieve an agent profile value, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveAgentProfile
        @param {String} key Key of agent profile to retrieve
        @param {Object} cfg Configuration options
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        @return {Object} Value retrieved
        */
        retrieveAgentProfile: function (key, cfg) {
            this.log("retrieveAgentProfile");
            var requestCfg = {},
                requestResult,
                callbackWrapper,
                requestHeaders,
                self = this;

            requestHeaders = cfg.requestHeaders || {};

            requestCfg = {
                method: "GET",
                params: {
                    profileId: key
                },
                ignore404: true,
                headers: requestHeaders
            };

            if (this.version === "0.9") {
                requestCfg.url = "actors/profile";
                requestCfg.params.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestCfg.url = "agents/profile";
                requestCfg.params.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err === null) {
                        if (xhr.status === 404) {
                            result = null;
                        }
                        else {
                            result = new TinCan.AgentProfile(
                                {
                                    id: key,
                                    agent: cfg.agent,
                                    contents: xhr.responseText
                                }
                            );
                            if (typeof xhr.getResponseHeader !== "undefined" && xhr.getResponseHeader("ETag") !== null && xhr.getResponseHeader("ETag") !== "") {
                                result.etag = xhr.getResponseHeader("ETag");
                            }
                            else {
                                //
                                // either XHR didn't have getResponseHeader (probably cause it is an IE
                                // XDomainRequest object which doesn't) or not populated by LRS so create
                                // the hash ourselves
                                //
                                // the LRS is responsible for quoting the Etag value so we need to mimic
                                // that behavior here as well
                                //
                                result.etag = "\"" + TinCan.Utils.getSHA1String(xhr.responseText) + "\"";
                            }
                            if (typeof xhr.contentType !== "undefined") {
                                // most likely an XDomainRequest which has .contentType
                                // for the ones that it supports
                                result.contentType = xhr.contentType;
                            }
                            else if (typeof xhr.getResponseHeader !== "undefined" && xhr.getResponseHeader("Content-Type") !== null && xhr.getResponseHeader("Content-Type") !== "") {
                                result.contentType = xhr.getResponseHeader("Content-Type");
                            }
                            if (TinCan.Utils.isApplicationJSON(result.contentType)) {
                                try {
                                    result.contents = JSON.parse(result.contents);
                                } catch (ex) {
                                    self.log("retrieveAgentProfile - failed to deserialize JSON: " + ex);
                                }
                            }
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.profile = null;
                if (requestResult.err === null && requestResult.xhr.status !== 404) {
                    requestResult.profile = new TinCan.AgentProfile(
                        {
                            id: key,
                            agent: cfg.agent,
                            contents: requestResult.xhr.responseText
                        }
                    );
                    if (typeof requestResult.xhr.getResponseHeader !== "undefined" && requestResult.xhr.getResponseHeader("ETag") !== null && requestResult.xhr.getResponseHeader("ETag") !== "") {
                        requestResult.profile.etag = requestResult.xhr.getResponseHeader("ETag");
                    }
                    else {
                        //
                        // either XHR didn't have getResponseHeader (probably cause it is an IE
                        // XDomainRequest object which doesn't) or not populated by LRS so create
                        // the hash ourselves
                        //
                        // the LRS is responsible for quoting the Etag value so we need to mimic
                        // that behavior here as well
                        //
                        requestResult.profile.etag = "\"" + TinCan.Utils.getSHA1String(requestResult.xhr.responseText) + "\"";
                    }
                    if (typeof requestResult.xhr.contentType !== "undefined") {
                        // most likely an XDomainRequest which has .contentType
                        // for the ones that it supports
                        requestResult.profile.contentType = requestResult.xhr.contentType;
                    }
                    else if (typeof requestResult.xhr.getResponseHeader !== "undefined" && requestResult.xhr.getResponseHeader("Content-Type") !== null && requestResult.xhr.getResponseHeader("Content-Type") !== "") {
                        requestResult.profile.contentType = requestResult.xhr.getResponseHeader("Content-Type");
                    }
                    if (TinCan.Utils.isApplicationJSON(requestResult.profile.contentType)) {
                        try {
                            requestResult.profile.contents = JSON.parse(requestResult.profile.contents);
                        } catch (ex) {
                            this.log("retrieveAgentProfile - failed to deserialize JSON: " + ex);
                        }
                    }
                }
            }

            return requestResult;
        },

        /**
        Retrieve the list of profileIds for an agent profile, when used from a browser sends to the endpoint using the RESTful interface.

        @method retrieveAgentProfileIds
        @param {Object} cfg Configuration options
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {String} [cfg.since] Match activity profiles saved since given timestamp
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        @return {Array} List of profileIds for this Agent

        */
        retrieveAgentProfileIds: function (cfg) {
            this.log("retrieveAgentProfileIds");
            var requestParams = {},
                requestCfg,
                requestHeaders,
                requestResult,
                callbackWrapper;

            cfg = cfg || {};
            requestHeaders = cfg.requestHeaders || {};

            requestCfg = {
                method: "GET",
                params: requestParams,
                headers: requestHeaders,
                ignore404: true
            };

            if (this.version === "0.9") {
                requestCfg.url = "actors/profile";
                requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestCfg.url = "agents/profile";
                requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if (typeof cfg.callback !== "undefined") {
                callbackWrapper = function (err, xhr) {
                    var result = xhr;

                    if (err !== null) {
                        cfg.callback(err, result);
                        return;
                    }

                    if (xhr.status === 404) {
                        result = [];
                    }
                    else {
                        try {
                            result = JSON.parse(xhr.responseText);
                        }
                        catch (ex) {
                            err = "Response JSON parse error: " + ex;
                        }
                    }

                    cfg.callback(err, result);
                };
                requestCfg.callback = callbackWrapper;
            }
            if (typeof cfg.since !== "undefined") {
                requestCfg.params.since = cfg.since;
            }

            requestResult = this.sendRequest(requestCfg);
            if (! callbackWrapper) {
                requestResult.profileIds = null;
                if (requestResult.err !== null) {
                    return requestResult;
                }

                if (requestResult.xhr.status === 404) {
                    requestResult.profileIds = [];
                }
                else {
                    try {
                        requestResult.profileIds = JSON.parse(requestResult.xhr.responseText);
                    }
                    catch (ex) {
                        requestResult.err = "retrieveAgentProfileIds - JSON parse error: " + ex;
                    }
                }
            }
            return requestResult;
        },

        /**
        Save an agent profile value, when used from a browser sends to the endpoint using the RESTful interface.

        @method saveAgentProfile
        @param {String} key Key of agent profile to retrieve
        @param val Value to be stored
        @param {Object} cfg Configuration options
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {String} [cfg.lastSHA1] SHA1 of the previously seen existing profile
            @param {String} [cfg.contentType] Content-Type to specify in headers (defaults to 'application/octet-stream')
            @param {String} [cfg.method] Method to use. Default: PUT
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        */
        saveAgentProfile: function (key, val, cfg) {
            this.log("saveAgentProfile");
            var requestCfg,
                requestHeaders;

            requestHeaders = cfg.requestHeaders || {};

            if (typeof cfg.contentType === "undefined") {
                cfg.contentType = "application/octet-stream";
            }
            requestHeaders["Content-Type"] = cfg.contentType;

            if (typeof cfg.method === "undefined" || cfg.method !== "POST") {
                cfg.method = "PUT";
            }

            if (typeof val === "object" && TinCan.Utils.isApplicationJSON(cfg.contentType)) {
                val = JSON.stringify(val);
            }

            requestCfg = {
                method: cfg.method,
                params: {
                    profileId: key
                },
                data: val,
                headers: requestHeaders
            };

            if (this.version === "0.9") {
                requestCfg.url = "actors/profile";
                requestCfg.params.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestCfg.url = "agents/profile";
                requestCfg.params.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }
            if (typeof cfg.lastSHA1 !== "undefined" && cfg.lastSHA1 !== null) {
                requestCfg.headers["If-Match"] = cfg.lastSHA1;
            }
            else {
                requestCfg.headers["If-None-Match"] = "*";
            }

            return this.sendRequest(requestCfg);
        },

        /**
        Drop an agent profile value, when used from a browser sends to the endpoint using the RESTful interface. Full agent profile
        delete is not supported by the spec.

        @method dropAgentProfile
        @param {String|null} key Key of agent profile to delete
        @param {Object} cfg Configuration options
            @param {TinCan.Agent} cfg.agent Agent in document identifier
            @param {Function} [cfg.callback] Callback to execute on completion
            @param {Object} [cfg.requestHeaders] Optional object containing additional headers to add to request
        */
        dropAgentProfile: function (key, cfg) {
            this.log("dropAgentProfile");
            var requestParams,
                requestCfg,
                requestHeaders;

            requestHeaders = cfg.requestHeaders || {};

            requestParams = {
                profileId: key
            };
            requestCfg = {
                method: "DELETE",
                params: requestParams,
                headers: requestHeaders
            };

            if (this.version === "0.9") {
                requestCfg.url = "actors/profile";
                requestParams.actor = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            else {
                requestCfg.url = "agents/profile";
                requestParams.agent = JSON.stringify(cfg.agent.asVersion(this.version));
            }
            if (typeof cfg.callback !== "undefined") {
                requestCfg.callback = cfg.callback;
            }

            return this.sendRequest(requestCfg);
        }
    };

    /**
    Allows client code to determine whether their environment supports synchronous xhr handling
    @static this is a static property, set by the environment
    */
    LRS.syncEnabled = null;
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.AgentAccount
**/
(function () {
    "use strict";

    /**
    @class TinCan.AgentAccount
    @constructor
    */
    var AgentAccount = TinCan.AgentAccount = function (cfg) {
        this.log("constructor");

        /**
        @property homePage
        @type String
        */
        this.homePage = null;

        /**
        @property name
        @type String
        */
        this.name = null;

        this.init(cfg);
    };
    AgentAccount.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "AgentAccount",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "name",
                    "homePage"
                ];

            cfg = cfg || {};

            // handle .9 name changes
            if (typeof cfg.accountServiceHomePage !== "undefined") {
                cfg.homePage = cfg.accountServiceHomePage;
            }
            if (typeof cfg.accountName !== "undefined") {
                cfg.name = cfg.accountName;
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        },

        toString: function () {
            this.log("toString");
            var result = "";

            if (this.name !== null || this.homePage !== null) {
                result += this.name !== null ? this.name : "-";
                result += ":";
                result += this.homePage !== null ? this.homePage : "-";
            }
            else {
                result = "AgentAccount: unidentified";
            }

            return result;
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion: " + version);
            var result = {};

            version = version || TinCan.versions()[0];

            if (version === "0.9") {
                result.accountName = this.name;
                result.accountServiceHomePage = this.homePage;
            } else {
                result.name = this.name;
                result.homePage = this.homePage;
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} AgentAccount
    @static
    */
    AgentAccount.fromJSON = function (acctJSON) {
        AgentAccount.prototype.log("fromJSON");
        var _acct = JSON.parse(acctJSON);

        return new AgentAccount(_acct);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Agent
**/
(function () {
    "use strict";

    /**
    @class TinCan.Agent
    @constructor
    */
    var Agent = TinCan.Agent = function (cfg) {
        this.log("constructor");

        /**
        @property name
        @type String
        */
        this.name = null;

        /**
        @property mbox
        @type String
        */
        this.mbox = null;

        /**
        @property mbox_sha1sum
        @type String
        */
        this.mbox_sha1sum = null;

        /**
        @property openid
        @type String
        */
        this.openid = null;

        /**
        @property account
        @type TinCan.AgentAccount
        */
        this.account = null;

        /**
        @property degraded
        @type Boolean
        @default false
        */
        this.degraded = false;

        this.init(cfg);
    };
    Agent.prototype = {
        /**
        @property objectType
        @type String
        @default Agent
        */
        objectType: "Agent",

        /**
        @property LOG_SRC
        */
        LOG_SRC: "Agent",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "name",
                    "mbox",
                    "mbox_sha1sum",
                    "openid"
                ],
                val
            ;

            cfg = cfg || {};

            // handle .9 split names and array properties into single interface
            if (typeof cfg.lastName !== "undefined" || typeof cfg.firstName !== "undefined") {
                cfg.name = "";
                if (typeof cfg.firstName !== "undefined" && cfg.firstName.length > 0) {
                    cfg.name = cfg.firstName[0];
                    if (cfg.firstName.length > 1) {
                        this.degraded = true;
                    }
                }

                if (cfg.name !== "") {
                    cfg.name += " ";
                }

                if (typeof cfg.lastName !== "undefined" && cfg.lastName.length > 0) {
                    cfg.name += cfg.lastName[0];
                    if (cfg.lastName.length > 1) {
                        this.degraded = true;
                    }
                }
            } else if (typeof cfg.familyName !== "undefined" || typeof cfg.givenName !== "undefined") {
                cfg.name = "";
                if (typeof cfg.givenName !== "undefined" && cfg.givenName.length > 0) {
                    cfg.name = cfg.givenName[0];
                    if (cfg.givenName.length > 1) {
                        this.degraded = true;
                    }
                }

                if (cfg.name !== "") {
                    cfg.name += " ";
                }

                if (typeof cfg.familyName !== "undefined" && cfg.familyName.length > 0) {
                    cfg.name += cfg.familyName[0];
                    if (cfg.familyName.length > 1) {
                        this.degraded = true;
                    }
                }
            }

            if (typeof cfg.name === "object" && cfg.name !== null) {
                if (cfg.name.length > 1) {
                    this.degraded = true;
                }
                cfg.name = cfg.name[0];
            }
            if (typeof cfg.mbox === "object" && cfg.mbox !== null) {
                if (cfg.mbox.length > 1) {
                    this.degraded = true;
                }
                cfg.mbox = cfg.mbox[0];
            }
            if (typeof cfg.mbox_sha1sum === "object" && cfg.mbox_sha1sum !== null) {
                if (cfg.mbox_sha1sum.length > 1) {
                    this.degraded = true;
                }
                cfg.mbox_sha1sum = cfg.mbox_sha1sum[0];
            }
            if (typeof cfg.openid === "object" && cfg.openid !== null) {
                if (cfg.openid.length > 1) {
                    this.degraded = true;
                }
                cfg.openid = cfg.openid[0];
            }
            if (typeof cfg.account === "object" && cfg.account !== null && typeof cfg.account.homePage === "undefined" && typeof cfg.account.name === "undefined") {
                if (cfg.account.length === 0) {
                    delete cfg.account;
                }
                else {
                    if (cfg.account.length > 1) {
                        this.degraded = true;
                    }
                    cfg.account = cfg.account[0];
                }
            }

            if (cfg.hasOwnProperty("account")) {
                if (cfg.account instanceof TinCan.AgentAccount) {
                    this.account = cfg.account;
                }
                else {
                    this.account = new TinCan.AgentAccount (cfg.account);
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    val = cfg[directProps[i]];
                    if (directProps[i] === "mbox" && val.indexOf("mailto:") === -1) {
                        val = "mailto:" + val;
                    }
                    this[directProps[i]] = val;
                }
            }
        },

        toString: function () {
            this.log("toString");

            if (this.name !== null) {
                return this.name;
            }
            if (this.mbox !== null) {
                return this.mbox.replace("mailto:", "");
            }
            if (this.mbox_sha1sum !== null) {
                return this.mbox_sha1sum;
            }
            if (this.openid !== null) {
                return this.openid;
            }
            if (this.account !== null) {
                return this.account.toString();
            }

            return this.objectType + ": unidentified";
        },

        /**
        While a TinCan.Agent instance can store more than one inverse functional identifier
        this method will always only output one to be compliant with the statement sending
        specification. Order of preference is: mbox, mbox_sha1sum, openid, account

        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion: " + version);
            var result = {
                objectType: this.objectType
            };

            version = version || TinCan.versions()[0];

            if (version === "0.9") {
                if (this.mbox !== null) {
                    result.mbox = [ this.mbox ];
                }
                else if (this.mbox_sha1sum !== null) {
                    result.mbox_sha1sum = [ this.mbox_sha1sum ];
                }
                else if (this.openid !== null) {
                    result.openid = [ this.openid ];
                }
                else if (this.account !== null) {
                    result.account = [ this.account.asVersion(version) ];
                }

                if (this.name !== null) {
                    result.name = [ this.name ];
                }
            } else {
                if (this.mbox !== null) {
                    result.mbox = this.mbox;
                }
                else if (this.mbox_sha1sum !== null) {
                    result.mbox_sha1sum = this.mbox_sha1sum;
                }
                else if (this.openid !== null) {
                    result.openid = this.openid;
                }
                else if (this.account !== null) {
                    result.account = this.account.asVersion(version);
                }

                if (this.name !== null) {
                    result.name = this.name;
                }
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} Agent
    @static
    */
    Agent.fromJSON = function (agentJSON) {
        Agent.prototype.log("fromJSON");
        var _agent = JSON.parse(agentJSON);

        return new Agent(_agent);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Group
**/
(function () {
    "use strict";

    /**
    @class TinCan.Group
    @constructor
    */
    var Group = TinCan.Group = function (cfg) {
        this.log("constructor");

        /**
        @property name
        @type String
        */
        this.name = null;

        /**
        @property mbox
        @type String
        */
        this.mbox = null;

        /**
        @property mbox_sha1sum
        @type String
        */
        this.mbox_sha1sum = null;

        /**
        @property openid
        @type String
        */
        this.openid = null;

        /**
        @property account
        @type TinCan.AgentAccount
        */
        this.account = null;

        /**
        @property member
        @type Array
        */
        this.member = [];

        this.init(cfg);
    };
    Group.prototype = {
        /**
        @property objectType
        @type String
        @default "Group"
        @static
        */
        objectType: "Group",

        /**
        @property LOG_SRC
        */
        LOG_SRC: "Group",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i;

            cfg = cfg || {};

            TinCan.Agent.prototype.init.call(this, cfg);

            if (typeof cfg.member !== "undefined") {
                for (i = 0; i < cfg.member.length; i += 1) {
                    if (cfg.member[i] instanceof TinCan.Agent) {
                        this.member.push(cfg.member[i]);
                    }
                    else {
                        this.member.push(new TinCan.Agent (cfg.member[i]));
                    }
                }
            }
        },

        toString: function (lang) {
            this.log("toString");

            var result = TinCan.Agent.prototype.toString.call(this, lang);
            if (result !== this.objectType + ": unidentified") {
                result = this.objectType + ": " + result;
            }

            return result;
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion: " + version);
            var result,
                i
            ;

            version = version || TinCan.versions()[0];

            result = TinCan.Agent.prototype.asVersion.call(this, version);

            if (this.member.length > 0) {
                result.member = [];
                for (i = 0; i < this.member.length; i += 1) {
                    result.member.push(this.member[i].asVersion(version));
                }
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} Group
    @static
    */
    Group.fromJSON = function (groupJSON) {
        Group.prototype.log("fromJSON");
        var _group = JSON.parse(groupJSON);

        return new Group(_group);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Verb
*/
(function () {
    "use strict";

    //
    // this represents the full set of verb values that were
    // allowed by the .9 spec version, if an object is created with one of
    // the short forms it will be upconverted to the matching long form,
    // for local storage and use and if an object is needed in .9 version
    // consequently down converted
    //
    // hopefully this list will never grow (or change) and only the exact
    // ADL compatible URLs should be matched
    //
    var _downConvertMap = {
        "http://adlnet.gov/expapi/verbs/experienced": "experienced",
        "http://adlnet.gov/expapi/verbs/attended":    "attended",
        "http://adlnet.gov/expapi/verbs/attempted":   "attempted",
        "http://adlnet.gov/expapi/verbs/completed":   "completed",
        "http://adlnet.gov/expapi/verbs/passed":      "passed",
        "http://adlnet.gov/expapi/verbs/failed":      "failed",
        "http://adlnet.gov/expapi/verbs/answered":    "answered",
        "http://adlnet.gov/expapi/verbs/interacted":  "interacted",
        "http://adlnet.gov/expapi/verbs/imported":    "imported",
        "http://adlnet.gov/expapi/verbs/created":     "created",
        "http://adlnet.gov/expapi/verbs/shared":      "shared",
        "http://adlnet.gov/expapi/verbs/voided":      "voided"
    },

    /**
    @class TinCan.Verb
    @constructor
    */
    Verb = TinCan.Verb = function (cfg) {
        this.log("constructor");

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property display
        @type Object
        */
        this.display = null;

        this.init(cfg);
    };
    Verb.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "Verb",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "id",
                    "display"
                ],
                prop
            ;

            if (typeof cfg === "string") {
                this.id = cfg;
                this.display = {
                    und: this.id
                };

                //If simple string like "attempted" was passed in (0.9 verbs), 
                //upconvert the ID to the 0.95 ADL version
                for (prop in _downConvertMap) {
                    if (_downConvertMap.hasOwnProperty(prop) && _downConvertMap[prop] === cfg) {
                        this.id = prop;
                        break;
                    }
                }
            }
            else {
                cfg = cfg || {};

                for (i = 0; i < directProps.length; i += 1) {
                    if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                        this[directProps[i]] = cfg[directProps[i]];
                    }
                }

                if (this.display === null && typeof _downConvertMap[this.id] !== "undefined") {
                    this.display = {
                        "und": _downConvertMap[this.id]
                    };
                }
            }
        },

        /**
        @method toString
        @return {String} String representation of the verb
        */
        toString: function (lang) {
            this.log("toString");

            if (this.display !== null) {
                return this.getLangDictionaryValue("display", lang);
            }

            return this.id;
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result;

            version = version || TinCan.versions()[0];

            if (version === "0.9") {
                result = _downConvertMap[this.id];
            }
            else {
                result = {
                    id: this.id
                };
                if (this.display !== null) {
                    result.display = this.display;
                }
            }

            return result;
        },

        /**
        See {{#crossLink "TinCan.Utils/getLangDictionaryValue"}}{{/crossLink}}

        @method getLangDictionaryValue
        */
        getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue
    };

    /**
    @method fromJSON
    @param {String} verbJSON String of JSON representing the verb
    @return {Object} Verb
    @static
    */
    Verb.fromJSON = function (verbJSON) {
        Verb.prototype.log("fromJSON");
        var _verb = JSON.parse(verbJSON);

        return new Verb(_verb);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Result
**/
(function () {
    "use strict";

    /**
    @class TinCan.Result
    @constructor
    */
    var Result = TinCan.Result = function (cfg) {
        this.log("constructor");

        /**
        @property score
        @type TinCan.Score|null
        */
        this.score = null;

        /**
        @property success
        @type Boolean|null
        */
        this.success = null;

        /**
        @property completion
        @type Boolean|null
        */
        this.completion = null;

        /**
        @property duration
        @type String|null
        */
        this.duration = null;

        /**
        @property response
        @type String|null
        */
        this.response = null;

        /**
        @property extensions
        @type Object|null
        */
        this.extensions = null;

        this.init(cfg);
    };
    Result.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "Result",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");

            var i,
                directProps = [
                    "completion",
                    "duration",
                    "extensions",
                    "response",
                    "success"
                ]
            ;

            cfg = cfg || {};

            if (cfg.hasOwnProperty("score") && cfg.score !== null) {
                if (cfg.score instanceof TinCan.Score) {
                    this.score = cfg.score;
                }
                else {
                    this.score = new TinCan.Score (cfg.score);
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }

            // 0.9 used a string, store it internally as a bool
            if (this.completion === "Completed") {
                this.completion = true;
            }
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {},
                optionalDirectProps = [
                    "success",
                    "duration",
                    "response",
                    "extensions"
                ],
                optionalObjProps = [
                    "score"
                ],
                i;

            version = version || TinCan.versions()[0];

            for (i = 0; i < optionalDirectProps.length; i += 1) {
                if (this[optionalDirectProps[i]] !== null) {
                    result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
                }
            }
            for (i = 0; i < optionalObjProps.length; i += 1) {
                if (this[optionalObjProps[i]] !== null) {
                    result[optionalObjProps[i]] = this[optionalObjProps[i]].asVersion(version);
                }
            }
            if (this.completion !== null) {
                if (version === "0.9") {
                    if (this.completion) {
                        result.completion = "Completed";
                    }
                }
                else {
                    result.completion = this.completion;
                }
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} Result
    @static
    */
    Result.fromJSON = function (resultJSON) {
        Result.prototype.log("fromJSON");
        var _result = JSON.parse(resultJSON);

        return new Result(_result);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Score
**/
(function () {
    "use strict";

    /**
    @class TinCan.Score
    @constructor
    */
    var Score = TinCan.Score = function (cfg) {
        this.log("constructor");

        /**
        @property scaled
        @type String
        */
        this.scaled = null;

        /**
        @property raw
        @type String
        */
        this.raw = null;

        /**
        @property min
        @type String
        */
        this.min = null;

        /**
        @property max
        @type String
        */
        this.max = null;

        this.init(cfg);
    };
    Score.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "Score",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");

            var i,
                directProps = [
                    "scaled",
                    "raw",
                    "min",
                    "max"
                ]
            ;

            cfg = cfg || {};

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {},
                optionalDirectProps = [
                    "scaled",
                    "raw",
                    "min",
                    "max"
                ],
                i;

            version = version || TinCan.versions()[0];

            for (i = 0; i < optionalDirectProps.length; i += 1) {
                if (this[optionalDirectProps[i]] !== null) {
                    result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
                }
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} Score
    @static
    */
    Score.fromJSON = function (scoreJSON) {
        Score.prototype.log("fromJSON");
        var _score = JSON.parse(scoreJSON);

        return new Score(_score);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.InteractionComponent
**/
(function () {
    "use strict";

    /**
    @class TinCan.InteractionComponent
    @constructor
    */
    var InteractionComponent = TinCan.InteractionComponent = function (cfg) {
        this.log("constructor");

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property description
        @type Object
        */
        this.description = null;

        this.init(cfg);
    };
    InteractionComponent.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "InteractionComponent",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "id",
                    "description"
                ]
            ;

            cfg = cfg || {};

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {
                    id: this.id
                },
                optionalDirectProps = [
                    "description"
                ],
                i,
                prop;

            version = version || TinCan.versions()[0];

            for (i = 0; i < optionalDirectProps.length; i += 1) {
                prop = optionalDirectProps[i];
                if (this[prop] !== null) {
                    result[prop] = this[prop];
                }
            }

            return result;
        },

        /**
        See {{#crossLink "TinCan.Utils/getLangDictionaryValue"}}{{/crossLink}}

        @method getLangDictionaryValue
        */
        getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue
    };

    /**
    @method fromJSON
    @return {Object} InteractionComponent
    @static
    */
    InteractionComponent.fromJSON = function (icJSON) {
        InteractionComponent.prototype.log("fromJSON");
        var _ic = JSON.parse(icJSON);

        return new InteractionComponent(_ic);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.ActivityDefinition
**/
(function () {
    "use strict";

    //
    // this represents the full set of activity definition types that were
    // allowed by the .9 spec version, if an object is created with one of
    // the short forms it will be upconverted to the matching long form,
    // for local storage and use and if an object is needed in .9 version
    // consequently down converted
    //
    // hopefully this list will never grow (or change) and only the exact
    // ADL compatible URLs should be matched
    //
    var _downConvertMap = {
        "http://adlnet.gov/expapi/activities/course": "course",
        "http://adlnet.gov/expapi/activities/module": "module",
        "http://adlnet.gov/expapi/activities/meeting": "meeting",
        "http://adlnet.gov/expapi/activities/media": "media",
        "http://adlnet.gov/expapi/activities/performance": "performance",
        "http://adlnet.gov/expapi/activities/simulation": "simulation",
        "http://adlnet.gov/expapi/activities/assessment": "assessment",
        "http://adlnet.gov/expapi/activities/interaction": "interaction",
        "http://adlnet.gov/expapi/activities/cmi.interaction": "cmi.interaction",
        "http://adlnet.gov/expapi/activities/question": "question",
        "http://adlnet.gov/expapi/activities/objective": "objective",
        "http://adlnet.gov/expapi/activities/link": "link"
    },

    /**
    @class TinCan.ActivityDefinition
    @constructor
    */
    ActivityDefinition = TinCan.ActivityDefinition = function (cfg) {
        this.log("constructor");

        /**
        @property name
        @type Object
        */
        this.name = null;

        /**
        @property description
        @type Object
        */
        this.description = null;

        /**
        @property type
        @type String
        */
        this.type = null;

        /**
        @property moreInfo
        @type String
        */
        this.moreInfo = null;

        /**
        @property extensions
        @type Object
        */
        this.extensions = null;

        /**
        @property interactionType
        @type String
        */
        this.interactionType = null;

        /**
        @property correctResponsesPattern
        @type Array
        */
        this.correctResponsesPattern = null;

        /**
        @property choices
        @type Array
        */
        this.choices = null;

        /**
        @property scale
        @type Array
        */
        this.scale = null;

        /**
        @property source
        @type Array
        */
        this.source = null;

        /**
        @property target
        @type Array
        */
        this.target = null;

        /**
        @property steps
        @type Array
        */
        this.steps = null;

        this.init(cfg);
    };
    ActivityDefinition.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "ActivityDefinition",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");

            var i,
                j,
                prop,
                directProps = [
                    "name",
                    "description",
                    "moreInfo",
                    "extensions",
                    "correctResponsesPattern"
                ],
                interactionComponentProps = []
            ;

            cfg = cfg || {};

            if (cfg.hasOwnProperty("type") && cfg.type !== null) {
                // TODO: verify type is URI?
                for (prop in _downConvertMap) {
                    if (_downConvertMap.hasOwnProperty(prop) && _downConvertMap[prop] === cfg.type) {
                        cfg.type = _downConvertMap[prop];
                    }
                }
                this.type = cfg.type;
            }

            if (cfg.hasOwnProperty("interactionType") && cfg.interactionType !== null) {
                // TODO: verify interaction type in acceptable set?
                this.interactionType = cfg.interactionType;
                if (cfg.interactionType === "choice" || cfg.interactionType === "sequencing") {
                    interactionComponentProps.push("choices");
                }
                else if (cfg.interactionType === "likert") {
                    interactionComponentProps.push("scale");
                }
                else if (cfg.interactionType === "matching") {
                    interactionComponentProps.push("source");
                    interactionComponentProps.push("target");
                }
                else if (cfg.interactionType === "performance") {
                    interactionComponentProps.push("steps");
                }

                if (interactionComponentProps.length > 0) {
                    for (i = 0; i < interactionComponentProps.length; i += 1) {
                        prop = interactionComponentProps[i];
                        if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
                            this[prop] = [];
                            for (j = 0; j < cfg[prop].length; j += 1) {
                                if (cfg[prop][j] instanceof TinCan.InteractionComponent) {
                                    this[prop].push(cfg[prop][j]);
                                } else {
                                    this[prop].push(
                                        new TinCan.InteractionComponent (
                                            cfg[prop][j]
                                        )
                                    );
                                }
                            }
                        }
                    }
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        },

        /**
        @method toString
        @return {String} String representation of the definition
        */
        toString: function (lang) {
            this.log("toString");

            if (this.name !== null) {
                return this.getLangDictionaryValue("name", lang);
            }

            if (this.description !== null) {
                return this.getLangDictionaryValue("description", lang);
            }

            return "";
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {},
                directProps = [
                    "name",
                    "description",
                    "interactionType",
                    "correctResponsesPattern",
                    "extensions"
                ],
                interactionComponentProps = [
                    "choices",
                    "scale",
                    "source",
                    "target",
                    "steps"
                ],
                i,
                j,
                prop
            ;

            version = version || TinCan.versions()[0];

            if (this.type !== null) {
                if (version === "0.9") {
                    result.type = _downConvertMap[this.type];
                }
                else {
                    result.type = this.type;
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                prop = directProps[i];
                if (this[prop] !== null) {
                    result[prop] = this[prop];
                }
            }

            for (i = 0; i < interactionComponentProps.length; i += 1) {
                prop = interactionComponentProps[i];
                if (this[prop] !== null) {
                    result[prop] = [];
                    for (j = 0; j < this[prop].length; j += 1) {
                        result[prop].push(
                            this[prop][j].asVersion(version)
                        );
                    }
                }
            }

            if (version.indexOf("0.9") !== 0) {
                if (this.moreInfo !== null) {
                    result.moreInfo = this.moreInfo;
                }
            }

            return result;
        },

        /**
        See {{#crossLink "TinCan.Utils/getLangDictionaryValue"}}{{/crossLink}}

        @method getLangDictionaryValue
        */
        getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue
    };

    /**
    @method fromJSON
    @return {Object} ActivityDefinition
    @static
    */
    ActivityDefinition.fromJSON = function (definitionJSON) {
        ActivityDefinition.prototype.log("fromJSON");
        var _definition = JSON.parse(definitionJSON);

        return new ActivityDefinition(_definition);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Activity
**/
(function () {
    "use strict";

    /**
    @class TinCan.Activity
    @constructor
    */
    var Activity = TinCan.Activity = function (cfg) {
        this.log("constructor");

        /**
        @property objectType
        @type String
        @default Activity
        */
        this.objectType = "Activity";

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property definition
        @type TinCan.ActivityDefinition
        */
        this.definition = null;

        this.init(cfg);
    };
    Activity.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "Activity",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");

            var i,
                directProps = [
                    "id"
                ]
            ;

            cfg = cfg || {};

            if (cfg.hasOwnProperty("definition")) {
                if (cfg.definition instanceof TinCan.ActivityDefinition) {
                    this.definition = cfg.definition;
                } else {
                    this.definition = new TinCan.ActivityDefinition (cfg.definition);
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        },

        /**
        @method toString
        @return {String} String representation of the activity
        */
        toString: function (lang) {
            this.log("toString");
            var defString = "";

            if (this.definition !== null) {
                defString = this.definition.toString(lang);
                if (defString !== "") {
                    return defString;
                }
            }

            if (this.id !== null) {
                return this.id;
            }

            return "Activity: unidentified";
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {
                id: this.id,
                objectType: this.objectType
            };

            version = version || TinCan.versions()[0];

            if (this.definition !== null) {
                result.definition = this.definition.asVersion(version);
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} Activity
    @static
    */
    Activity.fromJSON = function (activityJSON) {
        Activity.prototype.log("fromJSON");
        var _activity = JSON.parse(activityJSON);

        return new Activity(_activity);
    };
}());

/*
    Copyright 2013 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.ContextActivities
**/
(function () {
    "use strict";

    /**
    @class TinCan.ContextActivities
    @constructor
    */
    var ContextActivities = TinCan.ContextActivities = function (cfg) {
        this.log("constructor");

        /**
        @property category
        @type Array
        */
        this.category = null;

        /**
        @property parent
        @type Array
        */
        this.parent = null;

        /**
        @property grouping
        @type Array
        */
        this.grouping = null;

        /**
        @property other
        @type Array
        */
        this.other = null;

        this.init(cfg);
    };
    ContextActivities.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "ContextActivities",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");

            var i,
                j,
                objProps = [
                    "category",
                    "parent",
                    "grouping",
                    "other"
                ],
                prop,
                val
            ;

            cfg = cfg || {};

            for (i = 0; i < objProps.length; i += 1) {
                prop = objProps[i];
                if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
                    if (Object.prototype.toString.call(cfg[prop]) === "[object Array]") {
                        for (j = 0; j < cfg[prop].length; j += 1) {
                            this.add(prop, cfg[prop][j]);
                        }
                    }
                    else {
                        val = cfg[prop];

                        this.add(prop, val);
                    }
                }
            }
        },

        /**
        @method add
        @param String key Property to add value to one of "category", "parent", "grouping", "other"
        @return Number index where the value was added
        */
        add: function (key, val) {
            if (key !== "category" && key !== "parent" && key !== "grouping" && key !== "other") {
                return;
            }

            if (this[key] === null) {
                this[key] = [];
            }

            if (! (val instanceof TinCan.Activity)) {
                val = typeof val === "string" ? { id: val } : val;
                val = new TinCan.Activity (val);
            }

            this[key].push(val);

            return this[key].length - 1;
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {},
                optionalObjProps = [
                    "parent",
                    "grouping",
                    "other"
                ],
                i,
                j;

            version = version || TinCan.versions()[0];

            for (i = 0; i < optionalObjProps.length; i += 1) {
                if (this[optionalObjProps[i]] !== null && this[optionalObjProps[i]].length > 0) {
                    if (version === "0.9" || version === "0.95") {
                        if (this[optionalObjProps[i]].length > 1) {
                            // TODO: exception?
                            this.log("[warning] version does not support multiple values in: " + optionalObjProps[i]);
                        }

                        result[optionalObjProps[i]] = this[optionalObjProps[i]][0].asVersion(version);
                    }
                    else {
                        result[optionalObjProps[i]] = [];
                        for (j = 0; j < this[optionalObjProps[i]].length; j += 1) {
                            result[optionalObjProps[i]].push(
                                this[optionalObjProps[i]][j].asVersion(version)
                            );
                        }
                    }
                }
            }
            if (this.category !== null && this.category.length > 0) {
                if (version === "0.9" || version === "0.95") {
                    this.log("[error] version does not support the 'category' property: " + version);
                    throw new Error(version + " does not support the 'category' property");
                }
                else {
                    result.category = [];
                    for (i = 0; i < this.category.length; i += 1) {
                        result.category.push(this.category[i].asVersion(version));
                    }
                }
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} ContextActivities
    @static
    */
    ContextActivities.fromJSON = function (contextActivitiesJSON) {
        ContextActivities.prototype.log("fromJSON");
        var _contextActivities = JSON.parse(contextActivitiesJSON);

        return new ContextActivities(_contextActivities);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Context
**/
(function () {
    "use strict";

    /**
    @class TinCan.Context
    @constructor
    */
    var Context = TinCan.Context = function (cfg) {
        this.log("constructor");

        /**
        @property registration
        @type String|null
        */
        this.registration = null;

        /**
        @property instructor
        @type TinCan.Agent|TinCan.Group|null
        */
        this.instructor = null;

        /**
        @property team
        @type TinCan.Agent|TinCan.Group|null
        */
        this.team = null;

        /**
        @property contextActivities
        @type ContextActivities|null
        */
        this.contextActivities = null;

        /**
        @property revision
        @type String|null
        */
        this.revision = null;

        /**
        @property platform
        @type Object|null
        */
        this.platform = null;

        /**
        @property language
        @type String|null
        */
        this.language = null;

        /**
        @property statement
        @type StatementRef|null
        */
        this.statement = null;

        /**
        @property extensions
        @type String
        */
        this.extensions = null;

        this.init(cfg);
    };
    Context.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "Context",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");

            var i,
                directProps = [
                    "registration",
                    "revision",
                    "platform",
                    "language",
                    "extensions"
                ],
                agentGroupProps = [
                    "instructor",
                    "team"
                ],
                prop,
                val
            ;

            cfg = cfg || {};

            for (i = 0; i < directProps.length; i += 1) {
                prop = directProps[i];
                if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
                    this[prop] = cfg[prop];
                }
            }
            for (i = 0; i < agentGroupProps.length; i += 1) {
                prop = agentGroupProps[i];
                if (cfg.hasOwnProperty(prop) && cfg[prop] !== null) {
                    val = cfg[prop];

                    if (typeof val.objectType === "undefined" || val.objectType === "Person") {
                        val.objectType = "Agent";
                    }

                    if (val.objectType === "Agent" && ! (val instanceof TinCan.Agent)) {
                        val = new TinCan.Agent (val);
                    } else if (val.objectType === "Group" && ! (val instanceof TinCan.Group)) {
                        val = new TinCan.Group (val);
                    }

                    this[prop] = val;
                }
            }

            if (cfg.hasOwnProperty("contextActivities") && cfg.contextActivities !== null) {
                if (cfg.contextActivities instanceof TinCan.ContextActivities) {
                    this.contextActivities = cfg.contextActivities;
                }
                else {
                    this.contextActivities = new TinCan.ContextActivities(cfg.contextActivities);
                }
            }

            if (cfg.hasOwnProperty("statement") && cfg.statement !== null) {
                if (cfg.statement instanceof TinCan.StatementRef) {
                    this.statement = cfg.statement;
                }
                else if (cfg.statement instanceof TinCan.SubStatement) {
                    this.statement = cfg.statement;
                }
                else if (cfg.statement.objectType === "StatementRef") {
                    this.statement = new TinCan.StatementRef(cfg.statement);
                }
                else if (cfg.statement.objectType === "SubStatement") {
                    this.statement = new TinCan.SubStatement(cfg.statement);
                }
                else {
                    this.log("Unable to parse statement.context.statement property.");
                }
            }
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {},
                optionalDirectProps = [
                    "registration",
                    "revision",
                    "platform",
                    "language",
                    "extensions"
                ],
                optionalObjProps = [
                    "instructor",
                    "team",
                    "contextActivities",
                    "statement"
                ],
                i;

            version = version || TinCan.versions()[0];

            if (this.statement instanceof TinCan.SubStatement && version !== "0.9" && version !== "0.95") {
                this.log("[error] version does not support SubStatements in the 'statement' property: " + version);
                throw new Error(version + " does not support SubStatements in the 'statement' property");
            }

            for (i = 0; i < optionalDirectProps.length; i += 1) {
                if (this[optionalDirectProps[i]] !== null) {
                    result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
                }
            }
            for (i = 0; i < optionalObjProps.length; i += 1) {
                if (this[optionalObjProps[i]] !== null) {
                    result[optionalObjProps[i]] = this[optionalObjProps[i]].asVersion(version);
                }
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} Context
    @static
    */
    Context.fromJSON = function (contextJSON) {
        Context.prototype.log("fromJSON");
        var _context = JSON.parse(contextJSON);

        return new Context(_context);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.StatementRef
**/
(function () {
    "use strict";

    /**
    @class TinCan.StatementRef
    @constructor
    @param {Object} [cfg] Configuration used to initialize.
        @param {Object} [cfg.id] ID of statement to reference
    **/
    var StatementRef = TinCan.StatementRef = function (cfg) {
        this.log("constructor");

        /**
        @property id
        @type String
        */
        this.id = null;

        this.init(cfg);
    };

    StatementRef.prototype = {
        /**
        @property objectType
        @type String
        @default Agent
        */
        objectType: "StatementRef",

        /**
        @property LOG_SRC
        */
        LOG_SRC: "StatementRef",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize (see constructor)
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "id"
                ];

            cfg = cfg || {};

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        },

        /**
        @method toString
        @return {String} String representation of the statement
        */
        toString: function () {
            this.log("toString");
            return this.id;
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {
                objectType: this.objectType,
                id: this.id
            };

            if (version === "0.9") {
                result.objectType = "Statement";
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} StatementRef
    @static
    */
    StatementRef.fromJSON = function (stRefJSON) {
        StatementRef.prototype.log("fromJSON");
        var _stRef = JSON.parse(stRefJSON);

        return new StatementRef(_stRef);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.SubStatement
**/
(function () {
    "use strict";

    /**
    @class TinCan.SubStatement
    @constructor
    @param {Object} [cfg] Configuration used to initialize.
        @param {TinCan.Agent} [cfg.actor] Actor of statement
        @param {TinCan.Verb} [cfg.verb] Verb of statement
        @param {TinCan.Activity|TinCan.Agent} [cfg.object] Alias for 'target'
        @param {TinCan.Activity|TinCan.Agent} [cfg.target] Object of statement
        @param {TinCan.Result} [cfg.result] Statement Result
        @param {TinCan.Context} [cfg.context] Statement Context
    **/
    var SubStatement = TinCan.SubStatement = function (cfg) {
        this.log("constructor");

        /**
        @property actor
        @type Object
        */
        this.actor = null;

        /**
        @property verb
        @type Object
        */
        this.verb = null;

        /**
        @property target
        @type Object
        */
        this.target = null;

        /**
        @property result
        @type Object
        */
        this.result = null;

        /**
        @property context
        @type Object
        */
        this.context = null;

        /**
        @property timestamp
        @type Date
        */
        this.timestamp = null;

        this.init(cfg);
    };

    SubStatement.prototype = {
        /**
        @property objectType
        @type String
        @default Agent
        */
        objectType: "SubStatement",

        /**
        @property LOG_SRC
        */
        LOG_SRC: "SubStatement",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize (see constructor)
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "timestamp"
                ];

            cfg = cfg || {};

            if (cfg.hasOwnProperty("object")) {
                cfg.target = cfg.object;
            }

            if (cfg.hasOwnProperty("actor")) {
                if (typeof cfg.actor.objectType === "undefined" || cfg.actor.objectType === "Person") {
                    cfg.actor.objectType = "Agent";
                }

                if (cfg.actor.objectType === "Agent") {
                    if (cfg.actor instanceof TinCan.Agent) {
                        this.actor = cfg.actor;
                    } else {
                        this.actor = new TinCan.Agent (cfg.actor);
                    }
                } else if (cfg.actor.objectType === "Group") {
                    if (cfg.actor instanceof TinCan.Group) {
                        this.actor = cfg.actor;
                    } else {
                        this.actor = new TinCan.Group (cfg.actor);
                    }
                }
            }
            if (cfg.hasOwnProperty("verb")) {
                if (cfg.verb instanceof TinCan.Verb) {
                    this.verb = cfg.verb;
                } else {
                    this.verb = new TinCan.Verb (cfg.verb);
                }
            }
            if (cfg.hasOwnProperty("target")) {
                if (cfg.target instanceof TinCan.Activity ||
                    cfg.target instanceof TinCan.Agent ||
                    cfg.target instanceof TinCan.Group ||
                    cfg.target instanceof TinCan.SubStatement ||
                    cfg.target instanceof TinCan.StatementRef
                ) {
                    this.target = cfg.target;
                } else {
                    if (typeof cfg.target.objectType === "undefined") {
                        cfg.target.objectType = "Activity";
                    }

                    if (cfg.target.objectType === "Activity") {
                        this.target = new TinCan.Activity (cfg.target);
                    } else if (cfg.target.objectType === "Agent") {
                        this.target = new TinCan.Agent (cfg.target);
                    } else if (cfg.target.objectType === "Group") {
                        this.target = new TinCan.Group (cfg.target);
                    } else if (cfg.target.objectType === "SubStatement") {
                        this.target = new TinCan.SubStatement (cfg.target);
                    } else if (cfg.target.objectType === "StatementRef") {
                        this.target = new TinCan.StatementRef (cfg.target);
                    } else {
                        this.log("Unrecognized target type: " + cfg.target.objectType);
                    }
                }
            }
            if (cfg.hasOwnProperty("result")) {
                if (cfg.result instanceof TinCan.Result) {
                    this.result = cfg.result;
                } else {
                    this.result = new TinCan.Result (cfg.result);
                }
            }
            if (cfg.hasOwnProperty("context")) {
                if (cfg.context instanceof TinCan.Context) {
                    this.context = cfg.context;
                } else {
                    this.context = new TinCan.Context (cfg.context);
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        },

        /**
        @method toString
        @return {String} String representation of the statement
        */
        toString: function (lang) {
            this.log("toString");
            return (this.actor !== null ? this.actor.toString(lang) : "") +
                    " " +
                    (this.verb !== null ? this.verb.toString(lang) : "") +
                    " " +
                    (this.target !== null ? this.target.toString(lang) : "");
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result,
                optionalDirectProps = [
                    "timestamp"
                ],
                optionalObjProps = [
                    "actor",
                    "verb",
                    "result",
                    "context"
                ],
                i;

            result = {
                objectType: this.objectType
            };
            version = version || TinCan.versions()[0];

            for (i = 0; i < optionalDirectProps.length; i += 1) {
                if (this[optionalDirectProps[i]] !== null) {
                    result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
                }
            }
            for (i = 0; i < optionalObjProps.length; i += 1) {
                if (this[optionalObjProps[i]] !== null) {
                    result[optionalObjProps[i]] = this[optionalObjProps[i]].asVersion(version);
                }
            }
            if (this.target !== null) {
                result.object = this.target.asVersion(version);
            }

            if (version === "0.9") {
                result.objectType = "Statement";
            }

            return result;
        }
    };

    /**
    @method fromJSON
    @return {Object} SubStatement
    @static
    */
    SubStatement.fromJSON = function (subStJSON) {
        SubStatement.prototype.log("fromJSON");
        var _subSt = JSON.parse(subStJSON);

        return new SubStatement(_subSt);
    };
}());

/*
    Copyright 2012-3 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Statement
**/
(function () {
    "use strict";

    /**
    @class TinCan.Statement
    @constructor
    @param {Object} [cfg] Values to set in properties
        @param {String} [cfg.id] Statement ID (UUID)
        @param {TinCan.Agent} [cfg.actor] Actor of statement
        @param {TinCan.Verb} [cfg.verb] Verb of statement
        @param {TinCan.Activity|TinCan.Agent|TinCan.Group|TinCan.StatementRef|TinCan.SubStatement} [cfg.object] Alias for 'target'
        @param {TinCan.Activity|TinCan.Agent|TinCan.Group|TinCan.StatementRef|TinCan.SubStatement} [cfg.target] Object of statement
        @param {TinCan.Result} [cfg.result] Statement Result
        @param {TinCan.Context} [cfg.context] Statement Context
        @param {TinCan.Agent} [cfg.authority] Statement Authority
        @param {TinCan.Attachment} [cfg.attachments] Statement Attachments
        @param {String} [cfg.timestamp] ISO8601 Date/time value
        @param {String} [cfg.stored] ISO8601 Date/time value
        @param {String} [cfg.version] Version of the statement (post 0.95)
    @param {Object} [initCfg] Configuration of initialization process
        @param {Integer} [initCfg.storeOriginal] Whether to store a JSON stringified version
            of the original options object, pass number of spaces used for indent
        @param {Boolean} [initCfg.doStamp] Whether to automatically set the 'id' and 'timestamp'
            properties (default: true)
    **/
    var Statement = TinCan.Statement = function (cfg, initCfg) {
        this.log("constructor");

        // check for true value for API backwards compat
        if (typeof initCfg === "number") {
            initCfg = {
                storeOriginal: initCfg
            };
        } else {
            initCfg = initCfg || {};
        }
        if (typeof initCfg.storeOriginal === "undefined") {
            initCfg.storeOriginal = null;
        }
        if (typeof initCfg.doStamp === "undefined") {
            initCfg.doStamp = true;
        }

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property actor
        @type TinCan.Agent|TinCan.Group|null
        */
        this.actor = null;

        /**
        @property verb
        @type TinCan.Verb|null
        */
        this.verb = null;

        /**
        @property target
        @type TinCan.Activity|TinCan.Agent|TinCan.Group|TinCan.StatementRef|TinCan.SubStatement|null
        */
        this.target = null;

        /**
        @property result
        @type Object
        */
        this.result = null;

        /**
        @property context
        @type Object
        */
        this.context = null;

        /**
        @property timestamp
        @type String
        */
        this.timestamp = null;

        /**
        @property stored
        @type String
        */
        this.stored = null;

        /**
        @property authority
        @type TinCan.Agent|null
        */
        this.authority = null;

        /**
        @property attachments
        @type Array of TinCan.Attachment
        */
        this.attachments = null;

        /**
        @property version
        @type String
        */
        this.version = null;

        /**
        @property degraded
        @type Boolean
        @default false
        */
        this.degraded = false;

        /**
        @property voided
        @type Boolean
        @default null
        @deprecated
        */
        this.voided = null;

        /**
        @property inProgress
        @type Boolean
        @deprecated
        */
        this.inProgress = null;

        /**
        @property originalJSON
        @type String
        */
        this.originalJSON = null;

        this.init(cfg, initCfg);
    };

    Statement.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "Statement",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [properties] Configuration used to set properties (see constructor)
        @param {Object} [cfg] Configuration used to initialize (see constructor)
        */
        init: function (cfg, initCfg) {
            this.log("init");
            var i,
                directProps = [
                    "id",
                    "stored",
                    "timestamp",
                    "version",
                    "inProgress",
                    "voided"
                ];

            cfg = cfg || {};

            if (initCfg.storeOriginal) {
                this.originalJSON = JSON.stringify(cfg, null, initCfg.storeOriginal);
            }

            if (cfg.hasOwnProperty("object")) {
                cfg.target = cfg.object;
            }

            if (cfg.hasOwnProperty("actor")) {
                if (typeof cfg.actor.objectType === "undefined" || cfg.actor.objectType === "Person") {
                    cfg.actor.objectType = "Agent";
                }

                if (cfg.actor.objectType === "Agent") {
                    if (cfg.actor instanceof TinCan.Agent) {
                        this.actor = cfg.actor;
                    } else {
                        this.actor = new TinCan.Agent (cfg.actor);
                    }
                } else if (cfg.actor.objectType === "Group") {
                    if (cfg.actor instanceof TinCan.Group) {
                        this.actor = cfg.actor;
                    } else {
                        this.actor = new TinCan.Group (cfg.actor);
                    }
                }
            }
            if (cfg.hasOwnProperty("authority")) {
                if (typeof cfg.authority.objectType === "undefined" || cfg.authority.objectType === "Person") {
                    cfg.authority.objectType = "Agent";
                }

                if (cfg.authority.objectType === "Agent") {
                    if (cfg.authority instanceof TinCan.Agent) {
                        this.authority = cfg.authority;
                    } else {
                        this.authority = new TinCan.Agent (cfg.authority);
                    }
                } else if (cfg.authority.objectType === "Group") {
                    if (cfg.actor instanceof TinCan.Group) {
                        this.authority = cfg.authority;
                    } else {
                        this.authority = new TinCan.Group (cfg.authority);
                    }
                }
            }
            if (cfg.hasOwnProperty("verb")) {
                if (cfg.verb instanceof TinCan.Verb) {
                    this.verb = cfg.verb;
                } else {
                    this.verb = new TinCan.Verb (cfg.verb);
                }
            }
            if (cfg.hasOwnProperty("target")) {
                if (cfg.target instanceof TinCan.Activity ||
                    cfg.target instanceof TinCan.Agent ||
                    cfg.target instanceof TinCan.Group ||
                    cfg.target instanceof TinCan.SubStatement ||
                    cfg.target instanceof TinCan.StatementRef
                ) {
                    this.target = cfg.target;
                } else {
                    if (typeof cfg.target.objectType === "undefined") {
                        cfg.target.objectType = "Activity";
                    }

                    if (cfg.target.objectType === "Activity") {
                        this.target = new TinCan.Activity (cfg.target);
                    } else if (cfg.target.objectType === "Agent") {
                        this.target = new TinCan.Agent (cfg.target);
                    } else if (cfg.target.objectType === "Group") {
                        this.target = new TinCan.Group (cfg.target);
                    } else if (cfg.target.objectType === "SubStatement") {
                        this.target = new TinCan.SubStatement (cfg.target);
                    } else if (cfg.target.objectType === "StatementRef") {
                        this.target = new TinCan.StatementRef (cfg.target);
                    } else {
                        this.log("Unrecognized target type: " + cfg.target.objectType);
                    }
                }
            }
            if (cfg.hasOwnProperty("result")) {
                if (cfg.result instanceof TinCan.Result) {
                    this.result = cfg.result;
                } else {
                    this.result = new TinCan.Result (cfg.result);
                }
            }
            if (cfg.hasOwnProperty("context")) {
                if (cfg.context instanceof TinCan.Context) {
                    this.context = cfg.context;
                } else {
                    this.context = new TinCan.Context (cfg.context);
                }
            }
            if (cfg.hasOwnProperty("attachments") && cfg.attachments !== null) {
                this.attachments = [];
                for (i = 0; i < cfg.attachments.length; i += 1) {
                    if (! (cfg.attachments[i] instanceof TinCan.Attachment)) {
                        this.attachments.push(new TinCan.Attachment (cfg.attachments[i]));
                    }
                    else {
                        this.attachments.push(cfg.attachments[i]);
                    }
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }

            if (initCfg.doStamp) {
                this.stamp();
            }
        },

        /**
        @method toString
        @return {String} String representation of the statement
        */
        toString: function (lang) {
            this.log("toString");
            return (this.actor !== null ? this.actor.toString(lang) : "") +
                    " " +
                    (this.verb !== null ? this.verb.toString(lang) : "") +
                    " " +
                    (this.target !== null ? this.target.toString(lang) : "");
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result = {},
                optionalDirectProps = [
                    "id",
                    "timestamp"
                ],
                optionalObjProps = [
                    "actor",
                    "verb",
                    "result",
                    "context",
                    "authority"
                ],
                i;

            version = version || TinCan.versions()[0];

            for (i = 0; i < optionalDirectProps.length; i += 1) {
                if (this[optionalDirectProps[i]] !== null) {
                    result[optionalDirectProps[i]] = this[optionalDirectProps[i]];
                }
            }
            for (i = 0; i < optionalObjProps.length; i += 1) {
                if (this[optionalObjProps[i]] !== null) {
                    result[optionalObjProps[i]] = this[optionalObjProps[i]].asVersion(version);
                }
            }
            if (this.target !== null) {
                result.object = this.target.asVersion(version);
            }

            if (version === "0.9" || version === "0.95") {
                if (this.voided !== null) {
                    result.voided = this.voided;
                }
            }
            if (version === "0.9" && this.inProgress !== null) {
                result.inProgress = this.inProgress;
            }
            if (this.attachments !== null) {
                if (! (version === "0.9" || version === "0.95")) {
                    result.attachments = [];
                    for (i = 0; i < this.attachments.length; i += 1) {
                        if (this.attachments[i] instanceof TinCan.Attachment) {
                            result.attachments.push(this.attachments[i].asVersion(version));
                        }
                        else {
                            result.attachments.push(new TinCan.Attachment(this.attachments[i]).asVersion(version));
                        }
                    }
                }
            }

            return result;
        },

        /**
        Sets 'id' and 'timestamp' properties if not already set

        @method stamp
        */
        stamp: function () {
            this.log("stamp");
            if (this.id === null) {
                this.id = TinCan.Utils.getUUID();
            }
            if (this.timestamp === null) {
                this.timestamp = TinCan.Utils.getISODateString(new Date());
            }
        },

        /**
        Checks if the Statement has at least one attachment with content

        @method hasAttachmentsWithContent
        */
        hasAttachmentWithContent: function () {
            this.log("hasAttachmentWithContent");
            var i;

            if (this.attachments === null) {
                return false;
            }

            for (i = 0; i < this.attachments.length; i += 1) {
                if (this.attachments[i].content !== null) {
                    return true;
                }
            }

            return false;
        }
    };

    /**
    @method fromJSON
    @return {Object} Statement
    @static
    */
    Statement.fromJSON = function (stJSON) {
        Statement.prototype.log("fromJSON");
        var _st = JSON.parse(stJSON);

        return new Statement(_st);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.StatementsResult
**/
(function () {
    "use strict";

    /**
    @class TinCan.StatementsResult
    @constructor
    @param {Object} options Configuration used to initialize.
        @param {Array} options.statements Actor of statement
        @param {String} options.more URL to fetch more data
    **/
    var StatementsResult = TinCan.StatementsResult = function (cfg) {
        this.log("constructor");

        /**
        @property statements
        @type Array
        */
        this.statements = null;

        /**
        @property more
        @type String
        */
        this.more = null;

        this.init(cfg);
    };

    StatementsResult.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "StatementsResult",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");

            cfg = cfg || {};

            if (cfg.hasOwnProperty("statements")) {
                this.statements = cfg.statements;
            }
            if (cfg.hasOwnProperty("more")) {
                this.more = cfg.more;
            }
        }
    };

    /**
    @method fromJSON
    @return {Object} Agent
    @static
    */
    StatementsResult.fromJSON = function (resultJSON) {
        StatementsResult.prototype.log("fromJSON");
        var _result,
            stmts = [],
            stmt,
            i
        ;

        try {
            _result = JSON.parse(resultJSON);
        } catch (parseError) {
            StatementsResult.prototype.log("fromJSON - JSON.parse error: " + parseError);
        }

        if (_result) {
            for (i = 0; i < _result.statements.length; i += 1) {
                try {
                    stmt = new TinCan.Statement (_result.statements[i], 4);
                } catch (error) {
                    StatementsResult.prototype.log("fromJSON - statement instantiation failed: " + error + " (" + JSON.stringify(_result.statements[i]) + ")");

                    stmt = new TinCan.Statement (
                        {
                            id: _result.statements[i].id
                        },
                        4
                    );
                }

                stmts.push(stmt);
            }
            _result.statements = stmts;
        }

        return new StatementsResult (_result);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.State
**/
(function () {
    "use strict";

    /**
    @class TinCan.State
    @constructor
    */
    var State = TinCan.State = function (cfg) {
        this.log("constructor");

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property updated
        @type Boolean
        */
        this.updated = null;

        /**
        @property contents
        @type String
        */
        this.contents = null;

        /**
        @property etag
        @type String
        */
        this.etag = null;

        /**
        @property contentType
        @type String
        */
        this.contentType = null;

        this.init(cfg);
    };
    State.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "State",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "id",
                    "contents",
                    "etag",
                    "contentType"
                ];

            cfg = cfg || {};

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }

            this.updated = false;
        }
    };

    /**
    @method fromJSON
    @return {Object} State
    @static
    */
    State.fromJSON = function (stateJSON) {
        State.prototype.log("fromJSON");
        var _state = JSON.parse(stateJSON);

        return new State(_state);
    };
}());

/*
    Copyright 2012 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.ActivityProfile
**/
(function () {
    "use strict";

    /**
    @class TinCan.ActivityProfile
    @constructor
    */
    var ActivityProfile = TinCan.ActivityProfile = function (cfg) {
        this.log("constructor");

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property activity
        @type TinCan.Activity
        */
        this.activity = null;

        /**
        @property updated
        @type String
        */
        this.updated = null;

        /**
        @property contents
        @type String
        */
        this.contents = null;

        /**
        SHA1 of contents as provided by the server during last fetch,
        this should be passed through to saveActivityProfile

        @property etag
        @type String
        */
        this.etag = null;

        /**
        @property contentType
        @type String
        */
        this.contentType = null;

        this.init(cfg);
    };
    ActivityProfile.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "ActivityProfile",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "id",
                    "contents",
                    "etag",
                    "contentType"
                ];

            cfg = cfg || {};

            if (cfg.hasOwnProperty("activity")) {
                if (cfg.activity instanceof TinCan.Activity) {
                    this.activity = cfg.activity;
                }
                else {
                    this.activity = new TinCan.Activity (cfg.activity);
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }

            this.updated = false;
        }
    };

    /**
    @method fromJSON
    @return {Object} ActivityProfile
    @static
    */
    ActivityProfile.fromJSON = function (stateJSON) {
        ActivityProfile.prototype.log("fromJSON");
        var _state = JSON.parse(stateJSON);

        return new ActivityProfile(_state);
    };
}());

/*
    Copyright 2013 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.AgentProfile
**/
(function () {
    "use strict";

    /**
    @class TinCan.AgentProfile
    @constructor
    */
    var AgentProfile = TinCan.AgentProfile = function (cfg) {
        this.log("constructor");

        /**
        @property id
        @type String
        */
        this.id = null;

        /**
        @property agent
        @type TinCan.Agent
        */
        this.agent = null;

        /**
        @property updated
        @type String
        */
        this.updated = null;

        /**
        @property contents
        @type String
        */
        this.contents = null;

        /**
        SHA1 of contents as provided by the server during last fetch,
        this should be passed through to saveAgentProfile

        @property etag
        @type String
        */
        this.etag = null;

        /**
        @property contentType
        @type String
        */
        this.contentType = null;

        this.init(cfg);
    };
    AgentProfile.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "AgentProfile",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "id",
                    "contents",
                    "etag",
                    "contentType"
                ];

            cfg = cfg || {};

            if (cfg.hasOwnProperty("agent")) {
                if (cfg.agent instanceof TinCan.Agent) {
                    this.agent = cfg.agent;
                }
                else {
                    this.agent = new TinCan.Agent (cfg.agent);
                }
            }

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }

            this.updated = false;
        }
    };

    /**
    @method fromJSON
    @return {Object} AgentProfile
    @static
    */
    AgentProfile.fromJSON = function (stateJSON) {
        AgentProfile.prototype.log("fromJSON");
        var _state = JSON.parse(stateJSON);

        return new AgentProfile(_state);
    };
}());

/*
    Copyright 2014 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.About
**/
(function () {
    "use strict";

    /**
    @class TinCan.About
    @constructor
    */
    var About = TinCan.About = function (cfg) {
        this.log("constructor");

        /**
        @property version
        @type {String[]}
        */
        this.version = null;

        this.init(cfg);
    };
    About.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "About",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "version"
                ];

            cfg = cfg || {};

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }
        }
    };

    /**
    @method fromJSON
    @return {Object} About
    @static
    */
    About.fromJSON = function (aboutJSON) {
        About.prototype.log("fromJSON");
        var _about = JSON.parse(aboutJSON);

        return new About(_about);
    };
}());

/*
    Copyright 2016 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Attachment
**/
(function () {
    "use strict";

    /**
    @class TinCan.Attachment
    @constructor
    */
    var Attachment = TinCan.Attachment = function (cfg) {
        this.log("constructor");

        /**
        @property usageType
        @type String
        */
        this.usageType = null;

        /**
        @property display
        @type Object
        */
        this.display = null;

        /**
        @property contentType
        @type String
        */
        this.contentType = null;

        /**
        @property length
        @type int
        */
        this.length = null;

        /**
        @property sha2
        @type String
        */
        this.sha2 = null;

        /**
        @property description
        @type Object
        */
        this.description = null;

        /**
        @property fileUrl
        @type String
        */
        this.fileUrl = null;

        /**
        @property content
        @type ArrayBuffer
        */
        this.content = null;

        this.init(cfg);
    };
    Attachment.prototype = {
        /**
        @property LOG_SRC
        */
        LOG_SRC: "Attachment",

        /**
        @method log
        */
        log: TinCan.prototype.log,

        /**
        @method init
        @param {Object} [options] Configuration used to initialize
        */
        init: function (cfg) {
            this.log("init");
            var i,
                directProps = [
                    "contentType",
                    "length",
                    "sha2",
                    "usageType",
                    "display",
                    "description",
                    "fileUrl"
                ]
            ;

            cfg = cfg || {};

            for (i = 0; i < directProps.length; i += 1) {
                if (cfg.hasOwnProperty(directProps[i]) && cfg[directProps[i]] !== null) {
                    this[directProps[i]] = cfg[directProps[i]];
                }
            }

            if (cfg.hasOwnProperty("content") && cfg.content !== null) {
                if (typeof cfg.content === "string") {
                    this.setContentFromString(cfg.content);
                }
                else {
                    this.setContent(cfg.content);
                }
            }
        },

        /**
        @method asVersion
        @param {String} [version] Version to return (defaults to newest supported)
        */
        asVersion: function (version) {
            this.log("asVersion");
            var result;

            version = version || TinCan.versions()[0];

            if (version === "0.9" || version === "0.95") {
                result = null;
            }
            else {
                result = {
                    contentType: this.contentType,
                    display: this.display,
                    length: this.length,
                    sha2: this.sha2,
                    usageType: this.usageType
                };

                if (this.fileUrl !== null) {
                    result.fileUrl = this.fileUrl;
                }
                if (this.description !== null) {
                    result.description = this.description;
                }
            }

            return result;
        },

        /**
        See {{#crossLink "TinCan.Utils/getLangDictionaryValue"}}{{/crossLink}}

        @method getLangDictionaryValue
        */
        getLangDictionaryValue: TinCan.Utils.getLangDictionaryValue,

        /**
        @method setContent
        @param {ArrayBuffer} content Sets content from ArrayBuffer
        */
        setContent: function (content) {
            this.content = content;
            this.length = content.byteLength;
            this.sha2 = TinCan.Utils.getSHA256String(content);
        },

        /**
        @method setContentFromString
        @param {String} content Sets the content property of the attachment from a string
        */
        setContentFromString: function (content) {
            var _content = content;

            _content = TinCan.Utils.stringToArrayBuffer(content);

            this.setContent(_content);
        },

        /**
        @method getContentAsString
        @return {String} Value of content property as a string
        */
        getContentAsString: function () {
            return TinCan.Utils.stringFromArrayBuffer(this.content);
        }
    };

    /**
    @method fromJSON
    @return {Object} Attachment
    @static
    */
    Attachment.fromJSON = function (attachmentJSON) {
        Attachment.prototype.log("fromJSON");
        var _attachment = JSON.parse(attachmentJSON);

        return new Attachment(_attachment);
    };

    Attachment._defaultEncoding = "utf-8";
}());

/*
    Copyright 2012-2013 Rustici Software

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/**
TinCan client library

@module TinCan
@submodule TinCan.Environment.Node
**/
(function () {
    /* globals require,Buffer,ArrayBuffer,Uint8Array */
    "use strict";
    var LOG_SRC = "Environment.Node",
        log = TinCan.prototype.log,
        querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring/index.js"),
        XMLHttpRequest = __webpack_require__(/*! xhr2 */ "./node_modules/tincanjs/node_modules/xhr2/lib/xhr2.js"),
        requestComplete,
        __createJSONSegment,
        __createAttachmentSegment;

    requestComplete = function (xhr, cfg) {
        log("requestComplete - xhr.status: " + xhr.status, LOG_SRC);
        log("requestComplete - xhr.responseText: " + xhr.responseText, LOG_SRC);
        var requestCompleteResult,
            httpStatus = xhr.status,
            notFoundOk = (cfg.ignore404 && httpStatus === 404);

        if ((httpStatus >= 200 && httpStatus < 400) || notFoundOk) {
            if (cfg.callback) {
                cfg.callback(null, xhr);
                return;
            }

            requestCompleteResult = {
                err: null,
                xhr: xhr
            };
            return requestCompleteResult;
        }

        requestCompleteResult = {
            err: httpStatus,
            xhr: xhr
        };
        if (httpStatus === 0) {
            log("[warning] There was a problem communicating with the Learning Record Store. Aborted, offline, or invalid CORS endpoint (" + httpStatus + ")", LOG_SRC);
        }
        else {
            log("[warning] There was a problem communicating with the Learning Record Store. (" + httpStatus + " | " + xhr.responseText+ ")", LOG_SRC);
        }
        if (cfg.callback) {
            cfg.callback(httpStatus, xhr);
        }
        return requestCompleteResult;
    };

    //
    // Override LRS' init method to set up our request handling
    // capabilities, basically empty implementation here so that
    // we don't get a no-env loaded message
    //
    TinCan.LRS.prototype._initByEnvironment = function () {};

    //
    // use XMLHttpRequest module instead of standard Node.js http/https
    // modules since we have to support both, and because the callbacks
    // provided via the methods calling _makeRequest expect the xhr to
    // have a certain interface, that interface happens to be the browser
    // version of XHR since that's where it started, so rather than
    // changing them to use a different wrapped request/response object
    // set just use a wrapped version of the node objects which is what
    // XMLHttpRequest module provides
    //
    TinCan.LRS.prototype._makeRequest = function (fullUrl, headers, cfg) {
        log("_makeRequest using http/https", LOG_SRC);
        var xhr,
            url = fullUrl,
            async = typeof cfg.callback !== "undefined",
            prop
        ;
        if (typeof cfg.params !== "undefined" && Object.keys(cfg.params).length > 0) {
            url += "?" + querystring.stringify(cfg.params);
        }

        xhr = new XMLHttpRequest();
        xhr.open(cfg.method, url, async);

        if (cfg.expectMultipart) {
            xhr.responseType = "arraybuffer";
        }

        for (prop in headers) {
            if (headers.hasOwnProperty(prop)) {
                xhr.setRequestHeader(prop, headers[prop]);
            }
        }

        if (typeof cfg.data !== "undefined") {
            cfg.data += "";
        }

        if (async) {
            xhr.onreadystatechange = function () {
                log("xhr.onreadystatechange - xhr.readyState: " + xhr.readyState, LOG_SRC);
                if (xhr.readyState === 4) {
                    requestComplete(xhr, cfg);
                }
            };
        }

        xhr.send(cfg.data);

        if (async) {
            return xhr;
        }

        return requestComplete(xhr, cfg);
    };

    //
    // Synchronos xhr handling is unsupported in node
    //
    TinCan.LRS.syncEnabled = false;

    TinCan.LRS.prototype._getMultipartRequestData = function (boundary, jsonContent, requestAttachments) {
        var parts = [],
            i;

        parts.push(
            __createJSONSegment(
                boundary,
                jsonContent
            )
        );
        for (i = 0; i < requestAttachments.length; i += 1) {
            if (requestAttachments[i].content !== null) {
                parts.push(
                    __createAttachmentSegment(
                        boundary,
                        requestAttachments[i].content,
                        requestAttachments[i].sha2,
                        requestAttachments[i].contentType
                    )
                );
            }
        }
        if (typeof Buffer.from === "undefined") {
            parts.push( new Buffer("\r\n--" + boundary + "--\r\n") );
        }
        else {
            parts.push( Buffer.from("\r\n--" + boundary + "--\r\n") );
        }

        return Buffer.concat(parts);
    };

    __createJSONSegment = function (boundary, jsonContent) {
        var content = [
                "--" + boundary,
                "Content-Type: application/json",
                "",
                JSON.stringify(jsonContent)
            ].join("\r\n");

        content += "\r\n";

        if (typeof Buffer.from === "undefined") {
            return new Buffer(content);
        }
        return Buffer.from(content);
    };

    __createAttachmentSegment = function (boundary, content, sha2, contentType) {
        var bufferParts = [],
            header = [
                "--" + boundary,
                "Content-Type: " + contentType,
                "Content-Transfer-Encoding: binary",
                "X-Experience-API-Hash: " + sha2
            ].join("\r\n");

        header += "\r\n\r\n";

        if (typeof Buffer.from === "undefined") {
            bufferParts.push( new Buffer(header) );
            bufferParts.push( new Buffer(content) );
        }
        else {
            bufferParts.push(Buffer.from(header));
            bufferParts.push(Buffer.from(content));
        }

        return Buffer.concat(bufferParts);
    };

    TinCan.Utils.stringToArrayBuffer = function (content, encoding) {
        var b,
            ab,
            view,
            i;

        if (! encoding) {
            encoding = TinCan.Utils.defaultEncoding;
        }

        if (typeof Buffer.from === "undefined") {
            // for Node.js prior to v4.x
            b = new Buffer(content, encoding);

            ab = new ArrayBuffer(b.length);
            view = new Uint8Array(ab);
            for (i = 0; i < b.length; i += 1) {
                view[i] = b[i];
            }

            return ab;
        }

        b = Buffer.from(content, encoding);
        ab = b.buffer;

        //
        // this .slice is required because of the internals of how Buffer is
        // implemented, it uses a shared ArrayBuffer underneath for small buffers
        // see http://stackoverflow.com/a/31394257/1464957
        //
        return ab.slice(b.byteOffset, b.byteOffset + b.byteLength);
    };

    TinCan.Utils.stringFromArrayBuffer = function (content, encoding) {
        var b,
            view,
            i;

        if (! encoding) {
            encoding = TinCan.Utils.defaultEncoding;
        }

        if (typeof Buffer.from === "undefined") {
            // for Node.js prior to v4.x
            b = new Buffer(content.byteLength);

            view = new Uint8Array(content);
            for (i = 0; i < b.length; i += 1) {
                b[i] = view[i];
            }
        }
        else {
            b = Buffer.from(content);
        }

        return b.toString(encoding);
    };
}());


/***/ }),

/***/ "./node_modules/tincanjs/node_modules/xhr2/lib/xhr2.js":
/*!*************************************************************!*\
  !*** ./node_modules/tincanjs/node_modules/xhr2/lib/xhr2.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var process = __webpack_require__(/*! process/browser */ "./node_modules/process/browser.js");
// Generated by CoffeeScript 1.6.3
(function() {
  var InvalidStateError, NetworkError, SecurityError, XMLHttpRequest, XMLHttpRequestEventTarget, XMLHttpRequestProgressEvent, XMLHttpRequestUpload, http, https, os, url, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  XMLHttpRequestEventTarget = (function() {
    function XMLHttpRequestEventTarget() {
      this.onloadstart = null;
      this.onprogress = null;
      this.onabort = null;
      this.onerror = null;
      this.onload = null;
      this.ontimeout = null;
      this.onloadend = null;
      this._listeners = {};
    }

    XMLHttpRequestEventTarget.prototype.onloadstart = null;

    XMLHttpRequestEventTarget.prototype.onprogress = null;

    XMLHttpRequestEventTarget.prototype.onabort = null;

    XMLHttpRequestEventTarget.prototype.onerror = null;

    XMLHttpRequestEventTarget.prototype.onload = null;

    XMLHttpRequestEventTarget.prototype.ontimeout = null;

    XMLHttpRequestEventTarget.prototype.onloadend = null;

    XMLHttpRequestEventTarget.prototype.addEventListener = function(eventType, listener) {
      var _base;
      eventType = eventType.toLowerCase();
      (_base = this._listeners)[eventType] || (_base[eventType] = []);
      this._listeners[eventType].push(listener);
      return void 0;
    };

    XMLHttpRequestEventTarget.prototype.removeEventListener = function(eventType, listener) {
      var index;
      eventType = eventType.toLowerCase();
      if (this._listeners[eventType]) {
        index = this._listeners[eventType].indexOf(listener);
        if (index !== -1) {
          this._listeners.splice(index, 1);
        }
      }
      return void 0;
    };

    XMLHttpRequestEventTarget.prototype.dispatchEvent = function(event) {
      var eventType, listener, listeners, _i, _len;
      eventType = event.type;
      if (listeners = this._listeners[eventType]) {
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          listener = listeners[_i];
          listener(event);
        }
      }
      if (listener = this["on" + eventType]) {
        listener(event);
      }
      return void 0;
    };

    return XMLHttpRequestEventTarget;

  })();

  http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js");

  https = __webpack_require__(/*! https */ "./node_modules/https-browserify/index.js");

  os = __webpack_require__(/*! os */ "./node_modules/os-browserify/browser.js");

  url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

  XMLHttpRequest = (function(_super) {
    __extends(XMLHttpRequest, _super);

    function XMLHttpRequest(options) {
      XMLHttpRequest.__super__.constructor.call(this);
      this.onreadystatechange = null;
      this._anonymous = options && options.anon;
      this.readyState = XMLHttpRequest.UNSENT;
      this.response = null;
      this.responseText = '';
      this.responseType = '';
      this.status = 0;
      this.statusText = '';
      this.timeout = 0;
      this.upload = new XMLHttpRequestUpload(this);
      this._method = null;
      this._url = null;
      this._sync = false;
      this._headers = null;
      this._loweredHeaders = null;
      this._mimeOverride = null;
      this._request = null;
      this._response = null;
      this._responseParts = null;
      this._responseHeaders = null;
      this._aborting = null;
      this._error = null;
      this._loadedBytes = 0;
      this._totalBytes = 0;
      this._lengthComputable = false;
    }

    XMLHttpRequest.prototype.onreadystatechange = null;

    XMLHttpRequest.prototype.readyState = null;

    XMLHttpRequest.prototype.response = null;

    XMLHttpRequest.prototype.responseText = null;

    XMLHttpRequest.prototype.responseType = null;

    XMLHttpRequest.prototype.status = null;

    XMLHttpRequest.prototype.timeout = null;

    XMLHttpRequest.prototype.upload = null;

    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
      var xhrUrl;
      method = method.toUpperCase();
      if (method in this._restrictedMethods) {
        throw new SecurityError("HTTP method " + method + " is not allowed in XHR");
      }
      xhrUrl = this._parseUrl(url);
      if (async === void 0) {
        async = true;
      }
      switch (this.readyState) {
        case XMLHttpRequest.UNSENT:
        case XMLHttpRequest.OPENED:
        case XMLHttpRequest.DONE:
          null;
          break;
        case XMLHttpRequest.HEADERS_RECEIVED:
        case XMLHttpRequest.LOADING:
          null;
      }
      this._method = method;
      this._url = xhrUrl;
      this._sync = !async;
      this._headers = {};
      this._loweredHeaders = {};
      this._mimeOverride = null;
      this._setReadyState(XMLHttpRequest.OPENED);
      this._request = null;
      this._response = null;
      this.status = 0;
      this.statusText = '';
      this._responseParts = [];
      this._responseHeaders = null;
      this._loadedBytes = 0;
      this._totalBytes = 0;
      this._lengthComputable = false;
      return void 0;
    };

    XMLHttpRequest.prototype.setRequestHeader = function(name, value) {
      var loweredName;
      if (this.readyState !== XMLHttpRequest.OPENED) {
        throw new InvalidStateError("XHR readyState must be OPENED");
      }
      loweredName = name.toLowerCase();
      if (this._restrictedHeaders[loweredName] || /^sec\-/.test(loweredName) || /^proxy-/.test(loweredName)) {
        console.warn("Refused to set unsafe header \"" + name + "\"");
        return void 0;
      }
      value = value.toString();
      if (loweredName in this._loweredHeaders) {
        name = this._loweredHeaders[loweredName];
        this._headers[name] = this._headers[name] + ', ' + value;
      } else {
        this._loweredHeaders[loweredName] = name;
        this._headers[name] = value;
      }
      return void 0;
    };

    XMLHttpRequest.prototype.send = function(data) {
      if (this.readyState !== XMLHttpRequest.OPENED) {
        throw new InvalidStateError("XHR readyState must be OPENED");
      }
      if (this._request) {
        throw new InvalidStateError("send() already called");
      }
      switch (this._url.protocol) {
        case 'file:':
          this._sendFile(data);
          break;
        case 'http:':
        case 'https:':
          this._sendHttp(data);
          break;
        default:
          throw new NetworkError("Unsupported protocol " + this._url.protocol);
      }
      return void 0;
    };

    XMLHttpRequest.prototype.abort = function() {
      if (!this._request) {
        return;
      }
      this._request.abort();
      this._setError();
      this._dispatchProgress('abort');
      this._dispatchProgress('loadend');
      return void 0;
    };

    XMLHttpRequest.prototype.getResponseHeader = function(name) {
      var loweredName;
      if (!this._responseHeaders) {
        return null;
      }
      loweredName = name.toLowerCase();
      if (loweredName in this._responseHeaders) {
        return this._responseHeaders[loweredName];
      } else {
        return null;
      }
    };

    XMLHttpRequest.prototype.getAllResponseHeaders = function() {
      var lines, name, value;
      if (!this._responseHeaders) {
        return '';
      }
      lines = (function() {
        var _ref, _results;
        _ref = this._responseHeaders;
        _results = [];
        for (name in _ref) {
          value = _ref[name];
          _results.push("" + name + ": " + value);
        }
        return _results;
      }).call(this);
      return lines.join("\r\n");
    };

    XMLHttpRequest.prototype.overrideMimeType = function(newMimeType) {
      if (this.readyState === XMLHttpRequest.LOADING || this.readyState === XMLHttpRequest.DONE) {
        throw new InvalidStateError("overrideMimeType() not allowed in LOADING or DONE");
      }
      this._mimeOverride = newMimeType.toLowerCase();
      return void 0;
    };

    XMLHttpRequest.prototype.nodejsSet = function(options) {
      if ('httpAgent' in options) {
        this.nodejsHttpAgent = options.httpAgent;
      }
      if ('httpsAgent' in options) {
        this.nodejsHttpsAgent = options.httpsAgent;
      }
      return void 0;
    };

    XMLHttpRequest.nodejsSet = function(options) {
      XMLHttpRequest.prototype.nodejsSet(options);
      return void 0;
    };

    XMLHttpRequest.prototype.UNSENT = 0;

    XMLHttpRequest.UNSENT = 0;

    XMLHttpRequest.prototype.OPENED = 1;

    XMLHttpRequest.OPENED = 1;

    XMLHttpRequest.prototype.HEADERS_RECEIVED = 2;

    XMLHttpRequest.HEADERS_RECEIVED = 2;

    XMLHttpRequest.prototype.LOADING = 3;

    XMLHttpRequest.LOADING = 3;

    XMLHttpRequest.prototype.DONE = 4;

    XMLHttpRequest.DONE = 4;

    XMLHttpRequest.prototype.nodejsHttpAgent = http.globalAgent;

    XMLHttpRequest.prototype.nodejsHttpsAgent = https.globalAgent;

    XMLHttpRequest.prototype._restrictedMethods = {
      CONNECT: true,
      TRACE: true,
      TRACK: true
    };

    XMLHttpRequest.prototype._restrictedHeaders = {
      'accept-charset': true,
      'accept-encoding': true,
      'access-control-request-headers': true,
      'access-control-request-method': true,
      connection: true,
      'content-length': true,
      cookie: true,
      cookie2: true,
      date: true,
      dnt: true,
      expect: true,
      host: true,
      'keep-alive': true,
      origin: true,
      referer: true,
      te: true,
      trailer: true,
      'transfer-encoding': true,
      upgrade: true,
      'user-agent': true,
      via: true
    };

    XMLHttpRequest.prototype._privateHeaders = {
      'set-cookie': true,
      'set-cookie2': true
    };

    XMLHttpRequest.prototype._userAgent = ("Mozilla/5.0 (" + (os.type()) + " " + (os.arch()) + ") ") + ("node.js/" + process.versions.node + " v8/" + process.versions.v8);

    XMLHttpRequest.prototype._setReadyState = function(newReadyState) {
      var event;
      this.readyState = newReadyState;
      event = new XMLHttpRequestProgressEvent('readystatechange', this);
      this.dispatchEvent(event);
      return void 0;
    };

    XMLHttpRequest.prototype._sendFile = function() {
      if (this._url.method !== 'GET') {
        throw new NetworkError('The file protocol only supports GET');
      }
      throw new Error("Protocol file: not implemented");
    };

    XMLHttpRequest.prototype._sendHttp = function(data) {
      if (this._sync) {
        throw new Error("Synchronous XHR processing not implemented");
      }
      if ((data != null) && (this._method === 'GET' || this._method === 'HEAD')) {
        console.warn("Discarding entity body for " + this._method + " requests");
        data = null;
      } else {
        data || (data = '');
      }
      this.upload._setData(data);
      this._finalizeHeaders();
      this._sendHxxpRequest();
      return void 0;
    };

    XMLHttpRequest.prototype._sendHxxpRequest = function() {
      var agent, hxxp, request,
        _this = this;
      if (this._url.protocol === 'http:') {
        hxxp = http;
        agent = this.nodejsHttpAgent;
      } else {
        hxxp = https;
        agent = this.nodejsHttpsAgent;
      }
      request = hxxp.request({
        hostname: this._url.hostname,
        port: this._url.port,
        path: this._url.path,
        auth: this._url.auth,
        method: this._method,
        headers: this._headers,
        agent: agent
      });
      this._request = request;
      if (this.timeout) {
        request.setTimeout(this.timeout, function() {
          return _this._onHttpTimeout(request);
        });
      }
      request.on('response', function(response) {
        return _this._onHttpResponse(request, response);
      });
      request.on('error', function(error) {
        return _this._onHttpRequestError(request, error);
      });
      this.upload._startUpload(request);
      if (this._request === request) {
        this._dispatchProgress('loadstart');
      }
      return void 0;
    };

    XMLHttpRequest.prototype._finalizeHeaders = function() {
      this._headers['Connection'] = 'keep-alive';
      this._headers['Host'] = this._url.host;
      if (this._anonymous) {
        this._headers['Referer'] = 'about:blank';
      }
      this._headers['User-Agent'] = this._userAgent;
      this.upload._finalizeHeaders(this._headers, this._loweredHeaders);
      return void 0;
    };

    XMLHttpRequest.prototype._onHttpResponse = function(request, response) {
      var lengthString,
        _this = this;
      if (this._request !== request) {
        return;
      }
      switch (response.statusCode) {
        case 301:
        case 302:
        case 303:
        case 307:
        case 308:
          this._url = this._parseUrl(response.headers['location']);
          this._method = 'GET';
          if ('content-type' in this._loweredHeaders) {
            delete this._headers[this._loweredHeaders['content-type']];
            delete this._loweredHeaders['content-type'];
          }
          if ('Content-Type' in this._headers) {
            delete this._headers['Content-Type'];
          }
          delete this._headers['Content-Length'];
          this.upload._reset();
          this._finalizeHeaders();
          this._sendHxxpRequest();
          return;
      }
      this._response = response;
      this._response.on('data', function(data) {
        return _this._onHttpResponseData(response, data);
      });
      this._response.on('end', function() {
        return _this._onHttpResponseEnd(response);
      });
      this._response.on('close', function() {
        return _this._onHttpResponseClose(response);
      });
      this.status = this._response.statusCode;
      this.statusText = http.STATUS_CODES[this.status];
      this._parseResponseHeaders(response);
      if (lengthString = this._responseHeaders['content-length']) {
        this._totalBytes = parseInt(lengthString);
        this._lengthComputable = true;
      } else {
        this._lengthComputable = false;
      }
      return this._setReadyState(XMLHttpRequest.HEADERS_RECEIVED);
    };

    XMLHttpRequest.prototype._onHttpResponseData = function(response, data) {
      if (this._response !== response) {
        return;
      }
      this._responseParts.push(data);
      this._loadedBytes += data.length;
      if (this.readyState !== XMLHttpRequest.LOADING) {
        this._setReadyState(XMLHttpRequest.LOADING);
      }
      return this._dispatchProgress('progress');
    };

    XMLHttpRequest.prototype._onHttpResponseEnd = function(response) {
      if (this._response !== response) {
        return;
      }
      this._parseResponse();
      this._request = null;
      this._response = null;
      this._setReadyState(XMLHttpRequest.DONE);
      this._dispatchProgress('load');
      return this._dispatchProgress('loadend');
    };

    XMLHttpRequest.prototype._onHttpResponseClose = function(response) {
      var request;
      if (this._response !== response) {
        return;
      }
      request = this._request;
      this._setError();
      request.abort();
      this._setReadyState(XMLHttpRequest.DONE);
      this._dispatchProgress('error');
      return this._dispatchProgress('loadend');
    };

    XMLHttpRequest.prototype._onHttpTimeout = function(request) {
      if (this._request !== request) {
        return;
      }
      this._setError();
      request.abort();
      this._setReadyState(XMLHttpRequest.DONE);
      this._dispatchProgress('timeout');
      return this._dispatchProgress('loadend');
    };

    XMLHttpRequest.prototype._onHttpRequestError = function(request, error) {
      if (this._request !== request) {
        return;
      }
      this._setError();
      request.abort();
      this._setReadyState(XMLHttpRequest.DONE);
      this._dispatchProgress('error');
      return this._dispatchProgress('loadend');
    };

    XMLHttpRequest.prototype._dispatchProgress = function(eventType) {
      var event;
      event = new XMLHttpRequestProgressEvent(eventType, this);
      event.lengthComputable = this._lengthComputable;
      event.loaded = this._loadedBytes;
      event.total = this._totalBytes;
      this.dispatchEvent(event);
      return void 0;
    };

    XMLHttpRequest.prototype._setError = function() {
      this._request = null;
      this._response = null;
      this._responseHeaders = null;
      this._responseParts = null;
      return void 0;
    };

    XMLHttpRequest.prototype._parseUrl = function(urlString) {
      var index, password, user, xhrUrl;
      xhrUrl = url.parse(urlString, false, true);
      xhrUrl.hash = null;
      if (xhrUrl.auth && ((typeof user !== "undefined" && user !== null) || (typeof password !== "undefined" && password !== null))) {
        index = xhrUrl.auth.indexOf(':');
        if (index === -1) {
          if (!user) {
            user = xhrUrl.auth;
          }
        } else {
          if (!user) {
            user = xhrUrl.substring(0, index);
          }
          if (!password) {
            password = xhrUrl.substring(index + 1);
          }
        }
      }
      if (user || password) {
        xhrUrl.auth = "" + user + ":" + password;
      }
      return xhrUrl;
    };

    XMLHttpRequest.prototype._parseResponseHeaders = function(response) {
      var loweredName, name, value, _ref;
      this._responseHeaders = {};
      _ref = response.headers;
      for (name in _ref) {
        value = _ref[name];
        loweredName = name.toLowerCase();
        if (this._privateHeaders[loweredName]) {
          continue;
        }
        if (this._mimeOverride !== null && loweredName === 'content-type') {
          value = this._mimeOverride;
        }
        this._responseHeaders[loweredName] = value;
      }
      if (this._mimeOverride !== null && !('content-type' in this._responseHeaders)) {
        this._responseHeaders['content-type'] = this._mimeOverride;
      }
      return void 0;
    };

    XMLHttpRequest.prototype._parseResponse = function() {
      var arrayBuffer, buffer, i, jsonError, view, _i, _ref;
      if (Buffer.concat) {
        buffer = Buffer.concat(this._responseParts);
      } else {
        buffer = this._concatBuffers(this._responseParts);
      }
      this._responseParts = null;
      switch (this.responseType) {
        case 'text':
          this._parseTextResponse(buffer);
          break;
        case 'json':
          this.responseText = null;
          try {
            this.response = JSON.parse(buffer.toString('utf-8'));
          } catch (_error) {
            jsonError = _error;
            this.response = null;
          }
          break;
        case 'buffer':
          this.responseText = null;
          this.response = buffer;
          break;
        case 'arraybuffer':
          this.responseText = null;
          arrayBuffer = new ArrayBuffer(buffer.length);
          view = new Uint8Array(arrayBuffer);
          for (i = _i = 0, _ref = buffer.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            view[i] = buffer[i];
          }
          this.response = arrayBuffer;
          break;
        default:
          this._parseTextResponse(buffer);
      }
      return void 0;
    };

    XMLHttpRequest.prototype._parseTextResponse = function(buffer) {
      var e;
      try {
        this.responseText = buffer.toString(this._parseResponseEncoding());
      } catch (_error) {
        e = _error;
        this.responseText = buffer.toString('binary');
      }
      this.response = this.responseText;
      return void 0;
    };

    XMLHttpRequest.prototype._parseResponseEncoding = function() {
      var contentType, encoding, match;
      encoding = null;
      if (contentType = this._responseHeaders['content-type']) {
        if (match = /\;\s*charset\=(.*)$/.exec(contentType)) {
          return match[1];
        }
      }
      return 'utf-8';
    };

    XMLHttpRequest.prototype._concatBuffers = function(buffers) {
      var buffer, length, target, _i, _j, _len, _len1;
      if (buffers.length === 0) {
        return new Buffer(0);
      }
      if (buffers.length === 1) {
        return buffers[0];
      }
      length = 0;
      for (_i = 0, _len = buffers.length; _i < _len; _i++) {
        buffer = buffers[_i];
        length += buffer.length;
      }
      target = new Buffer(length);
      length = 0;
      for (_j = 0, _len1 = buffers.length; _j < _len1; _j++) {
        buffer = buffers[_j];
        buffer.copy(target, length);
        length += buffer.length;
      }
      return target;
    };

    return XMLHttpRequest;

  })(XMLHttpRequestEventTarget);

  module.exports = XMLHttpRequest;

  XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;

  SecurityError = (function(_super) {
    __extends(SecurityError, _super);

    function SecurityError() {
      SecurityError.__super__.constructor.apply(this, arguments);
    }

    return SecurityError;

  })(Error);

  XMLHttpRequest.SecurityError = SecurityError;

  InvalidStateError = (function(_super) {
    __extends(InvalidStateError, _super);

    function InvalidStateError() {
      InvalidStateError.__super__.constructor.apply(this, arguments);
    }

    return InvalidStateError;

  })(Error);

  InvalidStateError = (function(_super) {
    __extends(InvalidStateError, _super);

    function InvalidStateError() {
      _ref = InvalidStateError.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return InvalidStateError;

  })(Error);

  XMLHttpRequest.InvalidStateError = InvalidStateError;

  NetworkError = (function(_super) {
    __extends(NetworkError, _super);

    function NetworkError() {
      NetworkError.__super__.constructor.apply(this, arguments);
    }

    return NetworkError;

  })(Error);

  XMLHttpRequest.NetworkError = NetworkError;

  XMLHttpRequestProgressEvent = (function() {
    function XMLHttpRequestProgressEvent(type, target) {
      this.type = type;
      this.target = target;
      this.currentTarget = this.target;
      this.lengthComputable = false;
      this.loaded = 0;
      this.total = 0;
    }

    XMLHttpRequestProgressEvent.prototype.bubbles = false;

    XMLHttpRequestProgressEvent.prototype.cancelable = false;

    XMLHttpRequestProgressEvent.prototype.target = null;

    XMLHttpRequestProgressEvent.prototype.loaded = null;

    XMLHttpRequestProgressEvent.prototype.lengthComputable = null;

    XMLHttpRequestProgressEvent.prototype.total = null;

    return XMLHttpRequestProgressEvent;

  })();

  XMLHttpRequest.XMLHttpRequestProgressEvent = XMLHttpRequestProgressEvent;

  XMLHttpRequestUpload = (function(_super) {
    __extends(XMLHttpRequestUpload, _super);

    function XMLHttpRequestUpload(request) {
      XMLHttpRequestUpload.__super__.constructor.call(this);
      this._request = request;
      this._reset();
    }

    XMLHttpRequestUpload.prototype._reset = function() {
      this._contentType = null;
      this._body = null;
      return void 0;
    };

    XMLHttpRequestUpload.prototype._setData = function(data) {
      var body, i, offset, view, _i, _j, _ref1, _ref2;
      if (typeof data === 'undefined' || data === null) {
        return;
      }
      if (typeof data === 'string') {
        if (data.length !== 0) {
          this._contentType = 'text/plain;charset=UTF-8';
        }
        this._body = new Buffer(data, 'utf8');
      } else if (Buffer.isBuffer(data)) {
        this._body = data;
      } else if (data instanceof ArrayBuffer) {
        body = new Buffer(data.byteLength);
        view = new Uint8Array(data);
        for (i = _i = 0, _ref1 = data.byteLength; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          body[i] = view[i];
        }
        this._body = body;
      } else if (data.buffer && data.buffer instanceof ArrayBuffer) {
        body = new Buffer(data.byteLength);
        offset = data.byteOffset;
        view = new Uint8Array(data.buffer);
        for (i = _j = 0, _ref2 = data.byteLength; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; i = 0 <= _ref2 ? ++_j : --_j) {
          body[i] = view[i + offset];
        }
        this._body = body;
      } else {
        throw new Error("Unsupported send() data " + data);
      }
      return void 0;
    };

    XMLHttpRequestUpload.prototype._finalizeHeaders = function(headers, loweredHeaders) {
      if (this._contentType) {
        if (!('content-type' in loweredHeaders)) {
          headers['Content-Type'] = this._contentType;
        }
      }
      if (this._body) {
        headers['Content-Length'] = this._body.length.toString();
      }
      return void 0;
    };

    XMLHttpRequestUpload.prototype._startUpload = function(request) {
      if (this._body) {
        request.write(this._body);
      }
      request.end();
      return void 0;
    };

    return XMLHttpRequestUpload;

  })(XMLHttpRequestEventTarget);

  XMLHttpRequest.XMLHttpRequestUpload = XMLHttpRequestUpload;

}).call(this);


/***/ }),

/***/ "./node_modules/url/node_modules/punycode/punycode.js":
/*!************************************************************!*\
  !*** ./node_modules/url/node_modules/punycode/punycode.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/url/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/***/ ((module) => {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/util-deprecate/browser.js":
/*!************************************************!*\
  !*** ./node_modules/util-deprecate/browser.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!__webpack_require__.g.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = __webpack_require__.g.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}


/***/ }),

/***/ "./node_modules/xtend/immutable.js":
/*!*****************************************!*\
  !*** ./node_modules/xtend/immutable.js ***!
  \*****************************************/
/***/ ((module) => {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ }),

/***/ "./src/h5p-xapi-sender.js":
/*!********************************!*\
  !*** ./src/h5p-xapi-sender.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var h5p_standalone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! h5p-standalone */ "./node_modules/h5p-standalone/dist/main.bundle.js");
/* harmony import */ var h5p_standalone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(h5p_standalone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tincanjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tincanjs */ "./node_modules/tincanjs/build/tincan-node.js");
/* harmony import */ var tincanjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tincanjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");




const H5PxApiSender = {};

H5PxApiSender._actor = {};

H5PxApiSender.params = {};

H5PxApiSender.lrs = null;

/**
 * Initialize H5PxApiSender by setting up both H5P and TinCan LRS
 */
H5PxApiSender.init = async () => {
    H5PxApiSender.setupLrs();
    const container = document.getElementById('h5p-container'),
        resPath = container.getAttribute('data-path') || '',
        options = {
            h5pJsonPath: container.getAttribute('data-workspace') || 'workspace',
            id: url__WEBPACK_IMPORTED_MODULE_2__.parse(location.href, true).query.activity_id,
            frameJs: `${resPath}dist/frame.bundle.js`,
            frameCss: `${resPath}dist/styles/h5p.css`
        };
    await new h5p_standalone__WEBPACK_IMPORTED_MODULE_0__.H5P(container, options)
    H5P.externalDispatcher.on("xAPI", (event) => {
        H5PxApiSender.sendStatement(event)
    });
}

/**
 * Setting up LRS ready to be used by H5p
 */
H5PxApiSender.setupLrs = () => {
    var params = url__WEBPACK_IMPORTED_MODULE_2__.parse(location.href, true).query;
    H5PxApiSender.params = params
    if (Object.keys(params).length > 1) {
        if (params.actor || params.group) {
            H5PxApiSender._actor = params.actor ? tincanjs__WEBPACK_IMPORTED_MODULE_1___default().Agent.fromJSON(params.actor) :
                tincanjs__WEBPACK_IMPORTED_MODULE_1___default().Group.fromJSON(params.group);
            H5PxApiSender._actor.objectType = params.actor ? "Agent" : "Group";
        }

        H5PxApiSender.lrs = new (tincanjs__WEBPACK_IMPORTED_MODULE_1___default().LRS)({
            "endpoint": params.endpoint,
            "auth": params.auth,
            "user": H5PxApiSender._actor,
            "allowFail": false
        });
    }
};

/**
 * Construct a context parent for statement 
 */
H5PxApiSender.handleContextParent = (parents) => {
    const mParent = []
    parents.forEach(parent => {
        mParent.push({
            ...parent,
            id: parent.id ? parent.id : H5PxApiSender.params.activity_id
        })
    })
    return mParent;
}

/** Sending statement to the provided endpoint */
H5PxApiSender.sendStatement = (event) => {
    if (H5PxApiSender.lrs && H5PxApiSender.params) {
        const h5pStatement = event.data.statement,
            activityId = H5PxApiSender.params.activity_id,
            hasContextActivity = h5pStatement.context && h5pStatement.context.contextActivities,
            hasParent = hasContextActivity && h5pStatement.context.contextActivities.parent,
            parent = hasParent ? h5pStatement.context.contextActivities.parent : {},
            contextActivities = hasContextActivity && hasParent ? {
                ...h5pStatement.context.contextActivities
            } : {},
            context = h5pStatement.context ? h5pStatement.context : {},
            mObject = h5pStatement.object,
            subIdKey = 'http://h5p.org/x-api/h5p-subContentId',
            hasSubId = mObject.definition && mObject.definition.extensions && mObject.definition.extensions[subIdKey],
            statement = {
                actor: H5PxApiSender._actor,
                verb: h5pStatement.verb,
                object: {
                    ...mObject,
                    id: hasSubId ? `${activityId}/${mObject.definition.extensions[subIdKey]}` : activityId
                },
                result: h5pStatement.result,
                context: {
                    ...context,
                    registration: H5PxApiSender.params.registration,
                    contextActivities: {
                        ...contextActivities,
                        parent: hasParent ?
                            H5PxApiSender.handleContextParent(parent) : activityId
                    }
                },
                timestamp: new Date().toISOString()
            },
            tinCanStatement = tincanjs__WEBPACK_IMPORTED_MODULE_1___default().Statement.fromJSON(JSON.stringify(statement));
        H5PxApiSender.lrs.saveStatement(tinCanStatement, {
            callback: (err, _) => {
                if (err != null) {
                    console.log(`Failed to save statement: ${err}`);
                } else {
                    console.log("Saved OK");
                }
            }
        });
    } else {
        console.log(`${JSON.stringify(event.data.statement.verb.display)} statement was received but LRS was not initialized due to insufficient query params`);
    }
};


//Listen for the document load ready and initialize H5PxApiSender
document.addEventListener("DOMContentLoaded", () => {
    H5PxApiSender.init()
});

window.H5PxApiSender = H5PxApiSender;

/***/ }),

/***/ "?ed1b":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?d17e":
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _h5p_xapi_sender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h5p-xapi-sender */ "./src/h5p-xapi-sender.js");


H5PxApiSender = window.H5PxApiSender;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (H5PxApiSender);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=main.js.map