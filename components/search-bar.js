import SearchResult from "./search-result.js";
import data from "../data.js";
const { ref, reactive } = Vue;
export default{
    setup() {
        // State variables
        const results = ref([]);
        const query = ref('');
        const searchToggled = ref(false);
        
        // Event handlers
        function searchFocus() {
            const input = document.getElementById("search-input");
            const searchButton = document.getElementsByClassName('search-button')[0];
            const upperDiv = document.getElementsByClassName("upper-box")[0];
            const searchDiv = document.getElementsByClassName('search-box')[0];
            const searchImg = document.getElementById("search-img");
            
            if (!searchToggled.value){
                upperDiv.style.transition = 'height 0.1s ease';
                searchToggled.value = true;
                upperDiv.style.height = '2.75rem';
                searchDiv.style.margin='1.25rem 1.25rem 0';
                searchDiv.style.padding = '0.75rem 16.813rem 0.75rem 0.875rem';
                input.style.width = '18em';
                searchImg.src = 'assets/cross-23.png';
                
            }

        }

        function closeSearch(){
            const input = document.getElementById("search-input");
            const upperDiv = document.getElementsByClassName("upper-box")[0];
            const searchDiv = document.getElementsByClassName('search-box')[0];
            const searchImg = document.getElementById("search-img");

            if (searchToggled.value){
                searchToggled.value = false;
                upperDiv.style.transition = 'height 0.1s ease';
                upperDiv.style.height = '20rem'
                searchDiv.style.margin = '18.5rem 11.75rem 0 1.25rem';
                searchDiv.style.padding = '0.75rem 3.125rem 0.75rem 0.875rem';
                input.style.width = '5rem';
                searchImg.src = 'assets/search-icon-2048x2048-cmujl7en.png'
            }
            results.value = [];
            query.value = '';
            input.value = '';
        }

        function handleSearch(){
            results.value = [] // clear previous results from state

            query.value = document.getElementById("search-input").value;
            const searchResult = document.getElementById("search-results");
            searchResult.innerHTML = ''; // Clear previous search results
            if (query.value.trim() === '') {
                // If search query is empty, do not display anything
                return;
            }
            const filteredData = data.filter(item => {
                // since the type of the data determines what we search by, we handle each case separately
                if (item.type == 'person'){
                    var val = item.firstname.toLowerCase().includes(query.value.toLowerCase()) || item.lastname.toLowerCase().includes(query.value.toLowerCase());
                    return val;
                }
                else if (item.type == 'place'){
                    return item.name.toLowerCase().includes(query.value.toLowerCase());
                }
                else if (item.type == 'quote'){
                    return item.description.toLowerCase().includes(query.value.toLowerCase());
                }
                else{
                    return false;
                }
            });
            // if we have no results then return null
            if (filteredData.length == 0){
                return;
            }

            filteredData.forEach((element) => {
                results.value.push({item: element, match: query, type: element.type})
            })
            
        }

        return {
            query,
            results,
            searchToggled,
            searchFocus,
            closeSearch,
            handleSearch
        }
    },


    template: `
        <div class="search-box">
            <div class="search-cont">
                <button class="search-button" @click="closeSearch">
                    <img src="./assets/search-icon-2048x2048-cmujl7en.png" alt="search-img" id="search-img">
                </button>
                <input type="text" placeholder="Search" id="search-input" @focus="searchFocus" @keyup="handleSearch">
            </div>

            <div class="search-results-cont">
                <p class='results-str' v-if="results.length > 0">Results</p>
                <hr class="hr-results" v-if="results.length > 0">
                <ul class="search-results">
                <search-result v-for="(result, index) in results" :key="index" :result="result"></search-result>
                </ul>
            </div>
        </div>
    `,

    components: {
        SearchResult
    }

}
