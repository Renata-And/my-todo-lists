export type ThemeMode = "dark" | "light"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload.theme }
    default:
      return state
  }
}

// Action creators
export const changeThemeAC = (theme: ThemeMode) => {
  return { type: "CHANGE_THEME", payload: { theme } }
}

// Action types
type ActionsType = ChangeThemeActionType
type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
