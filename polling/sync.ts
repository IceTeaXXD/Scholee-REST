import { scholarshipsSync } from "./scholarships"
import { universitySync } from "./university"

export const sync = () => {
    setInterval(() => {
        scholarshipsSync()
        universitySync()
    }, 10000)
}
