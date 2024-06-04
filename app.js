
import UpperBox from "./components/upper-box.js";
import SearchBar from "./components/search-bar.js"

const app = Vue.createApp({
    components: {
        UpperBox,
        SearchBar
    }
})

app.mount('#app');