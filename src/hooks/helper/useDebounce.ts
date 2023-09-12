function useDebounce<T, D>(fn: (args: D) => T, timeout = 500) {
  let timeoutId: NodeJS.Timeout

  return (args: D) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(args), timeout)
  }
}

export default useDebounce
