export function compareString(a: string, b: string): number {
  return a > b ? 1 : -1
}

/**
 * Find if b is a subsequence of a
 * eg. isSubsequence('abcde', 'ace') => true, isSubsequence('abcde', 'abf') => false
 */
export function isSubsequence(a: string, b: string): boolean {
  let j = 0
  let [n, m] = [a.length, b.length]
  for (let i = 0; i < n && j < m; i++) {
    if (a[i] === b[j]) {
      j++
    }
  }
  return j === m
}
