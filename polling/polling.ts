import { getAllUniversities } from './university.polling';
// import other polling functions here


export const sync = () => {
    setInterval(() => {
        getAllUniversities();
        // call other polling functions here
    }, 10000); // 10000 ms = 10 seconds
}