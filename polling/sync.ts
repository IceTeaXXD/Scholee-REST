import { universitySync } from "./university"

export const sync = () => {
    setInterval(() => {
        universitySync()
    }, 10000)
}
