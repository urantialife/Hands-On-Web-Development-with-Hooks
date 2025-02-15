import { renderHook, act } from '@testing-library/react-hooks'
import { stateContextWrapper } from './testUtils'
import useDispatch from './useDispatch'
import useUserState from './useUserState'

test('should use user state', () => {
  const { result } = renderHook(
    () => useUserState(),
    { wrapper: stateContextWrapper }
  )

  expect(result.current).toBe('')
})

test('should update user state on login', () => {
  const { result } = renderHook(
    () => ({ state: useUserState(), dispatch: useDispatch() }),
    { wrapper: stateContextWrapper }
  )

  act(() => result.current.dispatch({ type: 'LOGIN', username: 'Test User' }))
  expect(result.current.state).toBe('Test User')
})

test('should update user state on register', () => {
  const { result } = renderHook(
    () => ({ state: useUserState(), dispatch: useDispatch() }),
    { wrapper: stateContextWrapper }
  )

  act(() => result.current.dispatch({ type: 'REGISTER', username: 'Test User' }))
  expect(result.current.state).toBe('Test User')
})
